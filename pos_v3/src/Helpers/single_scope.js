// The derived class of Scope for the type of single item.
function SingleScope(item_name) {
    this.type = Scope.types.single;
    this.name = item_name;
}

SingleScope.prototype = new Scope();

// The method to check whether a item is in the range of the scope.
SingleScope.prototype.isInRange = function (item) {
    return this.name == item.name;
};

// The method to get the description string for Discount usage.
SingleScope.prototype.getDiscountDescription = function () {
    return this.name + '单品';
};

// The method to get the description string for Promotion usage.
SingleScope.prototype.getPromotionDescription = function () {
    return this.name;
};
