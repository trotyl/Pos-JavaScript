describe('Promotion: ', function () {

    var item0 = new Item('ITEM000000','饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00);
    var item1 = new Item('ITEM000001','饮料', '百事', '雪碧', '瓶', 3.00);
    var item2 = new Item('ITEM000003','水果', '云山', '云山荔枝', '斤', 15.00);

    beforeEach(function () {

    });

    it('Itself should not be able to instanced.', function () {
        var fun = function () {
            return new Promotion();
        };
        expect(fun).toThrow();
    });

    describe('SinglePromotion ', function () {
        var promotion;

        beforeEach(function () {
            promotion = new SinglePromotion(0.5, 'ITEM000000');
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.type).toEqual(Promotion.types.single);
            expect(promotion.discount).toEqual(0.5);
            expect(promotion.barcode).toEqual('ITEM000000');
        });

        it('should throw error if the discount is incorrect.', function () {
            var fun1 = function () {
                return new SinglePromotion(-1, 'ITEM000000');
            };
            var fun2 = function () {
                return new SinglePromotion(2, 'ITEM000000');
            };
            var fun3 = function () {
                return new SinglePromotion(1, 'ITEM000000')
            };
            expect(fun1).toThrow();
            expect(fun2).toThrow();
            expect(fun3).not.toThrow();
        });



        it('should be able to check if a item is in promotion.')
    });

});
