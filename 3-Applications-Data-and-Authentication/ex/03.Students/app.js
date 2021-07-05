function attachEvents() {
    const ERROR_MSG = `Uppps something went wrong. Apparently... this is happening: -->\r\n`;
    const IS_INVALID = (pr1, pr2, pr3, pr4) => !pr1 || !pr2 || !pr3 || !pr4;

    function createElement(type, text, attributes = []) {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            element.setAttribute(name, value);
        });
        return element;
    }

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

    const getDataFromForm = (data) => {
        let newForm = new FormData(data);

        if (IS_INVALID(newForm.get('firstName').trim(), newForm.get('lastName').trim(),
            newForm.get('facultyNumber').trim(),
            newForm.get('grade').trim())) {

            throw new Error(`Invalid input. All fields are required!`);
        }
        return {
            firstName: newForm.get('firstName'),
            lastName: newForm.get('lastName'),
            facultyNumber: newForm.get('facultyNumber'),
            grade: newForm.get('grade')
        };
    };
    const buildRequestUrl = () => {
        return `http://localhost:3030/jsonstore/collections/students`;
    };

    const buildPostMethod = (data) => {
        return {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }
    };

    const processWorkFlowPost = async (data) => {
        const requestedData = getDataFromForm(data);
        const requestUrl = buildRequestUrl();
        const postHttpRequest = buildPostMethod(requestedData)
        await requestRecords(requestUrl, postHttpRequest).catch(err => {
            alert(`${ERROR_MSG}${err}`);
        });
        await processWorkFlowGet();
    };

    document.querySelector(`form`).addEventListener('submit', async (e) => {
        e.preventDefault();
        await processWorkFlowPost(e.target).catch(err => {
            alert(`${ERROR_MSG}${err}`);
        });
    });

    const postDataOnWebPage = (data) => {

        let body = document.querySelector('tbody');
        body !== null ? Array.from(body.childNodes).forEach(e => e.remove()) : '';

        Object.values(data).forEach(({firstName, lastName, facultyNumber, grade}) => {

            let row = createElement('tr');
            let firstNameElement = createElement('td', firstName)
            let lastNameElement = createElement('td', lastName);
            let facultyNumberElement = createElement('td', facultyNumber);
            let gradeElement = createElement('td', grade);
            appendChildren(row, [firstNameElement, lastNameElement, facultyNumberElement, gradeElement]);
            body.appendChild(row);

        });
    };
    const requestRecords = async (url, httpRequest) => {
        let response = await fetch(url, httpRequest);
        if (!response.ok) {
            throw new Error(`Cannot fetch, we're in requestRecords func`);
        }
        let jsonResponse = await response.json();
        postDataOnWebPage(jsonResponse)
    };

    const processWorkFlowGet = async () => {
        const requestUrl = buildRequestUrl();
        await requestRecords(requestUrl);
    };

    const fetchData = async () => {
        await processWorkFlowGet().catch(err => {
            alert(`${ERROR_MSG}${err}`);
        });
    };
    fetchData();
}
attachEvents()
