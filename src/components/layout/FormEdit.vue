<template>
  <form @submit.prevent>
    <div class="form-control">
      <label for="name">Name</label>
      <input id="name" type="text">
    </div>
    <div class="button-holder">
      <button @click="$emit('close')">Cancel</button>
      <button>Save</button>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.form-control {
  margin-top: 32px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;

  input, label {
    max-width: 512px;
  }
}

.button-holder {
  margin-top: 64px;
  display: flex;
  justify-content: end;
  button {
    margin: 8px;
  }
}
</style>
