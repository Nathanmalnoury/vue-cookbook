<template>
  <div class="recipe-card" @click="openInBrowser">
    <img :src="imageSrc"/>
    <div id="right-col">
      <h3 class="recipe-title">{{ title }}</h3>
      <div class="icons"
      @click.stop="$store.dispatch('tryFavRecipe', {id: id, favoriteStatus: !isFavorite})">
        <FontAwesomeIcon
          v-if="isFavorite"
          :icon="['fas', 'star']"
          class="faicon"
        />
        <FontAwesomeIcon
          v-else
          :icon="['far', 'star']"
          class="faicon"
        />
      </div>
    </div>
  </div>
  <teleport to="body">
    <!--    <DefaultModale v-if="modaleOpened" @outside-click="toggleModal(false)">-->
    <!--      <template #header>-->
    <!--        <h2>Modify recipe: <i>'{{title}}'</i></h2>-->
    <!--      </template>-->
    <!--      <template #default>-->
    <!--        <FormEdit @close="toggleModal(false)"></FormEdit>-->
    <!--      </template>-->
    <!--    </DefaultModale>-->
  </teleport>
</template>
<script>

export default {
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
    openInBrowser() {
      const apiUrl = this.$http.defaults.baseURL;
      console.log(apiUrl, this.id);
      const win = window.open(`${apiUrl}/recipe/${this.id}/view`);
      win.focus();
    },
  },

};
</script>
<style lang="scss" scoped>
.recipe-card {
  @include recipe-box();
  display: flex;
  height: 150px;
  cursor: pointer;

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
      //margin-right: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-self: flex-end;
      width: 33%;

      .faicon {
        margin-bottom: 5px;
        //width: 100%;
        height: 40%;

      }

      &:hover {
        .faicon {
          color: darken($main-color, 25);

        }
      }

      //button.star-button {
      //  width: 100%;
      //  aspect-ratio: 1.5;
      //  display: inline-flex;
      //  background: transparent;
      //  border: none;
      //  justify-content: center;
      //  color: $main-color;
      //}
    }
  }
}
</style>
