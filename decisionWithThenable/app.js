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
//Thenable