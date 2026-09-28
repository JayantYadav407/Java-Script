# All about callback
 - **Callback** = a function given to another function to   be called later or at an appropriate point
 - it may be synchronous or asynchronous
 - The problems isn't simply that the code is nested.
 - The deeper problem is that as the number of asynchronous  dependencies increases, several problem appear,

  **1. Readability**
  **2. Error handling becomes difficult**

  **4. Error-first callback pattern**  
  **5. Return is often used after callback errors**
  **6. A callback should generally be invoked exactly once**

  **Inversion of control**
  - eg. doSomething(data, callback)
  - You give control of callback to doSomething.

  - trust issue with doSomething
  - call your callback
  - call it at the correct time
  - call it exactly once
  - pass the correct argumetns
  - handle errors correctly
  

  **7. Callback hell isn't only about indentation**
  - Its not only about Callback hell means deeply nested callbacks.
  - difficult error handling
  - difficult control flow
  - difficult testing
  - duplicated code
  - difficult composition
  - inversion of control
  - callbacks being called multiple times
  - callbacks never being called
  - managing multiple asynchronous operations
  
  **Don't forget callback execution context**
  - the method is being passed as a callback, and its **this** context isn't automatically preserved.
  - we need to use call, apply, and bind to preserve the **this** with function
  - this happen because the callback isn't executed immediately.
  - Don't think where was the function created think how is the function being called.
  - function don't permanently belong to an object
  - **this** belongs to the invocation not permanently to the function
  - Arrow function are special because they don't create thier own this.
  - Passing a function as a callback does not automatically preserve the receiver(this) from the original method call.
  - The distinction between function, method, and call site is extremely important.
  - the callback is not what makes the operation asynchronous the asynchronous API decicdes when to call the callback

# Attention all you need to know about Asynchronous
- You might think that the callback gets executed out of order due to the delay in setTimeout()
 - Place **await directly before the Promise-producing expression** whose result you need
 - **await** Pause this async function here until this Promise finishes.
 - await can normally be used inside an async function
 - await can used in the middle of an async function it doesn't have to be the first statment 
 - await pauses the async function, not the entire JavaScript program
 - async allows you to use **await**, and await waits for a Promise at that particular point in the async function
 - await itself does not sent to event loop but something interesting happens with **await function()/anything**
 - JavaScript efffectively treats the awaited value as an aleady-resoved promise for the purpose of resuming the async function it like **await Promise.resolve(10)** therefore, the function pauses and its continuation runs as microtask.
 - So getData() is synchronous, but everything after **await** is deferred to a microtask.
 
 **The exact rule you need to remember**
  
  - await someFunction(); has two separate parts
  - part1 - evaluate the expression **someFunction()**  this happen immediately/synchronously
  - part2 - **await its result** The async function pauses, and the code after await resumes through the microtask 
  
  - await does not send the function you're calling to the event loop. It calls that function normally. await only affects what happens after its returned value is awaited.
  - The value I'm waiting for represents an asynchronous result. Continue this async fucntion when that awaited result is settled
  - if getData already return 10, still it pause at all, because await provides a consistent asynchronous boundry
  - a Promise that finishes later
  - the JavaScript engine essentially schedules the continuation of the async function -- the code that needs to run after the **await**
  - An async function return a promise, if the functions returns a value, the promise is resolved with the value, but if the async function throws an error, the promise is rejected with the value
  - await is in an async function to ensure that all promises that are returned in the function are synchronized. With async/await, there's no use of callbacks. try and catch methods are also used to get rejection values of async functions
  - **The fetch() call itself is synchronous from JavaScript's perspective, even though the work it initiates is asynchronous**
  **Promise.all()** 
  - Give me the results only if EVERYONE succeeds. return Array of values
  - With promise.all returns raw values directly (no wrapper object)
  - response[0] IS the response object ->response.ok
  - 
  **Promise.allSettled()**
  - Tell me what happend to EVERYONE, whether they succeeded or failed. return Array of Status objects 
  - *.then()* always return a promise object
  - With promise.allSettled - returns wrapped outcome objects
  - outcomes[0] IS {status: "fulfilled", value:Response} -> outcome.value.ok
# All we need to know about fetch API

  **fetch API**
  - The fetch API provides an interface for fetching (sending/receiving) resources.
  - It uses Request and Response objects
  - let promise = fetch(url, [options])
  - It does not depend on the API whether the return type is JSON, string, array, etc. The initial return from fetch() is always a promise
  - Using JavaScript native fetch() API, .then() receives a Response stream object, not row JSON. we must explicitly convert it using .json();
  - fetch() handles the low-level response-stream
  - The Node.js version exposes more of those details.
  - https.get() -> response stream -> "data" events -> "end" events -> complete body -> JSON.parse()
  - fetch() -> response -> response.json() -> JavaScript object/array
  - fetch() only rejects if there is a network error (e.g., completely offline, bad domain name, CORS issue)

# All you need to know https
  
  - https.get()
  - https.get(url,callback) means make an HTTP GET request to this URL, and when the server responds, call my callback.
  - https.get("https://example.com",(response) =>{
  -  console.log(response);
  - });
  - The response is a response object supplied by Node.js
  - You don't call callback Node.js calls it when the server gives response
  - **response.statusCode**
  - it contains info about the http response
  - 200-> successful, 404 -> resource not found 500 -> server error
  - **response.on()**
  - The response is a **stream**
  - The server might send a large response in multiple pieces instead of giving you the entire response at once
  - **"end" vs "data"**
  - eventually the server finishes sending the response
  - Node.js emits the **"end"** event
  - response.on("data",...) give me each piece.
  - response.on("end" ...) tell me when all pieces have arrived.
  **Error**
  - request.on("error", error => {
    console.log(error);
     });
  - if the network request itself encounter an error, run this callback.
  **.on()** is not specifically an http function
  - it's an event-listening mechanism used by Node.js object such as streams and requests.
   **headers**
  - It's an options object passed to https.get()
  - send with https header along with request
  - http headers are metadata about the request/response 
  - User-Agent, Authorization Content-Type, Accept
  
    
  