//http://localhost:3030/jsonstore/phonebook

//--> JavaScript - Fetch
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:3030/jsonstore/phonebook", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

//--> HTTP
// GET /jsonstore/phonebook HTTP/1.1
// Host: localhost:3030