describe('Discount: ', function () {

    var item0 = new Item('ITEM000000', '饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00);
    var item1 = new Item('ITEM000010', '饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00);
    var item2 = new Item('ITEM000003', '水果', '云山', '云山荔枝', '斤', 15.00);

    beforeEach(function () {

    });

    it('Itself should not be able to instanced.', function () {
        var fun = function () {
            return new Discount();
        };
        expect(fun).toThrow();
    });

    it('should be able to get the correct price of item', function () {
        var promotion = {
            discount: 0.5,
            isInRange: function () {
                return true;
            }
        };
        expect(Discount.getPrice(promotion, item0)).toEqual(1.50);
        spyOn(promotion, 'isInRange').and.returnValue(false);
        expect(Discount.getPrice(promotion, item0)).toEqual(3.00);
    });

    describe('SingleDiscount ', function () {
        var promotion;

        beforeEach(function () {
            promotion = new SingleDiscount(0.5, 'ITEM000000');
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.type).toEqual(Discount.types.single);
            expect(promotion.discount).toEqual(0.5);
            expect(promotion.barcode).toEqual('ITEM000000');
        });

        it('should throw error if the discount is incorrect.', function () {
            var fun1 = function () {
                return new SingleDiscount(-1, 'ITEM000000');
            };
            var fun2 = function () {
                return new SingleDiscount(2, 'ITEM000000');
            };
            var fun3 = function () {
                return new SingleDiscount(1, 'ITEM000000')
            };
            expect(fun1).toThrow();
            expect(fun2).toThrow();
            expect(fun3).not.toThrow();
        });

        it('should be able to check if a item is in promotion.', function () {
            expect(promotion.isInRange(item0)).toBeTruthy();
            expect(promotion.isInRange(item1)).toBeFalsy();
            expect(promotion.isInRange(item2)).toBeFalsy();
        });

    });


    describe('BrandDiscount ', function () {
        var promotion;

        beforeEach(function () {
            promotion = new BrandDiscount(0.5, '可口可乐');
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.type).toEqual(Discount.types.brand);
            expect(promotion.discount).toEqual(0.5);
            expect(promotion.brand).toEqual('可口可乐');
        });

        it('should throw error if the discount is incorrect.', function () {
            var fun1 = function () {
                return new BrandDiscount(-1, '可口可乐');
            };
            var fun2 = function () {
                return new BrandDiscount(2, '可口可乐');
            };
            var fun3 = function () {
                return new BrandDiscount(1, '可口可乐')
            };
            expect(fun1).toThrow();
            expect(fun2).toThrow();
            expect(fun3).not.toThrow();
        });

        it('should be able to check if a item is in promotion.', function () {
            expect(promotion.isInRange(item0)).toBeTruthy();
            expect(promotion.isInRange(item1)).toBeTruthy();
            expect(promotion.isInRange(item2)).toBeFalsy();
        });

    });


    describe('FullDiscount ', function () {
        var promotion;

        beforeEach(function () {
            var exception_list = [item0.barcode, item1.barcode];
            promotion = new FullDiscount(0.5, exception_list);
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.type).toEqual(Discount.types.full);
            expect(promotion.discount).toEqual(0.5);
            expect(promotion.exceptions.length).toEqual(2);
        });

        it('should throw error if the discount is incorrect.', function () {
            var fun1 = function () {
                return new FullDiscount(-1, '可口可乐');
            };
            var fun2 = function () {
                return new FullDiscount(2, '可口可乐');
            };
            var fun3 = function () {
                return new FullDiscount(1, '可口可乐')
            };
            expect(fun1).toThrow();
            expect(fun2).toThrow();
            expect(fun3).not.toThrow();
        });

        it('should be able to check if a item is in promotion.', function () {
            expect(promotion.isInRange(item0)).toBeFalsy();
            expect(promotion.isInRange(item1)).toBeFalsy();
            expect(promotion.isInRange(item2)).toBeTruthy();
        });

    });
});
