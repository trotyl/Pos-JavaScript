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

Item.prototype.addCount = function(raw_barcode) {
	var bought_number = parseInt(raw_barcode.substring(11)) || 1;
	this.count += bought_number;
	this.promotion && (this.free = Math.floor(this.count / 3));
	this.fare = (this.count - this.free) * this.price;
};
