//function Strategy(allItems, discounts, promotions, discountMutual) {
//    this.allItems = allItems;
//    this.discounts = discounts;
//    this.promotions = promotions;
//    this.discountMutual = discountMutual;
//}

function Strategy(allItems, benefits, discountMutual) {
    this.allItems = allItems;
    this.benefits = benefits;
    this.discountMutual = discountMutual;
}

//Strategy.prototype.GenerateResult = function (input, formatter, output) {
//    var enhancedItems = this.GetEnhancedItems(input);
//    Strategy.EnsureDiscount(this.discounts, this.discountMutual, enhancedItems);
//    Strategy.EnsurePromotion(this.promotions, {}, enhancedItems);
//    var enhancedDiscounts = Strategy.GetDiscount(enhancedItems);
//    var enhancedPromotions = Strategy.GetPromotion(enhancedItems);
//    var prettyItems = Strategy.PrettifyItems(enhancedItems);
//    var prettyDiscounts = Strategy.PrettifyDiscounts(enhancedDiscounts);
//    var prettyPromotions = Strategy.PrettifyPromotions(enhancedPromotions);
//    var prettifySummary = Strategy.PrettifySummary(prettyItems, prettyDiscounts, prettyPromotions);
//
//    var result = formatter.format(prettyItems, prettyDiscounts, prettyPromotions, prettifySummary);
//    output.log(result);
//};

Strategy.prototype.GenerateResult = function (input, formatter, output) {
    var enhancedItems = this.GetEnhancedItems(input);
    var enhancedBenefits = [];
    for (var i in this.benefits) {
        if (this.benefits[i].type == Benefit.types.discount) {
            Strategy.EnsureDiscount(this.benefits[i], this.discountMutual, enhancedItems);
        }
        else if (this.benefits[i].type == Benefit.types.promotion) {
            Strategy.EnsurePromotion(this.benefits[i], {}, enhancedItems);
        }
        else {
            throw new Error('Type of the benefit is not available: ' + this.benefits[i].type);
        }
    }
    console.log(enhancedItems);
    for (var j in enhancedItems) {
        Strategy.GetDiscount(enhancedItems[j], enhancedBenefits);
    }
    console.log(enhancedBenefits);
    var prettyItems = Strategy.PrettifyItems(enhancedItems);
    var prettyBenefits = Strategy.PrettifyBenefits(enhancedBenefits);
    console.log(prettyBenefits);
    var prettifySummary = Strategy.PrettifySummary(prettyItems, prettyBenefits);

    var result = formatter.format(prettyItems, prettyBenefits, prettifySummary);
    output.log(result);
};

Strategy.prototype.GetEnhancedItems = function (input) {
    var enhancedItems = [];
    _.forEach(input, function (fakeItem) {
        for (var barcode in fakeItem) {
            var item = _.findWhere(this.allItems, {'barcode': barcode});
            item && enhancedItems.push({
                'item': item,
                'amount': fakeItem[barcode],
                'total': item.price * fakeItem[barcode],
                'discount': 0,
                'discounts': {},
                'promotion': 0,
                'promotions': {}
            });
        }
    }, this);
    return enhancedItems;
};

