const isInvalid = (e) =>  e === '';
const throwIfInvalid = (flag,passFlag) => {
    if(flag || passFlag){
        throw new Error('All fields are mandatory')
    }
}

let formRegister = document.querySelector(`form[action="\/register"]`);

const buildRequestUrl = (endPoint) =>{
    return `http://localhost:3030/users/${endPoint}`
}
const enterUser = async (url,data) => {
    const postMethod = {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }
    let response = await fetch(url,postMethod);
    if(!response.ok){
        throw new Error('cannot fetch')
    }
    let jsonResponse = await response.json();
    localStorage.setItem('authToken',jsonResponse.accessToken);
    localStorage.setItem('authId',jsonResponse._id);
    window.location.pathname = `index.html`;
}
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    let currFormTarget = e.currentTarget;
    let newForm = new FormData(currFormTarget);
    let email = newForm.get('email');
    let password = newForm.get('password');
    let repass = newForm.get('rePass');

    let requestUrl = buildRequestUrl('register');
    try {

       let flagInput = [email,password,repass].some(isInvalid);
       let flagPasswords = Boolean(password !== repass);

        throwIfInvalid(flagInput,flagPasswords);
        await enterUser(requestUrl, {email, password});
    } catch (err) {
        console.log(err)
    }finally {
        currFormTarget.reset();
    }
})

let formLogin = document.querySelector(`form[action="\/login"]`);

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    let currFormTarget = e.currentTarget;
    let newForm = new FormData(currFormTarget);
    let email = newForm.get('email');
    let password = newForm.get('password');
    let requestUrl = buildRequestUrl('login');

    try {
        let flagInput = [email,password].some(isInvalid);
        throwIfInvalid(flagInput,false)
        await enterUser(requestUrl, {email, password});
    } catch (err) {
    console.log(err)
    }finally {

        currFormTarget.reset();
    }

})