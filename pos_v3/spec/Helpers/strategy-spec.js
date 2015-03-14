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

        strategy = new Strategy(allItems, [], {0: {0: 0}});
    });

    it('should be able to constructed correctly.', function () {
        expect(strategy.allItems).toEqual(allItems);
        expect(strategy.benefits.length).toEqual(0);
        expect(strategy.mutual[0][0]).toEqual(0);
    });

    it('should be able to generate the enhanced items.', function () {
        var input = [
            { 'ITEM000000' : 20 },
            { 'ITEM000010' : 20 },
            { 'ITEM000005' : 30 },
            { 'ITEM000003' : 12 }
        ];
        var enhancedItems = strategy.getEnhancedItems(input);
        expect(enhancedItems.length).toEqual(4);
        expect(enhancedItems[0].item.barcode).toEqual('ITEM000000');
        expect(enhancedItems[0].amount).toEqual(20);
        expect(enhancedItems[0].total).toEqual(60);
    });


});
