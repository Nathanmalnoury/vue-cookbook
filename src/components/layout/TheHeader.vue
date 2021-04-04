<template>
  <div id="header-container">
    <router-link to="/">
      <h1 id="header-title">Cook Book</h1>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
#header-container {
  // $main-color: #e26161;
  // $main-font: "EB Garamond", serif;
  // $margin-to-body: 15px;
  // $light-color: #fdf6f2;
  display: grid;
  grid-template-columns: auto 25px;
  // margin: 0 $margin-to-body 0 $margin-to-body;
  #header-title {
    font-family: $main-font;
    color: $main-color;
    font-weight: lighter;
    font-size: xx-large;
    text-align: left;
    &:before {
      content: "🍜";
      padding-right: 50px;
    }
  }
  #icon-container {
    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
  }
}
</style>
