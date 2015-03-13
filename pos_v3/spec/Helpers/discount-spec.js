describe('Discount: ', function () {

    var item ,discount, scope;

    beforeEach(function () {
        item = {price: 3.00};
        scope = {
            isInRange: function () {
                return true;
            }
        };
        discount = new Discount(0.5, scope);
    });

    it('should be able to constructed correctly.', function () {
        expect(discount.rate).toEqual(0.5);
        expect(discount.scope).toEqual(scope);
    });

    it('should throw error if the rate is incorrect.', function () {
        var fun1 = function () {
            return new Discount(-1, scope);
        };
        var fun2 = function () {
            return new Discount(2, scope);
        };
        var fun3 = function () {
            return new Discount(1, scope)
        };
        expect(fun1).toThrow();
        expect(fun2).toThrow();
        expect(fun3).not.toThrow();
    });

});
