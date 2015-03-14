// The abstract class of Scope, it should not be instantiated.
function Scope() {
    throw new Error('Static class can not be instanced.');
}

// The static enums for types of Scope.
Scope.types = {
    single: 0x01,
    brand: 0x02,
    full: 0x04
};


// The derived class of Scope for the type of single item.
function SingleScope(item_name) {
    this.type = Scope.types.single;
    this.name = item_name;
}

// The method to check whether a item is in the range of the scope.
SingleScope.prototype.isInRange = function (item) {
    return this.name == item.name;
};

// The method to get the description string for Discount usage.
SingleScope.prototype.GetDiscountDescription = function () {
    return this.name + '单品';
};

// The method to get the description string for Promotion usage.
SingleScope.prototype.GetPromotionDescription = function () {
    return this.name;
};


// The derived class of Scope for the type of brand items.
function BrandScope(brand_name) {
    this.type = Scope.types.brand;
    this.brand = brand_name;
}

// The method to check whether a item is in the range of the scope.
BrandScope.prototype.isInRange = function (item) {
    return this.brand == item.brand;
};

// The method to get the description string for Discount usage.
BrandScope.prototype.GetDiscountDescription = function () {
    return this.brand + '品牌';
};

// The method to get the description string for Promotion usage.
BrandScope.prototype.GetPromotionDescription = function () {
    return this.brand + '品牌';
};


// The derived class of Scope for the type of full items.
function FullScope(exceptions) {
    this.type = Scope.types.full;
    this.exceptions = exceptions;
}

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
FullScope.prototype.GetDiscountDescription = function () {
    return '';
};

// The method to get the description string for Promotion usage.
FullScope.prototype.GetPromotionDescription = function () {
    return '';
};
