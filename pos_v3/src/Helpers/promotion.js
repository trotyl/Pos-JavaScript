function Promotion(from, to, scope, keep) {
    Promotion.Validate(from, to);
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

