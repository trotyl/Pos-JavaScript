// The derived class of Benefit for the type of Promotion.
function Promotion(from, to, scope, keep) {
    Promotion.validate(from, to);
    this.type = Benefit.types.promotion;
    this.from = from;
    this.to = to;
    this.scope = scope;
    this.keep = keep;
}

Promotion.prototype = new Benefit();

// validate whether the promotion conditions is in range.
Promotion.validate = function (from, reduction) {
    if(from < 0 || reduction < 0 || from < reduction){
        throw new RangeError("The promotion condition is illegal");
    }
};
