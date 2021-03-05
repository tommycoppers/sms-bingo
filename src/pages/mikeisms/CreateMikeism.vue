<template>
  <div>
    <h1>Create A Mike-ism</h1>
    <p>{{message}}</p>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const message = ref("Hear something, say something!");

    return {
      message
    };
  }
};
</script>

<style scoped>

</style>