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

        strategy = new Strategy(allItems, [], [], {0: 0});
    });

    it('should be able to constructed correctly.', function () {
        strategy = new Strategy(allItems, [], {0: 0});
        expect(strategy.allItems).toEqual(allItems);
        expect(strategy.benefits.length).toEqual(0);
        expect(strategy.discountMutual[0]).toEqual(0);
    });

    it('should be able to generate the enhanced items.', function () {
        var input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        var enhancedItems = strategy.GetEnhancedItems(input);
        expect(enhancedItems.length).toEqual(4);
        expect(enhancedItems[0].item.barcode).toEqual('ITEM000000');
        expect(enhancedItems[0].amount).toEqual(20);
        expect(enhancedItems[0].price).toEqual(3.00);
    });

    describe('should be able to ensure the right valid discounts.', function () {

        var scope0 = new SingleScope('雪碧');
        var scope1 = new SingleScope('可口可乐350ml');
        var scope2 = new BrandScope('康师傅');
        var scope3 = new BrandScope('可口可乐');

        var input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        var strategy;
        var enhancedItems;

        beforeEach(function () {
            strategy = new Strategy(allItems, [], [], {0: 0});
            enhancedItems = strategy.GetEnhancedItems(input);
        });

        it('should work with only SingleScope.', function () {
            discounts = [
                new Discount(0.9, scope0, true),
                new Discount(0.95, scope1, true),
            ];
            Strategy.EnsureDiscounts(discounts, {}, enhancedItems);
            expect(enhancedItems.length).toEqual(4);
            expect(enhancedItems[0].price).toEqual(3.00);
            expect(enhancedItems[0].discounts[1]).toBeTruthy();
            expect(enhancedItems[0].discounts[2]).toBeFalsy();

            expect(enhancedItems[1].discounts[1]).toBeFalsy();
            expect(enhancedItems[1].discounts[2]).toBeFalsy();

            expect(enhancedItems[2].discounts[1]).toBeFalsy();
            expect(enhancedItems[2].discounts[2]).toBeFalsy();

            expect(enhancedItems[3].discounts[1]).toBeFalsy();
            expect(enhancedItems[3].discounts[2]).toBeFalsy();
        });

        it('should work with only BrandScope.', function () {
            discounts = [
                new Discount(0.9, scope2, true),
                new Discount(0.95, scope3, true),
            ];
            Strategy.EnsureDiscounts(discounts, {}, enhancedItems);
            expect(enhancedItems.length).toEqual(4);
            expect(enhancedItems[0].price).toEqual(3.00);
            expect(enhancedItems[0].discounts[1]).toBeFalsy();
            expect(enhancedItems[0].discounts[2]).toBeTruthy();

            expect(enhancedItems[1].discounts[1]).toBeFalsy();
            expect(enhancedItems[1].discounts[2]).toBeTruthy();

            expect(enhancedItems[2].discounts[1]).toBeFalsy();
            expect(enhancedItems[2].discounts[2]).toBeTruthy();

            expect(enhancedItems[3].discounts[1]).toBeFalsy();
            expect(enhancedItems[3].discounts[2]).toBeFalsy();
        });

        it('should work with both SingleScope and BrandScope.', function () {
            discounts = [
                new Discount(0.9, scope1, true),
                new Discount(0.95, scope3, true),
            ];
            Strategy.EnsureDiscounts(discounts, {3: 3}, enhancedItems);
            expect(enhancedItems.length).toEqual(4);
            expect(enhancedItems[0].price).toEqual(3.00);
            expect(enhancedItems[0].discounts[1]).toBeTruthy();
            expect(enhancedItems[0].discounts[2]).toBeTruthy();

            expect(enhancedItems[1].discounts[1]).toBeFalsy();
            expect(enhancedItems[1].discounts[2]).toBeTruthy();

            expect(enhancedItems[2].discounts[1]).toBeFalsy();
            expect(enhancedItems[2].discounts[2]).toBeFalsy();

            expect(enhancedItems[3].discounts[1]).toBeFalsy();
            expect(enhancedItems[3].discounts[2]).toBeFalsy();
        });

    });

    describe('should be able to ensure the right valid promotions.', function () {

        var scope0 = new SingleScope('雪碧');
        var scope1 = new SingleScope('可口可乐350ml');
        var scope2 = new BrandScope('康师傅');
        var scope3 = new BrandScope('可口可乐');

        var input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        var strategy;
        var enhancedItems;

        beforeEach(function () {
            strategy = new Strategy(allItems, [], [], {0: 0});
            enhancedItems = strategy.GetEnhancedItems(input);
        });

        it('should work with only SingleScope.', function () {
            promotions = [
                new Promotion(100, 5, scope0, true),
                new Promotion(100, 5, scope1, true),
            ];
            Strategy.EnsurePromotions(promotions, {}, enhancedItems);
            expect(enhancedItems.length).toEqual(4);
            expect(enhancedItems[0].price).toEqual(3.00);
            expect(enhancedItems[0].promotions[1]).toBeTruthy();
            expect(enhancedItems[0].promotions[2]).toBeFalsy();

            expect(enhancedItems[1].promotions[1]).toBeFalsy();
            expect(enhancedItems[1].promotions[2]).toBeFalsy();

            expect(enhancedItems[2].promotions[1]).toBeFalsy();
            expect(enhancedItems[2].promotions[2]).toBeFalsy();

            expect(enhancedItems[3].promotions[1]).toBeFalsy();
            expect(enhancedItems[3].promotions[2]).toBeFalsy();
        });

        it('should work with only BrandScope.', function () {
            promotions = [
                new Promotion(100, 2, scope2, true),
                new Promotion(100, 2, scope3, true),
            ];
            Strategy.EnsurePromotions(promotions, {}, enhancedItems);
            expect(enhancedItems.length).toEqual(4);
            expect(enhancedItems[0].price).toEqual(3.00);
            expect(enhancedItems[0].promotions[1]).toBeFalsy();
            expect(enhancedItems[0].promotions[2]).toBeTruthy();

            expect(enhancedItems[1].promotions[1]).toBeFalsy();
            expect(enhancedItems[1].promotions[2]).toBeTruthy();

            expect(enhancedItems[2].promotions[1]).toBeFalsy();
            expect(enhancedItems[2].promotions[2]).toBeTruthy();

            expect(enhancedItems[3].promotions[1]).toBeFalsy();
            expect(enhancedItems[3].promotions[2]).toBeFalsy();
        });

        it('should work with both SingleScope and BrandScope.', function () {
            promotions = [
                new Promotion(100, 5, scope1, true),
                new Promotion(100, 2, scope3, true),
            ];
            Strategy.EnsurePromotions(promotions, {3: 3}, enhancedItems);
            expect(enhancedItems.length).toEqual(4);
            expect(enhancedItems[0].price).toEqual(3.00);
            expect(enhancedItems[0].promotions[1]).toBeTruthy();
            expect(enhancedItems[0].promotions[2]).toBeTruthy();

            expect(enhancedItems[1].promotions[1]).toBeFalsy();
            expect(enhancedItems[1].promotions[2]).toBeTruthy();

            expect(enhancedItems[2].promotions[1]).toBeFalsy();
            expect(enhancedItems[2].promotions[2]).toBeFalsy();

            expect(enhancedItems[3].promotions[1]).toBeFalsy();
            expect(enhancedItems[3].promotions[2]).toBeFalsy();
        });
    });

    describe('should be able to get the right discount list', function () {
        var scope0 = new SingleScope('雪碧');
        var scope1 = new SingleScope('可口可乐350ml');
        var scope2 = new BrandScope('康师傅');
        var scope3 = new BrandScope('可口可乐');

        var input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        var strategy;
        var enhancedItems;

        beforeEach(function () {
            strategy = new Strategy(allItems, [], [], {0: 0});
            enhancedItems = strategy.GetEnhancedItems(input);
        });

        it('should work with only SingleScope.', function () {
            discounts = [
                new Discount(0.9, scope0, true),
                new Discount(0.95, scope1, true),
            ];
            Strategy.EnsureDiscounts(discounts, {}, enhancedItems);
            var enhancedBenefits = [];
            Strategy.GetDiscounts(enhancedItems, enhancedBenefits);
            expect(enhancedBenefits.length).toEqual(1);
            expect(enhancedBenefits[0].reduction).toBeCloseTo(3);
        });

        it('should work with only BrandScope.', function () {
            discounts = [
                new Discount(0.9, scope2, true),
                new Discount(0.95, scope3, true),
            ];
            Strategy.EnsureDiscounts(discounts, {}, enhancedItems);
            var enhancedBenefits = [];
            Strategy.GetDiscounts(enhancedItems, enhancedBenefits);
            expect(enhancedBenefits.length).toEqual(2);
            expect(enhancedBenefits[0].reduction).toBeCloseTo(7);
            expect(enhancedBenefits[1].reduction).toBeCloseTo(13.5);
        });

        it('should work with both SingleScope and BrandScope.', function () {
            discounts = [
                new Discount(0.9, scope1, true),
                new Discount(0.95, scope3, true),
            ];
            Strategy.EnsureDiscounts(discounts, {3: 3}, enhancedItems);
            var enhancedBenefits = [];
            Strategy.GetDiscounts(enhancedItems, enhancedBenefits);
            expect(enhancedBenefits.length).toEqual(2);
            expect(enhancedBenefits[0].reduction).toBeCloseTo(6);
            expect(enhancedBenefits[1].reduction).toBeCloseTo(7);
        });
    });

    describe('should be able to get the right promotion list', function () {
        var scope0 = new SingleScope('雪碧');
        var scope1 = new SingleScope('可口可乐350ml');
        var scope2 = new BrandScope('康师傅');
        var scope3 = new BrandScope('可口可乐');

        var input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        var strategy;
        var enhancedItems;

        beforeEach(function () {
            strategy = new Strategy(allItems, [], [], {0: 0});
            enhancedItems = strategy.GetEnhancedItems(input);
        });

        it('should work with only SingleScope.', function () {
            promotions = [
                new Promotion(100, 5, scope0, true),
                new Promotion(100, 5, scope1, true),
            ];
            Strategy.EnsurePromotions(promotions, {}, enhancedItems);
            var enhancedBenefits = [];
            Strategy.GetPromotions(enhancedItems, enhancedBenefits);
            expect(enhancedBenefits.length).toEqual(1);
            expect(enhancedBenefits[0].reduction).toBeCloseTo(0);
        });

        it('should work with only BrandScope.', function () {
            promotions = [
                new Promotion(100, 2, scope2, true),
                new Promotion(100, 2, scope3, true),
            ];
            Strategy.EnsurePromotions(promotions, {}, enhancedItems);
            var enhancedBenefits = [];
            Strategy.GetPromotions(enhancedItems, enhancedBenefits);
            expect(enhancedBenefits.length).toEqual(2);
            expect(enhancedBenefits[0].reduction).toBeCloseTo(2);
            expect(enhancedBenefits[1].reduction).toBeCloseTo(2);
        });

        it('should work with both SingleScope and BrandScope.', function () {
            promotions = [
                new Promotion(100, 5, scope1, true),
                new Promotion(100, 2, scope3, true),
            ];
            Strategy.EnsurePromotions(promotions, {3: 3}, enhancedItems);
            var enhancedBenefits = [];
            Strategy.GetPromotions(enhancedItems, enhancedBenefits);
            expect(enhancedBenefits.length).toEqual(2);
            expect(enhancedBenefits[0].reduction).toBeCloseTo(0);
            expect(enhancedBenefits[1].reduction).toBeCloseTo(2);
        });
    });
});
