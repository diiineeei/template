<template>

<div class="main-container">


<h1 class="page-title">Produtos</h1>

<div class="content">
  <section class="products-grid">
    <ProductCard
      v-for="product in store.products"
      :key="product.ID"
      :productnome="product.nome"
      :productvalor="product.valor"
      :productDesc="product.descricao"
      :productimagemURL="product.imagemURL"
      @add-to-cart="onAddToCart(product)"
    />
  </section>

  <aside v-if="store.productsCar.length > 0" class="cart-aside">
    <div class="cart-panel" :class="{ 'cart-panel--fixed': shouldFixCart }">
      <CarrinhoCompras />
    </div>
  </aside>
</div>

</div>
</template>


<script setup>
import  ProductCard  from './ProductCard.vue'
import CarrinhoCompras from './CarrinhoSideBar.vue';
import { computed } from 'vue'
import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()
const shouldFixCart = computed(() => store.productsCar.length > 0)

const getProductId = (item) => {
  if (!item) return ''
  if (item.cartId) return item.cartId
  if (item.ID !== undefined && item.ID !== null) return item.ID
  if (item.id !== undefined && item.id !== null) return item.id
  if (item.nome) {
    return `${item.nome}-${item.valor ?? ''}`
  }
  return JSON.stringify(item)
}

function onAddToCart(product) {
  const cartId = getProductId(product)
  const productIndex = store.productsCar.findIndex(
    (productCar) => getProductId(productCar) === cartId
  )

  if (productIndex >= 0) {
    store.productsCar[productIndex].quantity += 1
    return
  }

  store.productsCar.push({
    ...product,
    cartId,
    quantity: 1
  })
}


// setTimeout(()=>{
//   let chickenProductIndex;
//   store.products.filter((product,index)=>{
//     if(product.nome == "Chicken") chickenProductIndex = index
//   })
//   // store.products[chickenProductIndex].imagemURL = "https://seara.com.br/wp-content/uploads/2022/10/7894904797905_Frango_inteiro_congelado_Seara_PRINCIPAL_520x440.png"
// },5000)

</script>

<style>
.main-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 36px 40px 64px;
  box-sizing: border-box;

}

.page-title{
  width: 100%;
  max-width: 1360px;
  margin: 0 auto 44px;
  font-size: clamp(1.9rem, 1.5rem + 1vw, 2.7rem);
  font-weight: 700;
  color: #1f2933;
}

.content{
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 28px;
  align-items: flex-start;
}

.products-grid{
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 28px;
  padding: 12px 4px;
}

.cart-aside{
  position: relative;
  width: 100%;
}

.cart-panel{
  position: sticky;
  top: calc(var(--app-header-height, 96px) + 24px);
  max-height: calc(100vh - var(--app-header-height, 96px) - 48px);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-panel--fixed{
  position: fixed;
  top: calc(var(--app-header-height, 96px) + 24px);
  right: max(60px, calc((100vw - 1660px) / 2 + 20px));
  width: clamp(320px, 26vw, 560px);
  max-width: calc(100vw - 64px);
  max-height: calc(100vh - var(--app-header-height, 96px) - 48px);
  z-index: 10;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.12);
}

.cart-panel :deep(.cart-wrapper){
  width: 100%;
  height: 100%;
  max-height: inherit;
}

.cart-panel :deep(.cart-list){
  max-height: calc(100vh - var(--app-header-height, 96px) - 120px);
}

@media (max-width: 1280px){
  .main-container{
    padding-left: 28px;
    padding-right: 28px;
  }

  .page-title{
    margin-bottom: 32px;
  }

  .content{
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 24px;
  }

  .products-grid{
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }

  .cart-panel--fixed{
    right: max(28px, calc((100vw - 1280px) / 2 + 16px));
    width: clamp(280px, 28vw, 320px);
  }
}

@media (max-width: 960px){
  .page-title{
    text-align: center;
  }

  .content{
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .cart-panel{
    position: static;
    max-height: none;
  }

  .cart-panel--fixed{
    position: static;
    right: auto;
    width: 100%;
    max-width: 100%;
    box-shadow: none;
  }

  .cart-panel :deep(.cart-list){
    max-height: calc(100vh - var(--app-header-height, 96px) - 120px);
  }
}
</style>
