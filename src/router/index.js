// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Produtos',
        component: () => import('@/views/ProdutosScreen.vue'),
      },
      {
        path: '/produtos',
        name: 'Produtos2',
        component: () => import('@/views/ProdutosScreen.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeScreen.vue'),
      },
      {
        path: '/carrinho',
        name: 'Carrinho',
        component: () => import('@/views/CarrinhoCompras.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginScreen.vue'),
      },
      // {
      //   path: '/produtos',
      //   name: 'Produtos',
      //   component: () => import('@/views/ProdutosScreen.vue'),
      // },
      {
        path: '/cadastro',
        name: 'Cadastro',
        component: () => import('@/views/CadastroScreen.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
