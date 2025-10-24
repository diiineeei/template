<template>
<v-hover v-slot:="{ isHovering, props }">
        <v-card
        class="product-card pa-4 rounded-lg"
        :elevation="isHovering ? 15 : 5"
        close-delay        v-bind="props"
        >
          <v-img v-if="card.productimagemURL"
            :src="card.productimagemURL ? card.productimagemURL : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'"
            height="200px"
          />
          <v-container v-else class="activity-indicator-container d-flex justify-center align-center" height="200px" fluid>
          <v-progress-circular   indeterminate></v-progress-circular>
          </v-container>
          <v-card-subtitle>{{card.productnome }}</v-card-subtitle>
          <v-card-title class="product-title">R$ {{ card.productvalor }}</v-card-title>
          <v-card-text class="product-desc">{{ card.productDesc }}</v-card-text>
          <v-card-actions class="product-actions">
            <v-btn block color="blue-accent-3"  variant="elevated"
            @click="addToCart"
            >Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </template>

    <script setup>

    const emit = defineEmits(["add-to-cart"])


    function addToCart() {
      emit("add-to-cart", card)
    }

      const card = defineProps({
          "productnome": String,
          "productvalor": Number,
          "productDesc": String,
          "productimagemURL": String,
      })
    </script>

    <style>
  .activity-indicator-container{
    height: 200px;
  }

  .product-card{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* Mantém o botão sempre no rodapé do card */
  .product-actions{
    margin-top: auto;
  }

  /* Melhora consistência de altura e truncamento */
  .product-title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    min-height: 52px; /* ~2 linhas */
  }

  .product-desc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    min-height: 66px; /* ~3 linhas */
  }
    </style>
