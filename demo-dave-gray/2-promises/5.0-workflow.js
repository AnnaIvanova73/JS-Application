//workflow function

const getAllUserEmails = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //Status promise
    const jsonUserData = await response.json(); //Response promise

    const userEmailArray = jsonUserData.map(user => {
        return user.email;
    }); // this will give us a user function array, then we can return that or just logged to the console

    //console.log(userEmailArray)
    return userEmailArray; // we CAN'T used, we get promise, we CAN passed to another function
}

console.log(getAllUserEmails())//IT WILL BE AGAIN PROMISE PENDING, THIS IS NOT WITHIN THE FUNCTION.IS NOT WAITING FOR RESULT
//WILL BE EXECUTED FIRST AND WI RECEIVE NOT DATA BUT Promise {<pending>}




