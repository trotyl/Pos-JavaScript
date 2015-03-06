function Promotion(from, reduction, scope) {
    Discount.ValidateParams(from, reduction);
    this.from = from;
    this.reduction = reduction;
    this.scope = scope;
}

Discount.ValidateParams = function (from, reduction) {
    if(from < 0 || reduction < 0 || from < reduction){
        throw new RangeError("The promotion condition is illegal");
    }
};

