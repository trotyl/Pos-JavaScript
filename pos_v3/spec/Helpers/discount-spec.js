describe('Discount: ', function () {

    var item0 = new Item('ITEM000000', '饮料', '可口可乐', '可口可乐350ml', '瓶', 3.00);
    var item1 = new Item('ITEM000010', '饮料', '可口可乐', '可口可乐550ml', '瓶', 4.00);
    var item2 = new Item('ITEM000003', '水果', '云山', '云山荔枝', '斤', 15.00);
    var discount, scope;

    beforeEach(function () {
        scope = {
            isInRange: function(){ return true; }
        };
        discount = new Discount(0.5, scope);
    });

    it('should be able to constructed correctly.', function () {
        expect(discount.rate).toEqual(0.5);
        expect(discount.scope).toEqual(scope);
    });

    it('should be able to get the correct price of item', function () {
        expect(discount.getPrice(item0)).toEqual(1.50);
        spyOn(discount.scope, 'isInRange').and.returnValue(false);
        expect(discount.getPrice(item0)).toEqual(3.00);
    });

    it('should throw error if the rate is incorrect.', function () {
        var fun1 = function () {
            return new Discount(-1, scope);
        };
        var fun2 = function () {
            return new Discount(2, scope);
        };
        var fun3 = function () {
            return new Discount(1, scope)
        };
        expect(fun1).toThrow();
        expect(fun2).toThrow();
        expect(fun3).not.toThrow();
    });

});
