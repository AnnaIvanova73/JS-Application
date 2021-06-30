// fetch api
// either resolve or reject if there id error
//The promise is only ever rejected if we have somekind of network error,
// for example if we're offline or we can't reach the api for some reason
// if we just mistype the url over here --> fetch('todos/luigi.json'),
// or the end point or the recourse then we don't get a rejection it's not rejected
//instead it's still resolved and we get the response however in the response if we expanded,
// wi will see that we have a status 404 - the result not found


//3 steps
//1. we fetch the data
//2. we take the response and we return the response.js (returns a promise)
// we can tack on dot then to here inside we fire a function where we actually have access to that data
//3. we can catch the error in the end
fetch('todos/luigi.json').then((response) => { //if resolve
    console.log('resolve', response)
   // const data = response.json();
    return response.json();
}).then(data => {
    console.log(data)
}).catch(() => { // if reject

});