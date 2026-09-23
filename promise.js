const cart = ["shoes", "pants", "kurta"];

 createOrder(cart)
 .then(function (orderId){
    console.log(orderId);
    return orderId;
}).catch(function (err){
    console.log(err.message);
})
.then(function (orderId){
   return proceedToPayment(orderId)
}).then(function(paymentInfo){
     console.log(paymentInfo);
}).catch(function (err){
    console.log(err.message);
}).then(function (err){
    console.log("No matter what happens, I will definietely be called.");
})





function createOrder(cart)
{
     const pr  = new Promise(function (resolve, reject){
                //   createOrder 
                //   validateCart
                //  orderId

                if(!validateCart(cart)){
                    const err = new Error("Cart is not valid");
                    reject (err);
                }
                const orderId = "1223234";
                if(orderId){
                    setTimeout(function (){
                        resolve(orderId);
                        console.log("this happen");
                    },5000)
                }
     });
     return pr;
}

function proceedToPayment(){
    return new Promise(function (resolve, reject){
        resolve("Payment Successful"); 
    });
}

function validateCart(cart)
{
      return false;

}