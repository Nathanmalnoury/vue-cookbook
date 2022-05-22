import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import RecipeList from '../views/RecipeList.vue';
import AddRecipe from '../views/AddRecipe.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/recipe',
    name: 'recipeList',
    component: RecipeList,
  },
  {
    path: '/new',
    name: 'RecipeForm',
    component: AddRecipe,
  },
  {
    // path: '/about',
    // name: 'About',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
