<template>
  <div>
    <h1>Mike-isms</h1>
    <ul>
        <li v-for="saying in sayings" :key="saying.id">{{saying.saying}}</li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const sayingsRaw = ref(store.getters["mikeisms/sayings"]);
    const sayings = computed(() => {
      return Object.keys(sayingsRaw.value).map(id=>({
          id,
          saying: sayingsRaw.value[id]

      }))
    });

    if (!sayingsRaw.value.length) {
      store.dispatch("mikeisms/loadSayings").then(() => {
        sayingsRaw.value = store.getters["mikeisms/sayings"];
        console.log("Loadedddddd", sayingsRaw.value);
      });
    }

    return {
      sayings
    };
  }
};
</script>

<style scoped>
</style>