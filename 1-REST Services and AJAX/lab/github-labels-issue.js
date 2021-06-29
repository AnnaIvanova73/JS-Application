var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://api.github.com/repos/testnakov/test-nakov-repo/issues/1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));