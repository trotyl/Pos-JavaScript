// The static class of BenefitFactory, it should not be instantiated.
function BenefitFactory() {
}

// The factory method to generate the Discount object of the single item benefit.
BenefitFactory.getSingleDiscount = function (name, keep, rate) {
    return new Discount(rate || 0.95, new SingleScope(name), keep);
};

// The factory method to generate the Discount object of the brand items benefit.
BenefitFactory.getBrandDiscount = function (brand, keep, rate) {
    return new Discount(rate || 0.9, new BrandScope(brand), keep);
};

// The factory method to generate the Discount object of the full items benefit.
BenefitFactory.getFullDiscount = function (exceptions, keep, rate) {
    return new Discount(rate || 0.9, new FullScope(exceptions), keep);
};

// The factory method to generate the Promotion object of the single item benefit.
BenefitFactory.getSinglePromotion = function (name, keep, to) {
    return new Promotion(100, to || 5, new SingleScope(name), keep);
};

// The factory method to generate the Promotion object of the brand items benefit.
BenefitFactory.getBrandPromotion = function (brand, keep, to) {
    return new Promotion(100, to || 2, new BrandScope(brand), keep);
};

// The factory method to generate the Promotion object of the full items benefit.
BenefitFactory.getFullPromotion = function (exceptions, keep, to) {
    return new Promotion(100, to || 3, new FullScope(exceptions), keep);
};
