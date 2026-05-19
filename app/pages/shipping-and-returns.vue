<script setup>
definePageMeta({ headerTheme: 'dark' })
</script>

<template>
  <ContentPage title="Shipping & Returns">
    <div class="sr-grid">

      <section class="sr-section">
        <h2 class="sr-section__title txt-label">Delivery</h2>
        <div class="sr-blocks">
          <div class="sr-block">
            <p class="sr-block__label txt-label">United Kingdom</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
          <div class="sr-block">
            <p class="sr-block__label txt-label">Europe</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
          </div>
          <div class="sr-block">
            <p class="sr-block__label txt-label">Rest of World</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.</p>
          </div>
          <div class="sr-block">
            <p class="sr-block__label txt-label">Packaging</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </section>

      <div class="sr-divider" />

      <section class="sr-section">
        <h2 class="sr-section__title txt-label">Returns & Exchanges</h2>
        <div class="sr-blocks">
          <div class="sr-block">
            <p class="sr-block__label txt-label">Our Policy</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
          </div>
          <div class="sr-block">
            <p class="sr-block__label txt-label">How to Return</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div class="sr-block">
            <p class="sr-block__label txt-label">Refunds</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
          <div class="sr-block">
            <p class="sr-block__label txt-label">Exchanges</p>
            <p class="sr-block__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </section>

    </div>
  </ContentPage>
</template>

<style scoped>
.sr-grid {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0 48px;
}

.sr-divider {
  background: var(--gold-10);
}

.sr-section__title {
  color: var(--gold);
  letter-spacing: 0.15em;
  margin: 0 0 40px;
}

.sr-blocks {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.sr-block__label {
  margin: 0 0 10px;
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.sr-block__body {
  margin: 0;
  font-size: 18px;
  line-height: normal;
}

@media (max-width: 767px) {
  .sr-grid {
    grid-template-columns: 1fr;
  }

  .sr-divider {
    height: 1px;
    width: 100%;
    margin: 48px 0;
  }
}
</style>
