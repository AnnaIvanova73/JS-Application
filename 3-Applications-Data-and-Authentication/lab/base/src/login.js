let form = document.querySelector('form');


const engineLogUser = async (httpRequest) => {
    const response = await fetch(`http://localhost:3030/users/login`, httpRequest);
    console.log(response)
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        sessionStorage.setItem('authToken', jsonResponse.accessToken);
        window.location.pathname = `index.html`;
    }
};

const loggUser = async (data) => {
    let dataBody = JSON.stringify(data);
    const httpRequestObject = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: dataBody
    }
    await engineLogUser(httpRequestObject).catch(err => {
        console.log(`Thrown in engineLogUser. Error msg: ${err}`);
    });
};

form.addEventListener('submit', e => {
    e.preventDefault();
    let newForm = new FormData(e.target);
    let email = newForm.get('email');
    let password = newForm.get('password');
    loggUser({email, password});
});
