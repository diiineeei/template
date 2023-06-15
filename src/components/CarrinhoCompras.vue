<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" >
                <h1 class="text-deep-purple">Carrinho de Compras</h1>
            </v-col>
            <v-col  cols="12">
                <v-card  v-for="produto in produtos" :key="produto.name">
                    <v-card-title>
                        {{produto.name}}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <h2>Total: {{precoTotal}}</h2>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup> 
import {computed} from 'vue';

const precoTotal = computed(() => {
   const value = props.produtos.reduce((total, produtoAtual) => total + produtoAtual.price,0);
   return value.toLocaleString('pt-BR',{
    style: 'currency',
    currency : 'BRL'
   })
})

      const props = defineProps({
         produtos: Array
        })

        
</script>

<style scoped>

</style>