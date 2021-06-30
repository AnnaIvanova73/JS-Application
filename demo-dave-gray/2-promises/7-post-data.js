//2nd parameter of Fetch is a object

const jokeObject = {
    id: "XgVnOK6USnb",
    joke: "You know that cemetery up the road? People are dying to get in there."
}

const postData = async (jokeObject) => {

    const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        "body":JSON.stringify(jokeObject)
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse)


}
postData(jokeObject);
