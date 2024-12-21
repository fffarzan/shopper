<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getProductDetails as _getProductDetails } from '@/services/endpoints';
import type { ProductType } from '@/models/models';
import AddToCartButton from '@/components/Base/AddToCartButton.vue';
import useAsyncData from '@/composables/useAsyncData';
import useSelectedProductIdsData from '@/composables/useSelectedProductIdsData';
import ResponseStatuses from '@/constants/responseStatuses';

const route = useRoute();
const { addProductId } = useSelectedProductIdsData();

const isError = ref(false);

async function getProductDetails() {
	isError.value = false;
	const { data, status } = await _getProductDetails<ProductType>(route.params.id as string);
	if (status !== ResponseStatuses.OK) {
		isError.value = true;
		return;
	}
	return data;
}

const productDetails = useAsyncData(getProductDetails);
</script>

<template>
	<div>
		<p v-if="isError">Not such this product!</p>
		<div v-else>
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
	</div>
</template>
