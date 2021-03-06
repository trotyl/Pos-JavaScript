describe('Scope: ', function () {

    var item0 = new Item('ITEM000000', '饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00);
    var item1 = new Item('ITEM000010', '饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00);
    var item2 = new Item('ITEM000003', '水果', '云山', '云山荔枝', '斤', 15.00);

    beforeEach(function () {

    });

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    it('should have three enum types', function () {
        expect(Object.size(Scope.types)).toEqual(3);
    });

    describe('SingleScope ', function () {
        var scope;

        beforeEach(function () {
            scope = new SingleScope('可口可乐350ml');
        });

        it('should be derived from Scope.', function () {
            expect(scope instanceof Scope).toBeTruthy();
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

        it('should be able to get correct description of discount.', function () {
            expect(scope.getDiscountDescription()).toEqual('可口可乐350ml单品');
        });

        it('should be able to get correct description of promotion.', function () {
            expect(scope.getPromotionDescription()).toEqual('可口可乐350ml');
        });
    });


    describe('BrandScope ', function () {
        var scope;

        beforeEach(function () {
            scope = new BrandScope('可口可乐');
        });

        it('should be derived from Scope.', function () {
            expect(scope instanceof Scope).toBeTruthy();
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

        it('should be able to get correct description of discount.', function () {
            expect(scope.getDiscountDescription()).toEqual('可口可乐品牌');
        });

        it('should be able to get correct description of promotion.', function () {
            expect(scope.getPromotionDescription()).toEqual('可口可乐品牌');
        });
    });


    describe('FullScope ', function () {
        var scope;

        beforeEach(function () {
            var exceptions = [new BrandScope('可口可乐')];
            scope = new FullScope(exceptions);
        });

        it('should be derived from Scope.', function () {
            expect(scope instanceof Scope).toBeTruthy();
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

        it('should be able to get correct description of discount.', function () {
            expect(scope.getDiscountDescription()).toEqual('');
        });

        it('should be able to get correct description of promotion.', function () {
            expect(scope.getPromotionDescription()).toEqual('');
        });
    });
});
