<template>
  <div class="backdrop" @click.stop="$emit('outside-click')"></div>

  <div class="wrapper-modale">
      <slot name="header">
        <h2>Header</h2>
      </slot>
      <slot name="default">
        <h3>Body</h3>
      </slot>
  </div>
</template>

<script>
export default {
  name: 'DefaultModale.vue',
  emits: ['outside-click'],
};
</script>

<style lang="scss" scoped>

.backdrop {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 75%;

}

.wrapper-modale {
  $padding: 64px;
  position: fixed;
  //top: calc(50% - #{$padding});
  //left: calc(50% - #{$padding});
  top: 0;
  left: 0;
  z-index: 100;
  background-color: $light-color;
  padding: $padding;
  display: flex;
  flex-direction: column;

}
</style>
