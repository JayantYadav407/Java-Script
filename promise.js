// const cart = ["shoes", "pants", "kurta"];

 

//  createOrder(cart)
//  .then(function (orderId){
//     console.log(orderId);
//     return orderId;
// }).catch(function (err){
//     console.log(err.message);
// })
// .then(function (orderId){
//    return proceedToPayment(orderId)
// }).then(function(paymentInfo){
//      console.log(paymentInfo);
// }).catch(function (err){
//     console.log(err.message);
// }).then(function (err){
//     console.log("No matter what happens, I will definietely be called.");
// })

// function createOrder(cart)
// {
//      const pr  = new Promise(function (resolve, reject){
//                 //   createOrder 
//                 //   validateCart
//                 //  orderId

//                 if(!validateCart(cart)){
//                     const err = new Error("Cart is not valid");
//                     reject (err);
//                 }
//                 const orderId = "1223234";
//                 if(orderId){
//                     setTimeout(function (){
//                         resolve(orderId);
//                         console.log("this happen");
//                     },5000)
//                 }
//      });
//      return pr;
// }

// function proceedToPayment(){
//     return new Promise(function (resolve, reject){
//         resolve("Payment Successful"); 
//     });
// }

// function validateCart(cart)
// {
//       return false;

// }

// const p1 = new Promise((resolve,reject) =>{
//     setTimeout(() => resolve("p1 Success"),3000);
// });

// const p2 =  new Promise((resolve, reject) =>{
//     setTimeout(() => resolve("P2 Success"), 1000);
// });

// const p3 = new Promise((resolve, reject) =>{
//     setTimeout(() => resolve("p3 Success"),2000)
// });

// Promise.all([p1, p2, p3]).then(res =>{
//     console.log(res);
// });




// const hungry = true;
// console.log("this synchronous");

// async function getData (){

//     const eat = await new Promise (function (resolve, reject){
//         if(hungry){
//             const fastfood = {
//                 activity:'Cook noodles',
//                 location: 'Market Square'
//             };
//             resolve(fastfood)
//         } else{
//             reject (new Error ('Not hungry'))
//         }
//     });
//     console.log(eat);
//     return eat;
    
// }
// console.log(getData());

// console.log("this is end of synchronous");


// async function calculate (){
//     console.log("start");

//     const data = await getData();
    
//     console.log(data);

//     const result = await processData(data);

//     console.log(result);

//     console.log("End");
// }
// function getData(){
//     let c  = 0;
//     for(let i = 0; i < 10; i++)
//     {
//          c +=1;
//          console.log(c);
//     }
//     console.log (c);
//     return c;
// }
// function processData(data)
// {
//     return data+3403;
// }
// calculate();

// console.log("this is printing happend");


// async function test (){
//     console.log("A");
//     await new Promise(resolve => setTimeout(resolve,2000));

//     console.log("B");
// }

// test();
// console.log("C");

// const hungry = false;

// const eat = new Promise (function (resolve, reject){
//     if(hungry){
//         const fastfood = {
//             activity: 'Cook noodles',
//             location: 'Market Square'
//         };
//         resolve(fastfood);
//     } else{
//         reject (new Error ('Not hungry'))
//     }
// });

// const willEat = function(){
//     eat
//     .then(function (hungry){
//      console.log('Going to eat noodles!')
//      console.log(hungry);
//     })
//     .catch(function(error){
//         console.log(error.message);
//     })

// }

// const foodTour = function (fastfood){
//     return new Promise(function (resolve, reject){
//         const response = `I'm going on a food tour at ${fastfood.location};`

//         resolve(response);
//     })
// }

// willEat();

// async function getJobAsync ()
// {
//      let response = await fetch (`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`);

//      let data = await response.json();
//      return data;
// }

// getJobAsync('jobPositionHere').then(data =>console.log(data));


// const getResult = async (request) =>{
//     let response = await new Promise((resolve, reject) =>{
//         request((err,res, body) =>{
//             if(err) return reject (err);
//              try{
//                 resolve(JSON.parse(body));
//              } catch (error){
//                 reject(error);
//              }

//         });
//     });

//     try {
//         console.log(response);
//     } catch (err){
//         console.log(err);
//     }
// }

// getResult();

// console.log("this is how to return async JavaScript");

// const promise = new Promise((resolve, reject) =>{
//     resolve(42);
// });

// promise.then(val =>{
//     console.log(val);
// })

// const promise = new Promise((resolve, reject) =>{
//     throw new Error("Oops!");
// })

// promise.catch((reason) =>{
//     console.log(reason.name);
//     console.log(reason.type);
//     console.log(reason.message);
// })

// let result;

// setTimeout(function (){
//     result = 5;
//     console.log(result);
// },5000);

// function name()
// {
//     result  = 10;
// }
// name()
// console.log(result);


let p1 = new Promise((resolve, reject) =>{
    resolve(1);
})

let p2 = new Promise((resolve, reject) =>{
     setTimeout(resolve,1000, 2);
});

// Promise.all([p1, p2]).then(() =>{
//     console.log("Both the promises have been resolved successfully");
// })

let promise1 = new Promise((resolve, reject) =>{
    setTimeout(resolve(3),50000000);
});

let promise2 = new Promise((resovle, reject) =>{
    resovle(100);
});

Promise.race([promise1, promise2]).then((fromRes) =>{
    console.log(fromRes);
})