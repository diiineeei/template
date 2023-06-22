<template>
    <v-container>

        <v-row>

            <v-col cols="12" class="mx-0 pa-0">
                <v-list lines="one" class="bg-transparent pa-4" transition="fade-transition" elevation="3">
                    <h2 class="text-h4 text-center">
                        <v-badge color="success" :content="store.productsCar.length">
                            <v-icon icon="mdi-cart" size="small"></v-icon>
                        </v-badge>
                        CARRINHO DE COMPRAS
                    </h2>
                    <v-list-item v-for="produto in store.productsCar" :key="produto.name" color="primary" rounded="sm"
                        class="my-5">
                        <v-container class="item-main-container pa-0">
                            <div class="mr-5">
                            <v-list-item-title>{{ produto.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ productPrice(produto) }}</v-list-item-subtitle>
                            </div>
                            <v-btn variant="text" icon="mdi-plus-circle" color="green-accent-4" 
                            @click="changeItemQuantity(produto,'add')"
                            ></v-btn>
                            {{ produto.quantity }}
                            <v-btn variant="text" icon="mdi-minus-circle" color="red-accent-2" 
                            @click="changeItemQuantity(produto,'remove')"
                            ></v-btn>
                        </v-container>
                        <template v-slot:prepend>
                            <v-avatar size="85" rounded="0">
                                <v-img :src="produto.img"></v-img>
                            </v-avatar>
                        </template>
                        <template v-slot:append>
                            <v-hover v-slot="{ isHovering, props }">
                                <v-btn v-bind="props" :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'" variant="text"
                                    elevation="0" color="red-darken-4" 
                                    @click="removeItem(produto)"
                                    />
                            </v-hover>
                        </template>
                    </v-list-item>
                    <v-row>
                    <v-col class="d-flex justify-space-around">
                    <h2 class="text-center">Total: {{ precoTotal }}</h2>
                    <v-btn append-icon="mdi-shopping-outline" color="success" >Order Now</v-btn>
                    </v-col>
                    </v-row>
                </v-list>
            </v-col>
        </v-row>


    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import {produtosAppStore} from '@/store/app'
const store = produtosAppStore()

const precoTotal = computed(() => {
    const value = store.productsCar.reduce((total, produtoAtual) => total + produtoAtual.price * produtoAtual.quantity, 0);
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

const productPrice = ((produto) => {
    const value = produto.price * produto.quantity
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

/* const props = defineProps({
    produtos: Array
})
 */

 const changeItemQuantity = ((produto, type)=>{
    if(type === "remove" && store.productsCar[store.productsCar.indexOf(produto)].quantity == 1) {
        removeItem(produto)
    }
    store.productsCar[store.productsCar.indexOf(produto)].quantity += type == "add" ? 1 : -1
 })

 const removeItem = ((produto)=>{
    store.productsCar.splice( store.productsCar.indexOf(produto), 1)
 })

</script>

<style scoped>
.item-main-container{
    display: flex;
    align-items: center;
}
</style>