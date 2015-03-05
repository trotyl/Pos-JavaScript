//TODO: Please write code in this file.

function printInventory (inputs) {
	var order = new Order(loadAllItems(), loadPromotions(), inputs);
	console.log(order.output());
}
