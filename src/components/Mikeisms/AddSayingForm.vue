<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="new-saying">Add New Saying(s)</label>
      <p>You can add multiple sayings by putting each on a new line</p>
      <textarea name="" id="new-saying" rows="10" @change="setSayings"></textarea>
    </div>
    <button :disabled="!sayings.length">Submit</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["submit"],

  setup(props, context) {
    const sayings = ref([]);
    function setSayings(event) {
      const input = event.target.value;
      sayings.value = input
        .split(`\n`)
        .map((saying) => saying.trim())
        .filter((x) => !!x);
    }
    function submitForm() {
      console.log(`submitForm`);
      context.emit("submit", sayings.value);
    }
    return {
      submitForm,
      setSayings,
      sayings,
    };
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

.form-control p {
  font-size: 0.75rem;
  margin: 0.5em 0;
}

label {
  font-weight: bold;
  display: block;
}

textarea {
  border: 1px solid var(--primary-color);
  width: 100%;
  padding: 1rem;
}
</style>