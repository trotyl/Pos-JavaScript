// The static class of StrategyFactory, it should not be instantiated.
function StrategyFactory() {
}

StrategyFactory.output = function (result, formatter, logger) {
    var prettyItems = _.map(result.items, Convertor.prettifyItem);
    var prettyBenefits = _.chain(result.benefits)
        .map(Convertor.prettifyBenefit)
        .filter(function (benefit) {
            return benefit.reduction > 0;
        })
        .value();
    var prettifySummary = Convertor.prettifySummary(result.items, result.benefits);

    var res = formatter.format(prettyItems, prettyBenefits, prettifySummary);
    logger.log(res);
};

StrategyFactory.getStrategy = function (number) {
    var scope0 = new BrandScope('可口可乐');
    var scope1 = new SingleScope('可口可乐350ml');
    var scope2 = new SingleScope('康师傅方便面');
    var scope3 = new SingleScope('云山苹果');
    var scope4 = new SingleScope('雪碧');

    var benefitsMap = {
        1: [
            BenefitFactory.getBrandDiscount('可口可乐', true),
            BenefitFactory.getSingleDiscount('可口可乐350ml', true),
            BenefitFactory.getFullPromotion([scope0, scope1, scope2], true)
        ],
        2: [
            BenefitFactory.getSingleDiscount('可口可乐350ml', true),
            BenefitFactory.getBrandDiscount('可口可乐', true),
            BenefitFactory.getBrandPromotion('康师傅', true),
            BenefitFactory.getSinglePromotion('云山荔枝', true)
        ],
        3: [
            BenefitFactory.getSingleDiscount('可口可乐350ml', false),
            BenefitFactory.getBrandDiscount('可口可乐', false),
            BenefitFactory.getBrandPromotion('康师傅', false),
            BenefitFactory.getFullPromotion([scope3], false, 5)
        ],
        4: [
            BenefitFactory.getSingleDiscount('可口可乐350ml', true),
            BenefitFactory.getBrandDiscount('可口可乐', true),
            BenefitFactory.getSinglePromotion('果粒橙', true),
            BenefitFactory.getBrandPromotion('云山', true),
            BenefitFactory.getFullDiscount([scope4], false)
        ]
    };

    var mutualMap = {
        1: {
            0x01: {0x03: 0x02, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        },

        2: {
            0x01: {0x03: 0x01, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        },
        3: {
            0x01: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        },
        4: {
            0x01: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07},
            0x02: {0x03: 0x03, 0x05: 0x05, 0x06: 0x06, 0x07: 0x07}
        }
    };
    if (!benefitsMap[number] || !mutualMap[number]) {
        throw new Error('Invalid number: ' + number);
    }
    return new Strategy(loadAllItems(), benefitsMap[number], mutualMap[number]);
};
