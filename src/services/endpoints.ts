import axios, { type AxiosResponse } from 'axios';

export function getProducts<T>(): Promise<AxiosResponse<T>> {
	return axios.get<T>(`${import.meta.env.VITE_BASE_URL}products`);
}

export function getProductDetails<T>(id: string): Promise<AxiosResponse<T>> {
	return axios.get<T>(`${import.meta.env.VITE_BASE_URL}products/${id}`);
}
