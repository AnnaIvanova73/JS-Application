const httpRequest = (method,data=undefined) => {
    let requestBody = {
        method:method,
    };
    if(data){
        requestBody['Content-type'] = 'application/json';
        requestBody.body = JSON.stringify(data);
    }
    return fetch(`http://localhost:3030/jsonstore/advanced/dropdown`,requestBody).then(res =>res.json());
 };

const get = httpRequest.bind(null, 'GET');
const post = httpRequest.bind(null, 'POST');
export default {
    get,post
}