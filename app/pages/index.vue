<template>
<div class="page-in">
  <section class="hero-section-01">
    <div class="hero-section-container">
      <div class="hero-section-01-inner" ><div class="hero-section-01-flex">
          <div class="hero-section-01-text-group">
          </div>
        </div></div>
    </div>
  </section>
  
  <section class="section section--padding-large section--center">
                <NuxtImg
  src="/images/9.png"
  class="max-width-60"
  loading="lazy"
  format="webp"
  quality="80"
  sizes="sm:100vw md:60vw lg:40vw"
  alt=""
/>
  </section>
   <section id="section" class="section section--padding-large">
    <div class="copy-01_container">
      <div class="copy-01_text">
          <div class="txt-label">WELCOME</div>
        <p>Our phones offer so much, yet quietly ask for more than we ever intended to give.<br><br>The Nidra Box, together with its cards, forms a quiet ritual—at night, at waking, and in the long middle of the day.
A simple, beautiful place to set the phone down at the close of your day.</p>
        <NuxtLink to="/about" class="button-text w-inline-block">
          <div class="txt-label">LEARN MORE</div>

        </NuxtLink>
      </div>
    </div>
  </section>
  

  
  
  <section class="section section--padding-large section--center">
        <NuxtImg
  src="/images/10.png"
  class="max-width-60"
  loading="lazy"
  format="webp"
  quality="80"
  sizes="sm:100vw md:60vw lg:40vw"
  alt=""
/>
  </section>

  <!-- <AboutPlaceholder /> -->
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