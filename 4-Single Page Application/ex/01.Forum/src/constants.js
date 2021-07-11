export const isInvalid = (arr) => {
    return arr.some(e => e === '');
};

export const methodPostPut = (type,data) => {
    return{
        method: type,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    };
};