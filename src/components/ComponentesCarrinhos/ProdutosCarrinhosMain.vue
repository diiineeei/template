<template>
      <v-list-item class="bg-grey-lighten-5 my-5" elevation="0">
            
                    <v-container class="ma-0 pa-0 d-flex justify-space-between">
                    <div>
                        <v-list-item-title class="font-weight-medium" :title="produto.name">
                            {{ produto.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="font-weight-medium text-subtitle-2">
                            {{ produto.description }} 
                        </v-list-item-subtitle>
                    </div>
                    <div class="mr-15">
                        <v-btn variant="text" size="large" icon="mdi-chevron-left" @click="changeItemQuantity('remove')"/>
                        {{ produto.quantity }}
                        <v-btn variant="text" size="large" icon="mdi-chevron-right" @click="changeItemQuantity('add')"/>
                    </div>
             
                    </v-container>
                
                  
                    <template v-slot:prepend>
                            <v-avatar size="85" rounded="0">
                                <v-img :src="produto.img"></v-img>
                            </v-avatar>
                    </template>

                    <template v-slot:append>
                        <v-container class="align-left  px-10">
                            <p class="text-right font-weight-medium text-green">{{productPrice(produto)}}</p>
                        </v-container>
                    </template>
                    </v-list-item>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['changeItemQuantity'])

const props = defineProps({
    produto: Object
})

const productPrice = ((produto) => {
    const value = produto.price * produto.quantity
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
})

/* const changeItemQuantity = ((produto, type)=>{
    if(type === "remove" && produto.quantity == 1) {
        emit('changeItemQuantity', produto, 'remove')
    }
    emit('changeItemQuantity', produto, type)
}) */

const changeItemQuantity = ( type) =>{
    emit('changeItemQuantity', type )
}

const produto = ref(props.produto)

</script>
