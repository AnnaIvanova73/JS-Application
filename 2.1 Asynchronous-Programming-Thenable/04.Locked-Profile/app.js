function lockedProfile() {
    function createElement(type, text, attributes = []) {
        console.log(attributes)
        let element = document.createElement(type);
        if (text) {
            element.textContent = text;
        }
        attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
            value ? element.setAttribute(name, value) : element.setAttribute(name,'');
        });
        return element;
    }

    const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

    const createDivProfile = (username, email, age, counter) => {
        let divProfile = createElement('div', null, ['class=profile']);
        let imgElement = createElement('img', null, ['class=userIcon', 'src=./iconProfile2.png'])
        let lockLabel = createElement('label', 'Lock');
        let inputLockRadio = createElement('input', null, ['type=radio', `name=user${counter}Locked`, 'value=lock', 'checked']);
        let unlockLabel = createElement('label', 'Unlock');
        let inputUnlockRadio = createElement('input', null, ['type=radio', `name=user${counter}Locked`, 'value=lock']);
        let breakElement = createElement('br');
        let hrElement = createElement('hr');
        let usernameLabel = createElement('label', 'Username');
        let usernameInputElement = createElement('input', null, ['type=text', `name=user${counter}Locked`, `value=${username}`, 'disabled', 'readonly']);

        let divPurpleHills = createElement('div', null, [`id=user1HiddenFields`]);
        let hrHiddenElement = createElement('hr');
        let emailLabel = createElement('label', 'Email');
        let emailInputElement = createElement('input', null, ['type=email', `name=user${counter}Locked`, `value=${email}`, 'disabled', 'readonly']);
        let ageLabel = createElement('label', 'Age');
        let ageInputElement = createElement('input', null, ['type=email', `name=user${counter}Locked`, `value=${age}`, 'disabled', 'readonly']);
        let showMoreButton = createElement('button', 'Show more');
        showMoreButton.addEventListener('click', () => {
            if (inputUnlockRadio.checked) {
                if(showMoreButton.textContent === 'Show more'){
                    showMoreButton.textContent = `Hide it`;
                    divPurpleHills.style.display = 'block';
                }else{
                    showMoreButton.textContent = `Show more`;
                    divPurpleHills.style.display = 'none';
                }
            }
        })
        appendChildren(divPurpleHills, [hrHiddenElement, emailLabel, emailInputElement, ageLabel, ageInputElement])
        appendChildren(divProfile, [
            imgElement, lockLabel, inputLockRadio, unlockLabel, inputUnlockRadio, breakElement, hrElement,
            usernameLabel, usernameInputElement, divPurpleHills, showMoreButton
        ]);
        return divProfile;
    }
    const renderOnDom = (data) => {
        const main = document.querySelector('#main');
        Array.from(main.childNodes).forEach(e => e.remove());
        Object.values(data).forEach(({_, username, email, age}, i) => {
            let divProfile = createDivProfile(username, email, age, i + 1)
            main.appendChild(divProfile)
        });
    };
    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then(response => response.json())
        .then(data => {
            renderOnDom(data)
        });
}