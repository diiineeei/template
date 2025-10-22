<template>
    <v-container class="activity-indicator-container d-flex justify-center align-center" height="250px" fluid
    >
      <v-sheet>
        <v-col>
            <h1> Cadastro de produtos</h1>
        </v-col>

        <v-col cols="12" class="d-flex justify-center align-center">
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="imagemPreview || 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
            multiple
          ></v-img>
        </v-col>

        <v-col>
            <v-form @submit.prevent="onCriarProduto" v-model="formValido" ref="form">
              <v-file-input
                label="Selecionar imagem"
                accept="image/*"
                @change="onUploadImagem"
              ></v-file-input>
              <v-text-field variant="outlined" label="Nome-Produto" v-model="dadosProduto.nome" :rules="validacaoNome"/>
              <v-text-field variant="outlined" label="Descrição" v-model="dadosProduto.descricao"/>
              <v-text-field variant="outlined" label="Codigo de barras" type="number" nv-model="dadosProduto.codigoDeBarras"/>
              <v-text-field variant="outlined" label="Preço" type="number" v-model="dadosProduto.valor" :rules="validacaoPreco"/>
                <v-btn color="blue-accent-2" type="submit"  :disabled="!formValido" class="mr-10"> Cadastrar</v-btn>
                <v-btn @click="onLimpar" color="error">Clear</v-btn>
            </v-form>
        </v-col>
    </v-sheet>

    </v-container>
</template>

<script setup>
import {ref, /* defineEmits */} from 'vue'
import axios from 'axios'; // Importe o Axios

/* const emit = defineEmits(['create-produto']) */

const dadosProduto = ref({
    nome: '',
    valor: '',
    descricao: '',
    codigoDeBarras: '',
    imagem: []
})

import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()

const formValido = ref(false)

const form = ref(null)

const imagemPreview = ref('');


const validacaoNome = ref([
    (nome) => !!nome || 'O nome do produto é obrigatório',
    (nome) => nome.length >= 5 || 'O nome do produto deve ter pelo menos 5 caracteres'
])

const validacaoPreco = ref([
    (valor) => !!valor || 'O Preço do produto é obrigatório',
    (valor) => Number(valor) > 0 || 'Insira um preço valido'
])


function onCriarProduto(){

  const {nome, valor, descricao, imagem, codigoDeBarras} = dadosProduto.value


  const formData = new FormData();
  formData.append('imagem', imagem);
  formData.append('nome', nome);
  formData.append('valor', Number(valor));
  formData.append('descricao', descricao);
  formData.append('codigoDeBarras', codigoDeBarras);

  // axios.post('https://app-lojinha-vielkaxmma-uc.a.run.app/api/upload', formData, {
  axios.post('http://localhost:8080/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      // Aqui você pode tratar a resposta do servidor
      // ...
    })
    .catch((error) => {
      // Aqui você pode tratar o erro da requisição
      // ...
    });

    // store.products.push({
    //     nome: nome,
    //     valor: Number(valor),
    //     descricao: descricao,
    //     imagem: image,
    //     // ID: Date.now()
    // })

    onLimpar()

}
function onLimpar(){
    form.value.reset()
    imagemPreview.value = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'; // Ou '' para limpar completamente
}

function onUploadImagem(e) {
  const file = e.target.files[0];
  dadosProduto.value.imagem = file; // Garante que o arquivo selecionado seja atribuído corretamente

  const reader = new FileReader();

  reader.onload = (e) => {
    imagemPreview.value = e.target.result; // Atualiza a variável de preview com a imagem selecionada
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

</script>



