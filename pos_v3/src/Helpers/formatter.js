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

Formatter.getChineseNumber = function (number) {
    var res = '';
    number = number * 10;
    var left = parseInt(number);
    res += Formatter.numberMap[left];
    if (left != number) {
        var right = parseInt((number - left) * 10);
        res += Formatter.numberMap[right];
    }
    return res;
};


Formatter.prototype.format = function (prettyItems, prettyBenefits, prettyInfo) {
    var res = '';
    res += '***<没钱赚商店>购物清单***\n';
    res += '打印时间：' + this.getDateTime() + '\n';
    res += this.getSplitter();
    res += this.getItemList(prettyItems);
    res += this.getSplitter();
    res += '优惠信息：\n';
    res += this.getBenefitList(prettyBenefits);
    res += this.getSplitter();
    res += this.getSummary(prettyInfo);
    res += '**********************\n';
    return res;
};

Formatter.prototype.getDateTime = function () {
    return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

Formatter.prototype.getSplitter = function () {
    return '\n----------------------\n';
};

Formatter.prototype.getItemList = function (prettyItems) {
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

Formatter.prototype.getBenefitList = function (prettyBenefits) {
    var benefitString = '';
    _.forEach(prettyBenefits, function (prettyBenefit) {
        benefitString += '名称：';
        var desc;
        if(prettyBenefit.type == Benefit.types.discount){
            desc = prettyBenefit.scope.getDiscountDescription();
            benefitString += (desc ? desc + '打折' : (Formatter.getChineseNumber(prettyBenefit.discount) + '折'));
        }
        else if(prettyBenefit.type == Benefit.types.promotion){
            desc = prettyBenefit.scope.getPromotionDescription();
            benefitString += (desc + '满' + prettyBenefit.from + '减' + prettyBenefit.to);
        }
        benefitString += '，金额：' + prettyBenefit.reduction.toFixed(2) + '元\n';
    });
    return benefitString;
};

Formatter.prototype.getSummary = function (prettyInfo) {
    return '总计：' + prettyInfo.sum.toFixed(2) + "(元)\n节省：" + prettyInfo.reduction.toFixed(2) + '(元)\n';
};
