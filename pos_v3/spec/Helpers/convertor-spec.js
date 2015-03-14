describe('Convertor: ', function () {
    var items, enhanceItems, benefits, enhancedBenefits;

    beforeEach(function () {
        items = [
            new Item('ITEM000000','饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00),
            new Item('ITEM000010','饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00),
            new Item('ITEM000005','食品', '康师傅', '康师傅方便面', '袋', 4.50),
            new Item('ITEM000008','饮料', '康师傅', '康师傅冰红茶', '瓶', 3.00)
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
        var prettyItems = _.map(enhanceItems, Convertor.PrettifyItem);
        expect(prettyItems.length).toEqual(4);
        expect(prettyItems[0].item).toEqual(items[0]);
        expect(prettyItems[0].amount).toEqual(1);
    });

    it('should be able to get the pretty benefits.', function () {
        var prettyBenefits = _.map(enhancedBenefits, Convertor.PrettifyBenefit);
        expect(prettyBenefits.length).toEqual(2);

        expect(prettyBenefits[0].type).toEqual(Benefit.types.discount);
        expect(prettyBenefits[0].scope).toBeTruthy();
        expect(prettyBenefits[0].discount).toEqual(0.9);
        expect(prettyBenefits[0].reduction).toEqual(2);

        expect(prettyBenefits[1].type).toEqual(Benefit.types.promotion);
        expect(prettyBenefits[1].scope).toBeTruthy();
        expect(prettyBenefits[1].from).toEqual(100);
        expect(prettyBenefits[1].to).toEqual(5);
        expect(prettyBenefits[1].reduction).toEqual(2);
    });

    it('should be able to get the pretty summary.', function () {
        var prettySummary = Convertor.PrettifySummary(enhanceItems, enhancedBenefits);
        expect(prettySummary.sum).toEqual(10.5);
        expect(prettySummary.reduction).toEqual(4);
    });

});
