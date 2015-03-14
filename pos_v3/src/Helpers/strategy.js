// The core class of the application.
// 'allItems' is a list for all available items for sale.
// 'benefits' is a list for all benefit going to take.
// 'mutual' is the object provide the solution rule of the conflict between benefits.
function Strategy(allItems, benefits, mutual) {
    this.allItems = allItems;
    this.benefits = benefits;
    this.mutual = mutual;
}

// The method to run the strategy.
Strategy.prototype.GenerateResult = function (input, formatter, output) {
    var enhancedItems = this.GetEnhancedItems(input);
    var enhancedBenefits = this.GetEnhancedBenefits(this.benefits);
    for (var ii in enhancedItems) {
        Strategy.EnsureBenefit(enhancedItems[ii], this.mutual, enhancedBenefits);
    }
    for (var jj in enhancedBenefits) {
        Strategy.GetBenefit(enhancedBenefits[jj]);
    }
    var prettyItems = Peeler.PrettifyItems(enhancedItems);
    var prettyBenefits = Peeler.PrettifyBenefits(enhancedBenefits);
    var prettifySummary = Peeler.PrettifySummary(prettyItems, prettyBenefits);

    var result = formatter.format(prettyItems, prettyBenefits, prettifySummary);
    output.log(result);
};

Strategy.prototype.GetEnhancedItems = function (input) {
    var enhancedItems = [];
    _.forEach(input, function (fakeItem) {
        for (var barcode in fakeItem) {
            var amount = fakeItem[barcode];
            var item = _.findWhere(this.allItems, {'barcode': barcode});
            item && enhancedItems.push({
                'item': item,
                'amount': amount,
                'origin': item.price * amount,
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

Strategy.GetBenefit = function (eBenefit) {
    var compute = function (current, from, to) {
        return current >= from ? parseInt(current / from) * to : 0;
    };

    for(var i in eBenefit.items){
        var eItem = eBenefit.items[i];
        if(eBenefit.type == Benefit.types.discount){
            var tmpPrice =  (eBenefit.benefit.keep? eItem.origin: eItem.total) * eBenefit.benefit.rate;
            eBenefit.reduction += (eBenefit.benefit.keep? eItem.origin: eItem.total) - tmpPrice;
            eItem.total -= (eBenefit.benefit.keep? eItem.origin: eItem.total) - tmpPrice;
        }
        else if(eBenefit.type == Benefit.types.promotion){
            eBenefit.total += eBenefit.benefit.keep? eItem.origin: eItem.total;
            var newReduction = compute(eBenefit.total, eBenefit.benefit.from, eBenefit.benefit.to);
            eItem.total = (eItem.total - newReduction + eBenefit.reduction);
            eBenefit.reduction = newReduction;
        }

    }
};
