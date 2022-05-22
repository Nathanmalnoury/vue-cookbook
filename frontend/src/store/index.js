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
    setFavoriteStatus(state, { recipeId, favorite }) {
      state.recipes = state.recipes.map((value) => {
        if (value.id === recipeId) {
          return { ...value, favorite };
        }
        return value;
      });
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
      await axios.post('/recipe/favorite', { id, favorite: favoriteStatus });
      context.commit('setFavoriteStatus', { recipeId: id, favorite: favoriteStatus });
    },
  },
  modules: {},
  getters: {
    getRecipes(state) {
      return state.recipes.sort((a, b) => {
        if (a.favorite !== b.favorite) {
          return a.favorite < b.favorite;
        }
        return a.title.localeCompare(b.title);
      });
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
        const rec = state.recipes.find((recipe) => recipe.id === id);
        return rec.favorite;
      };
    },
    isAddingSucceeded(state) {
      return state.success;
    },
  },
});
