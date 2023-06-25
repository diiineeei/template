<template>
  <v-app-bar color="green-accent-2">
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
        class="bg-green-accent-2"
      >
      <v-list variant="elevated" >
         <v-list-item v-for="page in pages" :key="page.title" :to="page.path" class="bg-green-accent-2" elevation="0">
          <v-list-item-title class="font-weight-bold text-uppercase">
            {{ page.title }}</v-list-item-title>
        </v-list-item>
</v-list>
      </v-navigation-drawer>


</template>

<script setup>
import {ref} from 'vue'
const pages = [
  {
    title: "home",
    path:"/",
},
{
  title:"Products",
  path:"/produtos",
},
{
  title:"Cart",
  path:"/carrinho",
},
{
  title:"Login",
  path:"/login",
},

]
const drawer = ref(false)

</script>


