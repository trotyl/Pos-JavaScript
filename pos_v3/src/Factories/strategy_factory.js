function StrategyFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function FirstStrategyFactory() {}

FirstStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('ITEM000000');
    var scope2 = new SingleScope('康师傅方便面');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.9, scope0),
            new Discount(0.95, scope1)
        ],
        [
            new FullPromotionFactory().GetPromotion([scope0, scope1, scope2])
        ],
        {
            3: 2
        },
        false
    )
};

function SecondStrategyFactory() {}

SecondStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('ITEM000000');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.9, scope0),
            new Discount(0.95, scope1)
        ],
        [
            new SinglePromotionFactory().GetPromotion('ITEM000003'),
            new BrandPromotionFactory().GetPromotion('康师傅'),
            new FullPromotionFactory().GetPromotion([scope0, scope1])
        ],
        {
            3: 1
        },
        false
    )
};

function ThirdStrategyFactory() {}

ThirdStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('ITEM000000');
    var scope2 = new SingleScope('ITEM000002');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.95, scope1),
            new Discount(0.9, scope0)
        ],
        [
            new BrandPromotionFactory().GetPromotion('康师傅'),
            new FullPromotionFactory().GetPromotion([scope2])
        ],
        {
            3: 3
        },
        false
    )
};

function FourthStrategyFactory() {}

FourthStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('ITEM000000');
    var scope2 = new SingleScope('ITEM000001');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.95, scope1),
            new Discount(0.9, scope0)
        ],
        [
            new SinglePromotionFactory().GetPromotion('ITEM000007'),
            new BrandPromotionFactory().GetPromotion('云山'),
            new FullPromotionFactory().GetPromotion([scope2])
        ],
        {
            3: 3
        },
        true
    )
};