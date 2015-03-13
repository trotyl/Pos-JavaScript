function Scope() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Scope.types = {
    single: 0x01,
    brand: 0x02,
    full: 0x04
};


// 单品范围
function SingleScope(item_name) {
    this.type = Scope.types.single;
    this.name = item_name;
}

SingleScope.prototype.isInRange = function (item) {
    return this.name == item.name;
};

SingleScope.prototype.GetLabel = function () {
    return '$LabelOfSingleScope' + this.name;
};

SingleScope.prototype.GetDescription = function () {
    return this.name + '单品';
};

SingleScope.prototype.GetSimpleDescription = function () {
    return this.name;
};


// 品牌范围
function BrandScope(brand_name) {
    this.type = Scope.types.brand;
    this.brand = brand_name;
}

BrandScope.prototype.isInRange = function (item) {
    return this.brand == item.brand;
};

BrandScope.prototype.GetLabel = function () {
    return '$LabelOfBrandScope' + this.brand;
};

BrandScope.prototype.GetDescription = function () {
    return this.brand + '品牌';
};

BrandScope.prototype.GetSimpleDescription = function () {
    return this.brand + '品牌';
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

FullScope.prototype.GetLabel = function () {
    return '$LabelOfFullScope';
};

FullScope.prototype.GetDescription = function () {
    return '';
};

FullScope.prototype.GetSimpleDescription = function () {
    return '';
};
