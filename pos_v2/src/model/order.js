function Order (items, promotions, list) {
	this.itemInfo = {};
	this.total = 0;
	this.gift = 0;
	this.initiate(items, promotions, list);
}

Order.prototype.initiate = function (items, promotions, list) {
	_(list).each(function (raw_barcode) {
		barcode = raw_barcode.substring(0,10);
		var item = this.itemInfo[barcode] || _(items).findWhere({barcode: barcode});
		item.getPromotion(promotions);
		item.addCount(raw_barcode);
		this.itemInfo[barcode] = item;	
	}, this);

	_(this.itemInfo).each(function (item) {
		item.compute();
		this.total += item.fare;
		this.gift += item.free * item.price;
	}, this);
};

Order.prototype.output = function () {
	var result = '***<没钱赚商店>购物清单***\n';
	result += '打印时间：' + this.getDateTime() + '\n';
	result += this.getBoughtList();
	result += this.getFreeList();
	result += this.getStats();
	result += '**********************';
	return result;
};

Order.prototype.getDateTime = function() {
	var dateDigitToString = function (num) {
    	return num < 10 ? '0' + num : num;
	}

	var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return formattedDateString;
};

Order.prototype.getBoughtList = function() {
	var result = '----------------------\n'
	_(this.itemInfo).each(function (item) {
		result += getBoughtItem(item);
	});
	return result;
};

Order.prototype.getFreeList = function() {
	var result = '----------------------\n' + '挥泪赠送商品：\n';
	_(this.itemInfo).each(function (item) {
		item.promotion && (result += getFreeItem(item));
	});
	return result;
};

Order.prototype.getStats = function() {
	return '----------------------\n' + '总计：' + this.total.toFixed(2) + '(元)\n' 
		+ '节省：' + this.gift.toFixed(2) + '(元)\n';
};

function getBoughtItem (item) {
	return '名称：' + item.name + '，数量：' + item.count + item.unit 
		+ '，单价：' + item.price.toFixed(2) + '(元)' + '，小计：' + item.fare.toFixed(2) + '(元)\n';
}

function getFreeItem (item) {
	return '名称：' + item.name + '，数量：' + item.free + item.unit + '\n';
}
