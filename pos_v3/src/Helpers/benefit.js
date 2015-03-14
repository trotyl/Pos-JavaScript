function Benefit(){
}

Benefit.types = {
    discount: 0x01,
    promotion: 0x02
};


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


function Promotion(from, to, scope, keep) {
    Promotion.Validate(from, to);
    this.type = Benefit.types.promotion;
    this.from = from;
    this.to = to;
    this.scope = scope;
    this.keep = keep;
}

Promotion.Validate = function (from, reduction) {
    if(from < 0 || reduction < 0 || from < reduction){
        throw new RangeError("The promotion condition is illegal");
    }
};
