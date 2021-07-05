function attachEvents() {
    const IS_INVALID = (pr1, pr2) => !pr1 || !pr2;
    let id = -1;

    function createElement(type, text, attributes = []) {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            element.setAttribute(name, value);
        })
        return element;
    }

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

    const buildRequestUrl = (endPoint) => {
        return endPoint ? `http://localhost:3030/jsonstore/collections/books/${endPoint}` :
            `http://localhost:3030/jsonstore/collections/books `
    };

    document.querySelector('#loadBooks').addEventListener('click', async () => {
        await getRequestWorkflow().catch(err => {
            alert(err.message);
        });
    });
    const getRequestWorkflow = async () => {
        const requestUrl = buildRequestUrl();
        await requestGetDataFromServer(requestUrl, {method: 'GET'});
    };


    const requestGetDataFromServer = async (url, httpRequest) => {
        const response = await fetch(url, httpRequest);
        if (!response.ok) {
            throw new Error(`Cannot fetch, error occurred in func requestFromServer.\r\rResponse: ${response}`);
        }
        const jsonResponse = await response.json();
        renderDataOnDom(jsonResponse);
    };

    const renderDataOnDom = (data) => {
        let bodyTable = document.querySelector('tbody');
        Array.from(bodyTable.children).forEach(e => e.remove());

        Object.entries(data).forEach(entry => {
            let [key, e] = entry;
            let row = createElement('tr');
            const book = createElement('td', e.title);
            const author = createElement('td', e.author);
            let wrapperButtons = createElement('td');
            const editBtn = createElement('button', `Edit`);
            const deleteBtn = createElement('button', `Delete`);
            deleteBtn.addEventListener('click', async () => {
                row.remove();
                let requestUrl = buildRequestUrl(key);
                await requestDataFromServer(requestUrl, {method: 'delete'}).catch(err => {console.log(err)});
            });
            editBtn.addEventListener('click', async () => {
                document.querySelector('input[name="title"]').value = e.title;
                document.querySelector('input[name="author"]').value = e.author;
                id = key;
            });
            appendChildren(wrapperButtons, [editBtn, deleteBtn]);
            appendChildren(row, [book, author, wrapperButtons]);
            bodyTable.appendChild(row);
        });
    };

    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = getDataFromForm(e.target);
        try {
            if (id !== -1) {
                await triggerPostOrPutRequest(id, data, 'put')
            } else {
                await triggerPostOrPutRequest(false, data, 'post')
            }
            await getRequestWorkflow()
        } catch (err) {
            console.log(err)
        } finally {
            Array.from(e.target.querySelectorAll(`input`)).forEach(e => e.value = ``);
            id = -1
        }
    });

    const getDataFromForm = (form) => {
        const newForm = new FormData(form);
        if (IS_INVALID(newForm.get('title'), newForm.get('author'))) {
            throw new Error(`All fields are required`);
        }
        return {
            title: newForm.get('title'),
            author: newForm.get('author'),
        }
    };

    const triggerPostOrPutRequest = async (endPoint, data, requestType) => {
        let requestUrl = buildRequestUrl(endPoint);
        let requestMethod = {
            method: requestType,
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }
        await requestDataFromServer(requestUrl, requestMethod);

    };
    const requestDataFromServer = async (url, httpRequest) => {
        const response = await fetch(url, httpRequest);
        if (!response.ok) {
            throw new Error(`Cannot fetch, error occurred in func requestFromServer.\r\rResponse: ${response}`);
        }
        return await response.json();
    };
}

attachEvents();

/*
function attachEvents() {
    const IS_INVALID = (pr1, pr2) => !pr1 || !pr2;
    let id = -1;

    function createElement(type, text, attributes = []) {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            element.setAttribute(name, value);
        })
        return element;
    }

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

    const buildRequestUrl = (endPoint) => {
        return endPoint ? `http://localhost:3030/jsonstore/collections/books/${endPoint}` :
            `http://localhost:3030/jsonstore/collections/books `
    };


    const renderDataOnDom = (data) => {
        let bodyTable = document.querySelector('tbody');
        Array.from(bodyTable.children).forEach(e => e.remove());

        Object.entries(data).forEach(entry => {
            let [key, e] = entry;
            let row = createElement('tr');
            const book = createElement('td', e.title);
            const author = createElement('td', e.author);
            let wrapperButtons = createElement('td');
            const editBtn = createElement('button', `Edit`);
            const deleteBtn = createElement('button', `Delete`);
            deleteBtn.addEventListener('click', async () => {
                row.remove();
                let requestUrl = buildRequestUrl(key);
                await requestDataFromServer(requestUrl, {method: 'delete'});
            });
            editBtn.addEventListener('click', async () => {
                document.querySelector('input[name="title"]').value = e.title;
                document.querySelector('input[name="author"]').value = e.author;
                id = key;
            });
            appendChildren(wrapperButtons, [editBtn, deleteBtn]);
            appendChildren(row, [book, author, wrapperButtons]);
            bodyTable.appendChild(row);
        });
    };

    const requestGetDataFromServer = async (url, httpRequest) => {
        const response = await fetch(url, httpRequest);
        if (!response.ok) {
            throw new Error(`Cannot fetch, error occurred in func requestFromServer.\r\rResponse: ${response}`);
        }
        const jsonResponse = await response.json();
        renderDataOnDom(jsonResponse);
    };
    const getRequestWorkflow = async () => {
        const requestUrl = buildRequestUrl();
        await requestGetDataFromServer(requestUrl, {method: 'GET'});
    };

    document.querySelector('#loadBooks').addEventListener('click', async () => {
        await getRequestWorkflow().catch(err => {
            alert(err.message);
        });
    });

    const getDataFromForm = (form) => {
        const newForm = new FormData(form);
        if (IS_INVALID(newForm.get('title'), newForm.get('author'))) {
            throw new Error(`All fields are required`);
        }
        return {
            title: newForm.get('title'),
            author: newForm.get('author'),
        }
    };
    const requestDataFromServer = async (url, httpRequest) => {
        const response = await fetch(url, httpRequest);
        if (!response.ok) {
            throw new Error(`Cannot fetch, error occurred in func requestFromServer.\r\rResponse: ${response}`);
        }
        return await response.json();
    };

    const triggerPostOrPutRequest = async (endPoint, data, requestType) => {
        let requestUrl = buildRequestUrl(endPoint);
        let requestMethod = {
            method: requestType,
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }
        await requestDataFromServer(requestUrl, requestMethod);

    };

    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = getDataFromForm(e.target);
        try {
            if (id !== -1) {
                await triggerPostOrPutRequest(id, data, 'put')
            } else {
                await triggerPostOrPutRequest(false, data, 'post')
            }
            await getRequestWorkflow()
        } catch (err) {
            console.log(err)
        } finally {
            Array.from(e.target.querySelectorAll(`input`)).forEach(e => e.value = ``);
            id = -1
        }
    });

}

attachEvents();
 */