function solve() {
    const getElementsDom = () => {
        return {
            box: document.querySelector('#info > span.info'),
            arriveBtn: document.querySelector('#arrive'),
            departBtn: document.querySelector('#depart'),
        }
    };
    let data = [];
    let endPoint = 'depot';

    const buildRequestUrl = (endPoint) => {
        return `http://localhost:3030/jsonstore/bus/schedule/${endPoint}`;
    };
    const enginePromiseChaining = (url) => {
        fetch(url).then(response => {
            return response.json()
        }).then(data => fulfillsData(data)).catch(() =>{
            getElementsDom().box.textContent = `Error`;
            getElementsDom().departBtn.disabled = true;
            getElementsDom().arriveBtn.disabled = true;
        });

    };
    const fulfillsData = (promiseData) => {
        data.push(promiseData);
    };

    function depart() {
        enginePromiseChaining(buildRequestUrl(endPoint));
        getElementsDom().box.textContent = data[0].name;
        endPoint = data[0].next;
        data.length = 0;
        getElementsDom().departBtn.disabled = true;
        getElementsDom().arriveBtn.disabled = false;
    }

    function arrive() {
        enginePromiseChaining(buildRequestUrl(endPoint));
        getElementsDom().box.textContent = data[0].name;
        endPoint = data[0].next;
        data.length = 0;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();