<template>
  <div id="container">
    <h1>New recipe </h1>
    <hr/>
    <form @submit.prevent="sendForm">
      <div class="form-input">
        <label for="recipe-url">Recipe url:</label>
        <input id="recipe-url" type="url" v-model="enteredUrl" placeholder="https://myperfect-reci.pe"/>
      </div>
      <br>
      <div class="form-input recipe-type">
        <label>Type of dish:</label>
        <div class="radio-input">
          <input id="starter" type="radio" value="starter" v-model="enteredTypeRecipe"/>
          <label for="starter"><span>🥗</span>Starter</label>
        </div>
        <div class="radio-input">
          <input id="main" type="radio" value="main" v-model="enteredTypeRecipe"/>
          <label for="main"><span>🍱</span>Main</label>
        </div>
        <div class="radio-input">
          <input id="dessert" type="radio" value="dessert" v-model="enteredTypeRecipe"/>
          <label for="dessert"><span>🍩</span>Dessert</label>
        </div>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <br v-else>
      <button :class="addingState">{{ buttonText }}</button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      enteredUrl: '',
      enteredTypeRecipe: null,
      error: null,
    };
  },
  methods: {
    sendForm() {
      if (this.isAddingRecipe) {
        return;
      }
      this.error = null;
      console.log(this.enteredUrl, this.enteredTypeRecipe);
      if (!this.enteredUrl || !this.enteredTypeRecipe) {
        this.error = 'Url and/or type missing.';
        return;
      }
      this.$store.dispatch('tryAddRecipe', {
        url: this.enteredUrl,
        typeRecipe: this.enteredTypeRecipe,
      });
    },
  },
  computed: {
    ...mapGetters(['isAddingRecipe', 'errorMessage', 'isAddingErrored', 'isAddingSucceeded']),
    buttonText() {
      if (this.isAddingRecipe) {
        return 'Processing... ';
      }
      if (this.isAddingErrored) {
        return this.errorMessage || 'something failed';
      }
      if (this.isAddingSucceeded) {
        return 'Recipe added !';
      }
      return 'Add new recipe';
    },
    addingState() {
      if (this.isAddingRecipe) {
        return 'adding';
      }
      if (this.isAddingErrored) {
        return 'error';
      }
      if (this.isAddingSucceeded) {
        return 'success';
      }
      return 'normal';
    },
  },
};
</script>
<style lang="scss" scoped>
$form-text-color: #7c75d0;
$form-error-color: #dd2525;
$form-background-color: #f7e2f5;

#container {
  width: 100%;
  padding: 25px;
  @include recipe-box();
  flex-direction: column;

  #error-msg {
    margin: 5px 0 0 0;
    color: $form-error-color;

    &::before {
      content: "❗ ";
    }
  }
}

hr {
  border: 0;
  height: 3px;
  background-color: #e26161;
  width: 200px;
  margin-right: auto;
  margin-left: 0;
  margin-bottom: 25px;
}

.form-input {
  display: flex;
  flex-direction: column;
  width: fit-content;

  label {
    font-weight: 700;
    margin-bottom: 0;
    font-size: 19px;
  }
  .radio-input {
    margin-bottom: 2px;
  }
}

#recipe-url {
  border-radius: unset;
  border: none;
  margin-top: 5px;
  background-color: #ffcace;
  text-decoration: none;
  border-bottom: 3px solid #e48e94;

  &:focus {
    background-color: #eabdde;
  }

}

button {
  margin: 15px;
  margin-left: 0;
  border: 3px solid $main-color;
  background-color: inherit;
  color: $main-color;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;

  &.success {
    color: #62ae92;
    border: 3px solid #62ae92;
  }

  &.adding {
    color: grey;
    cursor: default;
    border: 3px solid grey;

    &:hover {
      background-color: unset;
    }
  }

  &.error {
    color: #dd3131;
    border: 3px solid #dd3131;
  }

  &:hover {
    background-color: rgba(252, 233, 218, 0.75);
  }

  .loader-container {
    width: 100px;

    .loader {
      @include loader(10px, 3px, 5px);
    }
  }
}

label {
  //line-height: 20px;
  span {
    margin-right: 5px;
    font-size: 20px;
  }
}
</style>
