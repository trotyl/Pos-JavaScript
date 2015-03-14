// The derived class of StrategyFactory for the fourth strategy.
function FourthStrategyFactory() {
}

FourthStrategyFactory.prototype = new StrategyFactory();

// The factory method to generate the third strategy.
FourthStrategyFactory.prototype.getStrategy = function () {
    var scope2 = new SingleScope('雪碧');

    // Return the exact Strategy object meet the third strategy.
    return new Strategy(
        loadAllItems(),
        [
            new SingleBenefitFactory().getDiscount('可口可乐350ml', true),
            new BrandBenefitFactory().getDiscount('可口可乐', true),
            new SingleBenefitFactory().getPromotion('果粒橙', true),
            new BrandBenefitFactory().getPromotion('云山', true),
            new FullBenefitFactory().getDiscount([scope2], false)
        ],
        {
            0x01: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    )
};
