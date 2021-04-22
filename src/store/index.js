import { createStore } from 'vuex';
import axios from 'axios';

let timeout;
export default createStore({
  state: {
    recipes: [],
    addingRecipe: false,
    isError: false,
    success: false,
    message: '',
  },
  mutations: {
    setRecipe(state, recipeList) {
      state.recipes = recipeList;
    },
    addRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    setAddingRecipe(state, isAdding) {
      state.addingRecipe = isAdding;
    },
    setAddingError(state, errorMessage) {
      state.isError = true;
      state.message = errorMessage;
    },
    resetAddingError(state) {
      state.isError = false;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setSuccess(state, success) {
      state.success = success;
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
      clearTimeout(timeout);
      context.commit('setAddingRecipe', true);
      try {
        const resp = await axios.post('/recipe/', payload);
        const respData = await resp.data;

        context.commit('addRecipe', respData.recipe);
        context.commit('setAddingRecipe', false);
        context.commit('setSuccess', true);
      } catch (e) {
        let errorMessage = 'Failed to add recipe.';
        if (e.response) {
          errorMessage = e.response.data.message;
        }
        context.commit('setAddingError', errorMessage);
        timeout = setTimeout(() => { context.commit('resetAddingError'); }, 3500);
      } finally {
        context.commit('setAddingRecipe', false);
      }
    },
    async tryFavRecipe(context, payload) {
      const { id, favoriteStatus } = payload;
      axios.post('/recipe/favorite', { id, favorite: favoriteStatus });
      // const recipes = context.getters.getRecipes;
      // throw TypeError('todo');
      // recipes.map((recipe) => {
      //   if (recipe.id === id) {
      //     // eslint-disable-next-line no-param-reassign
      //     recipe.favorite = true;
      //   }
      //   return recipe;
      // });
    },
  },
  modules: {},
  getters: {
    getRecipes(state) {
      return state.recipes;
    },
    isAddingRecipe(state) {
      return state.addingRecipe;
    },
    isAddingErrored(state) {
      return state.isError;
    },
    errorMessage(state, getters) {
      if (!getters.isAddingErrored) {
        return '';
      }
      return state.message;
    },
    isRecipeStarred(state) {
      return (id) => {
        console.log(state.recipes);
        const rec = state.recipes.find((recipe) => recipe.id === id);
        return rec.favorite;
      };
    },
    isAddingSucceeded(state) {
      return state.success;
    },
  },
});
