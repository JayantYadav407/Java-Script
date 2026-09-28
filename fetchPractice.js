const https = require("https");


async function getdata() {

    const val = await fetch("https://jsonplaceholder.typicode.com/users").then(value => {

        return value.json()
    })

    const post = await Promise.all(val.map((user) => {
        let id = user.id;
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    }))
    const resolvepost = await Promise.all(post.map((curr) => {
        return (curr.json())
    }));

    const comment = await Promise.all(val.map((curr) => {
        return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${curr.id}`)
    }))

    const resolveComment = await Promise.all(comment.map((comment) => {
        return comment.json();
    }))
    console.log(resolveComment)
}

// getdata()

function thenToCallbac() {
    // A promise that simulates fetching repository data
    const checkRepoStatus = new Promise((resolve, reject) => {
        const isServerOnline = false; // Change to false to trigger rejection

        if (isServerOnline) {
            resolve({ repoName: 'octocat/test-repo1', stars: 14062 });
        } else {
            reject('Server is offline. Could not fetch repository.');
        }
    });

    // Passing TWO callback functions to .then()
    checkRepoStatus.then(
        // 1st Callback: Success handler (Runs on resolve)
        (data) => {
            console.log(`Success! ${data.repoName} has ${data.stars} stars.`);
        },

        // 2nd Callback: Error handler (Runs on reject)
        (error) => {
            console.error(`Error: ${error}`);
        }
    );
}
 

async function gitUser() {

    const user = await fetch("https://api.github.com/users/octocat")

    const resolveUser = await user.json()
    const repo = await fetch("https://api.github.com/users/octocat/repos")
    const repoData = await repo.json();

    const repoName = repoData.map((curr) => {
        const { watchers, language, stragazers_count, watchers_count, clone_url } = curr;
        return { name: clone_url.replaceAll("'").split('/').at(-1), stars: watchers, language }

    })
    // console.log(repoName);
    // console.log(repoData);
}

function getGitUserPromise() {
    const promise = fetch("https://api.github.com/users/octocat/repos")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            return data.map((curr) => {
                const { language, watchers, clone_url } = curr
                return { name: clone_url.replaceAll("'").split("/").at(-1), stars: watchers, language: language }
            })
        })
        .then(repo => {
            console.log(repo)
            return 100;
        })
        .catch(error => console.log(error));
}


function getGitUserCallback(callback) {
    https.get("https://api.github.com/users/octocat/repos", {
        headers: {
            "User-Agent": "Node.js"
        }
    }, (response) => {

        if (response.statusCode < 200 || response.statusCode >= 300) {
            callback(new Error(`HTTP Error: ${response.statusCode}`));
            return;
        }

        let body = "";
        // response.on(eventName, callback)
        response.on("data", chunk => {
            body += chunk;
        });

        response.on("end", () => {

            let data;

            try {
                data = JSON.parse(body);
            } catch (error) {
                callback(error);
                return;
            }

            const repos = data.map(curr => {
                const {
                    language,
                    watchers,
                    clone_url
                } = curr;

                return {
                    name: clone_url.split("/").at(-1),
                    stars: watchers,
                    language
                };
            });

            callback(null, repos);
        });

    }).on("error", error => {
        callback(error);
    });
}

function print(err, data) {
    if (err) {
        throw err;
    }
    else {
        console.log(data);
    }
}




async function concurrent() {
    const cart = [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 3 },
        { productId: 3, quantity: 1 }
    ]
    const quantity ={
        1:2,
        2:3,
        3:1
    }
    const data = await Promise.all(cart.map((curr) => {
        return fetch(`https://fakestoreapi.com/products/${curr.productId}`)
    }))
    const dataJson = await Promise.all(data.map((curr)=>{
        return curr.json();
    }))

   const val =  dataJson.map((curr) =>{
        const  {id, title, price, category, image, rating} = curr;
        return {id,title, price, category, image, rating, total:price*(quantity[id])};
    })
    console.log(val);
}
async function partial (){

    const url = ["https://jsonplaceholder.typicode.com/users/2",
"https://jsonplaceholder.typicode.com/users/2",
"https://jsonplaceholder.typicode.com/users/999999",
"https://jsonplaceholder.typicode.com/users/4"]

    const data = await Promise.allSettled(url.map((curr)=>{
        return fetch(curr);
    }))
    // console.log(data);
     const dataJson = 
     await Promise.allSettled(data.map((curr) =>{
         if(curr.status ==="rejected")
         {
            return "Data not fetched";

         }
        const response = curr.value

        if(response.ok){
            return response.json()
        }
        return "Promise got rejected"
     }))
     
   
}
// partial()

async function dependecy(){
    
    
    const userData =  await fetch("https://jsonplaceholder.typicode.com/users") 
    if(!userData.ok){
        throw Error("Data not fetch")
    }
    const user = await userData.json();
    
    const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts")
    if(!postResponse.ok){
        throw new Error(`HTTP Error ${postResponse.status}`)
    }
    const post = await postResponse.json();
    
    const commentResponse = await fetch("https://jsonplaceholder.typicode.com/comments")
    if(!commentResponse.ok){
        throw new Error(`HTTP Error ${commentResponse.status}`)
    }
    const comment = await commentResponse.json()
    
    console.log(user[0]);
    console.log(post[0]);
     console.log(comment[0]);

    const solution = user.reduce((acc, curr)=>{
                   const posts = post.filter((curr2)=>{
                         return curr2.userId === curr.id
                   })
                   const first3PostId = posts.slice(0,3).map((curr)=>{
                    return  curr.id
                   })
                   
                   const firstThreePostAllComment = comment.filter((curr) =>{
                       if(first3PostId.includes(curr.postId)){
                           return true;
                        }
                        return false;
                    })
                    console.log(firstThreePostAllComment);
                   
                    
                    return acc;
    },[])
    // console.log(solution);
}

// dependecy();

const sleep = (delay) => new Promise((resolve) =>setTimeout(resolve(0),delay))
async function getData(url, retries){
       if(retries <= 0)
         return
       
       try{
            const data = await fetch(url)            
            if(!data.ok){
                throw Error(data.status)
            }
             
            return data;
       }catch(error){
            console.log(`Server error ${error} ${retries}`)
              
            const delay = 5000*(3-retries+1)
             sleep(delay)

            const val = await getData(url , retries-1)
            return val
        }

}
async function fetchRetry (url, retries){
    
          
              const response = await getData(url, retries) 
              
              console.log(response)
          
          
}
fetchRetry("https://jsonplaceholder.typicode.com/users/1j",3)