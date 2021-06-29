//http://localhost:3030/jsonstore/bus/businfo/1287
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:3030/jsonstore/bus/businfo/1287", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));