describe('Promotion: ', function () {

    var item ,promotion, scope;

    beforeEach(function () {
        item = {price: 3.00};
        scope = {
            isInRange: function () {
                return true;
            }
        };
        promotion = new Promotion(100, 2, scope);
    });

    it('should be able to constructed correctly.', function () {
        expect(promotion.from).toEqual(100);
        expect(promotion.reduction).toEqual(2);
        expect(promotion.scope).toEqual(scope);
    });

});
