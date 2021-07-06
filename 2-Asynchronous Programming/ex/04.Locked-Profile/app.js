function lockedProfile() {

    const createDivProfileInfo = (blueprint, {age, email, username}, count) => {
        let newDiv = blueprint.cloneNode(true);
        newDiv.querySelector('input[type="text"]').value = username;
        newDiv.querySelector('input[name="user1Email"]').value = email;
        newDiv.querySelector('input[name="user1Age"]').value = age;
        return newDiv;
    }


    const renderDataOnDom = (data) => {
        let div = document.querySelector('div.profile');
        let mainElement = document.querySelector('#main');
        let arrDataUserInfo = Array.from(Object.entries(data));
        let counterId = 2;
        arrDataUserInfo.forEach((e) => {
            let divProfile = createDivProfileInfo(div, e[1], counterId);
            mainElement.appendChild(divProfile);
            counterId++;
        })
        div.remove();
    }
    const requestDataFromApi = async (url) => {
        let response = await fetch(url);
        let responseJson = await response.json();
        renderDataOnDom(responseJson);
    }
    const engine = async () => {
        let requestUrl = `http://localhost:3030/jsonstore/advanced/profiles`
        await requestDataFromApi(requestUrl);
    }

    Array.from(document.querySelectorAll(`#main`)).forEach(e => {
        e.addEventListener('click',(e) =>{
            let currDiv =  e.target.parentNode;
            let radio = currDiv.querySelectorAll('input[type ="radio"]')[1];
            if(e.target.textContent === 'Show more'){
                if(radio.checked){
                    currDiv.querySelector('#user1HiddenFields').style.display = 'block';
                    currDiv.querySelector('button').textContent = 'Hide it';
                }
            }else if(e.target.textContent === 'Hide it'){
                if(radio.checked){
                    currDiv.querySelector('#user1HiddenFields').style.display = 'none';
                    currDiv.querySelector('button').textContent = 'Show more';
                }
            }
        })
    })

    engine().catch();
}