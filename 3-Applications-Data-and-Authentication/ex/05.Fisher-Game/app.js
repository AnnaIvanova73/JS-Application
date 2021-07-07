function attachEvents() {
    localStorage.length > 0 ? document.querySelector(`button.add`).disabled = false :
        document.querySelector(`button.add`).disabled = true;

    document.querySelectorAll('.catch').forEach(e => e.remove());

    function createElement(type, text, attributes = []) {
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            value ? element.setAttribute(name, value) : element.setAttribute(name, '');
        });
        return element;
    }

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));
    const IS_INVALID = (pr1, pr2,pr3, pr4,pr5, pr6) => !pr1 || !pr2 || !pr3 || !pr4 || !pr5 || !pr6 ;
    const  isInt = (n) => {
        return Number(n) === n && n % 1 === 0;
    };
    const  isFloat =(n) => {
        return Number(n) === n && n % 1 !== 0;
    };

    const throwForInvalidInput =  (pr1, pr2,pr3, pr4,pr5, pr6) =>{
        if(IS_INVALID(pr1, pr2,pr3, pr4,pr5, pr6)){
            throw new Error('All fields are required!')
        }

        pr2= Number(pr2);
        if(!isFloat(pr2)){
            throw new Error('Invalid value, weight should be a floating point');
        }
        pr6= Number(pr6);
        if(!isInt(pr6)){
            throw new Error('Invalid value, captureTime should be an integer');
        }
    };
    const buildRequestUrl = (endPoint = undefined) => {
        return endPoint ? `http://localhost:3030/data/catches/${endPoint}` :`http://localhost:3030/data/catches`;
    }
    const buildHttpPostPutMethod = (method, body) => {
        return {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': localStorage.authToken
            },
            body: JSON.stringify(body)
        }
    }
    const createDiv = ({_id, _ownerId, angler, weight, species,location, bait, captureTime}) => {
        console.log(angler)
        const createHr = () => {
            return createElement('hr')
        };
        let div = createElement('div', null, ['class=catch', `id=${_ownerId}`]);
        let labelAngler = createElement('label', `Angler`);
        let anglerElement = createElement('input', null, ['type=text', 'class=angler', `value=${angler}`])

        let labelWeight = createElement('label', `Weight`);
        let weightElement = createElement('input', null, ['type=number', 'class=weight', `value=${weight}`]);

        let labelSpecies = createElement('label', `Species`);
        let speciesElement = createElement('input', null, ['type=text', 'class=species', `value=${species}`]);

        let labelLocation = createElement('label', `Location`);
        let locationElement = createElement('input', null, ['type=text', 'class=location', `value=${location}`]);

        let labelBait = createElement('label', `Bait`);
        let baitElement = createElement('input', null, ['type=text', 'class=bait', `value=${bait}`]);

        let labelCaptureTime = createElement('label', `Capture Time`);
        let captureTimeElement = createElement('input', null, ['type=text', 'class=captureTime', `value=${captureTime}`]);
        let btnUpdate = createElement('button', 'Update', ['class=update', 'disabled']);
        let btnDelete = createElement('button', 'Delete', ['class=delete', 'disabled']);
        if (localStorage.length > 0 && localStorage.authId === _ownerId) {
            btnUpdate.disabled = false;
            btnDelete.disabled = false;
        }
        btnUpdate.addEventListener('click', async () => {
            try {
                throwForInvalidInput(anglerElement.value,weightElement.value,speciesElement.value,locationElement.value,
                    baitElement.value,captureTimeElement.value);
                let data = {
                    angler: anglerElement.value, weight: weightElement.value,
                    spaces: speciesElement.value, location: locationElement.value,
                    bait: baitElement.value, captureTime: captureTimeElement.value
                };
                let url = buildRequestUrl(_id);
                let request = buildHttpPostPutMethod('put', data);
                let response = await fetchUpdateDelete(url, request);
                let newDiv = createDiv(response);
                console.log(`Successfully updated object --> ${JSON.stringify(response)}`);
                div.parentNode.replaceChild(newDiv, div);
            } catch (err) {
                alert(err);
            }

        });
        btnDelete.addEventListener('click', async () => {
            let url = buildRequestUrl(_id);
            try {
                let delObj = await fetchUpdateDelete(url, {method: 'delete', headers: {'X-Authorization': localStorage.authToken}});
                div.remove();
                console.log(`Successfully deleted --> ${JSON.stringify(delObj)}`);
            } catch (err) {
                console.log(err);
            }

        });
        let hr = createHr();
        appendChildren(div, [labelAngler, anglerElement, hr, labelWeight, weightElement, hr, labelSpecies, speciesElement,
            hr,labelLocation,locationElement,hr, labelBait, baitElement, hr, labelCaptureTime, captureTimeElement, btnUpdate, btnDelete]);
        return div;
    }
    const renderDataOnDom = (data) => {
        console.log(data)
        document.querySelectorAll('.catch').forEach(e => e.remove());
        let wrapper = document.getElementById('catches');
        Object.values(data).forEach(e => {
            let div = createDiv(e)
            wrapper.appendChild(div)
        });
    }
    const fetchUpdateDelete = async (url, method) => {
        let response = await fetch(url, method);
        if(!response.ok){
            throw new Error(`Cannot post data, you probably removed authToken from localStorage\nRegister or Logg again`);
        }
        return await response.json();
    }
    const fetchData = async () => {
        let response = await fetch(`http://localhost:3030/data/catches`);
        let jsonResponse = await response.json();
        renderDataOnDom(jsonResponse)
    }

    document.querySelector('button.add').addEventListener('click', async () => {
        let url = buildRequestUrl();
        let inputFields = document.querySelectorAll('#addForm > input');
       try{
           throwForInvalidInput(inputFields[0].value,inputFields[1].value,inputFields[2].value,inputFields[3].value,
               inputFields[4].value,inputFields[5].value)
           let obj = {
               angler: inputFields[0].value,
               weight: inputFields[1].value,
               species: inputFields[2].value,
               location: inputFields[3].value,
               bait: inputFields[4].value,
               captureTime: inputFields[5].value,
           };
           let requestMethod = buildHttpPostPutMethod('post',obj);

           await fetchUpdateDelete(url,requestMethod);
           await fetchData();
       }catch(err){
        alert(err);
       }
        Array.from(inputFields).forEach(e => e.value = ``);
    });
    document.querySelector('button.load').addEventListener('click', async () => {
        localStorage.length > 0 ? document.querySelector(`button.add`).disabled = false :
            document.querySelector(`button.add`).disabled = true;
        await fetchData();
    });

}

attachEvents();

