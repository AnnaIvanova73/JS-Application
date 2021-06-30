function loadCommits() {
    let commits = document.querySelector('#commits');
    commits.innerHTML = '';
    const getData = () => {
        return {
            username: [document.querySelector('#username').value,document.querySelector('#username')],
            repo: [document.querySelector('#repo').value,document.querySelector('#repo')]
        }
    };

    const buildRequestUrl = (requestData) => {
        return `https://api.github.com/repos/${requestData.username[0]}/${requestData.repo[0]}/commits`;
    };

    const requestFromApi = async (url) => {
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('Not Found')
        }

        const jsonResponse = await response.json();
        const data = jsonResponse;
        renderDataOnDom(data);
    };

    const renderDataOnDom =  (data) => {
        data.forEach(record => {
            let li = document.createElement('li');
            console.log(record)
            li.textContent = `${record.commit.author.name}: ${record.commit.message}`
                commits.appendChild(li)
        });
        getData().username[1].value = '';
        getData().repo[1].value = '';

    }
    const engineStartFunction = async () => {
        const requestData = getData();
        const requestUrl = buildRequestUrl(requestData);
        await requestFromApi(requestUrl);
    }

    engineStartFunction().catch(err => {
        let li = document.createElement('li');
        li.textContent = err.message
        commits.appendChild(li)
    })
}

//HARD CODE JS-Applications AnnaIvanova73