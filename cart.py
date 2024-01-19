products = {
    "Product A": {'price': 20, 'quantity': 0, 'giftWrap': False},
    "Product B": {'price': 40, 'quantity': 0, 'giftWrap': False},
    "Product C": {'price': 50, 'quantity': 0, 'giftWrap': False}
}

def userInput():
    for product in products:
        quantity = int(input(f"Enter the quantity for {product}: "))
        gift_wrap = input(f"Should {product} be gift wrapped? (yes/no): ").lower() == 'yes'
        products[product]['quantity'] = quantity
        products[product]['giftWrap'] = gift_wrap

def calculateTotal():
    total = 0
    totalQuantity = 0
    discount = 0
    discountName = ""
    giftWrapFee = 0
    shippingFee = 0

    for product in products:
        total += products[product]['price'] * products[product]['quantity']
        totalQuantity += products[product]['quantity']
        if products[product]['giftWrap']:
            giftWrapFee += products[product]['quantity']

    if total > 200:
        discount = 10
        discountName = "flat_10_discount"

    for product in products:
        if products[product]['quantity'] > 10:
            potentialDiscount = products[product]['price'] * products[product]['quantity'] * 0.05
            if potentialDiscount > discount:
                discount = potentialDiscount
                discountName = "bulk_5_discount"

    if totalQuantity > 20:
        potentialDiscount = total * 0.1
        if potentialDiscount > discount:
            discount = potentialDiscount
            discountName = "bulk_10_discount"

    if totalQuantity > 30:
        for product in products:
            if products[product]['quantity'] > 15:
                potentialDiscount = products[product]['price'] * (products[product]['quantity'] - 15) * 0.5
                if potentialDiscount > discount:
                    discount = potentialDiscount
                    discountName = "tiered_50_discount"

    shippingFee = -(-totalQuantity // 10) * 5

    total = total - discount + giftWrapFee + shippingFee

    return {
        'total': total,
        'discount': discount,
        'discountName': discountName,
        'giftWrapFee': giftWrapFee,
        'shippingFee': shippingFee
    }

def printReceipt():
    receipt = calculateTotal()
    print("Receipt:")
    for product in products:
        print(f"{product}: Quantity - {products[product]['quantity']}, Total - ${products[product]['price'] * products[product]['quantity']}")
    print(f"Subtotal: ${receipt['total'] + receipt['discount'] - receipt['giftWrapFee'] - receipt['shippingFee']}")
    print(f"Discount ({receipt['discountName']}): -${receipt['discount']}")
    print(f"Gift Wrap Fee: ${receipt['giftWrapFee']}")
    print(f"Shipping Fee: ${receipt['shippingFee']}")
    print(f"Total: ${receipt['total']}")

userInput()
printReceipt()
