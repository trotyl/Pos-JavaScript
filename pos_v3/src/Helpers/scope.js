function Scope(){
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Scope.types = {
    single: 1,
    brand: 2,
    full: 4
};

Scope.DynamicCreate = function (type, label) {
    var res = null;
    switch (type){
        case Scope.types.single:
            res = new SingleScope(label);
            break;
        case Scope.types.brand:
            res = new BrandScope(label);
            break;
        case Scope.types.full:
            res = new FullScope([]);
            break;
    }
    return res;
};


// 单品范围
function SingleScope(item_barcode) {
    this.type = Scope.types.single;
    this.barcode = item_barcode;
}

SingleScope.prototype.isInRange = function (item) {
    return this.barcode == item.barcode;
};

SingleScope.prototype.GetLabel = function () {
    return this.barcode;
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
    return this.brand;
};


// 全场范围
function FullScope(exception_list) {
    this.type = Scope.types.full;
    this.exceptions = exception_list;
}

FullScope.prototype.isInRange = function (item) {
    return !_(this.exceptions).some(function (exception) {
        return item.barcode == exception
    });
};

/**
 * @return {string}
 */
FullScope.prototype.GetLabel = function () {
    return '$LabelOfFullScope';
};
