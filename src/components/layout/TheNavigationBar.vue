<template>
  <div id="nav">
    <router-link to="/recipe">Recipes</router-link>
    <router-link to="/new">Add new recipe</router-link>
  </div>
</template>
<style lang="scss" scoped>
#nav {
  background-color: $main-color;
  height: 60px;
  // margin: $margin-to-body;
  margin-bottom: 0;
  display: flex;
  // @include full();
  list-style: none;

  a {
    @include flex-center-full();
    color: white;
    text-decoration: none;
    font-size: 22px;
    font-family: $main-font;
    font-weight: 500;

    &:hover {
      background-color: #ce5a5a;
    }
  }
}
</style>
