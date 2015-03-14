function PromotionFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function SinglePromotionFactory() {}


SinglePromotionFactory.prototype.GetPromotion = function (name, keep, to) {
    keep = keep || true;
    to = to || 5;
    return new Promotion(100, to, new SingleScope(name), keep);
};

function BrandPromotionFactory() {}

BrandPromotionFactory.prototype.GetPromotion = function (brand, keep, to) {
    keep = keep || true;
    to = to || 2;
    return new Promotion(100, to, new BrandScope(brand), keep);
};

function FullPromotionFactory() {}

FullPromotionFactory.prototype.GetPromotion = function (exceptions, keep, to) {
    keep = keep || true;
    to = to || 3;
    return new Promotion(100, to, new FullScope(exceptions), keep);
};
