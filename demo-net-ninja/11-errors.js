//async & await

//When we call asynchronous function, ALWAYS returns a PROMISE,regardless what ever is in the body of the function. WILL RETURN PROMISE
const getTodos = async () => {

    const response = await fetch('todos/luigi.json');//returns promise

    //If we throw new Error inside async func, the promise that is return is rejected and we can catch it
    if(response.status !== 200){
        throw new Error('cannot fetch the data')
    }
    const data = await response.json();//returns promise
    return data;
};

// const test = getTodos();
// console.log(test);

getTodos()
    .then(data => console.log('resolved:' , data)) //this is not BLOCKING IS STEAL PROMISE
    .catch(err => console.log('error',err.message));