function PromotionFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function SinglePromotionFactory() {}


SinglePromotionFactory.prototype.GetPromotion = function (barcode) {
    return new Promotion(100, 5, new SingleScope(barcode));
};

function BrandPromotionFactory() {}

BrandPromotionFactory.prototype.GetPromotion = function (brand) {
    return new Promotion(100, 2, new BrandScope(brand));
};

function FullPromotionFactory() {}

FullPromotionFactory.prototype.GetPromotion = function (exceptions) {
    return new Promotion(100, 3, new FullScope(exceptions));
};
