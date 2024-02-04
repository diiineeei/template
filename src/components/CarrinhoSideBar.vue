<template>

    <v-container>
        <v-row>

            <v-col cols="12" class="mx-0 pa-0">
                <v-list lines="one" class="bg-transparent pa-4" transition="fade-transition" elevation="3">
                    <h2 class="text-h4 text-center">
                        <v-badge color="success" :content="store.productsCar.length">
                            <v-icon icon="mdi-cart" size="small"></v-icon>
                        </v-badge>
                        CARRINHO
                    </h2>
                    <v-list-item v-for="produto in store.productsCar" :key="produto.nome" color="primary" rounded="sm"
                        class="my-5">
                        <v-container class="item-main-container pa-0">
                            <div class="mr-5 w-50" >
                            <v-list-item-title>{{ produto.nome }}</v-list-item-title>
                            <v-list-item-subtitle>{{ productvalor(produto) }}</v-list-item-subtitle>
                            </div>
                          <div class="d-flex align-center">
                            <v-btn variant="text" icon="mdi-minus-circle" color="red-accent-2"
                            @click="changeItemQuantity(produto,'remove')"
                            ></v-btn>
                            {{ produto.quantity }}
                            <v-btn variant="text" icon="mdi-plus-circle" color="blue-accent-4"
                            @click="changeItemQuantity(produto,'add')"
                            ></v-btn>
                          </div>
                        </v-container>
                        <template v-slot:prepend>
                            <v-avatar size="85" rounded="0">
                                <v-img :src="produto.imagemURL"></v-img>
                            </v-avatar>
                        </template>
                        <template v-slot:append>
                            <v-hover v-slot="{ isHovering, props }">
                                <v-btn v-bind="props" :icon="isHovering ? 'mdi-delete-empty' : 'mdi-delete'" variant="text"
                                    elevation="0" color="red-darken-1"
                                    @click="removeItem(produto)"
                                    class="d-none d-sm-flex"/>
                            </v-hover>
                        </template>
                    </v-list-item>
                    <v-row>
                    <v-col class="d-flex justify-space-around">
                    <h2 class="text-center">Total: {{ precoTotal }}</h2>
                    </v-col>
                    </v-row>
                  <v-row>
                    <v-col class="d-flex justify-space-around">
                      <v-btn append-icon="mdi-shopping-outline" color="blue-accent-3" to="/carrinho">Finalizar</v-btn>
                      <!--                      <v-btn variant="text" append-icon="mdi-shopping-outline" color="blue-accent-3" to="/carrinho">Finalizar</v-btn>-->
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
    const value = store.productsCar.reduce((total, produtoAtual) => total + produtoAtual.valor * produtoAtual.quantity, 0);
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

const productvalor = ((produto) => {
    const value = produto.valor * produto.quantity
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
    store.productsCar[store.productsCar.indexOf(produto)].quantity += type == "add" ? 1 : -1
    if(type === "remove" && store.productsCar[store.productsCar.indexOf(produto)].quantity == 0) {
        removeItem(produto)
    }

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
