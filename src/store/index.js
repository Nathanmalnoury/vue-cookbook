import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    recipes: [],
  },
  mutations: {
    setRecipe(state, recipeList) {
      state.recipes = recipeList;
    },
    addRecipe(state, recipe) {
      state.push(recipe);
    },
  },
  actions: {
    async fetchRecipe(context) {
      const resp = await axios.get('/recipe/');
      const respData = await resp.data;
      // console.log(respData);
      context.commit('setRecipe', respData);
    },
    async tryAddRecipe(context, payload) {
      try {
        const resp = await axios.post('/recipe/', payload);
        const respData = await resp.data;
        context.commit('addRecipe', respData.recipe);
      } catch {
        throw Error('failed to add recipe');
      }
    },
  },
  modules: {},
  getters: {
    getRecipes(state) {
      return state.recipes;
    },
  },
});
