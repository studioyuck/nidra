<template>
<div class="page-in">
  <section class="home-section-01">
    <div class="home-section-container">
      <div class="home-section-01-left" ><div class="home-section-01-right-flex">
        <div></div>
          <div class="home-section-01-text-group">
            <h1 class="txt-heading--1">Time to put your phone to bed.</h1>
          </div>
          <div class="home-section-01-label">
            <div class="txt-label">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
          </div>
        </div></div>
      <div class="home-section-01-right">
        <div class="home-section-01-right-flex">
        <div></div>
          <div class="home-section-01-text-group">
            <h1 class="txt-heading--1">Every Night, Every Morning.</h1>
          </div>
          <div class="home-section-01-label">
            <div class="txt-label">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
          </div>
        </div>
        <div class="home-section-01-blur" />
      </div>
    </div>
  </section>
  <ProductPlaceholder />
  
  <section id="section" class="section section--border section--padding-large section--night">
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

  <AboutPlaceholder />
  <AltarYourHabitsGallery />
  
  </div>
</template>

<script setup>
definePageMeta({
  headerTheme: 'light'
})
</script>