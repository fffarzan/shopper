<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Product from '../components/ProductBox.vue';
import type { ProductType } from '@/models/models';
import { getProductDetails as _getProductDetails } from '../services/endpoints';
import type { AxiosResponse } from 'axios';
import useSelectedProductIdsData from '@/composables/useSelectedProductIdsData';

export type SelectedProductType = ProductType & { shoppingCartId: number };

const { selectedProductIds, removeProductId } = useSelectedProductIdsData();

const selectedProducts = ref<SelectedProductType[]>([]);

async function getSelectedProducts() {
	const promises = selectedProductIds.value.map((id: string) => _getProductDetails<ProductType>(id));
	const result = await Promise.all<AxiosResponse<ProductType>>(promises);
	selectedProducts.value = result.map(item => item.data).map((product, i) => ({ ...product, shoppingCartId: i }));
}

function removeFromSelectedProducts(productId: string, cartId: number) {
	if (!selectedProducts.value.length) {
		selectedProducts.value = [];
		return;
	}
	removeProductId(productId);
	selectedProducts.value = selectedProducts.value?.filter(({ shoppingCartId }) => shoppingCartId !== cartId);
}

function removeProduct(e: Event, id: string, shoppingCartId: number) {
	e.preventDefault();
	removeFromSelectedProducts(id, shoppingCartId);
}

onMounted(() => {
	getSelectedProducts();
});
</script>

<template>
	<main>
		<h1>Your Choices</h1>
		<div v-if="selectedProducts.length">
			<template
				v-for="product in selectedProducts"
				:key="product.shoppingCartId"
			>
				<Product :product="product" />
				<button @click="removeProduct($event, product.id, product.shoppingCartId)">Delete</button>
			</template>
		</div>
		<p v-else>No selected product!</p>
	</main>
</template>
