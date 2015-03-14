describe('Formatter: ', function () {

    var prettyItems, prettyBenefits, prettyInfo;
    var formatter;

    beforeEach(function () {
        prettyItems = [
            {'item': new Item('ITEM000000', '饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00), 'amount': 20},
            {'item': new Item('ITEM000010', '饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00), 'amount': 20},
            {'item': new Item('ITEM000005', '食品', '康师傅', '康师傅方便面', '袋', 4.50), 'amount': 30},
            {'item': new Item('ITEM000003', '水果', '云山', '云山荔枝', '斤', 15.00), 'amount': 12}
        ];

        prettyBenefits = [
            {'type': Benefit.types.discount, 'scope': new BrandScope('可口可乐'), 'discount': 0.9, 'reduction': 14.00},
            {'type': Benefit.types.discount, 'scope': new SingleScope('可口可乐350ml'), 'discount': 0.9, 'reduction': 3.00},
            {'type': Benefit.types.discount, 'scope': new FullScope([]), 'discount': 0.9, 'reduction': 48.90},
            {'type': Benefit.types.promotion, 'scope': new BrandScope('康师傅'), 'from': 100, 'to': 2, 'reduction': 4.00},
            {'type': Benefit.types.promotion, 'scope': new SingleScope('云山荔枝'), 'from': 100, 'to': 5, 'reduction': 5.00},
            {'type': Benefit.types.promotion, 'scope': new FullScope([]), 'from': 100, 'to': 3, 'reduction': 3.00}
        ];

        prettyInfo = {
            'sum': 1234.56,
            'reduction': 123.45
        };

        formatter = new Formatter();
    });

    it('should be able to get the right chinese number', function () {
        expect(Formatter.getChineseNumber(0.9)).toEqual('九');
        expect(Formatter.getChineseNumber(0.95)).toEqual('九五');
    });

    it('should be able to generate the correct item list.', function () {
        expect(formatter.GetItemList(prettyItems)).toEqual(
            '名称：可口可乐350ml，数量：20瓶，单价：3.00(元)，小计：60.00(元)\n' +
            '名称：可口可乐550ml，数量：20瓶，单价：4.00(元)，小计：80.00(元)\n' +
            '名称：康师傅方便面，数量：30袋，单价：4.50(元)，小计：135.00(元)\n' +
            '名称：云山荔枝，数量：12斤，单价：15.00(元)，小计：180.00(元)\n'
        );
    });

    it('should be able to generate the correct discount list.', function () {
        expect(formatter.GetBenefitList(prettyBenefits)).toEqual(
            '名称：可口可乐品牌打折，金额：14.00元\n' +
            '名称：可口可乐350ml单品打折，金额：3.00元\n' +
            '名称：九折，金额：48.90元\n' +
            '名称：康师傅品牌满100减2，金额：4.00元\n' +
            '名称：云山荔枝满100减5，金额：5.00元\n' +
            '名称：满100减3，金额：3.00元\n'
        );
    });

    it('should be able to generate the correct summary.', function () {
        expect(formatter.GetSummary(prettyInfo)).toEqual(
            '总计：1234.56(元)\n' +
            '节省：123.45(元)\n'
        );
    });
});
