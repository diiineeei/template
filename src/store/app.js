import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import axios from 'axios'; // Importe o Axios

export const produtosAppStore = defineStore('products', () => {
  const products = ref([]); // Inicialmente vazio
  const productsCar = ref([]);

  const user = ref({
    name: '',
    email: '',
    token: '',
    compras: []
  });

  function applyAuthHeader(token){
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }

  function saveSession(){
    try{
      const payload = {
        name: user.value.name || '',
        email: user.value.email || '',
        token: user.value.token || ''
      }
      localStorage.setItem('app.auth', JSON.stringify(payload))
    }catch(e){ /* noop */ }
  }

  function loadSession(){
    try{
      const raw = localStorage.getItem('app.auth')
      if(!raw) return
      const saved = JSON.parse(raw)
      user.value.name = saved?.name || ''
      user.value.email = saved?.email || ''
      user.value.token = saved?.token || ''
      applyAuthHeader(user.value.token)
    }catch(e){ /* noop */ }
  }

  function clearSession(){
    user.value.name = ''
    user.value.email = ''
    user.value.token = ''
    try{ localStorage.removeItem('app.auth') }catch(e){ /* noop */ }
    applyAuthHeader('')
  }

  // Atualiza header e salva sempre que token mudar
  watch(() => user.value.token, (tk) => {
    applyAuthHeader(tk)
    saveSession()
  })

  // Função para carregar produtos da API
  async function loadProducts() {
    try {
      const response = await axios.get('http://localhost:8080/api/lista/produtos');
      // const response = await axios.get('https://app-lojinha-vielkaxmma-uc.a.run.app/api/lista/produtos');
      products.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      // Trate o erro conforme necessário
    }
  }

  // Inicialização da Store
  loadSession();
  // Carrega produtos após restaurar sessão (se houver)
  loadProducts();

  return { products, productsCar, user, loadProducts, loadSession, clearSession }; // Retorne também a função loadProducts se necessário
});
