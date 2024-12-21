import { fetchData, type Response } from './fetch';

export function getProducts<T>(): Promise<Response<T>> {
	return fetchData('products');
}

export function getProductDetails<T>(id: string): Promise<Response<T>> {
	return fetchData('products', id);
}
