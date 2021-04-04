<template>
  <TheHeader />
  <TheNavigationBar />
  <div class="main">
    <router-view />
  </div>
</template>
<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheNavigationBar from './components/layout/TheNavigationBar.vue';

export default {
  components: { TheHeader, TheNavigationBar },
  created() {
    this.$store.dispatch('fetchRecipe');
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
p,
div {
  color: $main-color;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: $main-color;
  margin: 0;
}
h1 {
  font-weight: 600;
}
body {
  margin: 15px;
}
.main {
  margin-top: 15px;
}
a {
  text-decoration: none;
}
</style>
