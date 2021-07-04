const isInvalid = (pr1, pr2) => !pr1 || !pr2;

const engineStartPromiseChainServerSide = async (request) => {
    let response = await fetch('http://localhost:3030/users/register', request);
    let jsonResponse = await response.json();
    /*console.log(jsonResponse) ==> {code: 400, message: "Missing fields"} if input empty you already check that or {email: "anna.sdf.ivanova11@gmail.com", _createdOn: 1625417428958, _id: "5a32b5bb-36b3-4107-a8f6-ce67234ec666", accessToken: "5c979580a09a6f4946b547720fb87ce78ea3cd007e5ba7de50e0701fcfca6b9e"} */
    if (!response.ok) {
        throw new Error(`Something went wrong!${`\n`}responseUrl: ${JSON.stringify(response)}${`\n`}jsonResponse: ${JSON.stringify(jsonResponse)}`);
    }
    sessionStorage.setItem('authToken', jsonResponse.accessToken);
    window.location.pathname = `index.html`;
};

const registerUser = async (data) => {
    if (isInvalid(data.email, data.password)) {
        throw new Error(`Invalid email and/or password: ${data.email}`);
    }
    if (data.password !== data.rePass) {
        throw new Error('Passwords don\'t match');
    }
    const currBody = JSON.stringify(data);
    const httpRequest = {
        method: "post",
        headers: {'Content-type': 'application/json'},
        body: currBody
    }
    await engineStartPromiseChainServerSide(httpRequest);
}
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let regForm = new FormData(e.target);
    let email = regForm.get('email');
    let password = regForm.get('password');
    let rePass = regForm.get('rePass');

    await registerUser({email, password, rePass}).catch(err => {
        alert(err.message);
    });
})