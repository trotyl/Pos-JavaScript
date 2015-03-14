// The abstract class of StrategyFactory, it should not be instantiated.
function StrategyFactory() {
}

StrategyFactory.output = function (result, formatter, logger) {
    var prettyItems = _.map(result.items, Convertor.PrettifyItem);
    var prettyBenefits = _.chain(result.benefits)
        .map(Convertor.PrettifyBenefit)
        .filter(function (benefit) {
            return benefit.reduction > 0;
        })
        .value();
    var prettifySummary = Convertor.PrettifySummary(result.items, result.benefits);

    var res = formatter.format(prettyItems, prettyBenefits, prettifySummary);
    logger.log(res);
};

StrategyFactory.GetStrategy = function (number) {
    var map = {
        1: FirstStrategyFactory,
        2: SecondStrategyFactory,
        3: ThirdStrategyFactory,
        4: FourthStrategyFactory
    };
    if(!map[number]){
        throw new Error('Invalid number: ' + number);
    }
    return new map[number]().GetStrategy();
};
