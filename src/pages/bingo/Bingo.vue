<template>
  <div>
    <h1>Shit Mike Says BINGO!</h1>
    <bingo-board :sayings="sayings" @won="celetebrate"></bingo-board>
    <base-modal
      @close="hideWinningModal"
      title="BINGO!"
      type="success"
      :open="showWinningModal"
    >
      <h3>Congratulations!!! YOU WON!</h3>
      <p>Winning Combo:</p>
      <ul>
        <li v-for="saying in winningSayings" :key="saying">{{ saying }}</li>
      </ul>
    </base-modal>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import BingoBoard from "../../components/BingoBoard/BingoBoard.vue";

export default {
  components: { BingoBoard },
  setup() {
    const store = useStore();
    const sayings = ref([]);

    loadSayings(store).then(() => {
      sayings.value = Object.values(store.getters["mikeisms/sayings"]).map(
        (saying) => saying.saying
      );
    });

    const winningSayings = ref([]);
    const showWinningModal = ref(false);
    function hideWinningModal() {
      showWinningModal.value = false;
    }
    function celetebrate(sayings) {
      winningSayings.value = sayings;
      showWinningModal.value = true;
    }

    return {
      sayings,
      winningSayings,
      showWinningModal,
      hideWinningModal,
      celetebrate,
    };
  },
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