function getInfo() {
    const cleanInputFields = (arr) => arr.forEach(e => e.value = '');

    const getData = () => { //requestData
        return {
            "id": [document.getElementById('stopId').value, document.getElementById('stopId')]
        }
    };
    const buildRequestUrl = (requestData) => {
        return `http://localhost:3030/jsonstore/bus/businfo/${requestData.id[0]}`;
    };

    const requestFromApi = async (url) => {
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('cannot fetch the data')
        }
        const jsonResponse = await response.json();

        renderDataOnDom(jsonResponse);
    };

    const renderDataOnDom = (data) => {
        document.querySelector('#buses').innerHTML = '';
        document.querySelector('#stopName').textContent = data.name;

        let arrBuses = Object.entries(data.buses);
        arrBuses.map(e => `Bus ${e[0]} arrives in ${e[1]}`).forEach(e => {
            let containerElement = document.querySelector('#buses');
            let li = document.createElement('li');
            li.textContent = e;
            containerElement.appendChild(li);
        });
        cleanInputFields([document.getElementById('stopId')]);
    };

    const engineStartPromiseChain = async () => {
        const requestData = getData();
        const requestUrl = buildRequestUrl(requestData);
        await requestFromApi(requestUrl);
    };

    document.getElementById('submit').addEventListener('click', () => {
        let stopName = document.querySelector('#stopName');

        engineStartPromiseChain().catch(() => {
            document.querySelector('#buses').innerHTML = '';
            stopName.textContent = 'Error';
            cleanInputFields([document.getElementById('stopId')]);
        })
    });

}
/*
function getInfo() {

    const removeElementChildren = (element) => Array.from(element.childNodes).forEach(e => e.remove());
    const buildRequestUrl = (endPoint) => {
        return `http://localhost:3030/jsonstore/bus/businfo/${endPoint}`;
    };
    document.querySelector('#submit').addEventListener('click', (e) => {
        let id = document.querySelector('#stopId');
        let requestUrl = buildRequestUrl(id.value);


        fetch(requestUrl).then((response) => response.json()).then(data => {
            document.querySelector('#stopName').textContent = ``
            document.querySelector('#stopName').textContent = data.name;

            let ul = document.querySelector('#buses');
            removeElementChildren(ul)
            Object.entries(data.buses).forEach(([busId, time]) => {
                let li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time}`
                ul.appendChild(li);
            });
            document.querySelector('#stopId').value = ``;
        }).catch(() => {
            let ul = document.querySelector('#buses');

            if (ul.hasChildNodes()) {
                removeElementChildren(ul)
            }
            document.querySelector('#stopName').textContent = `Error`;
            document.querySelector('#stopId').value = ``;
        });
    });
}

function getInfo() {
    let stopId = document.querySelector('#stopId').value;
    document.querySelector('#buses').innerHTML = '';
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
        .then(response => response.json())
        .then(data => {
            busName(data.name);
            addLi(data.buses);
        })
        .catch(error => {
            busName('Error');
        });
    stopId.textContent = '';
}

const busName = (input) => document.querySelector('#stopName').textContent = input;

const addLi = (busesObj) => {
    Object.entries(busesObj).map(([bus, minutes]) => {
        const li = document.createElement('li');
        li.textContent = `Bus ${bus} arrives in ${minutes} minutes`;
        document.querySelector('#buses').appendChild(li);
    });
}
 */