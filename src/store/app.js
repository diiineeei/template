import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios'; // Importe o Axios

export const produtosAppStore = defineStore('products', () => {
  const products = ref([]); // Inicialmente vazio
  const productsCar = ref([]);

  const user = ref({
    name: '',
    compras: []
  });

  // Função para carregar produtos da API
  async function loadProducts() {
    try {
      // const response = await axios.get('http://localhost:8080/api/lista/produtos');
      const response = await axios.get('https://app-lojinha-vielkaxmma-uc.a.run.app/api/lista/produtos');
      products.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      // Trate o erro conforme necessário
    }
  }

  // Chame esta função quando a store for inicializada
  // ou quando você quiser recarregar os produtos
  loadProducts();

  return { products, productsCar, user, loadProducts }; // Retorne também a função loadProducts se necessário
});
