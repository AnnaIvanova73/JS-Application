/*
Fetch API returns Promises on its own!
Another reason why we have promises , replacing the callbacks and for using fetch api is requesting data from another server, or another side of the web
and what can happen is we can have to wait we need to wait for that data to come back before we can worked with it, so we need to tell our code,
:- hey wait for this, and than do this, after we get it
 */

const myPromise = new Promise((resolve, reject) => {
    const error = false;
    //error = true; goes straight to the catch in this way we have no rejected state
    if (!error) {
        resolve("Yes! resolved the promise!");
    } else {
        reject("No! rejected the promise");
    }
});

const myNextPromise = new Promise((resolve, reject) => {
    setTimeout(function() { // setTimeout is part from window object, you can have window.setTimeout() (you can omet/moch window)
        resolve("myNextPromise resolved!")
    },3000);
});

myNextPromise.then(value =>{ //will catch up after 3 second
   console.log(value);
});

myPromise.then(value =>{
    console.log(value);
});
