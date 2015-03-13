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


Formatter.prototype.format = function (prettyItems, prettyDiscounts, prettyPromotions) {


    var name = '***<没钱赚商店>购物清单***';
    var timeStamp = '打印时间：' + Formatter.getDateTime();


};

Formatter.prototype.GetDateTime = function () {
    return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

Formatter.prototype.GetSplitter = function () {
    return '\n----------------------';
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

Formatter.GetPromotionList = function (prettyDiscounts, prettyPromotions) {
    var promotionString = '';
    _.forEach(prettyDiscounts, function (prettyDiscount) {
        promotionString += '名称：';
        var desc = prettyDiscount.discount.scope.GetDescription();
        promotionString += desc ? '打折' :
    });

};
