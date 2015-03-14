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
            new BrandBenefitFactory().GetDiscount('可口可乐', true),
            new SingleBenefitFactory().GetDiscount('可口可乐350ml', true),
            new FullBenefitFactory().GetPromotion([scope0, scope1, scope2], true)
        ],
        {
            0x01: {0x03: 0x02, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};

function SecondStrategyFactory() {}

SecondStrategyFactory.prototype.GetStrategy = function () {
    return new Strategy(
        loadAllItems(),
        [
            new SingleBenefitFactory().GetDiscount('可口可乐350ml', true),
            new BrandBenefitFactory().GetDiscount('可口可乐', true),
            new BrandBenefitFactory().GetPromotion('康师傅', true),
            new SingleBenefitFactory().GetPromotion('云山荔枝', true)
        ],
        {
            0x01: {0x03: 0x01, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};

function ThirdStrategyFactory() {}

ThirdStrategyFactory.prototype.GetStrategy = function () {
    var scope2 = new SingleScope('云山苹果');
    return new Strategy(
        loadAllItems(),
        [
            new SingleBenefitFactory().GetDiscount('可口可乐350ml', false),
            new BrandBenefitFactory().GetDiscount('可口可乐', false),
            new BrandBenefitFactory().GetPromotion('康师傅', false),
            new FullBenefitFactory().GetPromotion([scope2], false, 5)
        ],
        {
            0x01: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};

function FourthStrategyFactory() {}

FourthStrategyFactory.prototype.GetStrategy = function () {
    var scope2 = new SingleScope('雪碧');
    return new Strategy(
        loadAllItems(),
        [
            new SingleBenefitFactory().GetDiscount('可口可乐350ml', true),
            new BrandBenefitFactory().GetDiscount('可口可乐', true),
            new SingleBenefitFactory().GetPromotion('果粒橙', true),
            new BrandBenefitFactory().GetPromotion('云山', true),
            new FullBenefitFactory().GetDiscount([scope2], false)
        ],
        {
            0x01: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};