function Formatter(){

}

Formatter.format = function (enhancedItems, enhancedDiscounts, enhancedPromotions) {
    var total = 0;
    var reduction = 0;

    var name = '***<没钱赚商店>购物清单***';
    var timeStamp = '打印时间：' + Formatter.getDateTime();

    _.forEach(enhancedItems, function (enhancedItem) {

    })
};

Formatter.GetDateTime = function() {
    return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

/**
 * @return {string}
 */
Formatter.GetSplitter = function() {
    return '\n----------------------';
};
