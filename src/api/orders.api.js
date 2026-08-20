import { client } from './client.js';

export const createOrder = (data) => client.post('/orders', data).then((res) => res.data);

export const getMyOrders = () => client.get('/orders/mine').then((res) => res.data);

export const getMyOrderById = (id) => client.get(`/orders/mine/${id}`).then((res) => res.data);
