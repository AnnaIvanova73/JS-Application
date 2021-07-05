function attachEvents() {
    const mapUsersKeyHolder = new Map();

    const buildRequestUrl = (host, path) => {
        return `${host}${path}`;
    };
    const postHttpRequest = (data) => {
        data = JSON.stringify(data)
        return {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: data
        };
    };

    const getHttpRequest = () => {
        return {method: 'GET'}
    };
    const deleteFromServer = () => {
        return {method: 'delete'}
    }
    const postElement = async () => {
        let person = document.querySelector(`#person`);
        let phone = document.querySelector(`#phone`);
        try {
            await engineFetchDataFromServer('http://localhost:3030/jsonstore/phonebook', postHttpRequest({
                person: person.value,
                phone: phone.value
            }));

            let data = await updateData();
            if (data !== -1) {
                renderDataOnDom(data);
            }
        } catch (err) {
            console.log(`Cannot fetch, record is not posted. Error msg: ${err}`)
        } finally {
            person.value = ``;
            phone.value = ``;
        }
    };
    const deleteElementLi = async (e) => {
        let currId = e.target.parentNode.id;
        let serverKey = mapUsersKeyHolder.get(currId);
        let url = buildRequestUrl('http://localhost:3030/jsonstore/phonebook/', serverKey);
        try {
            let deletedObj = await engineFetchDataFromServer(url, deleteFromServer());
            let element = Array.from(document.querySelector('#phonebook').children).filter(e => e.id === currId);
            element[0].remove();
            mapUsersKeyHolder.delete(currId);
            console.log(deletedObj)
            await updateData();
        } catch (err) {
            console.log(`Cannot fetch, record is not deleted. Error msg: ${err}`)
        }
    };
    const renderDataOnDom = (data) => {
        let lis = document.querySelector('#phonebook');
        Array.from(lis.childNodes).forEach(child => child.remove());
        Object.values(data).forEach(e => {
            let randomDomIdentifier = String(Math.floor(Math.random() * 1000) + 1);
            let li = document.createElement('li');
            li.textContent = `${e.person}: ${e.phone}`;
            mapUsersKeyHolder.set(randomDomIdentifier, e._id);
            li.setAttribute('id', randomDomIdentifier);
            let button = document.createElement('button');
            button.textContent = `Delete`;
            button.addEventListener('click', deleteElementLi)
            li.appendChild(button);
            lis.appendChild(li);
        });
    };

    const engineFetchDataFromServer = async (url, request) => {
        let response = await fetch(url, request);
        if (!response.ok) {
            throw new Error(`Error occurred while fetching. Promise down: ${response}`);
        }
        return await response.json();
    }

    const updateData = async () => {
        try {
            let getObject = getHttpRequest();
            let url = buildRequestUrl(`http://localhost:3030`, `/jsonstore/phonebook`);
            return await engineFetchDataFromServer(url, getObject);
        } catch (e) {
            console.log(`Upsss something went wrong.`)
            return -1;
        }
    }
    document.querySelector(`#btnLoad`).addEventListener(`click`, async () => {
        let data = await updateData();
        if (data !== -1) {
            renderDataOnDom(data);
        }
    });
    document.querySelector(`#btnCreate`).addEventListener(`click`, postElement);

}

attachEvents();