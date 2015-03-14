// The abstract class of BenefitFactory, it should not be instantiated.
function BenefitFactory() {
    throw new Error('Static class can not be instanced.');
}


// The derived class of BenefitFactory for the single item benefit.
function SingleBenefitFactory() {
}

// The factory method to generate the Discount object of the single item benefit.
SingleBenefitFactory.prototype.GetDiscount = function (name, keep, rate) {
    rate = rate || 0.95;
    return new Discount(rate, new SingleScope(name), keep);
};

// The factory method to generate the Promotion object of the single item benefit.
SingleBenefitFactory.prototype.GetPromotion = function (name, keep, to) {
    to = to || 5;
    return new Promotion(100, to, new SingleScope(name), keep);
};


// The derived class of BenefitFactory for the brand items benefit.
function BrandBenefitFactory() {
}

// The factory method to generate the Discount object of the brand items benefit.
BrandBenefitFactory.prototype.GetDiscount = function (brand, keep, rate) {
    rate = rate || 0.9;
    return new Discount(rate, new BrandScope(brand), keep);
};

// The factory method to generate the Promotion object of the brand items benefit.
BrandBenefitFactory.prototype.GetPromotion = function (brand, keep, to) {
    to = to || 2;
    return new Promotion(100, to, new BrandScope(brand), keep);
};


// The derived class of BenefitFactory for the full items benefit.
function FullBenefitFactory() {
}

// The factory method to generate the Discount object of the full items benefit.
FullBenefitFactory.prototype.GetDiscount = function (exceptions, keep, rate) {
    rate = rate || 0.9;
    return new Discount(rate, new FullScope(exceptions), keep);
};

// The factory method to generate the Promotion object of the full items benefit.
FullBenefitFactory.prototype.GetPromotion = function (exceptions, keep, to) {
    to = to || 3;
    return new Promotion(100, to, new FullScope(exceptions), keep);
};
