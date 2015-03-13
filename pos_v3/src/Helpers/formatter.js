function Formatter(){

}


Formatter.prototype.format = function (prettyItems, prettyDiscounts, prettyPromotions) {


    var name = '***<没钱赚商店>购物清单***';
    var timeStamp = '打印时间：' + Formatter.getDateTime();


};

Formatter.prototype.GetDateTime = function() {
    return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

Formatter.prototype.GetSplitter = function() {
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

Formatter.GetPromotionList = function (enhancedDiscounts, enhancedPromotions) {
    var promotionStringList = [];
    _.forEach(enhancedDiscounts, function (enhancedItem) {
        promotionStringList.push(

        )
    });

};
