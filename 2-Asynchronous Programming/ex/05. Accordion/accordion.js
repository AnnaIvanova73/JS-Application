window.onload = function solution() {
    function createElement(type, text, attributes = []) {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {element.setAttribute(name, value);});
        return element;
    }

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

    const renderArticlesOnDom = async (data) => {
        let arr = Object.entries(data).map(e => {
            return {id: e[1]._id, title: e[1].title}
        });
        let mainElement = document.querySelector('#main');

        arr.forEach(e => {
            let divAccordion = createElement('div', null, ['class=accordion']);

            let divHead = createElement('div', null, ['class=head']);
            let spanTitle = createElement('span', e.title);
            let btnMore = createElement('button', 'More', ['class=button', `id=${e.id}`]);
            appendChildren(divHead, [spanTitle, btnMore]);

            let divExtra = createElement('div', null, ['class=extra']);
            divExtra.style.display = 'none';
            let pContext = createElement('p');
            divExtra.appendChild(pContext);

            btnMore.addEventListener('click', (ev) => {

                if( ev.target.textContent === 'More'){
                    engineStartPromiseChain(e.id, divExtra, btnMore)
                }else{
                    divExtra.style.display = 'none'
                    btnMore.textContent = 'More';
                }
            });

            appendChildren(divAccordion, [divHead, divExtra]);
            mainElement.appendChild(divAccordion)

        });
    };

    const requestArticleContext = (data, div, button) => {
        button.textContent = 'Less';
        div.lastChild.textContent = data.content
        div.style.display = 'block';
    };
    const requestDataFromApi = async (url) => {
        let response = await fetch(url);
        return await response.json();
    };
    const buildRequestUrl = (requestData) => {
        return requestData ? `http://localhost:3030/jsonstore/advanced/articles/details/${requestData}` :
            `http://localhost:3030/jsonstore/advanced/articles/list`

    };

    const engineStartPromiseChain = async (data, div, button) => {
        let requestUrl = buildRequestUrl(data);
        let responseJsonDataTitles = await requestDataFromApi(requestUrl);
        if (data) {
            requestArticleContext(responseJsonDataTitles, div, button);
        } else {
            renderArticlesOnDom(responseJsonDataTitles);
        }

    };
    engineStartPromiseChain();
}

