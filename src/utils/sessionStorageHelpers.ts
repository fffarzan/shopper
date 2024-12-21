export default {
	getData<T>(key: string, defaultData = []): T {
		if (typeof window === 'undefined') {
			return [] as T;
		}
		return sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key) || `${defaultData}`);
	},
	setData<T>(key: string, data: T) {
		if (typeof window === 'undefined') {
			return;
		}
		sessionStorage.setItem(key, JSON.stringify(data));
	},
};
