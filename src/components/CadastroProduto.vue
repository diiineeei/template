<template>
    <v-container class="w-md-75">
    <v-row class="flex-column ">
        <v-col cols="12">
            <h1> Cadastro de produtos</h1>
        </v-col>
 
        <v-col>
            <v-form @submit.prevent="onCriarProduto" v-model="formValido" ref="form">
                <v-text-field variant="outlined" label="Nome-Produto" v-model="dadosProduto.name" :rules="validacaoNome"/>
                <v-text-field variant="outlined" label="Preço" type="number" v-model="dadosProduto.price" :rules="validacaoPreco"/>
                <v-text-field variant="outlined" label="Descrição" v-model="dadosProduto.description"/>
                <v-text-field variant="outlined" label="Foto URL" v-model="dadosProduto.img"/>
                <v-btn color="green-accent-2" type="submit"  :disabled="!formValido" class="mr-10"> Cadastrar</v-btn>
                <v-btn @click="onLimpar" color="error">Clear</v-btn>
            </v-form>
        </v-col>
        {{ dadosProduto.value }}
    </v-row>
    
    </v-container>
</template>

<script setup>
import {ref, /* defineEmits */} from 'vue'

/* const emit = defineEmits(['create-produto']) */

const dadosProduto = ref({
    name: '',
    price: '',
    description: '',
    img: ''
})

import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()

const formValido = ref(false)

const form = ref(null)

const validacaoNome = ref([
    (name) => !!name || 'O nome do produto é obrigatório',
    (name) => name.length >= 5 || 'O nome do produto deve ter pelo menos 5 caracteres'
])

const validacaoPreco = ref([
    (price) => !!price || 'O Preço do produto é obrigatório',
    (price) => Number(price) > 0 || 'Insira um preço valido'
])


function onCriarProduto(){
    const {name, price, description, img} = dadosProduto.value
    store.products.push({
        name: name,
        price: Number(price),
        description: description,
        img: img,
        id: Date.now()
    })

    onLimpar()
   
}
function onLimpar(){
    form.value.reset()
}
</script>
