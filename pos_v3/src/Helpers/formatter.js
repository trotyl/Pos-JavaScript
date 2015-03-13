function Formatter() {

}

Formatter.numberMap = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九'
};

Formatter.GetChineseNumber = function (number) {
    var res = '';
    var left = parseInt(number);
    res += Formatter.numberMap[left];
    if (left != number) {
        var right = parseInt((number - left) * 10);
        res += Formatter.numberMap[right];
    }
    return res;
};


Formatter.prototype.format = function (prettyItems, prettyDiscounts, prettyPromotions, prettyInfo) {
    var res = '';
    res += '***<没钱赚商店>购物清单***\n';
    res += '打印时间：' + this.GetDateTime() + '\n';
    res += this.GetSplitter();
    res += this.GetItemList(prettyItems);
    res += this.GetSplitter();
    res += '优惠信息：\n';
    res += this.GetDiscountList(prettyDiscounts);
    res += this.GetPromotionList(prettyPromotions);
    res += this.GetSplitter();
    res += this.GetSummary(prettyInfo);
    res += '**********************\n';
    return res;
};

Formatter.prototype.GetDateTime = function () {
    return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

Formatter.prototype.GetSplitter = function () {
    return '\n----------------------\n';
};

Formatter.prototype.GetItemList = function (prettyItems) {
    var itemString = '';
    _.forEach(prettyItems, function (prettyItem) {
        itemString +=
            '名称：' + prettyItem.item.name +
            '，数量：' + prettyItem.amount + prettyItem.item.unit +
            '，单价：' + prettyItem.item.price.toFixed(2) + '(元)' +
            '，小计：' + (prettyItem.item.price * prettyItem.amount).toFixed(2) + '(元)' +
            '\n';
    });
    return itemString;
};

Formatter.prototype.GetDiscountList = function (prettyDiscounts) {
    var discountString = '';
    _.forEach(prettyDiscounts, function (prettyDiscount) {
        discountString += '名称：';
        var desc = prettyDiscount.scope.GetDescription();
        discountString += desc ? desc + '打折' : (Formatter.GetChineseNumber(prettyDiscount.discount) + '折');
        discountString += '，金额：' + prettyDiscount.reduction.toFixed(2) + '元\n';
    });
    return discountString;
};

Formatter.prototype.GetPromotionList = function (prettyPromotions) {
    var promotionString = '';
    _.forEach(prettyPromotions, function (prettyPromotion) {
        promotionString += '名称：';
        var desc = prettyPromotion.scope.GetSimpleDescription();
        promotionString += desc + '满' + prettyPromotion.from + '减' + prettyPromotion.to;
        promotionString += '，金额：' + prettyPromotion.reduction.toFixed(2) + '元\n';
    });
    return promotionString;
};

Formatter.prototype.GetSummary = function (prettyInfo) {
    var res =
        '总计：' + prettyInfo.sum.toFixed(2) + '(元)\n' +
        '节省：' + prettyInfo.reduction.toFixed(2) + '(元)\n';
    return res;
};
