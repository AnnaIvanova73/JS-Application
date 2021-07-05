function attachEvents() {
    const httpRequestGet = () => {
        return {
            method: "GET"
        };
    };
    const httpRequestPost = (data) => {
        console.log(data)
        data = JSON.stringify(data);
        console.log(data)
        return {
            method: "post",
            headers: {'Content-type': 'application/json'},
            body: data
        };
    };
    const fetchServerRespond = async (host, request) => {
        let response = await fetch(host, request);
        if (!response.ok) {
            throw new Error(`Cannot fetch. Error message: ${JSON.stringify(response)}`)
        }
        return response.json();
    }
    const buildRequestUrl = () => {
        return `http://localhost:3030/jsonstore/messenger`;
    };

    const renderDataOnDom = (data) => {
        let message = document.querySelector('#messages');
        message.innerHTML = ``;
        message.style.display = 'block';
        Object.values(data).forEach(e => {
            let textNode = document.createTextNode(`${e.author}: ${e.content}\n`)
            message.appendChild(textNode);
        });

    };
    document.querySelector(`#refresh`).addEventListener('click', async (event) => {
        const request = httpRequestGet();
        const data = await fetchServerRespond(buildRequestUrl(), request).catch(err => console.log(err));
        renderDataOnDom(data);
    });
    document.querySelector(`#submit`).addEventListener('click', async (event) => {
        let author = document.querySelector('input[name="author"]');
        let content = document.querySelector('input[name="content"]');
        const request = httpRequestPost({author:author.value, content: content.value});
        await fetchServerRespond(buildRequestUrl(), request).catch(err => console.log(err));
        author.value =``;
        content.value =``;
    });
}

attachEvents();