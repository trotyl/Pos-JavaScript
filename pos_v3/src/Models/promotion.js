function Promotion() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Promotion.types = {
    single: 0,
    brand: 1,
    full: 2
};


// 单品优惠
function SinglePromotion(item_barcode) {
    this.type = Promotion.types.single;
    this.barcode = item_barcode;
}

SinglePromotion.prototype.isInPromotion = function (item) {
    return this.barcode == item.barcode;
};


// 品牌优惠
function BrandPromotion(brand_name) {
    this.type = Promotion.types.brand;
    this.brand = brand_name;
}

BrandPromotion.prototype.isInPromotion = function (item) {
    return this.brand == item.brand;
};


// 全场优惠
function FullPromotion(exception_list) {
    this.type = Promotion.types.full;
    this.exceptions = exception_list;
}

FullPromotion.prototype.isInPromotion = function (item) {
    return _(this.exceptions).some(function (exception) {
        return item.barcode == exception
    });
};
