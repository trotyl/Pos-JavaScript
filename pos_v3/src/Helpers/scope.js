function Scope(){
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Scope.types = {
    single: 0,
    brand: 1,
    full: 2
};


// 单品范围
function SingleScope(item_barcode) {
    this.type = Scope.types.single;
    this.barcode = item_barcode;
}

SingleScope.prototype.isInRange = function (item) {
    return this.barcode == item.barcode;
};


// 品牌范围
function BrandScope(brand_name) {
    this.type = Scope.types.brand;
    this.brand = brand_name;
}

BrandScope.prototype.isInRange = function (item) {
    return this.brand == item.brand;
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
