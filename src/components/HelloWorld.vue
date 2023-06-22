<script setup>
import  ProductCard  from './ProductCard.vue'
import CarrinhoCompras from './CarrinhoCompras.vue';
import CadastroProduto from './CadastroProduto.vue';
import {ref} from 'vue'
const productsCar = ref([])
const products = ref([
  {
    id: 1,
    name: 'Apple',
    price: 1.99,
    description: 'Fresh and juicy apples.',
    img: 'https://images.squarespace-cdn.com/content/v1/5b5b5824f2e6b10639fdaf09/1651599956690-0CE43F9HKEXIEK89CY0B/1.png'
  },
  {
    id: 2,
    name: 'Banana',
    price: 0.99,
    description: 'Ripe and delicious bananas.',
    img: 'https://mercadoterra.s3.amazonaws.com/web/media/2020/04/banana-nanica-800x450.png'
  },
  {
    id: 3,
    name: 'Orange',
    price: 1.49,
    description: 'Sweet and tangy oranges.',
    img: 'https://www.boeschbodenspies.com/wp-content/uploads/2017/08/orange.png'
  },
  {
    id: 4,
    name: 'Milk',
    price: 2.99,
    description: 'Fresh and creamy milk.',
    img: 'https://www.lykki.canteencanada.com/media/catalog/product/cache/2/image/800x/9df78eab33525d08d6e5fb8d27136e95/d/a/dairyland_2__milk_1l_130301_en.png'
  },
  {
    id: 5,
    name: 'Eggs',
    price: 2.49,
    description: 'Farm-fresh eggs.',
    img: 'https://gofflepoultry.com/wp-content/uploads/2020/05/JumboWhiteTray.png'
  },
  {
    id: 6,
    name: 'Bread',
    price: 1.89,
    description: 'Soft and delicious bread.',
    img: 'https://cdn.shopify.com/s/files/1/0555/9730/1839/products/sola-sweet-and-buttery-keto-bread-front-1_9abbb985-2bf9-4dea-b897-7c079a07b067.png?v=1685983702'
  },
  {
    id: 7,
    name: 'Chicken',
    price: 5.99,
    description: 'Tender and succulent chicken.',

  },
  {
    id: 8,
    name: 'Beef',
    price: 8.99,
    description: 'Premium quality beef.',
    img: 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_1.0,e_replace_color:fcf9f3:100:ffffff,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_350/CAN_GroundBeef-MAP_6545_ijtb9o'
  },
  {
    id: 9,
    name: 'Fettuccine pasta',
    price: 2.49,
    description: 'De Cecco Fettuccine pasta.',
    img: 'https://www.dececco.com/wp-content/uploads/2018/05/0UN2103-FETTUCCINE-3.png'
  },
  {
    id: 10,
    name: 'Rice',
    price: 1.99,
    description: 'High-quality rice grains.',
    img: 'https://arrozeirabomjesus.com.br/wp-content/uploads/elementor/thumbs/embalagem-ouro-puro-integral-obzdn8qv9iz12p5mp28cwpfskj9s3i44w6ov41zuam.png'
  },
  {
    id: 11,
    name: 'Tomato',
    price: 0.99,
    description: 'Fresh and ripe tomatoes.',
    img: 'https://cdn.pixabay.com/photo/2021/10/14/03/19/tomato-6707992_1280.png'
  },
  {
    id: 12,
    name: 'Cucumber',
    price: 0.79,
    description: 'Crisp and refreshing cucumbers.',
    img: 'https://mucci-production-user-uploads-bucket.s3.amazonaws.com/images/Product-IMG_MiniCucumbers-rev2.original.png'
  },
  {
    id: 13,
    name: 'Carrot',
    price: 0.59,
    description: 'Sweet and nutritious carrots.',
    img: 'https://static1.squarespace.com/static/5b5b5824f2e6b10639fdaf09/5b7d6ba61ae6cfa594b1932e/5b8420facd8366d1f2daf067/1657038012687/5.png?format=1500w'
  },
  {
    id: 14,
    name: 'Potato',
    price: 0.89,
    description: 'Versatile and delicious potatoes.',
    img: 'https://images.squarespace-cdn.com/content/v1/5b5b5824f2e6b10639fdaf09/a277eae9-bf1a-4e66-9daf-dd2e60209073/Produce+Storage+Tips+icons+%289%29.png'
  },
  {
    id: 15,
    name: 'Onion',
    price: 0.69,
    description: 'Flavorful and aromatic onions.',
    img: 'https://i5.walmartimages.com/asr/ad10f097-b720-45a4-881d-8336dfde0b1b.da769cece43bb81239c46e2b360eee78.png'
  }
]);

function onAddToCart(product) {
 var checkProduct = productsCar.value.filter(productCar =>{
  
    return  product.id === productCar.id
  })

  checkProduct.length > 0 ? 
  productsCar.value[productsCar.value.indexOf(checkProduct[0])].quantity ++:  
  productsCar.value.push({...product, quantity:1})

}

function onAddProduto(produto){
  const {name, price, description, img} = produto
  products.value.push({
    name: name,
    price: Number(price),
    description: description,
    img: img,
    id: Date.now()
  })

}

</script>



<template>
  
<div class="main-container">


  <h1>Products</h1>
<v-row class="justify-center">
  
  <v-col :cols="productsCar.length > 0 ? 8 : 12" class="produtos">
  <ProductCard
    v-for="product in products"
    :key="product.id"
    :productName="product.name"
    :productPrice="product.price"
    :productDesc="product.description"
    :productImg="product.img"
    @add-to-cart="onAddToCart(product)"/>
  </v-col>
  <v-col cols="md-4 xs-8" v-if="productsCar.length > 0" class="px-5">
    <CarrinhoCompras :produtos="productsCar"/>
  </v-col>
  <v-col cols="12">
  <CadastroProduto @create-produto="onAddProduto"/>
 </v-col>
</v-row>

</div>
</template>



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