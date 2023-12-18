import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000"})



export const fetchPosts = () => API.get("/posts");


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const searchBoardGame = (formData) => API.post("/boardgames/search-boardgames", formData)
export const boardGameData = (formData) => API.post("/boardgames/boardgame-data", formData)

export const locationSearch = (formData) => API.post("/location/search-location", formData)