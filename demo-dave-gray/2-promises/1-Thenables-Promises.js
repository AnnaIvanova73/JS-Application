/*Promises can have 3 states
--> Pending
--> Fulfilled
--> Rejected
Promises will delivered asynchronous/async code, JavaScript is usually synchronous, meaning doing what thing at the time.
But promises are kind a like:
:- "Hey man, I promise I'll pay back tomorrow if you loan me the money today."
:- "You go ahead and I'll catch up, once I'm finish with my task over here"
So a promise could be pending while some other js code goes ahead and executes, promises could be working in that time.
So in other words you actually executing two diffrent block of codes in that regards.
 */

const myPromise = new Promise((resolve, reject) => {
    const error = false;
    //error = true; goes straight to the catch in this way we have no rejected state
    if(!error){
        resolve("Yes! resolved the promise!");
    }else{
        reject("No! rejected the promise");
    }
});

console.log(myPromise)
//==> returns the state of the promise is not actually returning the value
/*
Promise {<fulfilled>: "Yes! resolved the promise!"}
__proto__: Promise
catch: ƒ catch()
constructor: ƒ Promise()
finally: ƒ finally()
then: ƒ then()
Symbol(Symbol.toStringTag): "Promise"
__proto__: Object
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: "Yes! resolved the promise!"
 */

//to get the value out of a promise we need to chain.

//Thenables
myPromise.then(value => {

    console.log(value);
    return value + 1; //modify data

})
    .then(newValue => { // the return value + 1 will be newValue
    console.log(newValue)
})
    .catch(err => {

        console.log(err); //Whenever encounts the error skip all chain and goes straight to the catch
    })
