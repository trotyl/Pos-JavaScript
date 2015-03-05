function Discount() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Discount.types = {
    single: 0,
    brand: 1,
    full: 2
};

Discount.getPrice = function (discount, item) {
    var price = null;
    if (discount.isInRange(item)) {
        price = item.price * discount.discount;
    }
    else {
        price = item.price;
    }
    return price;
};

Discount.ValidateRate = function (rate) {
    if(rate < 0 || rate > 1){
        throw new RangeError("The rate of discount is out of range(0, 1)! It's " + rate);
    }
};


// 单品优惠
function SingleDiscount(rate, item_barcode) {
    Discount.ValidateRate(rate);
    this.type = Discount.types.single;
    this.discount = rate;
    this.barcode = item_barcode;
}

SingleDiscount.prototype.isInRange = function (item) {
    return this.barcode == item.barcode;
};


// 品牌优惠
function BrandDiscount(rate, brand_name) {
    Discount.ValidateRate(rate);
    this.type = Discount.types.brand;
    this.discount = rate;
    this.brand = brand_name;
}

BrandDiscount.prototype.isInRange = function (item) {
    return this.brand == item.brand;
};


// 全场优惠
function FullDiscount(rate, exception_list) {
    Discount.ValidateRate(rate);
    this.type = Discount.types.full;
    this.discount = rate;
    this.exceptions = exception_list;
}

FullDiscount.prototype.isInRange = function (item) {
    return !_(this.exceptions).some(function (exception) {
        return item.barcode == exception
    });
};
