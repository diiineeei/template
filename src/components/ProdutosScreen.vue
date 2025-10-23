<template>

<div class="main-container">


<h1 class="page-title">Produtos</h1>

<!-- Scanner toolbar -->
<div class="scanner-toolbar">
  <div class="scanner-left">
    <v-switch
      color="blue-accent-2"
      hide-details
      inset
      v-model="habilitarLeitor"
      :label="`Leitor de código de barras: ${habilitarLeitor ? 'Ativo' : 'Inativo'}`"
    />
  </div>
  <div class="scanner-search">
    <v-text-field
      v-model="filtroNome"
      variant="outlined"
      density="comfortable"
      hide-details
      clearable
      label="Buscar por nome"
      prepend-inner-icon="mdi-magnify"
      class="scanner-search-input"
    />
  </div>
  <div class="scanner-right" v-if="ultimoCodigo">
    <span class="scanner-last">Último código: <strong>{{ ultimoCodigo }}</strong></span>
  </div>
  <div class="scanner-right" v-else>
    <span class="scanner-last">Aproxime o leitor e bip o produto</span>
  </div>
  <v-snackbar v-model="snackbar" timeout="2200" :color="snackbarColor" location="top right">
    {{ snackbarText }}
  </v-snackbar>
  
</div>

<div class="content">
  <section class="products-grid">
    <ProductCard
      v-for="product in filteredProducts"
      :key="product.ID"
      :productnome="product.nome"
      :productvalor="product.valor"
      :productDesc="product.descricao"
      :productimagemURL="product.imagemURL"
      @add-to-cart="onAddToCart(product)"
    />
  </section>

  <aside v-if="store.productsCar.length > 0" class="cart-aside">
    <div class="cart-panel" :class="{ 'cart-panel--fixed': shouldFixCart }">
      <CarrinhoCompras />
    </div>
  </aside>
</div>

</div>
</template>


<script setup>
import  ProductCard  from './ProductCard.vue'
import CarrinhoCompras from './CarrinhoSideBar.vue';
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { produtosAppStore } from '@/store/app'
const store = produtosAppStore()
const shouldFixCart = computed(() => store.productsCar.length > 0)

// Barcode scanner handling
const habilitarLeitor = ref(true)
const ultimoCodigo = ref('')
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

// Search filter by name
const filtroNome = ref('')
const filteredProducts = computed(() => {
  const term = (filtroNome.value || '').trim().toLowerCase()
  if (!term) return store.products
  return store.products.filter((p) =>
    (p?.nome ?? '').toLowerCase().includes(term) ||
    (p?.descricao ?? '').toLowerCase().includes(term)
  )
})

let buffer = ''
let lastKeyTs = 0
const INTERVALO_MAXIMO_MS = 100 // janela de tempo entre teclas do leitor

function notificar(msg, color = 'success'){
  snackbarText.value = msg
  snackbarColor.value = color
  snackbar.value = true
}

// Beep sound when adding products
let audioCtx
function playBeep(type = 'success'){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)()
    const o = audioCtx.createOscillator()
    const g = audioCtx.createGain()
    const now = audioCtx.currentTime
    const duration = 0.12
    const freq = type === 'error' ? 240 : 880
    o.type = 'sine'
    o.frequency.setValueAtTime(freq, now)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.3, now + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    o.connect(g)
    g.connect(audioCtx.destination)
    o.start(now)
    o.stop(now + duration)
  }catch(e){
    // falha silenciosa se o contexto de áudio não estiver disponível
  }
}

function getBarcodeFromProduct(p){
  if(!p || typeof p !== 'object') return ''
  // Prioridade de chaves comuns
  const candidates = ['codigoDeBarras','codigo_de_barras','barcode','ean','ean13','upc','code','cod','sku']
  for(const key of candidates){
    if(p[key] != null && p[key] !== '') return String(p[key])
  }
  return ''
}

function processarCodigo(codigo){
  const code = String(codigo || '').trim()
  if(!code) return
  ultimoCodigo.value = code

  const produto = store.products.find(p => String(getBarcodeFromProduct(p)) === code)
  if(!produto){
    notificar('Produto não encontrado para o código: ' + code, 'error')
    playBeep('error')
    return
  }
  onAddToCart(produto)
  notificar(`Adicionado ao carrinho: ${produto.nome}`,'success')
  playBeep('success')
}

