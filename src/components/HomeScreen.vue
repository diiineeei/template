<template>
  <v-row class="max-height ma-0 justify-center align-content-center align-center bg-blue-accent-2">
    <v-col cols="12" sm="5" class="pa-0 d-flex flex-column align-center">
      <p
      id="title"
      class="text-left font-weight-medium">Grocery<br/> Store
      <v-btn
        id="btn-1"
        size="large"
        color="black"
        class="d-none d-sm-flex mt-10 text-blue-accent-2"
        block
        to="/produtos"
      >SHOP NOW</v-btn
      >
      </p>

    </v-col>
    <v-col cols="12" sm="5" class="pa-0 align-center d-flex flex-column">
      <v-img src="@/assets/hero-img.png" class="hero-img my-5 w-75"></v-img>
      <v-btn
        id="btn-1"
        size="large"
        variant="outlined"
        color="black"
        class="px-7  w-75 d-flex d-sm-none "
        to="/produtos"
      >SHOP NOW</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
</script>

<style >
.max-height {
  height: calc(100vh - 64px);
}

.hero-img {
  width: 90%;
}

#btn-1 {
  transition: .3s;

}

#btn-1:hover {
  box-shadow: 8px 10px #133021;
  transform: scale(1.05);
  font-size: 18px;
}


#title{
    font-size: 135px !important;
    line-height: 125px;
}


@media (max-width:960px) {
    #title{
    font-size: 80px !important;
    line-height: 75px;
}
}
</style>
