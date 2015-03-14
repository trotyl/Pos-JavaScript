// The abstract class of StrategyFactory, it should not be instantiated.
function StrategyFactory() {
}

StrategyFactory.output = function (result, formatter, logger) {
    var prettyItems = Peeler.PrettifyItems(result.items);
    var prettyBenefits = Peeler.PrettifyBenefits(result.benefits);
    var prettifySummary = Peeler.PrettifySummary(result.items, result.benefits);

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
