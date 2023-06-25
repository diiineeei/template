<template>
  <v-row class="max-height ma-0 justify-center align-center bg-green-accent-2 align-content-center">
    <v-col cols="12" sm="5" class="pa-0 d-flex flex-column align-center">
      <p
      id="title"
        class="text-h2 text-md-h1 text-bold text-center font-weight-medium my-5"
      >
         Grocery<br/>
        Store
      </p>
      <p class="text-subtitle-1 w-75 text-justify font-weight-medium text-grey-darken-4 d-none d-md-flex mb-10">
        Vue Grocery: Your Convenient Online Food Shopping Destination! Discover
        the ultimate online grocery store experience with Vue Grocery. Shop from
        the comfort of your home and explore a wide range of fresh produce,
        pantry staples, gourmet delights, and everyday essentials.
      </p>
      <v-btn
        id="btn-1"
        size="large"
        variant="outlined"
        color="black"
        class="rounded-pill px-7 w-75 d-none d-sm-flex"
        to="/produtos"
      >
        SHOP NOW</v-btn
      >
    </v-col>
    <v-col cols="12" sm="5" class="pa-0 align-center d-flex flex-column">
      <v-img src="@/assets/hero-img.png" class="hero-img mb-10"></v-img>
      <v-btn
        id="btn-1"
        size="large"
        variant="outlined"
        color="black"
        class="rounded-pill px-7  w-75 d-flex d-sm-none"
        to="/produtos"
      >
        SHOP NOW</v-btn
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
  transition: ease 0.5s;
}

#btn-1:hover {
  background: black;
  color: #69f0ae !important;
}

#title{
    font-size: 135px !important;
    line-height: 135px;
}

@media (max-width:960px) {
    #title{
    font-size: 80px !important;
    line-height: 75px;
}
}
</style>
