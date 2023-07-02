<template>
<v-container id="container" fluid class="pa-md-0">
    <v-row class="d-flex justify-space-between">
        <v-col id="timeline-container" cols="12" class="d-none d-md-flex">
            <v-timeline direction="horizontal" line-inset="40"  truncate-line="both">
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 0 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-cart"></v-timeline-item>
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 1 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-account"></v-timeline-item>
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 2 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-credit-card-outline"></v-timeline-item>
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 3 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-check-circle"></v-timeline-item>
            </v-timeline>
        </v-col>

        <v-col id="carrinho-container" class="bg-grey-lighten-5 pa-10 rounded" cols="12" md="8">
            <v-row>
                <v-col cols="12" class="d-flex justify-space-between py-5">
                    <p class="text-h5 font-weight-bold text-center d-flex align-self-end">
                        <v-badge color="success" class="mr-3" :content="store.productsCar.length">
                            <v-icon icon="mdi-cart" ></v-icon>
                        </v-badge>
                        PRODUTOS
                    </p>
                    <v-btn prepend-icon="mdi-delete" variant="outlined" color="red">REMOVER TODOS</v-btn>
                </v-col>
    
                <v-divider/>

                <v-col>
                <v-list class="bg-grey-lighten-5" max-height="450px" id="products-list">
         
                <ProdutosCarrinhosMainVue
                v-for="produto in store.productsCar" 
                :produto="produto"
                :key="produto.name"
                @changeItemQuantity="(type)=>changeItemQuantity(produto, type)"
                />
                </v-list>
                </v-col>
            </v-row>
        </v-col>
        <v-col id="total-container" class="bg-grey-lighten-3" cols="12" md="3"></v-col>
    </v-row>
</v-container>
</template>

<script setup>
import {ref} from 'vue';
import {produtosAppStore} from '@/store/app'
import ProdutosCarrinhosMainVue from './ComponentesCarrinhos/ProdutosCarrinhosMain.vue';
const store = produtosAppStore()
const timeline = ref(0)

/* const precoTotal = computed(() => {
    const value = store.productsCar.reduce((total, produtoAtual) => total + produtoAtual.price * produtoAtual.quantity, 0);
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}) */

const productPrice = ((produto) => {
    const value = produto.price * produto.quantity
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

 const changeItemQuantity = ((produto, type)=>{
    if(type === "remove" && store.productsCar[store.productsCar.indexOf(produto)].quantity == 1) {
        removeItem(produto)
    }
    else{
        store.productsCar[store.productsCar.indexOf(produto)].quantity += type == "add" ? 1 : -1
    }
 
 })

 const removeItem = ((produto)=>{
    store.productsCar.splice( store.productsCar.indexOf(produto), 1)
 })


</script>


<style scoped>

#products-list::-webkit-scrollbar {
  width: 10px;
}
#products-list::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
#products-list::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0; 
}
#products-list::-webkit-scrollbar-thumb{ 
  border-radius: 100px;
  background: #cecece;
}

#container{
    width: 80%;
}

@media(max-width: 960px){
    #container{
        width: 100%;
    }
}
</style>