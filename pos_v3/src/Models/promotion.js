function Promotion() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

Promotion.types = {
    single: 0,
    brand: 1,
    full: 2
};

Promotion.getPrice = function (promotion, item) {
    var price = null;
    if (promotion.isInPromotion(item)) {
        price = item.price * promotion.discount;
    }
    else {
        price = item.price;
    }
    return price;
};

Promotion.ValidateDiscount = function (discount) {
    if(discount < 0 && discount > 1){
        throw new RangeError("The DISCOUNT of promotion is out of range(0, 1)! It's " + discount);
    }
};


// 单品优惠
function SinglePromotion(discount, item_barcode) {
    Promotion.ValidateDiscount(discount);
    this.type = Promotion.types.single;
    this.discount = discount;
    this.barcode = item_barcode;
}

SinglePromotion.prototype.isInPromotion = function (item) {
    return this.barcode == item.barcode;
};


// 品牌优惠
function BrandPromotion(discount, brand_name) {
    Promotion.ValidateDiscount(discount);
    this.type = Promotion.types.brand;
    this.discount = discount;
    this.brand = brand_name;
}

BrandPromotion.prototype.isInPromotion = function (item) {
    return this.brand == item.brand;
};


// 全场优惠
function FullPromotion(discount, exception_list) {
    Promotion.ValidateDiscount(discount);
    this.type = Promotion.types.full;
    this.discount = discount;
    this.exceptions = exception_list;
}

FullPromotion.prototype.isInPromotion = function (item) {
    return !_(this.exceptions).some(function (exception) {
        return item.barcode == exception
    });
};
