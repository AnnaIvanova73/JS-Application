function attachEvents() {
    const ERROR_MSG = `Uppps something went wrong. Apparently... this is happening: -->\r\n`;
    const getDataFromForm = () => {
        return {
            person: document.querySelector(`#person`),
            phone: document.querySelector(`#phone`)
        };
    };
    const buildRequestUrl = (endPoint) => {
        return endPoint ? `http://localhost:3030/jsonstore/phonebook/${endPoint}` : `http://localhost:3030/jsonstore/phonebook`;
    };
    const postHttpRequest = (data) => {
        data = JSON.stringify(data);``
        return {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: data
        };
    };

    const postDataOnPage = (data) => {
        let lis = document.querySelector('#phonebook');
        Array.from(lis.childNodes).forEach(child => child.remove());
        Object.values(data).forEach(e => {
            let randomDomIdentifier = String(Math.floor(Math.random() * 1000) + 1);
            let li = document.createElement('li');
            li.textContent = `${e.person}: ${e.phone}`;
            li.setAttribute('id', randomDomIdentifier);
            let button = document.createElement('button');
            button.textContent = `Delete`;
            button.addEventListener('click', async () => {
                await workFlowFuncDeleteData(e._id)
                    .catch(err => {
                        alert(`${ERROR_MSG}${err.message}`);
                    });
            })
            li.appendChild(button);
            lis.appendChild(li);
        });
    };

    const retrieveAllRecords = async (url) => {
        const response = await fetch(url);
        console.log(response)
        if(!response.ok){
            throw new Error('Cannot fetch data, your get request rejected')
        }
        const jsonResponse = await response.json();
        postDataOnPage(jsonResponse)
    }
    const requestData = async (url, httpRequest) => {
        const response = await fetch(url,httpRequest);

        if(!response.ok){
            throw new Error('Cannot fetch data, your delete/post request rejected')
        }
        return await response.json();
    }
    const workFlowFuncGetData = async () => {
        const requestUrl = buildRequestUrl();
        await retrieveAllRecords(requestUrl);
    };
    const workFlowFuncPostData = async () => {
        const requestedData = getDataFromForm();
        const requestUrl = buildRequestUrl()
        const httpRequest = postHttpRequest({person: requestedData.person.value, phone: requestedData.phone.value});
        await requestData(requestUrl, httpRequest);
        await workFlowFuncGetData();
        requestedData.person.value = '';
        requestedData.phone.value = '';
    };

    const workFlowFuncDeleteData = async (id) => {
        const requestUrl = buildRequestUrl(id);
        await requestData(requestUrl, {method: 'delete'});
        await workFlowFuncGetData();
    };

    document.querySelector(`#btnLoad`).addEventListener(`click`, async () => {
        await workFlowFuncGetData().catch(err => {
            alert(`${ERROR_MSG}${err.message}`);
        });
    });
    document.querySelector(`#btnCreate`).addEventListener(`click`, async () => {
        await workFlowFuncPostData().catch(err => {
            alert(`${ERROR_MSG}${err.message}`);
        });
    });
}

attachEvents();