Strategy.EnsureDiscount = function (discount, mutual, enhancedItems) {
    discount && _.forEach(enhancedItems, function (enhancedItem) {
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
};

Strategy.EnsurePromotion = function (promotion, mutual, enhancedItems) {
    promotion && _.forEach(enhancedItems, function (enhancedItem) {
        if (!promotion.scope.isInRange(enhancedItem.item)) {
            return;
        }
        enhancedItem.promotion |= promotion.scope.type;
        enhancedItem.promotions[promotion.scope.type] = promotion;
    }, this);
};

//Strategy.GetDiscount = function (enhancedItems) {
//    var enhancedDiscounts = [];
//    _.forEach(enhancedItems, function (enhancedItem) {
//        _.forEach(Scope.types, function (val, key) {
//            if ((enhancedItem.discount & val) != 0) {
//                var discount = enhancedItem.discounts[val];
//                var label = discount.scope.GetLabel();
//                var enhancedDiscount = _.findWhere(enhancedDiscounts, {'label': label});
//                var tmpPrice = enhancedItem.price * (1 - discount.rate);
//                if (enhancedDiscount) {
//                    enhancedDiscount.reduction += tmpPrice * enhancedItem.amount;
//                    enhancedItem.price = enhancedDiscount.keep ? enhancedItem.price : tmpPrice;
//                }
//                else {
//                    enhancedDiscounts.push({
//                        'label': label,
//                        'keep': discount.keep,
//                        'rate': discount.rate,
//                        'scope': discount.scope,
//                        'reduction': tmpPrice * enhancedItem.amount
//                    })
//                }
//            }
//        })
//    });
//    return enhancedDiscounts;
//};

Strategy.GetDiscount = function (eItem, eBenefits) {
    _.forEach(Scope.types, function (val, key) {
        if ((eItem.discount & val) != 0) {
            var discount = eItem.discounts[val];
            var label = discount.scope.GetLabel();
            var eDiscount = _.findWhere(eBenefits, {'type': Benefit.types.discount, 'label': label});
            var tmpPrice = eItem.total * discount.rate;
            if (eDiscount) {
                eDiscount.reduction += (eItem.total - tmpPrice);
                eItem.total = eDiscount.keep ? eItem.total : tmpPrice;
            }
            else {
                eBenefits.push({
                    'type': Benefit.types.discount,
                    'label': label,
                    'keep': discount.keep,
                    'rate': discount.rate,
                    'scope': discount.scope,
                    'reduction': eItem.total - tmpPrice
                })
            }
        }
    })
};

//Strategy.GetPromotion = function (enhancedItems) {
//    var enhancedPromotions = [];
//    _.forEach(enhancedItems, function (enhancedItem) {
//        _.forEach(Scope.types, function (val, key) {
//            if ((enhancedItem.promotion & val) != 0) {
//                var promotion = enhancedItem.promotions[val];
//                var label = promotion.scope.GetLabel();
//                var enhancedPromotion = _.findWhere(enhancedPromotions, {'label': label});
//                var tmpPrice = enhancedItem.price * enhancedItem.amount;
//                if (enhancedPromotion) {
//                    enhancedPromotion.total += tmpPrice;
//                    enhancedPromotion.reduction = enhancedPromotion.total > promotion.from ? parseInt(enhancedPromotion.total / promotion.from) * promotion.to : 0;
//                }
//                else {
//                    enhancedPromotions.push({
//                        'label': label,
//                        'keep': promotion.keep,
//                        'from': promotion.from,
//                        'to': promotion.to,
//                        'scope': promotion.scope,
//                        'total': tmpPrice,
//                        'reduction': tmpPrice > promotion.from ? parseInt(tmpPrice / promotion.from) * promotion.to : 0
//                    })
//                }
//            }
//        })
//    });
//    return enhancedPromotions;
//};

Strategy.GetPromotion = function (eItem, eBenefits) {
    var reductionCompute = function (current, from, to) {
        return current > from ? parseInt(current / from) * to : 0;
    };

    _.forEach(Scope.types, function (val, key) {
        if ((eItem.promotion & val) != 0) {
            var promotion = eItem.promotions[val];
            var label = promotion.scope.GetLabel();
            var ePromotion = _.findWhere(eBenefits, {'type': Benefit.types.promotion, 'label': label});
            //var tmpPrice = eItem.total;
            if (ePromotion) {
                ePromotion.total += eItem.total;
                var newReduction = reductionCompute(ePromotion.total, promotion.from, promotion.to);
                eItem.total = ePromotion.keep ? eItem.total : (eItem.total - newReduction + ePromotion.reduction);
                ePromotion.reduction = newReduction;
            }
            else {
                eBenefits.push({
                    'type': Benefit.types.promotion,
                    'label': label,
                    'keep': promotion.keep,
                    'from': promotion.from,
                    'to': promotion.to,
                    'scope': promotion.scope,
                    'total': eItem.total,
                    'reduction': reductionCompute(eItem.total, promotion.from, promotion.to)
                })
            }
        }
    })
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

//Strategy.PrettifyDiscounts = function (enhancedDiscounts) {
//    var prettyDiscounts = [];
//    for (var i in enhancedDiscounts) {
//        prettyDiscounts.push({
//            'scope': enhancedDiscounts[i].scope,
//            'discount': enhancedDiscounts[i].rate,
//            'reduction': enhancedDiscounts[i].reduction
//        })
//    }
//    return prettyDiscounts;
//};
//
//Strategy.PrettifyPromotions = function (enhancedPromotions) {
//    var prettyPromotions = [];
//    for (var i in enhancedPromotions) {
//        if(enhancedPromotions[i].reduction > 0){
//            prettyPromotions.push({
//                'scope': enhancedPromotions[i].scope,
//                'from': enhancedPromotions[i].from,
//                'to': enhancedPromotions[i].to,
//                'reduction': enhancedPromotions[i].reduction
//            });
//        }
//    }
//    return prettyPromotions;
//};

Strategy.PrettifyBenefits = function (enhancedBenefits) {
    var prettyBenefits = [];
    for (var i in enhancedBenefits) {
        if (!enhancedBenefits[i].reduction > 0) {
            return
        }
        var enhancedBenefit;
        if (enhancedBenefits[i].type == Benefit.types.discount) {
            enhancedBenefit = {
                'type': Benefit.types.discount,
                'scope': enhancedBenefits[i].scope,
                'discount': enhancedBenefits[i].rate,
                'reduction': enhancedBenefits[i].reduction
            }
        }
        else if (enhancedBenefits[i].type == Benefit.types.promotion) {
            enhancedBenefit = {
                'type': Benefit.types.promotion,
                'scope': enhancedBenefits[i].scope,
                'from': enhancedBenefits[i].from,
                'to': enhancedBenefits[i].to,
                'reduction': enhancedBenefits[i].reduction
            }
        }
        else {
            throw new Error('Type of the benefit is not available: ' + enhancedBenefits[i].type)
        }
        prettyBenefits.push(enhancedBenefit);
    }
    return prettyBenefits;
};

//Strategy.PrettifySummary = function (prettyItems, prettyDiscounts, prettyPromotions) {
//    var sum = 0;
//    var reduction = 0;
//    for (var i in prettyItems) {
//        sum += prettyItems[i].item.price * prettyItems[i].amount;
//    }
//    for (var j in prettyDiscounts) {
//        reduction += prettyDiscounts[j].reduction;
//    }
//    for (var k in prettyPromotions) {
//        reduction += prettyPromotions[k].reduction;
//    }
//    return {
//        'sum': sum - reduction,
//        'reduction': reduction
//    }
//};

Strategy.PrettifySummary = function (prettyItems, prettyBenefits) {
    var sum = 0;
    var reduction = 0;
    for (var i in prettyItems) {
        sum += prettyItems[i].item.price * prettyItems[i].amount;
    }
    for (var j in prettyBenefits) {
        reduction += prettyBenefits[j].reduction;
    }
    return {
        'sum': sum - reduction,
        'reduction': reduction
    }
};
