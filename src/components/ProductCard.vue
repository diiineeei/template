<template>
<v-hover v-slot:="{ isHovering, props }">
        <v-card
        width="300"
        class="pa-4 mx-auto rounded-lg"
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
          <v-card-title>{{ card.productnome }}</v-card-title>
          <v-card-subtitle>R$ {{card.productvalor }}</v-card-subtitle>
          <v-card-text>{{ card.productDesc }}</v-card-text>
          <v-card-actions>
            <v-btn block color="blue-accent-3"  variant="elevated"
            @click="addToCart"
            >Add to Cart</v-btn>
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


    </style>
