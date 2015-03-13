function printInventory(input, number, output) {
    number = number || 1;
    output = output || console;
    var strategyFactory;
    switch (number) {
        case 1:
            strategyFactory = new FirstStrategyFactory();
            break;
        case 2:
            strategyFactory = new SecondStrategyFactory();
            break;
        case 3:
            strategyFactory = new ThirdStrategyFactory();
            break;
        case 4:
            strategyFactory = new FourthStrategyFactory();
            break;
        default :
            throw new Error('Invalid number: ' + number);
    }
    var strategy = strategyFactory.GetStrategy();
    strategy.GenerateResult(input, new Formatter(), output);
}
