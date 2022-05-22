<template>
  <div class="about">
    <div class="recipe-grid">
      <recipe-card
        v-for="card in getRecipes"
        :key="card.id"
        :title="card.title"
        :image="card.image"
        :id="card.id"
      >
      </recipe-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import RecipeCard from '../components/recipe/RecipeCard.vue';

export default {
  components: { RecipeCard },
  computed: {
    ...mapGetters(['getRecipes']),
  },
  mounted() {
    console.log(this.getRecipes);
  },
};
</script>
<style lang="scss" scoped>
.recipe-grid {
  margin-top: 10px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}
</style>
