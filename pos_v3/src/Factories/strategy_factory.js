function StrategyFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function FirstStrategyFactory() {}

FirstStrategyFactory.prototype.GetStrategy = function () {
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.9, new BrandScope('可口可乐')),
            new Discount(0.95, new SingleScope('ITEM000000')),
        ],
        [

        ]
    )
};

function SecondStrategyFactory() {}

SecondStrategyFactory.prototype.GetStrategy = function (brand) {
    return new Promotion(100, 2, new BrandScope(brand));
};

function ThirdStrategyFactory() {}

ThirdStrategyFactory.prototype.GetStrategy = function (exceptions) {
    return new Promotion(100, 3, new FullScope(exceptions));
};

function FourthStrategyFactory() {}

FourthStrategyFactory.prototype.GetStrategy = function (exceptions) {
    return new Promotion(100, 3, new FullScope(exceptions));
};