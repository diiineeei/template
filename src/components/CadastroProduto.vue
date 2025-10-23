<template>
  <v-container class="cadastro-container py-8" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6">
          <v-card-title class="text-h5 font-weight-medium">
            Cadastro de produtos
          </v-card-title>
          <v-card-text>
            <v-row class="mb-6" justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <v-img
                  class="preview-image"
                  :width="260"
                  max-width="320"
                  aspect-ratio="16/9"
                  cover
                  :src="imagemPreview"
                ></v-img>
              </v-col>
            </v-row>

            <v-form
              ref="form"
              v-model="formValido"
              @submit.prevent="onCriarProduto"
            >
              <v-file-input
                label="Selecionar imagem"
                accept="image/*"
                prepend-icon="mdi-image"
                @change="onUploadImagem"
              ></v-file-input>

              <v-text-field
                v-model="dadosProduto.nome"
                variant="outlined"
                label="Nome do produto"
                :rules="validacaoNome"
              />

              <v-text-field
                v-model="dadosProduto.descricao"
                variant="outlined"
                label="Descrição"
              />

              <v-text-field
                v-model="dadosProduto.codigoDeBarras"
                variant="outlined"
                label="Código de barras"
                type="number"
              />

              <v-text-field
                v-model="dadosProduto.valor"
                variant="outlined"
                label="Preço"
                type="number"
                :rules="validacaoPreco"
              />

              <div class="d-flex flex-wrap gap-4 mt-4">
                <v-btn
                  color="blue-accent-2"
                  type="submit"
                  :disabled="!formValido"
                >
                  Cadastrar
                </v-btn>
                <v-btn color="error" variant="outlined" @click="onLimpar">
                  Limpar
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const DEFAULT_PLACEHOLDER = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'

const dadosProduto = ref({
    nome: '',
    valor: '',
    descricao: '',
    codigoDeBarras: '',
    imagem: null
})

const formValido = ref(false)

const form = ref(null)

const imagemPreview = ref(DEFAULT_PLACEHOLDER)


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


  const formData = new FormData()
  formData.append('imagem', imagem)
  formData.append('nome', nome)
  formData.append('valor', Number(valor))
  formData.append('descricao', descricao)
  formData.append('codigoDeBarras', codigoDeBarras)

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
    imagemPreview.value = DEFAULT_PLACEHOLDER
}

function onUploadImagem(e) {
  const file = e.target?.files?.[0]
  dadosProduto.value.imagem = file || null

  if (!file) {
    imagemPreview.value = DEFAULT_PLACEHOLDER
    return
  }

  const reader = new FileReader()

  reader.onload = (event) => {
    imagemPreview.value = event.target?.result || DEFAULT_PLACEHOLDER
  }

  reader.readAsDataURL(file)
}

</script>

<style scoped>
.cadastro-container {
  max-width: 1200px;
  margin: 0 auto;
}

.preview-image {
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
}

.gap-4 {
  gap: 16px;
}
</style>
