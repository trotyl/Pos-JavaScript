function BenefitFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function SingleBenefitFactory() {}


SingleBenefitFactory.prototype.GetDiscount = function (name, keep, rate) {
    rate = rate || 0.95;
    return new Discount(rate, new SingleScope(name), keep);
};

SingleBenefitFactory.prototype.GetPromotion = function (name, keep, to) {
    to = to || 5;
    return new Promotion(100, to, new SingleScope(name), keep);
};


function BrandBenefitFactory() {}

BrandBenefitFactory.prototype.GetDiscount = function (brand, keep, rate) {
    rate = rate || 0.9;
    return new Discount(rate, new BrandScope(brand), keep);
};

BrandBenefitFactory.prototype.GetPromotion = function (brand, keep, to) {
    to = to || 2;
    return new Promotion(100, to, new BrandScope(brand), keep);
};


function FullBenefitFactory() {}

FullBenefitFactory.prototype.GetDiscount = function (exceptions, keep, rate) {
    rate = rate || 0.9;
    return new Discount(rate, new FullScope(exceptions), keep);
};

FullBenefitFactory.prototype.GetPromotion = function (exceptions, keep, to) {
    to = to || 3;
    return new Promotion(100, to, new FullScope(exceptions), keep);
};
