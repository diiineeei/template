<template>
  <v-app-bar color="blue-accent-2">
    <v-app-bar-title >
      <img src="@/assets/logo-h.png" :width="150"/>
    </v-app-bar-title>
    <v-tabs class="d-none d-sm-flex">
      <v-tab v-for="page in pages" :key="page.title" :to="page.path">
      {{ page.title}}
      </v-tab>
    </v-tabs>

    <v-app-bar-nav-icon class="d-flex d-sm-none" size="70" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>
  </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        location="top"
        temporary
        class="light-blue-accent-2"
      >
      <v-list variant="elevated" >
         <v-list-item v-for="page in pages" :key="page.title" :to="page.path" class="light-blue-accent-2" elevation="0">
          <v-list-item-title class="font-weight-bold text-uppercase">
            {{ page.title }}</v-list-item-title>
        </v-list-item>
</v-list>
      </v-navigation-drawer>


</template>

<script setup>
import { produtosAppStore } from "@/store/app";

const userStore = produtosAppStore().user



import {ref} from 'vue'
const pages = [
  // {
  //   title: "home",
  //   path:"/",
  // },
{
  title:"Products",
  path:"/produtos",
},
// userStore.name.toLowerCase() == 'admin' ?
{
  title:"Cadastro",
  path:"/Cadastro",
},
{
  title:"Carrinho",
  path:"/carrinho",
},
!userStore.name ?
{
  title:"Login",
  path:"/login",
}
:
{
  title:userStore.name,
  path:"/login",
},

]
const drawer = ref(false)

</script>


