<script lang="ts" setup>
export interface IEmits {
	(e: 'add-to-cart'): void;
}

defineEmits<IEmits>();
</script>

<template>
	<div>
		<button @click="$emit('add-to-cart')">Add to Cart</button>
	</div>
</template>

<style scoped>
btn {
	display: inline-block;
	margin-top: 1rem;
	cursor: pointer;
	background-color: red;
}
</style>
