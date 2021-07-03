function solve() {
    const getElementsDom = () => {
        return {
            box: document.querySelector('#info > span.info'),
            arriveBtn: document.querySelector('#arrive'),
            departBtn: document.querySelector('#depart'),
        }
    };
    const requestData = {id: "depot",name: 'Depot'};

    const takeRepercussions = () => {
        getElementsDom().box.textContent = 'Error';
        getElementsDom().departBtn.disabled = true;
        getElementsDom().arriveBtn.disabled = true;
    }

    function depart() {
        engineStartPromiseChain().catch(takeRepercussions);
        getElementsDom().departBtn.disabled = true;
        getElementsDom().arriveBtn.disabled = false;
    }

    function arrive() {
        getElementsDom().box.textContent = `Arriving at ${requestData.name}`;
        getElementsDom().departBtn.disabled = false;
        getElementsDom().arriveBtn.disabled = true;
    }

    const renderDataOnDom = (data) => {
        requestData.id = data.next;
        requestData.name = data.name;
        getElementsDom().box.textContent = `Next stop ${data.name}`;
    };

    const requestFromApi = async (url) => {
        let response = await fetch(url);
        if (response.status !== 200) {
            throw new Error('Error');
        }
        let jsonResponse = await response.json();
        renderDataOnDom(jsonResponse);
    };

    const buildRequestUrl = (requestData) => {
        return `http://localhost:3030/jsonstore/bus/schedule/${requestData.id}`;
    };

    const engineStartPromiseChain = async () => {
        const requestUrl = buildRequestUrl(requestData);
        await requestFromApi(requestUrl);
    };

    return {
        depart,
        arrive
    };
}

let result = solve();