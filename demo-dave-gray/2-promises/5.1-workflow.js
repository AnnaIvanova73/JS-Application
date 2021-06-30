//workflow function

const getAllUserEmails = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //Status promise
    const jsonUserData = await response.json(); //Response promise

    const userEmailArray = jsonUserData.map(user => {
        return user.email;
    });

  postToWebPage(userEmailArray);
}

const postToWebPage = (data) =>{ //its call withing async function, but its call after we waited for the data to be ready,
    // we dont need to await nothing in this function
    //we already wait for our data
    console.log(data);
}

getAllUserEmails();

