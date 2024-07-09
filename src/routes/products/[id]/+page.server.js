import { addToCart, loadCart } from '$lib/server/cart.js';
import { loadProducts} from '$lib/server/product.js';

async function getProductFromDatabase(productId) {
	const products = await loadProducts()
	return products.find((product) => productId === product.id)
}

async function getRelatedProductsFromDatabase(productId) {
	const products = await loadProducts()
	return products.filter((product) => productId !== product.id)
}

export const actions = {
	default: async ({request}) => {
		const data = await request.formData()
		await addToCart(data.get('productId'))
	}
}
export async function load({params}) {
	const productId = params.id
	const product = await getProductFromDatabase(productId)
	const relatedProducts = await getRelatedProductsFromDatabase(productId)
	const cart = await loadCart()
	return {
		product, relatedProducts, cart
	}
}
