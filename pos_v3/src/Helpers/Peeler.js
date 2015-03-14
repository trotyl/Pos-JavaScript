function Peeler() {
}

Peeler.PrettifyItems = function (enhancedItems) {
    var PrettyItems = [];
    for (var i in enhancedItems) {
        PrettyItems.push({
            'item': enhancedItems[i].item,
            'amount': enhancedItems[i].amount
        })
    }
    return PrettyItems;
};

Peeler.PrettifyBenefits = function (enhancedBenefits) {
    var prettyBenefits = [];
    for (var i in enhancedBenefits) {
        var eBenefit = enhancedBenefits[i];
        if (eBenefit.reduction <= 0) {
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

Peeler.PrettifySummary = function (prettyItems, prettyBenefits) {
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
