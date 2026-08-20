import { client } from './client.js';

export const getProducts = (params) => client.get('/products', { params }).then((res) => res.data);

export const getProductBySlug = (slug) => client.get(`/products/${slug}`).then((res) => res.data);
