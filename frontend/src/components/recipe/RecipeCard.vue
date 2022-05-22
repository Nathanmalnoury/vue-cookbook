<template>
  <div class="recipe-card" @click="openInBrowser">
    <img :src="imageSrc"/>
    <div id="right-col">
      <h3 class="recipe-title">{{ title }}</h3>
      <div class="icons">
        <p @click.stop="toggleModal(true)">hello</p>
        <button @click="tryFavRecipe({id, favoriteStatus: true})">fav!</button>
        <!-- favourite icon  -->
      </div>
    </div>
  </div>
  <teleport to="body">
    <DefaultModale v-if="modaleOpened" @outside-click="toggleModal(false)">
      <template #header>
        <h2>Modify recipe: <i>'{{title}}'</i></h2>
      </template>
      <template #default>
        <FormEdit @close="toggleModal(false)"></FormEdit>
      </template>
    </DefaultModale>
  </teleport>
</template>
<script>

import DefaultModale from '@/components/layout/DefaultModale.vue';
import FormEdit from '@/components/layout/FormEdit.vue';
import { mapActions } from 'vuex';

export default {
  components: { FormEdit, DefaultModale },
  props: ['title', 'image', 'id'],
  data() {
    return {
      modaleOpened: false,
    };
  },
  computed: {
    imageSrc() {
      if (this.image) {
        return `data:${this.image['content-type']};base64,${this.image.content}`;
      }
      return 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    },
    isFavorite() {
      return this.$store.getters.isRecipeStarred(this.id);
    },
  },
  methods: {
    ...mapActions(['tryFavRecipe']),
    openInBrowser() {
      const apiUrl = this.$http.defaults.baseURL;
      console.log(apiUrl, this.id);
      const win = window.open(`${apiUrl}/recipe/${this.id}/view`);
      win.focus();
    },
    toggleModal(isOpen) {
      console.log('hello');
      this.modaleOpened = isOpen;
    },
  },

};
</script>
<style lang="scss" scoped>
.recipe-card {
  @include recipe-box();
  display: flex;
  height: 150px;

  img {
    object-fit: cover;
    width: 150px;
  }

  #right-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    flex-wrap: nowrap;
    margin: 15px;
    width: calc(100% - 150px);

    .icons {
      margin-right: 10px;
      align-self: flex-end;
    }
  }
}
</style>
