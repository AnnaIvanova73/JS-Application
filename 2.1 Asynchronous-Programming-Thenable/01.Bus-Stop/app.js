function getInfo() {
    let currId = document.querySelector(`#stopId`);
    let ulBuses = document.querySelector(`#buses`);
    let stopName = document.querySelector(`#stopName`);

    const removeChildren = (el) => Array.from(el.childNodes).forEach(e => e.remove());

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${currId.value}`).then(response => response.json())
        .then(data => {

            const createElement = (el, text) => {
                let element = document.createElement(`li`);
                element.textContent = text;
                return element;
            };
            removeChildren(ulBuses);

            stopName.textContent = data.name;
            Object.entries(data.buses)
                .map(e => `Bus ${e[0]} arrives in ${e[1]}`).forEach(e => {
                let li = createElement('li', e);
                ulBuses.appendChild(li);
            });
            currId.value = ``;
            document.querySelector('#result').style.display = 'block';

        }).catch(() => {
        removeChildren(ulBuses);
        currId.value = ``;
        stopName.textContent = `Error`;
        document.querySelector('#result').style.display = 'block';
    })

}