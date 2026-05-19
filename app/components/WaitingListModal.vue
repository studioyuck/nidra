<script setup lang="ts">
const { isOpen, close } = useWaitingList()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="close"
      >
        <div class="modal">
          <button class="modal__close txt-label" @click="close">✕</button>

          <div class="modal__header">
            <h2 class="modal__title">Join the Waiting List</h2>
            <p class="modal__subtitle">Be the first to know when Nidra is available.</p>
          </div>

          <form class="modal__form" @submit.prevent>
            <div class="modal__field">
              <label class="txt-label" for="wl-name">Name</label>
              <input id="wl-name" type="text" placeholder="Your name" autocomplete="name" />
            </div>

            <div class="modal__field">
              <label class="txt-label" for="wl-email">Email</label>
              <input id="wl-email" type="email" placeholder="your@email.com" autocomplete="email" />
            </div>

            <button type="submit" class="modal__submit txt-label">
              Join the List
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(19, 22, 39, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 24px;
}

.modal {
  background: var(--beige);
  color: var(--midnight-blue);
  width: 100%;
  max-width: 440px;
  padding: 48px 40px 40px;
  position: relative;
}

.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--midnight-blue);
  font-size: 12px;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.modal__close:hover {
  opacity: 1;
}

.modal__header {
  margin-bottom: 32px;
}

.modal__title {
  font-family: Cloister, Georgia, serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 1.2;
  margin: 0 0 8px;
}

.modal__subtitle {
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 14px;
  color: var(--b400);
  margin: 0;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal__field label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--b400);
}

.modal__field input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--b200);
  padding: 8px 0;
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 15px;
  color: var(--midnight-blue);
  outline: none;
  transition: border-color 0.2s ease;
}

.modal__field input::placeholder {
  color: var(--b300);
}

.modal__field input:focus {
  border-bottom-color: var(--midnight-blue);
}

.modal__submit {
  margin-top: 8px;
  background: var(--midnight-blue);
  color: var(--silver);
  border: 1px solid var(--midnight-blue);
  padding: 14px 24px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.08em;
  transition: background 0.2s ease, color 0.2s ease;
}

.modal__submit:hover {
  background: transparent;
  color: var(--midnight-blue);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(12px);
  opacity: 0;
}
</style>
