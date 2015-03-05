describe('Item ', function () {

    beforeEach(function () {

    });

    it('should be able to constructed correctly', function () {

        var item = new Item('ITEM000000','饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00);

        expect(item.barcode).toEqual('ITEM000000');
        expect(item.type).toEqual('饮料');
        expect(item.brand).toEqual('可口可乐');
        expect(item.name).toEqual('可口可乐350ml');
        expect(item.unit).toEqual('瓶');
        expect(item.price).toEqual(3.00);

    });
});
