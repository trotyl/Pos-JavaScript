function Item(barcode, name, unit, price) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
    this.count = 0;
    this.promotion = false;
    this.free = 0;
    this.fare = 0;
}

Item.prototype.getPromotion = function(promotions) {
	this.promotion = _(promotions[0].barcodes).some(function (the_barcode) {
		return the_barcode == this.barcode;
	}, this);
};
