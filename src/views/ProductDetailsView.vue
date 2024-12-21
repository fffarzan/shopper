<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getProductDetails as _getProductDetails } from '../services/endpoints';
import type { ProductType } from '@/models/models';
import AddToCartButton from '../components/Base/AddToCartButton.vue';
import useAsyncData from '@/composables/useAsyncData';
import useSelectedProductIdsData from '@/composables/useSelectedProductIdsData';

const route = useRoute();
const { addProductId } = useSelectedProductIdsData();

async function getProductDetails() {
	const { data } = await _getProductDetails<ProductType>(route.params.id as string);
	return data;
}

const productDetails = useAsyncData(getProductDetails);
</script>

<template>
	<div>
		<div v-if="productDetails && Object.keys(productDetails).length">
			<br />
			<img
				:src="productDetails?.imgUrl"
				:alt="productDetails?.title"
				width="400"
				height="200"
			/>
			<h1>{{ productDetails?.title }}</h1>
			<div>
				<p>{{ productDetails?.description }}</p>
				<strong>Price: {{ productDetails?.price }}$</strong>
			</div>
			<AddToCartButton @add-to-cart="addProductId(productDetails?.id)" />
		</div>
		<div v-else>
			<p>Not such this product!</p>
		</div>
	</div>
</template>
