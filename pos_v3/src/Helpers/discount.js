function Discount(rate, scope, keep) {
    Discount.Validate(rate);
    this.type = Benefit.types.discount;
    this.rate = rate;
    this.scope = scope;
    this.keep = keep;
}

Discount.Validate = function (rate) {
    if(rate < 0 || rate > 1){
        throw new RangeError("The rate of rate is out of range(0, 1)! It's " + rate);
    }
};

