import renderOnDom from './renderOnDom.js';
import {isInvalid, methodPostPut} from './constants.js';

const hidden = `hidden`;

const getDataFromForm = (form) => {
    if (isInvalid([form.get('username'), form.get('postText')])) {
        throw new Error('All fields are required!')
    }
    return {
        username: form.get('username'),
        postText: form.get('postText'),
    };
};

export const showPage = () => {
    document.querySelector(`.topic-title`).addEventListener('click', async (e) => {
        e.preventDefault();
        if (!(e.target.hasAttribute('data-id'))) {
            return;
        }
        document.querySelector('.comment').textContent = '';
        const id = e.target.getAttribute('data-id');

        document.querySelector('main').style.display = 'none';
        document.querySelector(`.theme-content`).removeAttribute(hidden);

        try {
            let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
            let data = await response.json();

            //const url = `http://localhost:3030/data/orders?where=_ownerId%3D"69a5feca-c055-4334-b14f-18c84956d104"`;
            //const url = `http://localhost:3030/jsonstore/collections/myboard/comments?where=_ownerId%3D"69a5feca-c055-4334-b14f-18c84956d104"`;
            let commentsResponse = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);
            let dataComments = await commentsResponse.json();

            document.querySelector(`.theme-name h2`).textContent = data.topicName;
            document.querySelector('.comment').appendChild(renderOnDom.postView(data));

            let currComments = Object.values(dataComments).filter(e => e._ownerId === id);
            currComments.forEach(e => {
                document.querySelector('.comment').appendChild(renderOnDom.createComment(e));
            })

        } catch (err) {
            alert(err);
        }
    });


    document.querySelector('#commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let newForm = e.currentTarget;

        try {
            let form = new FormData(newForm)
            let currDataForm = getDataFromForm(form);
            let time = new Date();
            let currHours = time.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });
            currDataForm._createdOn = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${currHours}`;
            currDataForm._ownerId = document.querySelector(`.header`).getAttribute('data-id');

            fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`, methodPostPut('POST', currDataForm))
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.comment').appendChild(renderOnDom.createComment(data));
                });

        } catch (err) {
            alert(err);
        } finally {
            newForm.reset();
        }

    });
};

export const returnHome = () => {
    document.querySelector('nav a').addEventListener('click', (e) => {
        document.querySelector('main').style.display = 'block';
        document.querySelector(`.theme-content`).setAttribute(hidden, '');
    });
};
