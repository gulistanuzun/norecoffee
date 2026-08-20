import { client } from './client.js';

export const registerUser = (data) => client.post('/auth/register', data).then((res) => res.data);

export const loginUser = (data) => client.post('/auth/login', data).then((res) => res.data);

export const getMe = () => client.get('/auth/me').then((res) => res.data);
