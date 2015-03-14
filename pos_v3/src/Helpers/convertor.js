function Convertor() {
}

Convertor.enhanceItem = function (item, amount) {
    return {
        'item': item,
        'amount': amount,
        'origin': item.price * amount,
        'total': item.price * amount,
        'benefit': {},
        'benefits': {}
    }
};

Convertor.enhanceBenefit = function (benefit) {
    return {
        'type': benefit.type,
        'benefit': benefit,
        'items': {},
        'total': 0,
        'reduction': 0
    }
};

Convertor.PrettifyItem = function (enhancedItem) {
    return {
        'item': enhancedItem.item,
        'amount': enhancedItem.amount
    };
};

Convertor.PrettifyBenefit = function (eBenefit) {
    var pBenefit;
    if (eBenefit.type == Benefit.types.discount) {
        pBenefit = {
            'type': Benefit.types.discount,
            'scope': eBenefit.benefit.scope,
            'discount': eBenefit.benefit.rate,
            'reduction': eBenefit.reduction
        }
    }
    else if (eBenefit.type == Benefit.types.promotion) {
        pBenefit = {
            'type': Benefit.types.promotion,
            'scope': eBenefit.benefit.scope,
            'from': eBenefit.benefit.from,
            'to': eBenefit.benefit.to,
            'reduction': eBenefit.reduction
        }
    }
    else {
        throw new Error('Type of the benefit is not available: ' + eBenefit.type)
    }
    return pBenefit;
};

Convertor.PrettifySummary = function (prettyItems, prettyBenefits) {
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
