<template>
      <v-list-item class="bg-white my-6" elevation="0">
            
                    <v-container class="ma-0 pa-0 d-flex justify-space-between">
                    <div class="w-50">
                        <v-list-item-title class="font-weight-medium" :title="produto.name">
                            {{ produto.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="font-weight-medium text-subtitle-2">
                            {{ produto.description }} 
                        </v-list-item-subtitle>
                    </div>
                    <div class="mr-15 d-flex flex-column">
                        <div class="d-flex">
                        <v-btn variant="text" size="large" icon="mdi-chevron-left" @click="changeItemQuantity('remove')" color="red-lighten-2"/>
                        <v-container class="d-flex justify-center" style="width: 15px;">{{ produto.quantity }}</v-container>
                        <v-btn variant="text" size="large" icon="mdi-chevron-right" @click="changeItemQuantity('add')" color="green-lighten-1"/>
                        </div>
                        <v-btn variant="text" size="small" prepend-icon="mdi-delete" @click="changeItemQuantity('delete')" color="red">REMOVER</v-btn>
                    </div>
             
                    </v-container>
                
                  
                    <template v-slot:prepend>
                        <v-container class="ma-0 pa-0 w-75 pr-5">
                            <v-avatar size="85" rounded="0">
                                <v-img :src="produto.img"></v-img>
                            </v-avatar>
                        </v-container>
                    </template>

                    <template v-slot:append>
                        <v-container class="align-left px-10" style="width: 150px;">
                            <p class="text-right font-weight-black">{{productPrice(produto)}}</p>
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

const changeItemQuantity = ( type) =>{
    emit('changeItemQuantity', type )
}

const produto = ref(props.produto)

</script>
