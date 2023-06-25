<template>
  
<div class="main-container">


  <h1>Products</h1>
<v-row class="justify-center">
  
  <v-col :cols="store.productsCar.length > 0 ? 8 : 12" class="produtos">
  <ProductCard
    v-for="product in store.products"
    :key="product.id"
    :productName="product.name"
    :productPrice="product.price"
    :productDesc="product.description"
    :productImg="product.img"
    @add-to-cart="onAddToCart(product)"/>
  </v-col>
  <v-col cols="md-4 xs-8" v-if="store.productsCar.length > 0" class="px-5">
    <CarrinhoCompras />
  </v-col>
  <v-col cols="12">
  <CadastroProduto/>
 </v-col>
</v-row>

</div>
</template>


<script setup>
import  ProductCard  from './ProductCard.vue'
import CarrinhoCompras from './CarrinhoCompras.vue';
import CadastroProduto from './CadastroProduto.vue';
import {/* ref, */} from 'vue'
import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()
function onAddToCart(product) {
 var checkProduct = store.productsCar.filter(productCar =>{
  
    return  product.id === productCar.id
  })

  checkProduct.length > 0 ? 
  store.productsCar[store.productsCar.indexOf(checkProduct[0])].quantity ++:  
  store.productsCar.push({...product, quantity:1})

}


setTimeout(()=>{
  let chickenProductIndex;
  store.products.filter((product,index)=>{
    if(product.name == "Chicken") chickenProductIndex = index
  })
  store.products[chickenProductIndex].img = "https://seara.com.br/wp-content/uploads/2022/10/7894904797905_Frango_inteiro_congelado_Seara_PRINCIPAL_520x440.png"
},5000)

</script>

<style>
h1{
  text-align: center;
  margin-bottom: 35px;
}


.main-container{
  align-items: center;
  display: flex;
  flex-direction: column;

}

.produtos{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  grid-row-gap:15px;
  max-width: 80vw;
}
</style>