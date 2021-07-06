function attachEvents() {
    let location = document.getElementById(`location`);
    let btnSubmit = document.getElementById(`submit`);

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));
    const removeChildren = (arr) => (arr.forEach(child => child.remove()));

    const  createElement = (type, text, attributes = []) => {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            element.setAttribute(name, value);
        })
        return element;
    };

    const mapIconConditions = {
        Sunny: '☀',
        ['Partly sunny']: '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',
    };
    const hideAndShowDiv = (div, flag) => {
        flag ? div.style.display = 'block' : div.style.display = 'none';
    };

    const removeDivError = (content) => {
        if (content.childElementCount > 2) {
            content.removeChild(content.lastChild);
        }
    };

    const  createCurrentForecastElements = (currObjData) => {
        let currentDiv = document.querySelector('#current');
        removeChildren(Array.from(currentDiv.children).slice(1));
        let divWrapper = createElement('div', null, ['class=forecasts']);
        let spanSymbol = createElement('span', mapIconConditions[currObjData.forecast.condition], ['class=condition symbol'])

        let spanWrapper = createElement('span', null, ['class=condition']);
        let spanCity = createElement('span', currObjData.name, ['class=forecast-data']);
        let spanDegrees = createElement('span',
            `${currObjData.forecast.high}${mapIconConditions['Degrees']}/${currObjData.forecast.low}${mapIconConditions['Degrees']}`,
            ['class=forecast-data']);
        let spanCondition = createElement('span', currObjData.forecast.condition, ['class=forecast-data']);
        appendChildren(spanWrapper, [spanCity, spanDegrees, spanCondition]);
        appendChildren(divWrapper, [spanSymbol, spanWrapper]);
        currentDiv.appendChild(divWrapper);
        return divWrapper;
    };

    const  createUpcomingForecastElements = (upComingObjData) => {
        let upcomingDiv = document.querySelector('#upcoming');
        removeChildren(Array.from(upcomingDiv.children).slice(1));
        let divWrapper = createElement('div', null, ['class=forecast-info']);
        upComingObjData.forEach(({condition, high, low}) => {
            console.log()
            let spanWrapper = createElement('span', null, ['class=upcoming'])
            let spanSymbol = createElement('span', mapIconConditions[condition], ['class=symbol']);
            let spanDegrees = createElement('span',
                `${high}${mapIconConditions['Degrees']}/${low}${mapIconConditions['Degrees']}`,
                ['class=forecast-data']);
            let spanCondition = createElement('span', condition, ['class=forecast-data']);
            appendChildren(spanWrapper, [spanSymbol, spanDegrees, spanCondition]);
            divWrapper.appendChild(spanWrapper);
            upcomingDiv.appendChild(divWrapper);
        })
        return divWrapper;
    };

    const startRequestChaining = () => {


        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(response => response.json())

            .then(data => {
                let currObject = Object.values(data).filter(e => e.name.toLowerCase() === location.value.toLowerCase());
                if (currObject.length === 0) {
                    throw new Error(`cannot find city`);
                }
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${currObject[0].code}`)
                    .then(response => response.json())
                    .then(data => {
                        return {data, code: currObject[0].code}
                    });
            })

            .then(({data, code}) => {

                createCurrentForecastElements(data);
                removeDivError(document.querySelector(`#content`));
                hideAndShowDiv(document.querySelector('#forecast'), true);

                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
            })

            .then(response => response.json())

            .then(data => {

                createUpcomingForecastElements(Object.values(data.forecast));
                removeDivError(document.querySelector(`#content`));
                hideAndShowDiv(document.querySelector('#forecast'), true);

            }).catch(() => {

            let content = document.querySelector(`#content`);
            removeDivError(content)

            const divError = createElement('div',`Error`,['class=label']);
            content.appendChild(divError);

            hideAndShowDiv(document.querySelector('#forecast'), false);
        }).finally(() =>{
            location.value = '';
        });

    };

    btnSubmit.addEventListener('click', startRequestChaining);
}

attachEvents();