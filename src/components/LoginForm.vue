<template>

  <v-row class="loginRow ma-0">
    <v-col
      md="8"
      sm="6"
      cols="1"
      class="h-100 justify-center align-center d-none d-sm-flex"
    >
      <v-img src="@/assets/LoginImg.svg" class="w-75 h-75"></v-img>
    </v-col>
    <v-col cols="12" md="4" sm="6" class="bg-green-accent-2 h-100">
      <v-container class="h-100 form-wrapper">
        <v-container class="h-25 justify-center align-start d-flex">
          <img src="@/assets/logo-simples-h.png" :width="300"/>
        </v-container>
        <v-container class="pa-0 my-5">
          <p class="text-h5 font-weight-medium">Welcome to Vue online Grocery Store</p>
          <p class="text-subtitle-1">
            Sign in to your account and carry on with your shopping!
          </p>
        </v-container>
        <v-form @submit.prevent="doLogin" ref="form">
          <v-text-field
            label="User name"
            variant="outlined"
            v-model="user.name"
            :rules="validateName"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            label="Password"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="user.password"
            :rules="validatePassword"
            class="mt-2"
          ></v-text-field>
          <div class="d-flex align-center justify-space-between">
          <v-checkbox 
          color="black"
          label="Remember"
          hide-details="auto"
          ></v-checkbox>
            <a
              class="text-caption text-decoration-none text-green-darken-4 font-weight-bold"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?</a
            >
          </div>
          <v-btn color="black"  block type="submit" >LOGIN</v-btn>
        </v-form>
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { produtosAppStore } from "@/store/app";
import router from '@/router'



const userStore = produtosAppStore().user



const visible = ref(false);

const user = ref({
    name: '',
    password:''
})

const form = ref(null)

/* const validForm = ref(false) */

const validateName = ref([
    (name) => !!name || 'O nome de usuário é obrigatório',
    (name) => name.length >= 5 || 'O nome do produto deve ter pelo menos 5 caracteres'
])

const validatePassword = ref([
    (password) => !!password || 'O senha é obrigatória'
])

const doLogin = (()=>{
    const {name, password} = user.value
    if(name && password){
        userStore.name = name
        router.push({path: '/produtos'})
    }
})
</script>

<style scoped>
.loginRow {
  width: 100vw;
  height: 95vh;
}
.form-wrapper {
  width: 90%;
}



</style>