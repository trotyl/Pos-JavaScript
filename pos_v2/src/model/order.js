function Order (items, promotions, list) {
	this.items = items;
	this.promotions = promotions;
	this.list = list;
	this.itemInfo = {};
	this.total = 0;
	this.gift = 0;
	this.initiate();
}

Order.prototype.initiate = function () {
	_(this.items).each(function (item) {
		_(item).extend({promotion: false, count: 0, free: 0, fare: 0});
		this.itemInfo[item.barcode] = item;
	}, this);

	_(this.promotions[0].barcodes).each(function (barcode) {
		this.itemInfo[barcode].promotion = true;
	}, this);
};

Order.prototype.calculate = function () {
	_(this.list).each(function (barcode) {
		var buy_number = parseInt(barcode.substring(11)) || 1;
		barcode = barcode.substring(0,10);
		var item = this.itemInfo[barcode];
		var flag = item.count < 2;
		item.count += buy_number;
		flag = flag && item.count >= 2;
		item.fare += buy_number * item.price;
		this.total += buy_number * item.price;
	}, this);
	_.chain(this.itemInfo)
		.filter(function (item) {
			return item.promotion && item.count >=2;
		})
		.each(function (item) {
			item.fare -= item.price;
			item.free += 1;
			this.gift += item.price;
			this.total -= item.price;
		}, this)
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
	_.chain(this.itemInfo)
		.filter(function (item) {
			return item.count > 0;
		})
		.each(function (item) {
			result += getBoughtItem(item);
		});
	return result;
};

Order.prototype.getFreeList = function() {
	var result = '----------------------\n' + '挥泪赠送商品：\n';
	_.chain(this.itemInfo)
		.filter(function (item) {
			return item.promotion && item.count > 0;
		})
		.each(function (item) {
			result += getFreeItem(item);
		});
	return result;
};

Order.prototype.getStats = function() {
	var result = '----------------------\n'
	result += '总计：' + this.total.toFixed(2) + '(元)\n'
		+ '节省：' + this.gift.toFixed(2) + '(元)\n';
	return result;
};

function getBoughtItem (item) {
	return '名称：' + item.name 
		+ '，数量：' + item.count + item.unit 
		+ '，单价：' + item.price.toFixed(2) + '(元)'
		+ '，小计：' + item.fare.toFixed(2) + '(元)\n';
}

function getFreeItem (item) {
	return '名称：' + item.name
		+ '，数量：' + item.free + item.unit + '\n';
}
