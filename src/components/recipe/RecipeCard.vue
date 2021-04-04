<template>
  <div class="recipe-card" @click="openInBrowser">
    <img :src="imageSrc" />
    <div id="right-col">
      <h3 class="recipe-title">{{ title }}</h3>
      <div class="icons">
        <p>hello</p>
        <!-- favourite icon  -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'image', 'id'],
  computed: {
    imageSrc() {
      if (this.image) {
        return `data:${this.image['content-type']};base64,${this.image.content}`;
      }
      return '';
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
