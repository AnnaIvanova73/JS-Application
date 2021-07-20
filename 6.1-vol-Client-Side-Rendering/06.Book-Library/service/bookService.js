import jsonRequest from "../httpLibrary/jsonRequest.js";

const baseUrl = `http://localhost:3030`;
let endPoints = {
    requestWithId: `/jsonstore/collections/books/`,
    requestWithoutId: `/jsonstore/collections/books`
}
const getAllBooks = async () => {
    return await jsonRequest.get(`${baseUrl}${endPoints.requestWithoutId}`);
};
const getBook= async (id) => {
    return await jsonRequest.get(`${baseUrl}${endPoints.requestWithId}${id}`);
};
const createBook = async (data) => {
    return await jsonRequest.post(`${baseUrl}${endPoints.requestWithoutId}`, data);
};
const editBook= async (id,data) => {
    return await jsonRequest.put(`${baseUrl}${endPoints.requestWithId}${id}`,data);
};
const deleteBook= async (id) => {
    return await jsonRequest.del(`${baseUrl}${endPoints.requestWithId}${id}`);
};

export default {
    getAllBooks,getBook,createBook,editBook,deleteBook
}