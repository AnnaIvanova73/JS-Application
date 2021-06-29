//Use Postman to make the same request;
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://restcountries.eu/rest/v2/name/Bulgaria", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

//Make a request that retrieving only the fields name, capital, region, population for the country Italy.
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://restcountries.eu/rest/v2/name/Italy?fields=name;capital;currencies;population", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

// //http
// GET /rest/v2/name/Italy?fields=name;capital;currencies;population HTTP/1.1
// Host: restcountries.eu

//https://restcountries.eu/rest/v2/name/Italy?fields=name;capital;currencies;population
//encodeURIComponent('name;capital;currencies;population')
//https://restcountries.eu/rest/v2/name/Italy?fields=name%3Bcapital%3Bcurrencies%3Bpopulation

//Make a request that takes all German-speaking countries.
//https://restcountries.eu/rest/v2/lang/de

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://restcountries.eu/rest/v2/lang/de", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));