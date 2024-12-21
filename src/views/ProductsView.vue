<script setup lang="ts">
import { ref } from 'vue';
import Product from '@/components/ProductBox.vue';
import { getProducts as _getProducts } from '@/services/endpoints';
import type { ProductType } from '@/models/models';
import useAsyncData from '@/composables/useAsyncData';
import ResponseStatuses from '@/constants/responseStatuses';

const isError = ref(false);

async function getProducts() {
	isError.value = false;
	const { data, status } = await _getProducts<ProductType[]>();
	if (status !== ResponseStatuses.OK) {
		isError.value = true;
		return;
	}
	return data;
}

const products = useAsyncData(getProducts);
</script>

<template>
	<main>
		<h1>Our Latest Products</h1>
		<p v-if="isError">An Error occured during fetching data</p>
		<template v-else>
			<Product
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</template>
	</main>
</template>
