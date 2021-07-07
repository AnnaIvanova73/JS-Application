function solution() {
    function createElement(type, text, attributes = []) {
    let element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    attributes.map(attr => attr.split('=')).forEach(([name, value]) => {element.setAttribute(name, value);})
    return element;
}
const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));
    fetch(`http://localhost:3030/jsonstore/advanced/articles/list`)
        .then(response =>response.json())
        .then(data=>{
            renderArticlesOnDom(data);
        });

    const renderArticlesOnDom =  (data) => {
        let arr = Object.entries(data).map(e => {
            return {id: e[1]._id, title: e[1].title}
        });
        let mainElement = document.querySelector('#main');

        arr.forEach(e => {
            let divAccordion = createElement('div', null, ['class=accordion']);

            let divHead = createElement('div', null, ['class=head']);
            let spanTitle = createElement('span', e.title);
            let btnMore = createElement('button', 'More', ['class=button']);
            appendChildren(divHead, [spanTitle, btnMore]);

            let divExtra = createElement('div', null, ['class=extra']);
            divExtra.style.display = 'none';
            let pContext = createElement('p');
            divExtra.appendChild(pContext);

            btnMore.addEventListener('click', (ev) => {
                if( ev.target.textContent === 'More'){
                    fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.id}`)
                        .then(response => response.json())
                        .then(data => {
                            btnMore.textContent = 'Less';
                            divExtra.lastChild.textContent = data.content
                            divExtra.style.display = 'block';
                        }).catch(err => console.log(err));

                }else if( ev.target.textContent === 'Less'){
                    divExtra.style.display = 'none'
                    btnMore.textContent = 'More';
                }
            });

            appendChildren(divAccordion, [divHead, divExtra]);
            mainElement.appendChild(divAccordion)

        });
    };
}
solution()