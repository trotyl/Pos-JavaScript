describe('Promotion: ', function () {

    var item0 = new Item('ITEM000000', '饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00);
    var item1 = new Item('ITEM000010', '饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00);
    var item2 = new Item('ITEM000003', '水果', '云山', '云山荔枝', '斤', 15.00);

    beforeEach(function () {

    });

    it('Itself should not be able to instanced.', function () {
        var fun = function () {
            return new Promotion();
        };
        expect(fun).toThrow();
    });

    it('should be able to get the correct price of item', function () {
        var promotion = {
            discount: 0.5,
            isInPromotion: function () {
                return true;
            }
        };
        expect(Promotion.getPrice(promotion, item0)).toEqual(1.50);
        spyOn(promotion, 'isInPromotion').and.returnValue(false);
        expect(Promotion.getPrice(promotion, item0)).toEqual(3.00);
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

        it('should be able to check if a item is in promotion.', function () {
            expect(promotion.isInPromotion(item0)).toBeTruthy();
            expect(promotion.isInPromotion(item1)).toBeFalsy();
            expect(promotion.isInPromotion(item2)).toBeFalsy();
        });

    });


    describe('BrandPromotion ', function () {
        var promotion;

        beforeEach(function () {
            promotion = new BrandPromotion(0.5, '可口可乐');
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.type).toEqual(Promotion.types.brand);
            expect(promotion.discount).toEqual(0.5);
            expect(promotion.brand).toEqual('可口可乐');
        });

        it('should throw error if the discount is incorrect.', function () {
            var fun1 = function () {
                return new BrandPromotion(-1, '可口可乐');
            };
            var fun2 = function () {
                return new BrandPromotion(2, '可口可乐');
            };
            var fun3 = function () {
                return new BrandPromotion(1, '可口可乐')
            };
            expect(fun1).toThrow();
            expect(fun2).toThrow();
            expect(fun3).not.toThrow();
        });

        it('should be able to check if a item is in promotion.', function () {
            expect(promotion.isInPromotion(item0)).toBeTruthy();
            expect(promotion.isInPromotion(item1)).toBeTruthy();
            expect(promotion.isInPromotion(item2)).toBeFalsy();
        });

    });


    describe('FullPromotion ', function () {
        var promotion;

        beforeEach(function () {
            var exception_list = [item0.barcode, item1.barcode];
            promotion = new FullPromotion(0.5, exception_list);
        });

        it('should be able to constructed correctly.', function () {
            expect(promotion.type).toEqual(Promotion.types.full);
            expect(promotion.discount).toEqual(0.5);
            expect(promotion.exceptions.length).toEqual(2);
        });

        it('should throw error if the discount is incorrect.', function () {
            var fun1 = function () {
                return new FullPromotion(-1, '可口可乐');
            };
            var fun2 = function () {
                return new FullPromotion(2, '可口可乐');
            };
            var fun3 = function () {
                return new FullPromotion(1, '可口可乐')
            };
            expect(fun1).toThrow();
            expect(fun2).toThrow();
            expect(fun3).not.toThrow();
        });

        it('should be able to check if a item is in promotion.', function () {
            expect(promotion.isInPromotion(item0)).toBeFalsy();
            expect(promotion.isInPromotion(item1)).toBeFalsy();
            expect(promotion.isInPromotion(item2)).toBeTruthy();
        });

    });
});
