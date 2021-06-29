//JavaScript Fetch request

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "person": "<person>",
    "phone": "<phone>"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("http://localhost:3030/jsonstore/phonebook", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


//--> HTTP request
/*
POST /jsonstore/phonebook HTTP/1.1
Host: localhost:3030
Content-Type: application/json
Content-Length: 53

{
"person": "<person>",

"phone": "<phone>"
}
 */

/*--> responce :
{
    "person": "<person>",
    "phone": "<phone>",
    "_id": "e309eeb1-611b-44f8-a95e-9901883ba057"
}
*/
