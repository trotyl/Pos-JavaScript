function Discount() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Discount.isInRange = function (discount, item) {
    return discount.scope.isInRange(item)
};

Discount.getPrice = function (discount, item) {
    var price = null;
    if (Discount.isInRange(discount, item)) {
        price = item.price * discount.rate;
    }
    else {
        price = item.price;
    }
    return price;
};

Discount.ValidateRate = function (rate) {
    if(rate < 0 || rate > 1){
        throw new RangeError("The rate of rate is out of range(0, 1)! It's " + rate);
    }
};


// 单品优惠
function SingleDiscount(rate, item_barcode) {
    Discount.ValidateRate(rate);
    this.scope = new SingleScope(item_barcode);
    this.rate = rate;
}


// 品牌优惠
function BrandDiscount(rate, brand_name) {
    Discount.ValidateRate(rate);
    this.scope = new BrandScope(brand_name);
    this.rate = rate;
}


// 全场优惠
function FullDiscount(rate, exception_list) {
    Discount.ValidateRate(rate);
    this.scope = new FullScope(exception_list);
    this.rate = rate;
}
