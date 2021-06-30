const getTodos = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === 4) {
                reject(`could not fetch data`, undefined);
            }
        })
        request.open('GET', resource);
        request.send();
    })
};

getTodos('todos/luigi.json').then(data => {
    console.log('promise resolved:',data)
}).catch(err => {
    console.log('promise rejected:', err)
});

//promise example

/*
const getSomething = () => {
    return new Promise((resolve, reject) => {
        // fetch something
        //resolve('some data');
        reject('some error');
    });
}

getSomething(); //return promise, inside the promise will return resole or reject


getSomething().then((data) => {
    console.log(data)
}, (err) => {           //fires if we reject, it's like catch
    console.log(err)
});

getSomething().then(data =>{
    console.log(data)
}).catch(err => console.log(err))

*/
