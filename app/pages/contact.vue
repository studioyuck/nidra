<script setup>
definePageMeta({ headerTheme: 'dark' })

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

function submit() {
  sent.value = true
}
</script>

<template>
  <ContentPage title="Get in Touch">
    <Transition name="fade" mode="out-in">
      <div v-if="sent" key="thanks" class="contact-thanks">
        <p class="contact-thanks__title">Thank you.</p>
        <p class="contact-thanks__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <form v-else key="form" class="contact-form" @submit.prevent="submit">
        <div class="contact-field">
          <label class="contact-field__label txt-label" for="name">Name</label>
          <input id="name" v-model="form.name" type="text" class="contact-field__input" placeholder="Lorem ipsum" required />
        </div>
        <div class="contact-field">
          <label class="contact-field__label txt-label" for="email">Email</label>
          <input id="email" v-model="form.email" type="email" class="contact-field__input" placeholder="lorem@ipsum.co" required />
        </div>
        <div class="contact-field">
          <label class="contact-field__label txt-label" for="message">Message</label>
          <textarea id="message" v-model="form.message" class="contact-field__input contact-field__input--textarea" placeholder="Lorem ipsum dolor sit amet..." rows="6" required />
        </div>
        <button type="submit" class="contact-submit txt-label">Send Message</button>
      </form>
    </Transition>
  </ContentPage>
</template>

<style scoped>
.contact-form,
.contact-thanks {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.contact-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-field__label {
  letter-spacing: 0.12em;
  opacity: 0.5;
}

.contact-field__input {
  font-family: inherit;
  font-size: 18px;
  line-height: normal;
  color: var(--midnight-blue);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--gold-10);
  padding: 10px 0;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
  resize: none;
}

.contact-field__input::placeholder {
  opacity: 0.3;
}

.contact-field__input:focus {
  border-bottom-color: var(--midnight-blue);
}

.contact-field__input--textarea {
  min-height: 120px;
}

.contact-submit {
  align-self: center;
  background: var(--midnight-blue);
  color: var(--day-shadow);
  border: 1px solid var(--midnight-blue);
  padding: 14px 40px;
  cursor: pointer;
  letter-spacing: 0.12em;
  font-size: 11px;
  transition: background 0.2s ease, color 0.2s ease;
}

.contact-submit:hover {
  background: transparent;
  color: var(--midnight-blue);
}

.contact-thanks__title {
  font-size: 2rem;
  font-style: italic;
  margin: 0;
  line-height: normal;
  text-align: center;
}

.contact-thanks__body {
  font-size: 18px;
  line-height: normal;
  opacity: 0.65;
  margin: 0;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
