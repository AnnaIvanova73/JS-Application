//Abstract it all into single responsibility functions

const getDataFromForm = () => {
    const requestObject = {
        firstName: "Bruce",
        lastName: "Lee",
        categories: ["nerdy"]
    }
    return requestObject;
}

const buildRequestUrl = (requestData) => { // build request url function
   //1. // we can build diff url by getting diff data, we should have something else build in our program that would let us asign diff names or
    //pick diff categories
    return `https://api.icndb.com/jokes/random?firstName=${requestData.firstName}&lastName=${requestData.lastName}&limitTo=${requestData.categories}`;
}

const requestJoke = async (url) => {
    //2.// we end up requesting the joke
    const response = await fetch(url);
    const jsonResponse = await response.json();
    //const jokeObject = jsonResponse.value;
    const joke = jsonResponse.value.joke;
    postJokeToPage(joke);
}

const postJokeToPage = (joke) => {
    //and here is we're may work with the dom to actually post the joke to the page
    console.log(joke)
}

//Procedural "workflow" function --> this is actually the function that will be call by an event listener instead the getDataFromForm
//Say there is a click on a submit button or the submit value or just the submit event is trigger by press inner from a form
// it will call this function in the access process and it needs to be async function because its going to call an async function in action
const processJokeRequest = async () => {
    //Thi Procedural "workflow" function pulls it all together
    const requestData = getDataFromForm();
    const requestUrl = buildRequestUrl(requestData);
    await requestJoke(requestUrl);
    console.log("finished")
}

processJokeRequest(); // we can sett the function with some button in dom
