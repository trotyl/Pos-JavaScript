describe('Strategy: ', function () {
    var allItems, discounts, promotions, discountMutual;
    var strategy;

    beforeEach(function () {
        allItems = [
            new Item('ITEM000000','饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00),
            new Item('ITEM000010','饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00),
            new Item('ITEM000001','饮料', '百事', '雪碧', '瓶', 3.00),
            new Item('ITEM000007','饮料', '美汁源', '果粒橙', '瓶', 3.50),
            new Item('ITEM000002','水果', '云山', '云山苹果', '斤', 5.50),
            new Item('ITEM000003','水果', '云山', '云山荔枝', '斤', 15.00),
            new Item('ITEM000004','生活用品', '南孚', '电池', '个', 2.00),
            new Item('ITEM000005','食品', '康师傅', '康师傅方便面', '袋', 4.50),
            new Item('ITEM000008','饮料', '康师傅', '康师傅冰红茶', '瓶', 3.00),
            new Item('ITEM000006','体育用品', '胜利', '羽毛球', '个', 1.00)
        ];

        strategy = new Strategy(allItems, [], [], {0: 0})
    });

    it('should be able to constructed correctly.', function () {
        expect(strategy.allItems).toEqual(allItems);
        expect(strategy.discounts.length).toEqual(0);
        expect(strategy.promotions.length).toEqual(0);
        expect(strategy.discountMutual[0]).toEqual(0);
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
