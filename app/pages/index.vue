<template>
<div class="page-in">
  <section class="hero-section-01">
    <div class="hero-section-container">
      <div class="hero-section-01-inner">
        <div class="hero-section-01-flex">
          <div class="hero-section-01-text-group">
          </div>
        </div>
        <h1 class="hero-title">Put your phone to bed.</h1>
      </div>
    </div>
  </section>

  <section class="section section--padding-large section--center">
        <ImageSlideshow
          class="max-width-60"
          :images="[
            { src: '/images/9.png' },
            { src: '/images/10.png' }
          ]"
          sizes="sm:100vw md:60vw lg:40vw"
        />
  </section>
   <section id="section" class="section section--padding-large">
    <div class="copy-01_container">
      <div class="copy-01_text">
        <p>Our phones offer so much, yet quietly ask for more than we ever intended to give.<br><br>The Nidra Box, together with its cards, forms a quiet ritual—at night, at waking, and in the long middle of the day.
A simple, beautiful place to set the phone down at the close of your day.</p>
        <NuxtLink to="/about" class="button-text w-inline-block">
          <div class="txt-label">LEARN MORE</div>
        </NuxtLink>
      </div>
    </div>
  </section>

  <ScrollGallery :images="productImages" link="/product/nidra-box" />

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  headerTheme: 'light'
})

const productImages = [
  '/images/product-images/1.png',
  '/images/product-images/2.png',
  '/images/product-images/3.png',
  '/images/product-images/4.png',
  '/images/product-images/5.png'
]

</script>

<style scoped>
.hero-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: var(--gold);
  font-family: Cloister, Georgia, serif;
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-style: italic;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  margin: 0;
  animation: hero-fade-in 2s ease forwards;
}

@keyframes hero-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
