function Scope() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Scope.types = {
    single: 1,
    brand: 2,
    full: 4
};


// 单品范围
function SingleScope(item_name) {
    this.type = Scope.types.single;
    this.name = item_name;
}

SingleScope.prototype.isInRange = function (item) {
    return this.name == item.name;
};

/**
 * @return {string}
 */
SingleScope.prototype.GetLabel = function () {
    return '$LabelOfSingleScope' + this.name;
};


// 品牌范围
function BrandScope(brand_name) {
    this.type = Scope.types.brand;
    this.brand = brand_name;
}

BrandScope.prototype.isInRange = function (item) {
    return this.brand == item.brand;
};

/**
 * @return {string}
 */
BrandScope.prototype.GetLabel = function () {
    return '$LabelOfBrandScope' + this.brand;
};


// 全场范围
function FullScope(exceptions) {
    this.type = Scope.types.full;
    this.exceptions = exceptions;
}

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

/**
 * @return {string}
 */
FullScope.prototype.GetLabel = function () {
    return '$LabelOfFullScope';
};
