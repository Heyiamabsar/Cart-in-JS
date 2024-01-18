let products = {
    "Product A": {price: 20, quantity: 0, giftWrap: false},
    "Product B": {price: 40, quantity: 0, giftWrap: false},
    "Product C": {price: 50, quantity: 0, giftWrap: false}
};

function userInput() {
    for (let product in products) {
        let quantity = prompt(`Enter the quantity for ${product}:`);
        let giftWrap = prompt(`Should ${product} be gift wrapped? (yes/no):`);
        products[product].quantity = parseInt(quantity);
        products[product].giftWrap = giftWrap.toLowerCase() === 'yes';
    }
}

function calculateTotal() {
    let total = 0;
    let totalQuantity = 0;
    let discount = 0;
    let discountName = "";
    let giftWrapFee = 0;
    let shippingFee = 0;

    for (let product in products) {
        total += products[product].price * products[product].quantity;
        totalQuantity += products[product].quantity;
        if (products[product].giftWrap) {
            giftWrapFee += products[product].quantity;
        }
    }

    if (total > 200) {
        discount = 10;
        discountName = "flat_10_discount";
    }

    for (let product in products) {
        if (products[product].quantity > 10) {
            let potentialDiscount = products[product].price * products[product].quantity * 0.05;
            if (potentialDiscount > discount) {
                discount = potentialDiscount;
                discountName = "bulk_5_discount";
            }
        }
    }

    if (totalQuantity > 20) {
        let potentialDiscount = total * 0.1;
        if (potentialDiscount > discount) {
            discount = potentialDiscount;
            discountName = "bulk_10_discount";
        }
    }

    if (totalQuantity > 30) {
        for (let product in products) {
            if (products[product].quantity > 15) {
                let potentialDiscount = products[product].price * (products[product].quantity - 15) * 0.5;
                if (potentialDiscount > discount) {
                    discount = potentialDiscount;
                    discountName = "tiered_50_discount";
                }
            }
        }
    }

    shippingFee = Math.ceil(totalQuantity / 10) * 5;

    total = total - discount + giftWrapFee + shippingFee;

    return {
        total: total,
        discount: discount,
        discountName: discountName,
        giftWrapFee: giftWrapFee,
        shippingFee: shippingFee
    };
}

function printReceipt() {
    let receipt = calculateTotal();
    console.log("Receipt:");
    for (let product in products) {
        console.log(`${product}: Quantity - ${products[product].quantity}, Total - $${products[product].price * products[product].quantity}`);
    }
    console.log(`Subtotal: $${receipt.total + receipt.discount - receipt.giftWrapFee - receipt.shippingFee}`);
    console.log(`Discount (${receipt.discountName}): -$${receipt.discount}`);
    console.log(`Gift Wrap Fee: $${receipt.giftWrapFee}`);
    console.log(`Shipping Fee: $${receipt.shippingFee}`);
    console.log(`Total: $${receipt.total}`);
}

userInput();
printReceipt();
