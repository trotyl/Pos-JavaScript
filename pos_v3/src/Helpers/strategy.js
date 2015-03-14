function Strategy(allItems, benefits, mutual) {
    this.allItems = allItems;
    this.benefits = benefits;
    this.mutual = mutual;
}

Strategy.prototype.GenerateResult = function (input, formatter, output) {
    var enhancedItems = this.GetEnhancedItems(input);
    var enhancedBenefits = this.GetEnhancedBenefits(this.benefits);
    for (var ii in enhancedItems) {
        Strategy.EnsureBenefit(enhancedItems[ii], this.mutual, enhancedBenefits);
    }
    for (var jj in enhancedBenefits) {
        Strategy.GetBenefit(enhancedBenefits[jj]);
    }
    var prettyItems = Strategy.PrettifyItems(enhancedItems);
    var prettyBenefits = Strategy.PrettifyBenefits(enhancedBenefits);
    var prettifySummary = Strategy.PrettifySummary(prettyItems, prettyBenefits);

    var result = formatter.format(prettyItems, prettyBenefits, prettifySummary);
    output.log(result);
};

Strategy.prototype.GetEnhancedItems = function (input) {
    var enhancedItems = [];
    _.forEach(input, function (fakeItem) {
        for (var barcode in fakeItem) {
            var amount = fakeItem[barcode]
            var item = _.findWhere(this.allItems, {'barcode': barcode});
            item && enhancedItems.push({
                'item': item,
                'amount': amount,
                'total': item.price * amount,
                'benefit': {},
                'benefits': {}
            });
        }
    }, this);
    return enhancedItems;
};

Strategy.prototype.GetEnhancedBenefits = function (benefits) {
    var eBenefits = [];
    for(var i in benefits){
        var benefit = benefits[i];
        benefit && eBenefits.push({
            'type': benefit.type,
            'benefit': benefit,
            'items': {},
            'total': 0,
            'reduction': 0
        });
    }
    return eBenefits;
};

//Strategy.EnsureDiscount = function (discount, mutual, enhancedItems) {
//    discount && _.forEach(enhancedItems, function (enhancedItem) {
//        if (!discount.scope.isInRange(enhancedItem.item)) {
//            return;
//        }
//
//        var oldOne = enhancedItem.discount;
//        var newOne = discount.scope.type;
//        if ((oldOne & newOne) != 0) {
//            return;
//        }
//        if (enhancedItem.discount == 0) {
//            enhancedItem.discount = newOne;
//            enhancedItem.discounts[newOne] = discount;
//        }
//        else if ((mutual[oldOne | newOne] & newOne) == newOne) {
//            enhancedItem.discount = mutual[oldOne | newOne];
//            enhancedItem.discounts[newOne] = discount;
//            _.forEach(enhancedItem.discounts, function (val, key) {
//                if ((key & enhancedItem.discount) == 0) {
//                    delete enhancedItem.discounts[key];
//                }
//            }, this);
//        }
//
//    }, this);
//};
//
//Strategy.EnsurePromotion = function (promotion, mutual, enhancedItems) {
//    promotion && _.forEach(enhancedItems, function (enhancedItem) {
//        if (!promotion.scope.isInRange(enhancedItem.item)) {
//            return;
//        }
//        enhancedItem.promotion |= promotion.scope.type;
//        enhancedItem.promotions[promotion.scope.type] = promotion;
//    }, this);
//};

Strategy.EnsureBenefit = function (eItem, mutual, eBenefits) {
    if (!eItem || !mutual || !eBenefits) {
        return
    }
    for(var i in eBenefits){
        var eBenefit = eBenefits[i];
        if(!eBenefit.benefit.scope.isInRange(eItem.item)){
            continue
        }

        var oldOne = eItem.benefit[eBenefit.type];
        var newOne = eBenefit.benefit.scope.type;
        var typeMtl = mutual[eBenefit.type];
        if ((oldOne & newOne) != 0) {
            return;
        }
        if (!oldOne || oldOne == 0) {
            eItem.benefit[eBenefit.type] = newOne;
            eItem.benefits[eBenefit.type] = eItem.benefits[eBenefit.type] || {};
            eItem.benefits[eBenefit.type][newOne] = eBenefit.benefit;
            eBenefit.items[eItem.item.barcode] = eItem;
        }
        else if (typeMtl && (typeMtl[oldOne | newOne] & newOne) == newOne) {
            eItem.benefit[eBenefit.type] = typeMtl[oldOne | newOne];
            eItem.benefits[eBenefit.type] = eItem.benefits[eBenefit.type] || {};
            eItem.benefits[eBenefit.type][newOne] = eBenefit.benefit;
            eBenefit.items[eItem.item.barcode] = eItem;
            for(var key in eItem.benefits[eBenefit.type]){
                if ((key & eItem.benefit[eBenefit.type]) == 0) {
                    delete eItem.benefit[eBenefit.type][key];
                    delete eBenefit.items[eItem.item.barcode];
                }
            }

        }
    }
};

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

Strategy.GetBenefit = function (eBenefit) {
    var compute = function (current, from, to) {
        return current >= from ? parseInt(current / from) * to : 0;
    };

    for(var i in eBenefit.items){
        var eItem = eBenefit.items[i];
        if(eBenefit.type == Benefit.types.discount){
            var tmpPrice = eItem.total * eBenefit.benefit.rate;
            eBenefit.reduction += (eItem.total - tmpPrice);
            eItem.total = eBenefit.benefit.keep ? eItem.total : tmpPrice;
        }
        else if(eBenefit.type == Benefit.types.promotion){
            eBenefit.total += eItem.total;
            var newReduction = compute(eBenefit.total, eBenefit.benefit.from, eBenefit.benefit.to);
            eItem.total = eBenefit.benefit.keep ? eItem.total : (eItem.total - newReduction + eBenefit.reduction);
            eBenefit.reduction = newReduction;
        }
    }
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
        var eBenefit = enhancedBenefits[i];
        if (!eBenefit.reduction > 0) {
            continue
        }
        var pBenefit;
        if (eBenefit.type == Benefit.types.discount) {
            pBenefit = {
                'type': Benefit.types.discount,
                'scope': eBenefit.benefit.scope,
                'discount': eBenefit.benefit.rate,
                'reduction': eBenefit.reduction
            }
        }
        else if (enhancedBenefits[i].type == Benefit.types.promotion) {
            pBenefit = {
                'type': Benefit.types.promotion,
                'scope': eBenefit.benefit.scope,
                'from': eBenefit.benefit.from,
                'to': eBenefit.benefit.to,
                'reduction': eBenefit.reduction
            }
        }
        else {
            throw new Error('Type of the benefit is not available: ' + enhancedBenefits[i].type)
        }
        prettyBenefits.push(pBenefit);
    }
    return prettyBenefits;
};

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
