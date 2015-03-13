describe('Formatter: ', function () {

    var prettyItems ,prettyDiscounts, prettyPromotions;
    var formatter;

    beforeEach(function () {
        prettyItems = [
            {'item': new Item('ITEM000000','饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00), 'amount': 20},
            {'item': new Item('ITEM000010','饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00), 'amount': 20},
            {'item': new Item('ITEM000005','食品', '康师傅', '康师傅方便面', '袋', 4.50), 'amount': 30},
            {'item': new Item('ITEM000003','水果', '云山', '云山荔枝', '斤', 15.00), 'amount': 12}
        ];

        prettyDiscounts = [
            {'scope': new BrandScope('可口可乐'), 'discount': 14.00 }
        ];

        prettyPromotions = [
            {'scope': new FullScope([]), 'discount': 3.00 }
        ];

        formatter = new Formatter();
    });

    it('should be able to generate the correct item list.', function () {
        expect(formatter.GetItemList(prettyItems)).toEqual(''+
        '名称：可口可乐350ml，数量：20瓶，单价：3.00(元)，小计：60.00(元)\n' +
        '名称：可口可乐550ml，数量：20瓶，单价：4.00(元)，小计：80.00(元)\n' +
        '名称：康师傅方便面，数量：30袋，单价：4.50(元)，小计：135.00(元)\n' +
        '名称：云山荔枝，数量：12斤，单价：15.00(元)，小计：180.00(元)\n');
    });


});
