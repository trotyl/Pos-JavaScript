//TODO: Please write code in this file.

function printInventory (inputs) {
	var this_order = new Order(loadAllItems(), loadPromotions(), inputs);
	console.log(this_order.output());
}
