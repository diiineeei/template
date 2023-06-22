<template>
    <v-container fluid>
    <v-row class="flex-column ">
        <v-col cols="12">
            <h1> Cadastro de produtos</h1>
        </v-col>
 
        <v-col>
            <v-form @submit.prevent="onCriarProduto" v-model="formValido" ref="form">
                <v-text-field label="Nome-Produto" v-model="dadosProduto.name" :rules="validacaoNome"/>
                <v-text-field label="Preço" type="number" v-model="dadosProduto.price" :rules="validacaoPreco"/>
                <v-text-field label="Descrição" v-model="dadosProduto.description"/>
                <v-text-field label="Foto URL" v-model="dadosProduto.img"/>
                <v-btn color="primary" type="submit"  :disabled="!formValido"> Cadastrar</v-btn>
                <v-btn @click="onLimpar">Clear</v-btn>
            </v-form>
        </v-col>
        {{ dadosProduto.value }}
    </v-row>
    </v-container>
</template>

<script setup>
import {ref, defineEmits} from 'vue'

const emit = defineEmits(['create-produto'])

const dadosProduto = ref({
    name: '',
    price: '',
    description: '',
    img: ''
})

const formValido = ref(true)

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
    const {name, price, description} = dadosProduto.value
    if(name && price && description){
    emit('create-produto', dadosProduto.value)
    onLimpar()
    }
   
}

function onLimpar(){
    form.value.reset()
}
</script>
