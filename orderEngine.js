function getCustomer(customerId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (customerId === 101) {
                resolve({
                    id: 101,
                    name: "Jayant",
                    addressId: 501,
                    coupon: "SAVE10"
                });
            } else {
                reject("Customer not found");
            }
        }, 1000);
    });
}

function getAddress(addressId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (addressId === 501) {
                resolve({
                    id: 501,
                    city: "Bangalore",
                    pincode: 560001
                });
            } else {
                reject("Address not found");
            }
        }, 1000);
    });
}

function getCart(customerId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (customerId === 101) {
                resolve([
                    {
                        productId: 201,
                        quantity: 2
                    },
                    {
                        productId: 202,
                        quantity: 1
                    },
                    {
                        productId: 203,
                        quantity: 3
                    }
                ]);
            } else {
                reject("Cart not found");
            }
        }, 1000);
    });
}

function getProduct(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const products = {
                201: {
                    id: 201,
                    name: "Laptop",
                    price: 50000
                },
                202: {
                    id: 202,
                    name: "Mouse",
                    price: 1000
                },
                203: {
                    id: 203,
                    name: "Keyboard",
                    price: 2000
                }
            };
            if (products[productId]) {
                resolve(products[productId]);
            } else {
                reject("Product not found");
            }
        }, 1000);
    });
}
function checkInventory(productId, quantity) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const inventory = {
                201: 5,
                202: 10,
                203: 1
            }
            if (!inventory[productId]) {
                reject("Product does not exit");
                return;
            }

            if (inventory[productId] >= quantity) {
                resolve({
                    productId,
                    available: true,
                    quantity
                });
            } else {
                reject(`Insufficient inventory for product ${productId}`);
            }
        }, 1000);
    });
}

function getDiscount(coupon) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (coupon === "SAVE10") {
                resolve({
                    code: "SAVE10",
                    percentage: 10
                });
            } else {
                resolve({
                    code: null,
                    percentage: 0
                });
            }
        }, 1000);
    });
}

function makePayment(customerId, amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount <= 100000) {
                resolve({
                    customerId,
                    amount,
                    transactionId: "TXN-" + Date.now(),
                    status: "success"
                })
            } else {
                reject("Payment rejected");
            }
        }, 1500);
    })
}

function createShipment(transactionId, address) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                transactionId,
                trackingId: "TRK-" + Date.now(),
                city: address.city,
                status: "shipped"
            })
        }, 1500);
    })
}

function sendNotification(customerId, message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                customerId,
                message,
                sent: true
            });
        }, 500);
    });
}


async function processOrder(customerId) {

    try {
        const customer = await getCustomer(customerId);
        const [address, cart] = await Promise.all([getAddress(customer.addressId), getCart(customerId)]);
        const products = await Promise.all(cart.map((item) => {
            return getProduct(item.productId);
        }));

        const inventory = await Promise.all(cart.map((product) => {
            return checkInventory(product.productId, product.quantity);
        }));
        const productQuantity = cart.reduce((acc, curr) => {
            acc.set(curr.productId, curr.quantity);
            return acc;
        }, new Map());
        const subTotal = products.reduce((acc, curr) => {

            acc += (curr.price) * (productQuantity.get(curr.id));
            return acc;
        }, 0);

        const discount = await getDiscount(customer.coupon);
        const finalAmount = subTotal - (subTotal * discount.percentage) / 100;

        const payment = await makePayment(customer.id, finalAmount);

        const shipment = await createShipment(payment.transactionId, address);

        const notification = await sendNotification(customerId, "Your order is confirmed")
        return { customer, address, cart, products, inventory, subTotal, discount, finalAmount, payment, shipment, notification }
    } catch (error) {
        console.log(error);

    } finally {
        console.log("Order processing completed");
    }
}
async function solve(customerId) {
    const val = await processOrder(customerId);
    console.log(val);
}



const orderDetail = getCustomer(101)
    .then(customer => {
        return getAddress(customer.addressId)
            .then(address => {
                return { customer, address };
            })
    })
    .then(data => {
        return getCart(data.customer.id).then(cart => {
            return { ...data, cart };
        })
    })
    .then(data => {
        return Promise.all(data.cart.map((item) => {
            return getProduct(item.productId);
        }))
            .then(products => {
                return { ...data, products };
            })
    })
    .then(data => {
        return Promise.all(data.cart.map((item) => {
            return checkInventory(item.productId, item.quantity);
        }))
            .then(inventory => {
                if (!inventory.every(item => item.available)) {
                    throw new Error("Items are not avaible");
                }
                return { ...data, inventory };
            });
    })
    .then(data => {
        return getDiscount(data.customer.coupon).then(discount => {
            return { ...data, discount };
        })
    })
    .then(data => {
        const productQuantity = data.cart.reduce((acc, curr) => {
            acc.set(curr.productId, curr.quantity);
            return acc;
        }, new Map())
        const amount = data.products.reduce((acc, curr) => {
            acc = acc + curr.price * productQuantity.get(curr.id);
            return acc;
        }, 0);

        const discount = data.discount;
        const finalAmount = amount - (amount * discount.percentage) / 100;

        return makePayment(data.customer.id, finalAmount).then(payment => {
            return { ...data, payment };
        })
    })
    .then(data => {
        return createShipment(data.payment.transactionId, data.address).then(shipment => {
            return { ...data, shipment };
        })
    })
    .then(data => {
        return sendNotification(data.customer.id, "Your order is shipped").then(notification => {
            return { ...data, notification };
        })
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log("Order processing completed");
    })


