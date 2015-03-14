// The derived class of StrategyFactory for the second strategy.
function SecondStrategyFactory() {
}

SecondStrategyFactory.prototype = new StrategyFactory();

// The factory method to generate the second strategy.
SecondStrategyFactory.prototype.getStrategy = function () {
    // Return the exact Strategy object meet the second strategy.
    return new Strategy(
        loadAllItems(),
        [
            new SingleBenefitFactory().getDiscount('可口可乐350ml', true),
            new BrandBenefitFactory().getDiscount('可口可乐', true),
            new BrandBenefitFactory().getPromotion('康师傅', true),
            new SingleBenefitFactory().getPromotion('云山荔枝', true)
        ],
        {
            0x01: {0x03: 0x01, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};
