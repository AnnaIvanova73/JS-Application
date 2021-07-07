function attachEvents() {
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

    const loadArticles = () => {
        fetch(`http://localhost:3030/jsonstore/blog/posts`)
            .then(response => response.json())
            .then(data => {
                let optionsMenu = document.querySelector('#posts');
                optionsMenu.textContent = '';
                document.querySelector(`#post-body`).textContent = ``;
                Object.values(data).forEach(({body, id, title}) => {
                    let option = createElement('option', title, [`value=${id}`]);
                    let articleContent = createElement('p', body, ['class=post-body', `id=${id}`]);
                    articleContent.style.display = 'none';
                    document.querySelector(`#post-body`).appendChild(articleContent);
                    optionsMenu.appendChild(option);
                });
            }).catch(err => console.log(err));
    };
    const viewPost = () => {
        let commentSection = document.getElementById('post-comments');
        let postTitle = document.getElementById('post-title');
        let content = document.querySelector(`#post-body`);

        Array.from(content.children).filter(e => e.style.display = 'none');
        commentSection.textContent = ``;
        postTitle.textContent = ``;

        let optionsMenu = document.querySelector('#posts')

        Array.from(content.children).filter(e => e.id === optionsMenu.value)[0].style.display = 'block'

        let currPost = Array.from(optionsMenu.children).filter(e => e.value ===optionsMenu.value)[0];
        postTitle.textContent = currPost.textContent;

        fetch(`http://localhost:3030/jsonstore/blog/comments`)
            .then(response => response.json())
            .then(data => {

                Object.values(data).forEach(({id, postId, text}) => {
                    if (postId === optionsMenu.value) {
                        let li = createElement('li', text)
                        commentSection.append(li);
                    }
                });
            }).catch(err => console.log(err));
    };


    document.querySelector(`#btnLoadPosts`).addEventListener('click', loadArticles)
    document.querySelector(`#btnViewPost`).addEventListener('click', viewPost)
}

attachEvents();