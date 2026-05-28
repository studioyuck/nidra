<template>
  <div class="cp page--nav-padding">
    <header class="cp__header">
      <h1 class="cp__title">{{ title }}</h1>
    </header>
    <main class="cp__body">
      <slot />
    </main>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped>
.cp {
  color: var(--midnight-blue);
}

.cp__header {
  padding: 140px var(--outer-padding) 56px;
  border-bottom: 1px solid var(--gold-10);
  text-align: center;
}

.cp__title {
  font-family: Cloister, Times New Roman, serif;
  font-size: clamp(1.4rem, 3.5vw, 2.75rem);
  font-weight: 400;
  font-style: italic;
  line-height: normal;
  margin: 0;
}

@media (max-width: 767px) {
  .cp__title {
    font-size: 2.8rem;
  }

  .cp__header {
    padding-top: 80px;
    padding-bottom: 40px;
  }

  .cp__body {
    padding-top: 48px;
    padding-bottom: 72px;
  }
}

.cp__body {
  padding: 72px var(--outer-padding) 120px;
  max-width: 960px;
  margin: 0 auto;
}
</style>
