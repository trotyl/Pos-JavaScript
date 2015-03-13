function Strategy(allItems, discounts, promotions, discountMutual) {
    this.allItems = allItems;
    this.discounts = discounts;
    this.promotions = promotions;
    this.discountMutual = discountMutual;
}

Strategy.prototype.GenerageResult = function (input, formatter, output) {
    var enhancedItems = Strategy.GetEnhancedItems(input);
    Strategy.EnsureDiscounts(this.discounts, this.discountMutual, enhancedItems);
    var enhancedDiscounts = Strategy.GetDiscounts(enhancedItems);
    var enhancedPromotions = Strategy.GetPromotions(enhancedItems);

    var result = formatter.format(enhancedItems, enhancedDiscounts, enhancedPromotions);
    output.log(result);
};

Strategy.prototype.GetEnhancedItems = function (input) {
    var enhancedItems = [];
    _.forEach(input, function (fakeItem) {
        for (var barcode in fakeItem) {
            var item = _.findWhere(this.allItems, {'barcode': barcode});
            item && enhancedItems.push({
                'item': item,
                'price': item.price,
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
            if ((oldOne & newOne) != 0) {
                return;
            }
            if (enhancedItem.discount == 0) {
                enhancedItem.discount = newOne;
                enhancedItem.discounts[newOne] = discount;
            }
            else if ((mutual[oldOne | newOne] & newOne) == newOne) {
                enhancedItem.discount = mutual[oldOne | newOne];
                enhancedItem.discounts[newOne] = discount;
                _.forEach(enhancedItem.discounts, function (val, key) {
                    if ((key & enhancedItem.discount) == 0) {
                        delete enhancedItem.discounts[key];
                    }
                }, this);
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
            if ((enhancedItem.discount & val) != 0) {
                var discount = enhancedItem.discounts[val];
                var label = discount.scope.GetLabel();
                var enhancedDiscount = _.findWhere(enhancedDiscounts, {'label': label});
                var tmpPrice = enhancedItem.price * (1 - discount.rate);
                if (enhancedDiscount) {
                    enhancedDiscount.reduction += tmpPrice * enhancedItem.amount;
                    enhancedItem.price = enhancedDiscount.keep ? enhancedItem.price : tmpPrice;
                }
                else {
                    enhancedDiscounts.push({
                        'label': label,
                        'keep': discount.keep,
                        'rate': discount.rate,
                        'scope': discount.scope,
                        'reduction': tmpPrice * enhancedItem.amount
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
            if ((enhancedItem.promotion & val) != 0) {
                var promotion = enhancedItem.promotions[val];
                var label = promotion.scope.GetLabel();
                var enhancedPromotion = _.findWhere(enhancedPromotions, {'label': label});
                var tmpPrice = enhancedItem.price * enhancedItem.amount;
                if (enhancedPromotion) {
                    enhancedPromotion.total += tmpPrice;
                    enhancedPromotion.reduction = enhancedPromotion.total > promotion.from ? parseInt(enhancedPromotion.total / promotion.from) * promotion.to : 0;
                }
                else {
                    enhancedPromotions.push({
                        'label': label,
                        'keep': promotion.keep,
                        'from': promotion.from,
                        'to': promotion.to,
                        'scope': promotion.scope,
                        'total': tmpPrice,
                        'reduction': tmpPrice > promotion.from ? parseInt(tmpPrice / promotion.from) * promotion.to : 0
                    })
                }
            }
        })
    });
    return enhancedPromotions;
};

