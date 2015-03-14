describe('Benefit: ', function () {

    beforeEach(function () {

    });

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    it('should have two enum types', function () {
        expect(Object.size(Benefit.types)).toEqual(2);
    });

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

    describe('Promotion: ', function () {

        var item ,promotion, scope;

        beforeEach(function () {
            item = {price: 3.00};
            scope = {
                isInRange: function () {
                    return true;
                }
            };
            promotion = new Promotion(100, 2, scope);
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.from).toEqual(100);
            expect(promotion.to).toEqual(2);
            expect(promotion.scope).toEqual(scope);
        });

    });


});
