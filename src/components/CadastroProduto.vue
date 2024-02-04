<template>
    <v-container>
    <v-row class="flex-column ">
        <v-col cols="12">
            <h1> Cadastro de produtos</h1>
        </v-col>

        <v-col>
            <v-form @submit.prevent="onCriarProduto" v-model="formValido" ref="form">
                <v-text-field variant="outlined" label="Nome-Produto" v-model="dadosProduto.nome" :rules="validacaoNome"/>
                <v-text-field variant="outlined" label="Preço" type="number" v-model="dadosProduto.valor" :rules="validacaoPreco"/>
                <v-text-field variant="outlined" label="Descrição" v-model="dadosProduto.descricao"/>
                <v-text-field variant="outlined" label="Foto URL" v-model="dadosProduto.imagemURL"/>
                <v-btn color="blue-accent-2" type="submit"  :disabled="!formValido" class="mr-10"> Cadastrar</v-btn>
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
    nome: '',
    valor: '',
    descricao: '',
    imagemURL: '',
    ID:''
})

import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()

const formValido = ref(false)

const form = ref(null)

const validacaoNome = ref([
    (nome) => !!nome || 'O nome do produto é obrigatório',
    (nome) => nome.length >= 5 || 'O nome do produto deve ter pelo menos 5 caracteres'
])

const validacaoPreco = ref([
    (valor) => !!valor || 'O Preço do produto é obrigatório',
    (valor) => Number(valor) > 0 || 'Insira um preço valido'
])


function onCriarProduto(){
    const {nome, valor, descricao, imagemURL} = dadosProduto.value
    store.products.push({
        nome: nome,
        valor: Number(valor),
        descricao: descricao,
        imagemURL: imagemURL,
        // ID: Date.now()
    })

    onLimpar()

}
function onLimpar(){
    form.value.reset()
}
</script>
