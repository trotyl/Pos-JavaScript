// The derived class of Scope for the type of full items.
function FullScope(exceptions) {
    this.type = Scope.types.full;
    this.exceptions = exceptions;
}

FullScope.prototype = new Scope();

// The method to check whether a item is in the range of the scope.
FullScope.prototype.isInRange = function (item) {
    var res = true;
    for (var i in this.exceptions) {
        if (this.exceptions[i].isInRange(item)) {
            res = false;
            break;
        }
    }
    return res;
};

// The method to get the description string for Discount usage.
FullScope.prototype.getDiscountDescription = function () {
    return '';
};

// The method to get the description string for Promotion usage.
FullScope.prototype.getPromotionDescription = function () {
    return '';
};
