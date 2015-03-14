// The abstract class of Benefit, it should not be instantiated.
function Benefit(){
}

// The static enums for types of Benefit.
Benefit.types = {
    discount: 0x01,
    promotion: 0x02
};


// The derived class of Benefit for the type of Discount.
function Discount(rate, scope, keep) {

    Discount.Validate(rate);
    this.type = Benefit.types.discount;
    this.rate = rate;
    this.scope = scope;
    this.keep = keep;
}



// Validate whether the discount rate is in range.
Discount.Validate = function (rate) {
    if(rate < 0 || rate > 1){
        throw new RangeError("The rate of rate is out of range(0, 1)! It's " + rate);
    }
};


// The derived class of Benefit for the type of Promotion.
function Promotion(from, to, scope, keep) {
    Promotion.Validate(from, to);
    this.type = Benefit.types.promotion;
    this.from = from;
    this.to = to;
    this.scope = scope;
    this.keep = keep;
}

// Validate whether the promotion conditions is in range.
Promotion.Validate = function (from, reduction) {
    if(from < 0 || reduction < 0 || from < reduction){
        throw new RangeError("The promotion condition is illegal");
    }
};
