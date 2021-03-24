<template>
  <div>
    <bingo-card :sayings="sayings" @won="celetebrate"></bingo-card>
    <base-modal
      @close="hideWinningModal"
      title="BINGO!"
      :open="showWinningModal"
    >
      <h2>Winning Combo:</h2>
      <ul>
        <li v-for="saying in winningSayings" :key="saying">{{ saying }}</li>
      </ul>
    </base-modal>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import BingoCard from "../../components/BingoCard/BingoCard.vue";


export default {
  components: { BingoCard },
  setup() {
    const store = useStore();
    const sayings = ref([]);

    //console.log(a,b);

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