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
Strategy.prototype.generateResult = function (input) {
    var enhancedItems = this.getEnhancedItems(input);
    var enhancedBenefits = this.getEnhancedBenefits(this.benefits);
    for (var ii in enhancedItems) {
        Strategy.ensureBenefit(enhancedItems[ii], this.mutual, enhancedBenefits);
    }
    for (var jj in enhancedBenefits) {
        Strategy.getBenefit(enhancedBenefits[jj]);
    }
    return {
        'items': enhancedItems,
        'benefits': enhancedBenefits
    };
};

Strategy.prototype.getEnhancedItems = function (input) {
    var enhancedItems = [];
    for(var i in input){
        var fakeItem = input[i];
        for (var barcode in fakeItem) {
            var amount = fakeItem[barcode];
            var item = _.findWhere(this.allItems, {'barcode': barcode});
            item && enhancedItems.push(Convertor.enhanceItem(item, amount));
        }
    }
    return enhancedItems;
};

Strategy.prototype.getEnhancedBenefits = function (benefits) {
    var eBenefits = [];
    for(var i in benefits){
        var benefit = benefits[i];
        benefit && eBenefits.push(Convertor.enhanceBenefit(benefit));
    }
    return eBenefits;
};

Strategy.ensureBenefit = function (eItem, mutual, eBenefits) {
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

Strategy.getBenefit = function (eBenefit) {
    var compute = function (current, from, to) {
        return current >= from ? parseInt(current / from) * to : 0;
    };

    for(var i in eBenefit.items){
        var eItem = eBenefit.items[i];
        if(eBenefit.type == Benefit.types.discount){
            var tmp = (eBenefit.benefit.keep? eItem.origin: eItem.total) * (1 - eBenefit.benefit.rate);
            eBenefit.reduction += tmp;
            eItem.total -= tmp;
        }
        else if(eBenefit.type == Benefit.types.promotion){
            eBenefit.total += eBenefit.benefit.keep? eItem.origin: eItem.total;
            var newReduction = compute(eBenefit.total, eBenefit.benefit.from, eBenefit.benefit.to);
            eItem.total = (eItem.total - newReduction + eBenefit.reduction);
            eBenefit.reduction = newReduction;
        }
    }
};
