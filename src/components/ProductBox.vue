<script lang="ts" setup>
import type { ProductType } from '@/models/models';

export interface IProps {
	product: Omit<ProductType, 'description'>;
}

defineProps<IProps>();
</script>

<template>
	<router-link :to="`/products/${product.id}`">
		<h1>{{ product.title }}</h1>
		<img
			:src="product.imgUrl"
			:alt="product.title"
			width="200"
			height="100"
		/>
		<strong>Price: {{ product.price }}$</strong>
	</router-link>
</template>

<style scoped>
a {
	text-decoration: none;
	color: unset;
}

strong {
	display: block;
}
</style>
