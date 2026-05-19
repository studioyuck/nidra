<script setup>
definePageMeta({ headerTheme: 'dark' })

const faqs = [
  { q: 'Lorem ipsum dolor sit amet consectetur?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { q: 'Sed do eiusmod tempor incididunt ut labore?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.' },
  { q: 'Ut enim ad minim veniam quis nostrud?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco.' },
  { q: 'Duis aute irure dolor in reprehenderit?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'Excepteur sint occaecat cupidatat non proident?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.' },
  { q: 'Sunt in culpa qui officia deserunt mollit?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'Anim id est laborum sed perspiciatis unde?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.' },
]

const openIndex = ref(null)
function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <ContentPage title="Frequently Asked Questions">
    <div class="faq-list">
      <div
        v-for="(item, i) in faqs"
        :key="i"
        class="faq-item"
        :class="{ 'is-open': openIndex === i }"
      >
        <button class="faq-item__trigger" @click="toggle(i)">
          <span class="faq-item__question">{{ item.q }}</span>
          <span class="faq-item__icon">{{ openIndex === i ? '−' : '+' }}</span>
        </button>
        <CollapseTransition :open="openIndex === i">
          <div class="faq-item__answer">
            <p>{{ item.a }}</p>
          </div>
        </CollapseTransition>
      </div>
    </div>
  </ContentPage>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid var(--gold-10);
}

.faq-item:first-child {
  border-top: 1px solid var(--gold-10);
}

.faq-item__trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 28px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  color: inherit;
}

.faq-item__question {
  font-size: 11px;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: normal;
  opacity: 0.5;
}

.faq-item.is-open .faq-item__question {
  opacity: 1;
  color: var(--gold);
}

.faq-item__icon {
  font-size: 22px;
  font-style: normal;
  flex-shrink: 0;
  opacity: 0.4;
  line-height: 1;
}

.faq-item__answer {
  padding-bottom: 28px;
}

.faq-item__answer p {
  margin: 0;
  font-size: 18px;
  line-height: normal;
  opacity: 0.65;
}

</style>
