import axios from 'axios';

export type Response<T> = {
	data: T | null;
	status: number;
};

export async function fetchData<T>(url: string, id?: string): Promise<Response<T>> {
	const result: Response<T> = {
		data: null,
		status: 0,
	};
	try {
		const { data, status } = await axios.get<T>(`${import.meta.env.VITE_BASE_URL}${url}${id ? `/${id}` : ''}`);
		result.data = data;
		result.status = status;
	} catch (error) {
		console.error('Fetch Error:', error);
	}
	return result;
}
