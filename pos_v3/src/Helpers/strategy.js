function Strategy(allItems, discounts, promotions, discountMutual, keepOriginal) {
    this.allItems = allItems;
    this.discounts = discounts;
    this.promotions = promotions;
    this.discountMutual = discountMutual;
    this.keepOriginal = keepOriginal;
}

Strategy.prototype.GenerageResult = function (input, formatter, output) {
    var enhancedItems = Strategy.GetEnhancedItems(input);
    Strategy.EnsureDiscounts(this.discounts, this.discountMutual, enhancedItems);
    var enhancedDiscounts = Strategy.GetDiscounts(enhancedItems);
    var enhancedPromotions = Strategy.GetPromotions(enhancedItems);

    var result = formatter.format(enhancedItems, enhancedDiscounts, enhancedPromotions);
    output.log(result);
};

Strategy.GetEnhancedItems = function (input) {
    var enhancedItems = [];
    _.forEach(input, function (fakeItem) {
        for (var barcode in fakeItem) {
            var item = _.where(this.allItems, {'barcode': barcode});
            enhancedItems.push({
                'item': item,
                'amount': fakeItem[barcode],
                'discount': 0,
                'discounts': {},
                'promotion': 0,
                'promotions': {}
            });
        }
    }, this);
    return enhancedItems;
};

Strategy.EnsureDiscounts = function (discounts, mutual, enhancedItems) {
    _.forEach(discounts, function (discount) {
        _.forEach(enhancedItems, function (enhancedItem) {
            if (!discount.scope.isInRange(enhancedItem.item)) {
                return;
            }
            var oldOne = enhancedItem.discount;
            var newOne = discount.scope.type;
            if (oldOne & newOne != 0) {
                return;
            }
            if (enhancedItem.discount == 0) {
                enhancedItem.discount = newOne;
                enhancedItem.discounts[newOne] = discount;
            }
            else if(mutual[oldOne | newOne] & newOne == newOne){
                enhancedItem.discount = mutual[oldOne | newOne];
                enhancedItem.discounts[newOne] = discount;
                _.forEach(enhancedItem.discounts, function (val, key) {
                    if(key & enhancedItem.discount == 0){
                        delete enhancedItem.discounts[key];
                    }
                }, this)
            }
        }, this);
    }, this);
};

Strategy.EnsurePromotions = function (promotions, mutual, enhancedItems) {
    _.forEach(promotions, function (promotion) {
        _.forEach(enhancedItems, function (enhancedItem) {
            if (!promotion.scope.isInRange(enhancedItem.item)) {
                return;
            }
            enhancedItem.promotion |= promotion.scope.type;
            enhancedItem.promotions[promotion.scope.type] = promotion;
        }, this);
    }, this);
};

Strategy.GetDiscounts = function (enhancedItems) {
    var enhancedDiscounts = [];
    _.forEach(enhancedItems, function (enhancedItem) {
        _.forEach(Scope.types, function (val, key) {
            if (enhancedItem.discount & val != 0) {
                var discount = enhancedItem.discounts[val];
                var label = discount.scope.GetLabel();
                var enhancedDiscount = _.where(enhancedDiscounts, {'label': label});
                if(enhancedDiscount){
                    enhancedDiscount.price += enhancedItem.item.price * enhancedItem.amount * (1 - discount.rate);
                }
                else {
                    enhancedDiscount.push({
                        'label': label,
                        'rate': discount.rate,
                        'scope': discount.scope,
                        'price': enhancedItem.item.price * enhancedItem.amount * (1 - discount.rate)
                    })
                }
            }
        })
    });
    return enhancedDiscounts;
};

Strategy.GetPromotions = function (enhancedItems) {
    var enhancedPromotions = [];
    _.forEach(enhancedItems, function (enhancedItem) {
        _.forEach(Scope.types, function (val, key) {
            if (enhancedItem.promotion & val != 0) {
                var promotion = enhancedItem.promotions[val];
                var label = promotion.scope.GetLabel();
                var enhancedPromotion = _.where(enhancedPromotions, {'label': label});
                if(enhancedPromotion){
                    enhancedPromotion.total += enhancedItem.item.price * enhancedItem.amount;
                }
                else {
                    enhancedPromotions.push({
                        'label': label,
                        'from': promotion.from,
                        'reduction': promotion.reduction,
                        'scope': promotion.scope,
                        'total': enhancedItem.item.price * enhancedItem.amount
                    })
                }
            }
        })
    });
    return enhancedPromotions;
};

