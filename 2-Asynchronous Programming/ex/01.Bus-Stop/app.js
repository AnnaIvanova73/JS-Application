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