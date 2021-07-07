function createElement(type, text, attributes = []) {
    let element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    attributes.map(attr => attr.split('=')).forEach(([name, value]) => {element.setAttribute(name, value);});
    return element;
}

const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

const createArticleDetails = (titleValue, imgValue, instructionArray, ingredientsArray) => {

    let article = createElement('article');
    let title = createElement('h2', titleValue);
    let divClassBand = createElement('div', null, ['class=band']);

    let divImgElement = createElement('div', null, ['class=thumb']);
    let imgElement = createElement('img', null, [`src=${imgValue}`]);
    divImgElement.appendChild(imgElement);

    let divIngredients = createElement('div', null, ['class=ingredients']);
    let describeElementIngr = createElement('h3', `Ingredients:`);
    let ulIngr = createElement('ul', null);

    ingredientsArray.forEach(ingredient => {
        let li = createElement('li', ingredient);
        ulIngr.appendChild(li);
    })

    appendChildren(divIngredients, [describeElementIngr, ulIngr]);
    appendChildren(divClassBand, [divImgElement, divIngredients]);

    let divDescription = createElement('div', null, ['class=description']);
    let preparationH3 = createElement('h3', `Preparation`);
    divDescription.appendChild(preparationH3);

    instructionArray.forEach(instruction => {
        let p = createElement('p', instruction);
        divDescription.appendChild(p);
    });

    appendChildren(article, [title, divClassBand, divDescription])
    return article;
};

const renderDetailedRecipeOnDom = (data) => {
    let values = Object.values(data);
    return createArticleDetails(values[1], values[2], values[3], values[4]);
};

const createArticlePreviews = (_id, name, img) => {
    let id = _id;
    let article = createElement('article', null, ['class=preview']);
    let divTitleElement = createElement('div', null, ['class=title']);
    let title = createElement('h2', name);
    divTitleElement.appendChild(title);

    let divImgElement = createElement('div', null, ['class=small']);
    let imgElement = createElement('img', null, [`src=${img}`]);
    divImgElement.appendChild(imgElement);
    appendChildren(article, [divTitleElement, divImgElement]);
    article.addEventListener('click', async () => {
        let jsonResponse = await engineStartAction(`details/${id}`).catch(err => console.error(err));
        let replaceElement = renderDetailedRecipeOnDom(jsonResponse);
        article.parentNode.replaceChild(replaceElement, article);
    })
    return article;
};

const renderRecipesOnDom = (data) => {
    let values = Object.values(data);
    let main = document.querySelector('main');
    Array.from(main.childNodes).forEach(e => e.remove());
    values.forEach(({_id, name, img}) => {
        let article = createArticlePreviews(_id, name, img)
        main.appendChild(article);
    })
};


const fetchServerResponse = async (url) => {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error');
    }
    return await response.json();
};

const buildRequestUrl = (endPoint) => {
    return `http://localhost:3030/jsonstore/cookbook/${endPoint}`
};

const engineStartAction = async (endPoint) => {
    let requestUrl = buildRequestUrl(endPoint);
    return await fetchServerResponse(requestUrl);
}

window.addEventListener('load', async () => {
    let jsonResponse = await engineStartAction('recipes').catch(err => console.error(err));
    renderRecipesOnDom(jsonResponse);
});
