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

Strategy.GetEnhancedItems = function (input) {
    var enhancedItems = [];
    _.forEach(input, function (fakeItem) {
        for (var barcode in fakeItem) {
            var item = _.where(this.allItems, {'barcode': barcode});
            enhancedItems.push({
                'item': item,
                'amount': fakeItem[barcode],
                'discount': 0
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
            if (enhancedItem.discount == 0 || mutual[oldOne | newOne] & newOne == newOne) {
                enhancedItem.discount = oldOne | newOne;
            }
        }, this);
    }, this);
};

Strategy.GetDiscounts = function (enhancedItems) {
    var enhancedDiscounts = [];
    _.forEach(enhancedItems, function (enhancedItem) {
        _.forEach(Scope.types, function (val, key) {
            if (enhancedItem.discount & val != 0) {
                var label = 0;
                var enhancedDiscount = _.find(enhancedDiscounts)
            }
        })
    })
};

Strategy.GetPromotions = function (enhancedItems) {

};

