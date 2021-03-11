<template>
  <teleport to="body">
    <div v-if="open" class="backdrop" @click="$emit('close')"></div>
    <transition name="modal">
      <dialog :class="type" open v-if="open">
        <header v-if="title">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ["open", "title", "type"],
  emits: ["close"],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 2rem;
  width: 50vw;
  max-width: 30rem;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
  opacity: 1;
  background-clip: border-box;
  overflow: hidden;
}

dialog header {
  color: #fff;
  background: var(--primary-color);
  margin: -1rem -1rem 0;
  padding: 1rem;
}

dialog.success header {
  background: #00ab82;
}

dialog header h2 {
  margin: 0;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.3s ease-in;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>