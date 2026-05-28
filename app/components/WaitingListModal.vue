<script setup lang="ts">
const { isOpen, close } = useWaitingList()

const name = ref('')
const email = ref('')
const submitted = ref(false)
const submitting = ref(false)

watch(isOpen, (val) => {
  if (!val) {
    setTimeout(() => {
      name.value = ''
      email.value = ''
      submitted.value = false
      submitting.value = false
    }, 300)
  }
})

async function submit() {
  if (!email.value || submitting.value) return
  submitting.value = true
  try {
    await $fetch('/api/waiting-list', {
      method: 'POST',
      body: { name: name.value, email: email.value }
    })
    submitted.value = true
  } catch {
    // fail silently
  } finally {
    submitting.value = false
  }
}
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

          <Transition name="swap" mode="out-in">
            <div v-if="!submitted" key="form">
              <div class="modal__header">
                <h2 class="modal__title">Join the Waiting List</h2>
                <p class="modal__subtitle">Be the first to know when Nidra is available.</p>
              </div>

              <form class="modal__form" @submit.prevent="submit">
                <div class="modal__field">
                  <label class="txt-label" for="wl-name">Name</label>
                  <input id="wl-name" v-model="name" type="text" placeholder="Your name" autocomplete="name" />
                </div>

                <div class="modal__field">
                  <label class="txt-label" for="wl-email">Email</label>
                  <input id="wl-email" v-model="email" type="email" placeholder="your@email.com" autocomplete="email" required />
                </div>

                <button type="submit" class="modal__submit txt-label" :disabled="submitting">
                  {{ submitting ? 'Joining…' : 'Join the List' }}
                </button>
              </form>
            </div>

            <div v-else key="thankyou" class="modal__thankyou">
              <h2 class="modal__title">You're on the list.</h2>
              <p class="modal__subtitle">We'll be in touch when Nidra is ready. Thank you.</p>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 24px;
}

.modal {
  background: var(--midnight-blue);
  color: var(--silver);
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
  color: var(--silver);
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
  color: var(--silver);
}

.modal__subtitle {
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 14px;
  color: var(--silver);
  opacity: 0.55;
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
  color: var(--silver);
  opacity: 0.55;
}

.modal__field input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(172, 173, 184, 0.25);
  padding: 8px 0;
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 15px;
  color: var(--silver);
  outline: none;
  transition: border-color 0.2s ease;
}

.modal__field input::placeholder {
  color: rgba(172, 173, 184, 0.35);
}

.modal__field input:focus {
  border-bottom-color: var(--silver);
}

.modal__submit {
  margin-top: 8px;
  background: transparent;
  color: var(--silver);
  border: 1px solid rgba(172, 173, 184, 0.4);
  padding: 14px 24px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.08em;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.modal__submit:hover {
  background: var(--silver);
  color: var(--midnight-blue);
  border-color: var(--silver);
}

.modal__thankyou {
  padding: 16px 0 8px;
}

.modal__submit:disabled {
  opacity: 0.5;
  cursor: default;
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.25s ease;
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
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
