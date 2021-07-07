
function attachEvents() {
    let mapPosts = [];

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

    const cleanInputFields = (arr) => arr.forEach(e => e.textContent = '');

    const requestFromApi = async (url) => {
        let response = await fetch(url);
        return await response.json();
    }
    const buildRequestUrl = (endPoint) => {
        return `http://localhost:3030/jsonstore/blog/${endPoint}`
    };

    const engineStartPromiseChain = async (endPoint) => {
        let requestUrl = buildRequestUrl(endPoint);
        return await requestFromApi(requestUrl);
    };

    const startEngine = (endPoint) => engineStartPromiseChain(endPoint);

    const renderOptionsOnDom = (data) => {
        let optionsMenu = document.querySelector('#posts');
        optionsMenu.innerHTML = '';
        Object.entries(data).forEach(e => {
            let option = createElement('option', e[1].title, [`value=${e[1].id}`]);
            optionsMenu.appendChild(option);
            mapPosts.push({id: e[1].id, body: e[1].body, title:e[1].title});
        })
    };
    const renderPostOnDom = (data, postId) => {
        cleanInputFields([document.querySelector('#post-title')],[document.querySelector('#post-body')]);
        document.querySelector('#post-comments').innerHTML = '';
        let currComments = Object.values(data).filter(e => e.postId === postId);
        let currPost = mapPosts.filter(e => e.id === postId)[0];

        document.querySelector('#post-title').textContent = currPost.title;
        document.querySelector('#post-body').textContent = currPost.body;
        let commentSection = document.querySelector('#post-comments');
        currComments.forEach(e => {
            let li = createElement('li',e.text,[`id=${e.id}`])
            commentSection.append(li);
        })
    };
    const processRespondForOptions = async () => {
        let currObj = await startEngine('posts');
        renderOptionsOnDom(currObj)
    };
    const processRespondForViews = async () => {
        let posts = document.querySelector('#posts');
        let currObj = await startEngine(`comments`);
        renderPostOnDom(currObj, posts.value)
    };
    document.querySelector('#btnLoadPosts').addEventListener('click', processRespondForOptions)
    document.querySelector('#btnViewPost').addEventListener('click', () => {
        processRespondForViews().catch(err =>{
            console.log(err);
            cleanInputFields([document.querySelector('#post-title')],[document.querySelector('#post-body')])
            document.querySelector('#post-comments').innerHTML = '';
            let posts = document.querySelector('#posts');
            let currPost = mapPosts.filter(e => e.id === posts.value)[0];
            document.querySelector('#post-title').textContent = currPost.title;
            document.querySelector('#post-body').textContent = currPost.body
        });
    });
}

attachEvents();