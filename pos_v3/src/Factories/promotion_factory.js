function PromotionFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function SinglePromotionFactory() {}


SinglePromotionFactory.prototype.GetPromotion = function (name, keep) {
    keep = keep || true;
    return new Promotion(100, 5, new SingleScope(name), keep);
};

function BrandPromotionFactory() {}

BrandPromotionFactory.prototype.GetPromotion = function (brand, keep) {
    keep = keep || true;
    return new Promotion(100, 2, new BrandScope(brand), keep);
};

function FullPromotionFactory() {}

FullPromotionFactory.prototype.GetPromotion = function (exceptions, keep) {
    keep = keep || true;
    return new Promotion(100, 3, new FullScope(exceptions), keep);
};
