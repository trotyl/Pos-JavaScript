describe('Strategy: ', function () {
    var strategy;

    beforeEach(function () {
        strategy = new Strategy([], [], [], {})
    });

    it('should be able to constructed correctly.', function () {

    });

    xdescribe(' ', function () {
        var scope;

        beforeEach(function () {
            scope = new SingleScope('可口可乐350ml');
        });

        it('should be able to constructed correctly.', function () {
            expect(scope.type).toEqual(Scope.types.single);
            expect(scope.name).toEqual('可口可乐350ml');
        });

        it('should be able to check if a item is in discount.', function () {
            expect(scope.isInRange(item0)).toBeTruthy();
            expect(scope.isInRange(item1)).toBeFalsy();
            expect(scope.isInRange(item2)).toBeFalsy();
        });

    });


    xdescribe('BrandScope ', function () {
        var scope;

        beforeEach(function () {
            scope = new BrandScope('可口可乐');
        });

        it('should be able to constructed correctly.', function () {
            expect(scope.type).toEqual(Scope.types.brand);
            expect(scope.brand).toEqual('可口可乐');
        });

        it('should be able to check if a item is in discount.', function () {
            expect(scope.isInRange(item0)).toBeTruthy();
            expect(scope.isInRange(item1)).toBeTruthy();
            expect(scope.isInRange(item2)).toBeFalsy();
        });

    });


    xdescribe('FullScope ', function () {
        var scope;

        beforeEach(function () {
            var exceptions = [new BrandScope('可口可乐')];
            scope = new FullScope(exceptions);
        });

        it('should be able to constructed correctly.', function () {
            expect(scope.type).toEqual(Scope.types.full);
            expect(scope.exceptions.length).toEqual(1);
        });

        it('should be able to check if a item is in scope.', function () {
            expect(scope.isInRange(item0)).toBeFalsy();
            expect(scope.isInRange(item1)).toBeFalsy();
            expect(scope.isInRange(item2)).toBeTruthy();
        });

    });
});
