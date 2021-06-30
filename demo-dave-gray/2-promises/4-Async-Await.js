const myUsers = {
    userList: []
}

const myCoolFunction = async () => {
    //1. first step
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //Status promise
    /*
    await -> tels to my code wait to get this results,
     from the fetch that request that from jsonplaceholder API, before doing what comes next
     */
    //2. second step
    const jsonUserData = await response.json(); //Response promise

    // console.log(jsonUserData)
    return jsonUserData; // that's is the user data/values, because response promise is fulfilled
}

myCoolFunction();

const anotherFunc = async () => {
    const data = await myCoolFunction(); //is returning data that comes from promises and than we could of log whatever we get
    myUsers.userList = data;
    //happens SECOND t
    console.log(myUsers.userList)// will get the data here, is delivered to the console after the empty array
}

anotherFunc();
//happens FIRST
console.log(myUsers.userList) //we get empty array is mistake , that will be executed before promise, is not within function, is not wat,
//when script executes, this dont wait and executes first. If we want the data should be in the function  anotherFunc();



/* async function two ways of use with arrow or with func declaration
1.
async function myCoolFunction() {
}
2.
const  myCoolFunction = async () => {
}
 */

/*
 To use key word await, must be in async function.
 In order to call our function and do something else with this data,
 should be happen in order again --->
 */