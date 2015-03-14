// The derived class of StrategyFactory for the first strategy.
function FirstStrategyFactory() {
}

FirstStrategyFactory.prototype = new StrategyFactory();

// The factory method to generate the first strategy.
FirstStrategyFactory.prototype.getStrategy = function () {
    // The scopes for the sake of FullScope condition.
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('可口可乐350ml');
    var scope2 = new SingleScope('康师傅方便面');

    // Return the exact Strategy object meet the first strategy.
    return new Strategy(
        loadAllItems(),
        [
            new BrandBenefitFactory().getDiscount('可口可乐', true),
            new SingleBenefitFactory().getDiscount('可口可乐350ml', true),
            new FullBenefitFactory().getPromotion([scope0, scope1, scope2], true)
        ],
        {
            0x01: {0x03: 0x02, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};
