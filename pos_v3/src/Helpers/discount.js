// The derived class of Benefit for the type of Discount.
function Discount(rate, scope, keep) {
    Discount.validate(rate);
    this.type = Benefit.types.discount;
    this.rate = rate;
    this.scope = scope;
    this.keep = keep;
}

Discount.prototype = new Benefit();

// validate whether the discount rate is in range.
Discount.validate = function (rate) {
    if(rate < 0 || rate > 1){
        throw new RangeError("The rate of rate is out of range(0, 1)! It's " + rate);
    }
};
