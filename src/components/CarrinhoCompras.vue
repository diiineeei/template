<template>
<v-container id="container" fluid>
    <v-row class="d-flex justify-space-between">
        <v-col id="timeline-container" cols="12" class="d-none d-md-flex">
            <v-timeline direction="horizontal" line-inset="40"  truncate-line="both">
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 0 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-cart"></v-timeline-item>
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 1 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-account"></v-timeline-item>
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 2 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-credit-card-outline"></v-timeline-item>
                <v-timeline-item dot-color="white" size="x-large" :icon-color="timeline == 3 ? 'green-accent-2':'grey-lighten-3'" fill-dot icon="mdi-check-circle"></v-timeline-item>
            </v-timeline>
        </v-col>
        <v-col id="carrinho-container" class="bg-grey-lighten-3 pa-10 rounded" cols="12" md="8">
            <v-row>
                <v-col cols="12" class="d-flex justify-space-between">
                    <p class="text-h5 font-weight-bold text-center d-flex align-self-end"><v-icon size="x-small" color="green-accent-2" class="px-5 align-self-center">mdi-basket</v-icon>PRODUTOS</p>
                    <v-btn prepend-icon="mdi-delete" variant="outlined" color="red">REMOVER TODOS PRODUTOS</v-btn>
                </v-col>
    
                <v-divider></v-divider>
            </v-row>
        </v-col>
        <v-col id="total-container" class="bg-grey-lighten-3" cols="12" md="3"></v-col>
    </v-row>
</v-container>
</template>

<script setup>
import {ref} from 'vue';

const timeline = ref(0)

</script>


<style scoped>
#container{
    width: 80%;
}
</style>