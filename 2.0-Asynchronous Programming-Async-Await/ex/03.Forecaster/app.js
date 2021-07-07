function attachEvents() {
    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));
    const removeChildren = (arr) => (arr.forEach(child => child.remove()));

    function createElement(type, text, attributes = []) {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            element.setAttribute(name, value);
        })
        return element;
    }

    let mapIconConditions = {
        Sunny: '☀',
        ['Partly sunny']: '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',
    }

    function removeErrorElementIfExist() {
        let err = document.getElementById('err');
        err !== null ? err.remove() : '';

    }

    const getDomElement = () => {
        let currConditionWrapper = document.querySelector('#current');
        let upcomingConditionWrapper = document.querySelector('#upcoming');
        let mainElementForecast = document.querySelector('#forecast');
        let submitBtn = document.querySelector('#submit');
        return {currConditionWrapper, upcomingConditionWrapper, mainElementForecast, submitBtn};
    }

    function createCurrentForecastElements(currObjData) {
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
        return divWrapper;
    }

    function createUpcomingForecastElements(upComingObjData) {
        let divWrapper = createElement('div', null, ['class=forecast-info']);
        upComingObjData.forEach(({condition, high, low}) => {
            let spanWrapper = createElement('span', null, ['class=upcoming'])
            let spanSymbol = createElement('span', mapIconConditions[condition], ['class=symbol']);
            let spanDegrees = createElement('span',
                `${high}${mapIconConditions['Degrees']}/${low}${mapIconConditions['Degrees']}`,
                ['class=forecast-data']);
            let spanCondition = createElement('span', condition, ['class=forecast-data']);
            appendChildren(spanWrapper, [spanSymbol, spanDegrees, spanCondition]);
            divWrapper.appendChild(spanWrapper);
        })
        return divWrapper;
    }

    const renderDataOnDom = (t, u) => {
        removeErrorElementIfExist();

        removeChildren(Array.from(getDomElement().currConditionWrapper.children).slice(1));
        removeChildren(Array.from(getDomElement().upcomingConditionWrapper.children).slice(1));

        let divCurrentForCast = createCurrentForecastElements(t);
        getDomElement().currConditionWrapper.appendChild(divCurrentForCast);

        let divUpcoming = createUpcomingForecastElements(u.forecast);
        getDomElement().upcomingConditionWrapper.appendChild(divUpcoming);


        getDomElement().mainElementForecast.style.display = 'block';
        getData().city[1].value = '';
    }
    const getData = () => {
        return {
            city: [document.querySelector('#location').value.toLowerCase(), document.querySelector('#location')],
        };
    }

    const apiEndPoints = (cityCode) => {
        return {
            locations: '/forecaster/locations',
            today: `/forecaster/today/${cityCode}`,
            upcoming: `/forecaster/upcoming/${cityCode}`
        }
    }

    const buildURL = (requestData) => {
        return `http://localhost:3030/jsonstore${requestData}`
    };
    const fetchServerResponse = async (requestUrl) => {
        let response = await fetch(requestUrl);
        if (response.status !== 200) {
            throw new Error('not able to fetch server response')
        }

        return await response.json();
    }

    const engine = async () => {
        let requestUrl = buildURL(apiEndPoints().locations);
        let locationsObj = await fetchServerResponse(requestUrl);

        let arrCities = Object.entries(locationsObj);

        let currCity = arrCities.filter(e => e[1].name.toLowerCase() === getData().city[0]);

        if (currCity.length === 0) {
            throw new Error('There is no such city');
        }

        requestUrl = buildURL(apiEndPoints(currCity[0][1].code).today);
        let todayForeCast = await fetchServerResponse(requestUrl);

        requestUrl = buildURL(apiEndPoints(currCity[0][1].code).upcoming);
        let upcomingForeCast = await fetchServerResponse(requestUrl);

        renderDataOnDom(todayForeCast, upcomingForeCast);
    }

    getDomElement().submitBtn.addEventListener('click', () => {
        engine().catch(() => {
            removeErrorElementIfExist()
            removeChildren(Array.from(getDomElement().currConditionWrapper.children).slice(1));
            removeChildren(Array.from(getDomElement().upcomingConditionWrapper.children).slice(1));
            let divError = createElement('div', `Error`, ['id=err', 'class=label']);
            divError.style.textAlign = 'center';
            divError.style.fontSize = '2em';
            getDomElement().mainElementForecast.appendChild(divError);
            getDomElement().mainElementForecast.style.display = 'block';
            document.querySelector('#location').value = '';
        });
    });

}

attachEvents();
/* example
function attachEvents() {
    let locations = [];
    let upcomingData = [];
    let todayData = [];

    const buildRequestUrl = (endPoint) => {
        return `http://localhost:3030/jsonstore/forecaster/${endPoint}`
    };
    const retrieveData = (data, container) => {
        let key = Object.keys(data);

        key.forEach(e =>{
           locations.push(e);
        })
    }
    const engineStartPromiseChain = (endPoint, container) => {
        let requestUrl = buildRequestUrl(endPoint);
        fetch(requestUrl).then(response => response.json()).then(data => retrieveData(data,container))
            .catch(err => console.log(err))
    };

    const engineStartAction = (endPoint,container) => {
        // тук подаваме локация и array за проба идеята ми беше да го преизполвам
        engineStartPromiseChain('locations', locations);
        let input = document.querySelector('#location');

        for (const e of locations) {
            console.log(e)
        }
        //console.log(locations);
    }

    function handleError(error) {

    }

    document.querySelector('#submit').addEventListener('click', engineStartAction);

}
 */