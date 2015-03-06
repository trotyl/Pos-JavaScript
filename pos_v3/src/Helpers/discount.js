function Discount(rate, scope) {
    Discount.ValidateRate(rate);
    this.rate = rate;
    this.scope = scope;
}

Discount.prototype.getPrice = function (item) {
    var price = null;
    if (this.scope.isInRange(item)) {
        price = item.price * this.rate;
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

