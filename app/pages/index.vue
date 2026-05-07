<template>
<div class="page-in">
  <section class="hero-section-01">
    <div class="hero-section-container">
      <div class="hero-section-01-inner" ><div class="hero-section-01-flex">
          <div class="hero-section-01-text-group">
            <h1 class="hero-heading-01">Time to put your phone to bed.<br>Discover your ritual each morning and each night</h1>
          </div>
        </div></div>
    </div>
  </section>
  
  <section class="section section--padding-large section--center">
                <NuxtImg
  src="/images/candle.png"
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
  
  <ProductPlaceholder />
  
  
  <section class="section section--padding-large section--center">
        <NuxtImg
  src="/images/shadow.png"
  class="max-width-60"
  loading="lazy"
  format="webp"
  quality="80"
  sizes="sm:100vw md:60vw lg:40vw"
  alt=""
/>
  </section>

  <!-- <AboutPlaceholder /> -->
  <AltarYourHabitsGallery />
  
  </div>
</template>

<script setup>
definePageMeta({
  headerTheme: 'light'
})
</script>