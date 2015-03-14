// The portal of the application.
// 'input' is a object with the key of barcode and value of amount.
// 'number' is the number of strategy to select, from 1 to 4, defaults to 1.
// 'output' is the object with a 'log' method, defaults to 'console'.
function printInventory(input, number, output) {
    // Check whether to use default parameter.
    number = number || 1;
    output = output || console;

    // Get the Strategy from the StrategyFactory.
    var strategy = StrategyFactory.GetStrategy(number);

    // Call the GenerateResult method to run the Strategy.
    var result = strategy.GenerateResult(input);
    StrategyFactory.output(result, new Formatter(), output)
}
