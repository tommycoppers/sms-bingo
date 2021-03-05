<template>
  <div>
    <h1>Shit Mike Says BINGO!</h1>
    <!-- <p>{{message}}</p> -->
    <bingo-board :sayings="sayings"></bingo-board>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import BingoBoard from "../../components/BingoBoard.vue";
export default {
  components: { BingoBoard },
  setup() {
    const store = useStore();
    const sayings = ref([]);

    loadSayings(store).then(() => {
      sayings.value = Object.values(store.getters["mikeisms/sayings"]);
    });

    return {
      sayings
    };
  }
};

async function loadSayings(store) {
  const sayings = await store.dispatch("mikeisms/loadSayings");
  return sayings;
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
</script>

<style scoped>
</style>