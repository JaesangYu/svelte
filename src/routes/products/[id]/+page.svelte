<script>
	import Slider from './Slider.svelte';
	import { afterNavigate } from '$app/navigation';

	export let data

	$:({product, relatedProducts, cart} = data)
	let recommendRequest = new Promise(() => {})

	afterNavigate(() => {
		recommendRequest = fetch(`/api/recommend?id=${product.id}`).then(res => res.json())
	})
</script>
<header class="header">
	<a class="header-title" href="/">Svelte Site</a>
	<nav>
		<ul class="header-links">
			<li>안녕하세요. 게스트님</li>
			<li>
				<a href="/cart">장바구니(0)</a>
			</li>
		</ul>
	</nav>
</header>

<article class="product">
	<div class="product-main">
		<div class="image-container">
			<Slider images="{product.images}" />
		</div>

		<div>
			<h2>{product.name}</h2>
			<dl>
				<dt>금액</dt>
				<dt>{product.price}원</dt>
			</dl>
			<div>
				{#if !cart.includes(product.id)}
					<form method="POST">
						<input type="hidden" name="productId" value="{product.id}" />
						<button>장바구니 담기</button>
					</form>
				{:else}
					<button disabled>장바구니 담기 완료</button>
				{/if}
			</div>
		</div>
	</div>

	<footer>
		<h3>추천 상품</h3>
		{#await recommendRequest}
			<div>로딩중...</div>
		{:then products}
			<ul>
				{#each products as product}
					<li>
						<a href="/products/{product.id}">{product.name}</a>
						- {product.price}원
					</li>
				{/each}
			</ul>
		{:catch}
			<div>로딩 에러</div>
		{/await}
	</footer>
</article>

<style>
    :global(body) {
        margin: 0;
        background-color: #eee;
        padding: 0;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        background-color: #fff;
        padding: 0 15px;
        width: 100%;
        max-width: 800px;
        height: 50px;
    }

    .header-title {
        font-weight: bold;
    }

    .header-links {
        display: flex;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .product {
        margin: 0 auto;
        background-color: #fff;
        padding: 15px;
        width: 100%;
        max-width: 800px;
    }

    .product-main {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .image-container {
        width: 100%;
        max-width: 400px;
        overflow: hidden;
    }

</style>
