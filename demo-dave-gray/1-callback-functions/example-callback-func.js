//Fetch API requires a discussion of...
//Callbacks, Promises, Thenables, and Async/Await

//Callbacks

function firstFunction(parameters, callback) {
    //do stuff
    callback();
}

// AKA "callback hell" -->
//In each level you going deeper, after away code gets hard to follow and each consecutive function that has own call back,
//add just another level of dense. Thats legacy code, promises is the way to note use callbacks
firstFunction(para, function () {
    //do stuff
    secondFunction(para, function () {
        thirdFunction(para, function () {

        });
    });
});