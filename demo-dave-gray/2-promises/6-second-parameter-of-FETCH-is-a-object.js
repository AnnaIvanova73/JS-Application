//2nd parameter of Fetch is a object

const getDadJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com",{
        method:"GET", //default is GET method
        headers: {
            //Accept: "application/json" this is the type of data that we're planing to receive
            Accept: "text/plain"
        }
    });
    //const jsonJokeData = await response.json();
    //console.log(jsonJokeData.joke)

    const textJokeData = await response.text();
    console.log(textJokeData);
}
getDadJoke();
