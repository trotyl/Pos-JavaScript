// The derived class of Scope for the type of brand items.
function BrandScope(brand_name) {
    this.type = Scope.types.brand;
    this.brand = brand_name;
}

BrandScope.prototype = new Scope();

// The method to check whether a item is in the range of the scope.
BrandScope.prototype.isInRange = function (item) {
    return this.brand == item.brand;
};

// The method to get the description string for Discount usage.
BrandScope.prototype.getDiscountDescription = function () {
    return this.brand + '品牌';
};

// The method to get the description string for Promotion usage.
BrandScope.prototype.getPromotionDescription = function () {
    return this.brand + '品牌';
};
