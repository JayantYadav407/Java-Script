const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart);

promise.then(function (orderId){
    console.log(orderId);
}).catch(function (err){
    console.log(err.message);
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

function validateCart(cart)
{
      return false;

}