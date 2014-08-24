function Order (items, promotions, list) {
	this.itemInfo = {};
	this.total = 0;
	this.original = 0;
	this.initiate(items, promotions, list);
}

Order.prototype.initiate = function (items, promotions, list) {
	_(list).each(function (raw_barcode) {
		barcode = raw_barcode.substring(0,10);
		var item = this.itemInfo[barcode] || _(items).findWhere({barcode: barcode});
		this.original += item.addCount(raw_barcode);
		this.itemInfo[barcode] = item;
	}, this);

	var two_with_one_list = _(promotions).findWhere({type: 'BUY_TWO_GET_ONE_FREE'}).barcodes;
	_(two_with_one_list).each(function (barcode) {
		this.itemInfo[barcode] && this.itemInfo[barcode].getPromotion();
	}, this);

	this.total = _(this.itemInfo).reduce(function (sum, item) { return sum + item.fare; }, 0, this);
};

Order.prototype.output = function () {
	this.getLists();
	var result = '***<没钱赚商店>购物清单***\n';
	result += '打印时间：' + this.getDateTime() + '\n';
	result += this.boughtList;
	result += this.freeList;
	result += this.getStats();
	result += '**********************';
	return result;
};

Order.prototype.getDateTime = function() {
	return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

Order.prototype.getLists = function() {
	
	function getBoughtItem (item) {
		return '名称：' + item.name + '，数量：' + item.count + item.unit 
			+ '，单价：' + item.price.toFixed(2) + '(元)' + '，小计：' + item.fare.toFixed(2) + '(元)\n';
	}

	function getFreeItem (item) {
		return '名称：' + item.name + '，数量：' + item.free + item.unit + '\n';
	}

	var boughtList = '----------------------\n';
	var freeList = '----------------------\n' + '挥泪赠送商品：\n';
	_(this.itemInfo).each(function (item) {
		boughtList += getBoughtItem(item);
		item.promotion && (freeList += getFreeItem(item));
	});
	this.boughtList = boughtList;
	this.freeList = freeList;
};

Order.prototype.getStats = function() {
	return '----------------------\n' + '总计：' + this.total.toFixed(2) + '(元)\n' 
		+ '节省：' + (this.original - this.total).toFixed(2) + '(元)\n';
};
