var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://restcountries.eu/rest/v2/name/Bulgaria", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));