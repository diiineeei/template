import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: {},
    children: [
      {
        path: '',
        name: 'Produtos',
        component: {},
      },
      {
        path: 'produtos',
        name: 'Produtos2',
        component: {},
      },
      {
        path: 'home',
        name: 'Home',
        component: {},
      },
      {
        path: 'carrinho',
        name: 'Carrinho',
        component: {},
      },
      {
        path: 'login',
        name: 'Login',
        component: {},
      },
      {
        path: 'cadastro',
        name: 'Cadastro',
        component: {},
      },
    ],
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const cadastroRoute = router.resolve({ name: 'Cadastro' })
console.log('Cadastro', cadastroRoute.fullPath)
console.log('Matched', cadastroRoute.matched.map((r) => r.path))

const produtosRoute = router.resolve({ name: 'Produtos2' })
console.log('Produtos', produtosRoute.fullPath)
console.log('Matched', produtosRoute.matched.map((r) => r.path))
