// The derived class of StrategyFactory for the third strategy.
function ThirdStrategyFactory() {
}

ThirdStrategyFactory.prototype = new StrategyFactory();

// The factory method to generate the third strategy.
ThirdStrategyFactory.prototype.getStrategy = function () {
    var scope2 = new SingleScope('云山苹果');

    // Return the exact Strategy object meet the third strategy.
    return new Strategy(
        loadAllItems(),
        [
            new SingleBenefitFactory().getDiscount('可口可乐350ml', false),
            new BrandBenefitFactory().getDiscount('可口可乐', false),
            new BrandBenefitFactory().getPromotion('康师傅', false),
            new FullBenefitFactory().getPromotion([scope2], false, 5)
        ],
        {
            0x01: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};
