import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000"})



export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const joinEvent = (post) => API.post("/posts/join-event", post);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const searchBoardGame = (formData) => API.post("/boardgames/search-boardgames", formData)
export const boardGameData = (formData) => API.post("/boardgames/boardgame-data", formData)

export const locationSearch = (formData) => API.post("/location/search-location", formData)

export const getUser = (formData => API.post("/user/getuser", formData))


export const createGroupChat = (newChat => API.post("/chat/group-chat", newChat))
export const fetchChats = (userID => API.post("/chat/fetch-chats", userID))
export const fetchChat = (chat => API.post("/chat/fetch-chat", chat))
export const joinChat = (chat => API.put("/chat/group-add", chat))


export const sendMessage = (message => API.post("/message", message))
export const fetchMessages = (id => API.get( `/message/${id}`))