<template>
    <v-container class="fill-height d-flex align-center">
        <p class="text-h6 font-weight-black text-grey-darken-3 d-flex align-center mb-10">
            <v-icon size="small" color="blue-lighten-1" icon="mdi-file-search" class="mr-1"/>RESUMO
        </p>
       <div class="d-flex justify-space-between w-100 text-subtitle-2 font-weight-light text-grey-darken-3">Valor dos Produtos:
            <p class="text-grey-darken-3 font-weight-black text-body-1">{{ fullvalor }}</p>
       </div>
       <v-divider class="border-opacity-25"></v-divider>
       <div class="d-flex justify-space-between w-100 text-subtitle-2 font-weight-light text-grey-darken-3">Valor do frete:
            <p class="text-grey-darken-3 font-weight-black text-body-1">R$ 0,00</p>
       </div>
        <div class="bg-grey-lighten-5 pa-5 w-100">
            <div class="d-flex justify-space-between w-100 text-subtitle-2 font-weight-light text-grey-darken-3 mb-2">Total à prazo:
                <p class="text-grey-darken-3 font-weight-black text-body-1">{{fullvalor }}</p>
            </div>
            <p class="text-subtitle-2 font-weight-light text-grey-darken-3 text-center">
                (em até <b class="font-weight-medium">10x</b> de <b class="font-weight-medium">{{installmentsvalor}} sem juros</b>)
            </p>
       </div>
       <div class="bg-blue-lighten-5 pa-5 w-100 text-teal-darken-4">
            <div class="w-100 text-subtitle-2 font-weight-light  mb-2 text-center">Valor à vista no <b class="font-weight-bold">Pix:</b>
                <p class="text-light-blue-darken-4 font-weight-black text-h5">{{ discountvalor }}</p>
            </div>
            <p class="text-subtitle-2 font-weight-light  text-center">
                (Economize <b class="font-weight-bold">{{ installmentsvalor }}</b>)
            </p>
       </div>
       <v-btn size="large" block color="blue">IR PARA O PAGAMENTO</v-btn>
       <v-btn size="large" block variant="outlined" color="blue">CONTINUAR COMPRANDO</v-btn>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import {produtosAppStore} from '@/store/app'
const store = produtosAppStore()

const fullvalor = computed(() => {
    const value = store.productsCar.reduce((total, produtoAtual) => total + produtoAtual.valor * produtoAtual.quantity, 0);
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

const discountvalor = computed(() => {
    const value = store.productsCar.reduce((total, produtoAtual) => total + produtoAtual.valor * produtoAtual.quantity, 0) * 0.9;
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

const installmentsvalor = computed(() => {
    const value = store.productsCar.reduce((total, produtoAtual) => total + produtoAtual.valor * produtoAtual.quantity, 0) * 0.1;
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})
</script>

<style  scoped>
</style>
