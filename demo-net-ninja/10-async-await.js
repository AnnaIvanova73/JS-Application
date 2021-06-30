//async & await

//When we call asynchronous function, ALWAYS returns a PROMISE,regardles what ever is in the body of the function. WILL RETURN PROMISE
const getTodos = async () => {

    const response = await fetch('todos/luigi.json');//returns promise
    const data = await response.json();//returns promise
    return data;
};

// const test = getTodos();
// console.log(test);

getTodos()
    .then(data => console.log('resolved:' , data)) //this is not BLOCKING IS STEAL PROMISE