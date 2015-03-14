// The abstract class of BenefitFactory, it should not be instantiated.
function BenefitFactory() {
    throw new Error('Static class can not be instanced.');
}


// The derived class of BenefitFactory for the single item benefit.
function SingleBenefitFactory() {
}

// The factory method to generate the Discount object of the single item benefit.
SingleBenefitFactory.prototype.getDiscount = function (name, keep, rate) {
    rate = rate || 0.95;
    return new Discount(rate, new SingleScope(name), keep);
};

// The factory method to generate the Promotion object of the single item benefit.
SingleBenefitFactory.prototype.getPromotion = function (name, keep, to) {
    to = to || 5;
    return new Promotion(100, to, new SingleScope(name), keep);
};


// The derived class of BenefitFactory for the brand items benefit.
function BrandBenefitFactory() {
}

// The factory method to generate the Discount object of the brand items benefit.
BrandBenefitFactory.prototype.getDiscount = function (brand, keep, rate) {
    rate = rate || 0.9;
    return new Discount(rate, new BrandScope(brand), keep);
};

// The factory method to generate the Promotion object of the brand items benefit.
BrandBenefitFactory.prototype.getPromotion = function (brand, keep, to) {
    to = to || 2;
    return new Promotion(100, to, new BrandScope(brand), keep);
};


// The derived class of BenefitFactory for the full items benefit.
function FullBenefitFactory() {
}

// The factory method to generate the Discount object of the full items benefit.
FullBenefitFactory.prototype.getDiscount = function (exceptions, keep, rate) {
    rate = rate || 0.9;
    return new Discount(rate, new FullScope(exceptions), keep);
};

// The factory method to generate the Promotion object of the full items benefit.
FullBenefitFactory.prototype.getPromotion = function (exceptions, keep, to) {
    to = to || 3;
    return new Promotion(100, to, new FullScope(exceptions), keep);
};
