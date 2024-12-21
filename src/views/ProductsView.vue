<script setup lang="ts">
import Product from '@/components/ProductBox.vue';
import { getProducts as _getProducts } from '../services/endpoints';
import type { ProductType } from '@/models/models';
import useAsyncData from '@/composables/useAsyncData';

async function getProducts() {
	const { data } = await _getProducts<ProductType[]>();
	return data;
}

const products = useAsyncData(getProducts);
</script>

<template>
	<main>
		<h1>Our Latest Products</h1>
		<Product
			v-for="product in products"
			:key="product.id"
			:product="product"
		/>
	</main>
</template>
