/* 1.
const users = fetch("https://jsonplaceholder.typicode.com/users");

pending
console.log(users) //display the state of the promise, if you want value this will be mistake
 result from console.log() --->
Promise{<pending>}__proto__: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: Response
*/


//2 fetch return promise,
const users = fetch("https://jsonplaceholder.typicode.com/users").then(response => { //we get the response from API, but its not ready to work yet
    console.log(response) // its not ready to work yet
    /* result from console.log() ---> this is readable stream, it's not yet data that we can work with
     Response{type: "cors", url: "https://jsonplaceholder.typicode.com/users", redirected: false, status: 200, ok: true,…}
     body: ReadableStream body mixin
    */
    return response.json() // we have json, json method also return promise
})
    .then(data => {
        console.log(data); //now we get data  result from console.log() --->  (10)[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}];
        /*
        So once we get a data we can work with it, but we needs to remember that is withnin this block in this anonymous function,
        we can just suddenly take the data out into a global area here, because that's not execute order in the same order. This chain
        is the same order. Outside of this it we go ahead and executhing data into our file before this is complete
         */

        data.forEach(user => {
            console.log(user);
        })
    });

console.log(users) // we get pending promise state first and then we get all from the chain, because this have to go back and get the data and it's
//waithing

//Each on of 'then' returns promise as we go throughout the Thenables chain. Everything in thenable chain will execute, one after another,
//everything else in the code, will be executed first
