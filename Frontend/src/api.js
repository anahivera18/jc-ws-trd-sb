import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL ||
'http://localhost:5000/api' });
export const games = {
 list: (q) => API.get('/games', { params: { q } }).then(r => r.data),
 stats: () => API.get('/games/stats').then(r => r.data),
 get: (id) => API.get(`/games/${id}`).then(r => r.data),
 create: (data) => API.post('/games', data).then(r => r.data),
 update: (id, data) => API.put(`/games/${id}`, data).then(r => r.data),
 remove: (id) => API.delete(`/games/${id}`).then(r => r.data),
};
export const reviews = {
 listByGame: (gameId) => API.get(`/reviews/${gameId}`).then(r => r.data),
 create: (gameId, data) => API.post(`/reviews/${gameId}`, data).then(r => r.data),
 update: (id, data) => API.put(`/reviews/review/${id}`, data).then(r => r.data),
 remove: (id) => API.delete(`/reviews/review/${id}`).then(r => r.data),
};
