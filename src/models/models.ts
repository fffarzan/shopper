export type ProductType = {
	description: string;
	id: string;
	imgUrl: string;
	price: number;
	title: string;
};

export type SelectedProductType = ProductType & { shoppingCartId: number };
