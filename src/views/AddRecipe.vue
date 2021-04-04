<template>
  <div id="container">
    <h1>Please enter a new recipe</h1>
    <form @submit.prevent="sendForm">
      <div class="form-input">
        <label for="recipe-url">Recipe url</label>
        <input id="recipe-url" type="url" v-model="enteredUrl" />
      </div>
      <div class="form-input recipe-type">
        <div class="radio-input">
          <input id="starter" type="radio" value="starter" v-model="enteredTypeRecipe" />
          <label for="starter">Starter</label>
        </div>
        <div class="radio-input">
          <input id="main" type="radio" value="main" v-model="enteredTypeRecipe" />
          <label for="main">Main</label>
        </div>
        <div class="radio-input">
          <input id="dessert" type="radio" value="dessert" v-model="enteredTypeRecipe" />
          <label for="dessert">Dessert</label>
        </div>
      <p v-if="error">{{error}}</p>
      </div>
      <button>Add recipe</button>
    </form>
  </div>
</template>
<script>
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
      this.error = null;
      console.log(this.enteredUrl, this.enteredTypeRecipe);
      if (!this.enteredUrl || !this.enteredTypeRecipe) {
        this.error = 'Url and/or type missing.';
        return;
      }
      this.$store.dispatch('tryAddRecipe', { url: this.enteredUrl, typeRecipe: this.enteredTypeRecipe });
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
  #url-form-container {
    width: fit-content;

    .url-recipe {
      margin-top: 5px;
      background-color: #ffcace;
      text-decoration: none;
      border: none;
      border-bottom: 3px solid #e48e94;
      &:focus {
        background-color: #eabdde;
      }
    }
    .url-recipe-error {
      margin-top: 5px;
      background-color: inherit;
      text-decoration: none;
      border: none;
      border-bottom: 3px solid $form-error-color;
    }
  }
  #dish-radio-choices {
    margin-top: 25px;
    width: fit-content;

    #inputs {
      #inputs-choices-error {
        border-bottom: 3px solid $form-error-color;
      }
      .label-radio {
        padding: 5px;
        font-size: 18px;
        span {
          margin-right: 5px;
        }
        label {
          width: 100%;
        }
        &:hover {
          color: #555092;
        }
      }
    }
  }
}
.form-input {
  display: flex;
  flex-direction: column;
}
button {
  margin: 15px;
  margin-left: 0;
  border: 3px solid $main-color;
  background-color: inherit;
  color: $main-color;
  font-size: 20px;
  padding: 10px;
  .success {
    color: #62ae92;
    border: 3px solid #62ae92;
  }
  .error {
    color: #dd3131;
    border: 3px solid #dd3131;
  }

  &:hover {
    background-color: #dfcdf4;
  }
  .loader-container {
    width: 100px;
    .loader {
      @include loader(10px, 3px, 5px);
    }
  }
}
</style>