function onKeydownGlobal(e){
  if(!habilitarLeitor.value) return
  // Evitar capturar quando usuário está digitando em inputs normais
  const tag = (document.activeElement?.tagName || '').toUpperCase()
  if(tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return

  const now = Date.now()
  if(now - lastKeyTs > INTERVALO_MAXIMO_MS){
    buffer = ''
  }
  lastKeyTs = now

  if(e.key === 'Enter'){
    e.preventDefault()
    const code = buffer
    buffer = ''
    if(code) processarCodigo(code)
    return
  }

  // Aceita apenas dígitos e letras comuns (alguns leitores podem enviar letras)
  const char = e.key
  if(char.length === 1 && /[0-9A-Za-z]/.test(char)){
    buffer += char
  }
}

onMounted(()=>{
  window.addEventListener('keydown', onKeydownGlobal)
})
onBeforeUnmount(()=>{
  window.removeEventListener('keydown', onKeydownGlobal)
})

const getProductId = (item) => {
  if (!item) return ''
  if (item.cartId) return item.cartId
  if (item.ID !== undefined && item.ID !== null) return item.ID
  if (item.id !== undefined && item.id !== null) return item.id
  if (item.nome) {
    return `${item.nome}-${item.valor ?? ''}`
  }
  return JSON.stringify(item)
}

function onAddToCart(product) {
  const cartId = getProductId(product)
  const productIndex = store.productsCar.findIndex(
    (productCar) => getProductId(productCar) === cartId
  )

  if (productIndex >= 0) {
    store.productsCar[productIndex].quantity += 1
    playBeep('success')
    return
  }

  store.productsCar.push({
    ...product,
    cartId,
    quantity: 1
  })
  playBeep('success')
}


// setTimeout(()=>{
//   let chickenProductIndex;
//   store.products.filter((product,index)=>{
//     if(product.nome == "Chicken") chickenProductIndex = index
//   })
//   // store.products[chickenProductIndex].imagemURL = "https://seara.com.br/wp-content/uploads/2022/10/7894904797905_Frango_inteiro_congelado_Seara_PRINCIPAL_520x440.png"
// },5000)

</script>

<style>
.main-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 36px 40px 64px;
  box-sizing: border-box;

}

.scanner-toolbar{
  width: 100%;
  max-width: 1360px;
  margin: -18px auto 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 0;
}

.scanner-last{
  color: #334155;
}

.scanner-search{
  flex: 1;
  max-width: 520px;
  margin: 0 16px;
}

.scanner-search-input{
  width: 100%;
}

.page-title{
  width: 100%;
  max-width: 1360px;
  margin: 0 auto 44px;
  font-size: clamp(1.9rem, 1.5rem + 1vw, 2.7rem);
  font-weight: 700;
  color: #1f2933;
}

.content{
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 28px;
  align-items: flex-start;
}

.products-grid{
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 28px;
  padding: 12px 4px;
}

.cart-aside{
  position: relative;
  width: 100%;
}

.cart-panel{
  position: sticky;
  top: calc(var(--app-header-height, 96px) + 24px);
  max-height: calc(100vh - var(--app-header-height, 96px) - 48px);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-panel--fixed{
  position: fixed;
  top: calc(var(--app-header-height, 96px) + 24px);
  right: max(60px, calc((100vw - 1660px) / 2 + 20px));
  width: clamp(320px, 26vw, 560px);
  max-width: calc(100vw - 64px);
  max-height: calc(100vh - var(--app-header-height, 96px) - 48px);
  z-index: 10;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.12);
}

.cart-panel :deep(.cart-wrapper){
  width: 100%;
  height: 100%;
  max-height: inherit;
}

.cart-panel :deep(.cart-list){
  max-height: calc(100vh - var(--app-header-height, 96px) - 120px);
}

@media (max-width: 1280px){
  .main-container{
    padding-left: 28px;
    padding-right: 28px;
  }

  .page-title{
    margin-bottom: 32px;
  }

  .content{
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 24px;
  }

  .products-grid{
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }

  .cart-panel--fixed{
    right: max(28px, calc((100vw - 1280px) / 2 + 16px));
    width: clamp(280px, 28vw, 320px);
  }
}

@media (max-width: 960px){
  .page-title{
    text-align: center;
  }

  .content{
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .cart-panel{
    position: static;
    max-height: none;
  }

  .cart-panel--fixed{
    position: static;
    right: auto;
    width: 100%;
    max-width: 100%;
    box-shadow: none;
  }

  .cart-panel :deep(.cart-list){
    max-height: calc(100vh - var(--app-header-height, 96px) - 120px);
  }
}
</style>
