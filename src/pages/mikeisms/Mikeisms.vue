<template>
  <div>
    <h1>Mike-isms <button @click="openAddSayingModal">Add A Saying</button></h1>
    <transition-group tag="ul" name="sayings-list">
      <li v-for="saying in sayings" :key="saying.id">
        {{ saying.saying }}
        <button class="small invert" @click="deleteSaying(saying)">
          DELETE
        </button>
      </li>
    </transition-group>

    <base-modal
      @close="hideAddSayingModal"
      title="Add A Mikeism"
      :open="showAddSayingModal"
    >
      <add-saying-form @submit="saveSayings"></add-saying-form>
    </base-modal>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import AddSayingForm from "../../components/Mikeisms/AddSayingForm.vue";
import MikeismsService from "../../services/MikeismsService";
const mikeismsService = new MikeismsService();

export default {
  components: { AddSayingForm },
  setup() {
    const store = useStore();
    const sayingsRaw = ref(store.getters["mikeisms/sayings"]);

    const sayings = computed(() => {
      return mikeismsService.formatAsList(sayingsRaw.value).sort((a, b) => {
        const aDate = new Date(a.created).getTime();
        const bDate = new Date(b.created).getTime();
        return bDate - aDate; // newest first
      });
    });

    if (!sayingsRaw.value.length) {
      loadSayings();
    }

    async function saveSayings(newSayings = []) {
      if (!newSayings.length) {
        return;
      }
      await store.dispatch("mikeisms/saveSayings", newSayings);
      await loadSayings();
      hideAddSayingModal();
    }

    async function loadSayings() {
      await store.dispatch("mikeisms/loadSayings");
      sayingsRaw.value = store.getters["mikeisms/sayings"];
    }

    async function deleteSaying(saying) {
      // Probably add some loading here
      await store.dispatch("mikeisms/deleteSaying", saying.id);
      delete sayingsRaw.value[saying.id];
    }

    // Modal Logic
    const showAddSayingModal = ref(false);
    function openAddSayingModal() {
      showAddSayingModal.value = true;
    }
    function hideAddSayingModal() {
      showAddSayingModal.value = false;
    }

    return {
      sayings,
      deleteSaying,
      saveSayings,
      showAddSayingModal,
      openAddSayingModal,
      hideAddSayingModal,
    };
  },
};
</script>

<style scoped>
h1 {
  display: flex;
  align-items: center;
}

h1 button {
  margin-left: auto;
}

ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}
li {
  --saying-animation-speed: 0.25s;
  border: 1px solid #ccc;
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.3);
}

li button {
  margin-left: auto;
}
.sayings-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.sayings-list-enter-active {
  transition: all var(--saying-animation-speed) ease-out;
}

.sayings-list-enter-to,
.sayings-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.sayings-list-leave-active {
  transition: all var(--saying-animation-speed) ease-in;
}

.sayings-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.sayings-list-move {
  transition: transform 0.8s ease;
}
</style>