/*
const requestJoke = async (firstName,lastName) => {

    const response = await fetch(`https://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`);
    const jsonResponse = await response.json();
    //console.log(jsonResponse.value) --> {id: 597, joke: "Once death had a near Clint Eastwood experience.", categories: Array(0)}
    console.log(jsonResponse.value.joke)


}
requestJoke("Clint","Eastwood"); */
const requestJoke = async (firstName,lastName) => {

    const response = await fetch(`https://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=[nerdy]`);
    const jsonResponse = await response.json();
    //console.log(jsonResponse.value) --> {id: 597, joke: "Once death had a near Clint Eastwood experience.", categories: Array(0)}
    console.log(jsonResponse.value.joke)


}
requestJoke("Clint","Eastwood");
