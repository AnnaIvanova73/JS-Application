function loadRepos() {
    const getData = () => { //object with correct data to put in ul
        return {
            userName: document.querySelector('#username').value,
        };
    }
    const buildRequestUrl = (requestData) => { // build request url function receive object
        return `https://api.github.com/users/${requestData.userName}/repos?per_page=100`;
    }
    const requestRepos = async (url) => { //make request to the ne constructed url

        const response = await fetch(url);//return promise
        const jsonResponse = await response.json();//returns promise
        const repos = jsonResponse;

        receiveRepos(repos); //call new function and give the extracted value, in this function will not be promise
    }

    const engineStartFunction = async () => {
        const requestData = getData();
        const requestUrl = buildRequestUrl(requestData);
        await requestRepos(requestUrl);
    }
    engineStartFunction();

    const receiveRepos = (workableData) => {

      let ulElement = document.querySelector('#repos');
      ulElement.innerHTML = '';

      workableData.forEach(e => {
      	let li = document.createElement('li');
      	let aElement = document.createElement('a');
      	let text = e['full_name'];
      	aElement.textContent = text;
      	aElement.href = text;
      	li.appendChild(aElement);
      	ulElement.appendChild(li);
	  })

    }
}