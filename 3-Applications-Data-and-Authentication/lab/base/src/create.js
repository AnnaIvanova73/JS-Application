const isInvalid = (pr1, pr2) => !pr1 || !pr2;
const getData = (data) => {
    let newData = new FormData(data);
    let name = newData.get('name');
    let imgUrl = newData.get('img');
    let ingredients = newData.get('ingredients');
    let steps = newData.get('steps');

    if (isInvalid(name, imgUrl, ingredients, steps)) {
        let result = [
            'Your recipe is missing somethings',
            `Recipe Name:${name}`,
            `Image URL:${name}`,
            `Ingredients:${name.join(', ')}`,
            `Preparation: ${steps.join(', ')}`

        ]
        throw new Error(`${result.join('\r\n')}`);
    }
    steps = steps.split('\r\n');
    ingredients = ingredients.split('\r\n');

    return {name, img: imgUrl, ingredients, steps}
}

const generateHttpRequest = (data) => {
    let currToken = sessionStorage.getItem('authToken');
    if (!currToken) {
        throw new Error('Missing register/logged user')
    }
    let requestedData = getData(data);
    let httpRequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(requestedData)
    }
    httpRequest.headers['X-Authorization'] = currToken;
    return httpRequest
}
const engineStartFetch = async (host, request) => {

    let response = await fetch(host, request);
    if (!response.ok) {
        throw new Error(`cannot fetch data, nothing is post`);
    }
    return await response.json();
}
const engineStartPromiseChain = async (data) => {
    let httpRequest = generateHttpRequest(data);
    let requestedUrl = `http://localhost:3030/data/recipes`
    await engineStartFetch(requestedUrl, httpRequest)
}
let createForm = document.querySelector('form');
createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await engineStartPromiseChain(e.target).catch(err => alert(err.message));
    window.location.pathname = `index.html`;
})