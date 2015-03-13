describe('Pos ', function () {
    var input, number, output;

    beforeEach(function () {
        output = {
            log: null
        }
    });

    it('should print correct text on first strategy', function () {
        input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        number = 1;

        spyOn(output, 'log');
        printInventory(input, number, output);
        expect(output.log).toHaveBeenCalledWith('');

    });
});
