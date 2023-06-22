<template>
  
        <v-card 
        width="300"
        class="pa-4 mx-auto "
        variant="outlined"
  
        
        >
          <v-img
            :src="props.productImg ? props.productImg : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'"
            height="200px"
          />
          <v-card-title>{{ props.productName }}</v-card-title>
          <v-card-subtitle>R$ {{props.productPrice }}</v-card-subtitle>
          <v-card-text>{{ props.productDesc }}</v-card-text>
          <v-card-actions>
            <v-btn block color="green-accent-4"  variant="elevated" 
            @click="addToCart"
            >Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
    
    </template>
    
    <script setup>
  
    const emit = defineEmits(["add-to-cart"])
    

    function addToCart() {
      emit("add-to-cart", props)
    }


        const props = defineProps({
            "productName": String,
            "productPrice": Number,
            "productDesc": String,
            "productImg": String,
            

        })
    </script>
    
    <style>
  


    </style>