import { ref } from 'vue';
import sessionStorageHelpers from '@/utils/sessionStorageHelpers';
import sessionKeys from '@/constants/sessionKeys';

export default function useSelectedProductIdsData() {
	const selectedProductIds = ref<string[]>(
		sessionStorageHelpers.getData<string[]>(sessionKeys.selectedProductIds) || [],
	);

	const addProductId = (id: string) => {
		selectedProductIds.value.push(id);
		sessionStorageHelpers.setData<string[]>(sessionKeys.selectedProductIds, selectedProductIds.value);
	};

	const removeProductId = (id: string) => {
		const index = selectedProductIds.value.findIndex(productId => productId === id);
		selectedProductIds.value.splice(index, 1);
		sessionStorageHelpers.setData<string[]>(sessionKeys.selectedProductIds, selectedProductIds.value);
	};

	return {
		selectedProductIds,
		addProductId,
		removeProductId,
	};
}
