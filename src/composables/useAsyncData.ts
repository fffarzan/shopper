import type { SSRContext } from '@/main';
import { onServerPrefetch, ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';

export default function useAsyncData<T>(fn: () => Promise<T>) {
	const route = useRoute();

	const ctx = inject<SSRContext>('__SSR', {} as SSRContext);

	const data = ref(ctx?.[route.fullPath]);

	onServerPrefetch(async () => {
		const res = await fn();
		ctx[route.fullPath] = res;
		data.value = res;
	});

	onMounted(async () => {
		if (!import.meta.env.SSR && !data.value) {
			const res = await fn();
			data.value = res;
		}
	});

	return data;
}
