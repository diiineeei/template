<template>
    <v-container class="activity-indicator-container d-flex justify-center align-center" height="250px" fluid
    >
      <v-sheet>
        <v-col>
            <h1> Cadastro de produtos</h1>
        </v-col>

        <v-col>
          <v-img
            height="200px"
            v-if="imagemSelecionada"
            :src="imagemPreview"
          ></v-img>
        </v-col>

        <v-col>
            <v-form @submit.prevent="onCriarProduto" v-model="formValido" ref="form">
              <v-file-input
                label="Selecionar imagem"
                v-model="dadosProduto.image"
                accept="image/*"
                @change="onUploadImagem"
              ></v-file-input>
              <v-text-field variant="outlined" label="Nome-Produto" v-model="dadosProduto.nome" :rules="validacaoNome"/>
              <v-text-field variant="outlined" label="Descrição" v-model="dadosProduto.descricao"/>
              <v-text-field variant="outlined" label="Preço" type="number" v-model="dadosProduto.valor" :rules="validacaoPreco"/>
                <v-btn color="blue-accent-2" type="submit"  :disabled="!formValido" class="mr-10"> Cadastrar</v-btn>
                <v-btn @click="onLimpar" color="error">Clear</v-btn>
            </v-form>
        </v-col>
        {{ dadosProduto.value }}
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
    imagem: ''
})

import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()

const formValido = ref(false)

const form = ref(null)

var imagemPreview;
var imagemSelecionada;


const validacaoNome = ref([
    (nome) => !!nome || 'O nome do produto é obrigatório',
    (nome) => nome.length >= 5 || 'O nome do produto deve ter pelo menos 5 caracteres'
])

const validacaoPreco = ref([
    (valor) => !!valor || 'O Preço do produto é obrigatório',
    (valor) => Number(valor) > 0 || 'Insira um preço valido'
])


function onCriarProduto(){

  const {nome, valor, descricao, image} = dadosProduto.value


  const formData = new FormData();
  formData.append('imagem', image);
  formData.append('nome', nome);
  formData.append('valor', Number(valor));
  formData.append('descricao', descricao);

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
}

function onUploadImagem(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    imagemPreview = e.target.result;
  };

  reader.readAsDataURL(file);
}

</script>
