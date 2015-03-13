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
    var prettyItems = Strategy.PrettifyItems(enhancedItems);
    var prettyDiscounts = Strategy.PrettifyDiscounts(enhancedDiscounts);
    var prettyPromotions = Strategy.PrettifyPromotions(enhancedPromotions);
    var prettifySummary = Strategy.PrettifySummary(prettyItems, prettyDiscounts, prettyPromotions);

    var result = formatter.format(prettyItems, prettyDiscounts, prettyPromotions, prettifySummary);
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

Strategy.PrettifyItems = function (enhancedItems) {
    var PrettyItems = [];
    for (var i in enhancedItems) {
        PrettyItems.push({
            'item': enhancedItems[i].item,
            'amount': enhancedItems[i].amount
        })
    }
    return PrettyItems;
};

Strategy.PrettifyDiscounts = function (enhancedDiscounts) {
    var prettyDiscounts = [];
    for (var i in enhancedDiscounts) {
        prettyDiscounts.push({
            'scope': enhancedDiscounts[i].scope,
            'discount': enhancedDiscounts[i].rate,
            'reduction': enhancedDiscounts[i].reduction
        })
    }
    return prettyDiscounts;
};

Strategy.PrettifyPromotions = function (enhancedPromotions) {
    var prettyPromotions = [];
    for (var i in enhancedPromotions) {
        prettyPromotions.push({
            'scope': enhancedPromotions[i].scope,
            'from': enhancedPromotions[i].from,
            'to': enhancedPromotions[i].to,
            'reduction': enhancedPromotions[i].reduction
        })
    }
    return prettyPromotions;
};

Strategy.PrettifySummary = function (prettyItems, prettyDiscounts, prettyPromotions) {
    var sum = 0;
    var reduction = 0;
    for(var i in prettyItems){
        sum += prettyItems[i].item.price * prettyItems[i].amount;
    }
    for(var j in prettyDiscounts){
        reduction += prettyDiscounts[j].reduction;
    }
    for(var k in prettyPromotions){
        reduction += prettyPromotions[k].reduction;
    }
    return {
        'sum': sum,
        'reduction': reduction
    }
};
