describe('Peeler: ', function () {
    var items, enhanceItems, benefits, enhancedBenefits;

    beforeEach(function () {
        items = [
            new Item('ITEM000000','饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00),
            new Item('ITEM000010','饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00),
            new Item('ITEM000005','食品', '康师傅', '康师傅方便面', '袋', 4.50),
            new Item('ITEM000008','饮料', '康师傅', '康师傅冰红茶', '瓶', 3.00),
        ];
        enhanceItems = _.map(items, function (item) {
            return {
                'item': item,
                'amount': 1,
                'origin': 5,
                'total': 4,
                'benefit': {},
                'benefits': {}
            }
        });

        benefits = [
            new Discount(0.9, new SingleScope('可口可乐350ml')),
            new Promotion(100, 5, new BrandScope('可口可乐'))
        ];
        enhancedBenefits = _.map(benefits, function (benefit) {
            return {
                'type': benefit.type,
                'benefit': benefit,
                'items': {},
                'total': 5,
                'reduction': 2
            }
        })
    });

    it('should be able to get the pretty items.', function () {
        var prettyItems = Peeler.PrettifyItems(enhanceItems);
        expect(prettyItems.length).toEqual(4);
        expect(prettyItems[0].item).toEqual(items[0]);
        expect(prettyItems[0].amount).toEqual(1);
    });

    xit('should be able to generate the enhanced items.', function () {
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
        expect(enhancedItems[0].total).toEqual(60);
    });


});
