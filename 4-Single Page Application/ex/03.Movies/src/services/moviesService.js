import httpRequest from "../httpLibrary/httpService.js";
import magic from "../constants/constants.js";


const getAllMovies = async () => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}`, false);
};
const getMovie = async (id) => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}/${id}`, false);
};
const createMovie = async (data) => {
    return await httpRequest.post(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}`, true, data);
};
const updateMovie = async (movieId,data) => {
    return await httpRequest.put(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}/${movieId}`, true, data);
};
const deleteMovie = async (movieId) => {
    return await httpRequest.del(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}/${movieId}`, true);
};

export default {
    getAllMovies,createMovie,updateMovie,deleteMovie,getMovie
}