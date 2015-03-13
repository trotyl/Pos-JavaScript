function StrategyFactory() {
    // This method should never be called.
    throw new Error('Static class can not be instanced.');
}

function FirstStrategyFactory() {}

FirstStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('可口可乐350ml');
    var scope2 = new SingleScope('康师傅方便面');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.9, scope0, true),
            new Discount(0.95, scope1, true)
        ],
        [
            new FullPromotionFactory().GetPromotion([scope0, scope1, scope2])
        ],
        {
            0x03: 0x02
        }
    )
};

function SecondStrategyFactory() {}

SecondStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('可口可乐350ml');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.9, scope0, true),
            new Discount(0.95, scope1, true)
        ],
        [
            new SinglePromotionFactory().GetPromotion('云山荔枝'),
            new BrandPromotionFactory().GetPromotion('康师傅'),
        ],
        {
            0x03: 0x01
        }
    )
};

function ThirdStrategyFactory() {}

ThirdStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('可口可乐350ml');
    var scope2 = new SingleScope('云山苹果');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.95, scope1, false),
            new Discount(0.9, scope0, false)
        ],
        [
            new BrandPromotionFactory().GetPromotion('康师傅'),
            new FullPromotionFactory().GetPromotion([scope2])
        ],
        {
            0x03: 0x03
        }
    )
};

function FourthStrategyFactory() {}

FourthStrategyFactory.prototype.GetStrategy = function () {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('可口可乐350ml');
    var scope2 = new SingleScope('雪碧');
    return new Strategy(
        loadAllItems(),
        [
            new Discount(0.95, scope1, true),
            new Discount(0.9, scope0, true),
            new Discount(0.9, new FullScope([]), true)
        ],
        [
            new SinglePromotionFactory().GetPromotion('果粒橙'),
            new BrandPromotionFactory().GetPromotion('云山'),
            new FullPromotionFactory().GetPromotion([scope2])
        ],
        {
            0x03: 0x03
        },
        true
    )
};