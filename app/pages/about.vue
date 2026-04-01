<template>
  <div class="page-in page--nav-padding">
  <section class="splash-02">
    <div class="splash-02_text">
      <h1 class="txt-heading--2">Duis aute irure dolor <br>in reprehenderit in voluptate</h1>
    </div>
  </section>

  <section id="section" class="section section--border section--padding-large">
    <div class="copy-01_container">
      <div class="copy-01_text">
        <img src="/images/Pratika-dark.svg" loading="lazy" alt="" class="symbol">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <NuxtLink to="/shop" class="button-text dark w-inline-block">
          <div class="txt-label">VIEW PRODUCT</div>
          <div class="button-circle">
            <div class="button-arrow"><img src="/images/long-arrow-right.svg" loading="lazy" alt="" class="icon-12"></div>
            <div class="button-arrow"><img src="/images/long-arrow-right.svg" loading="lazy" alt="" class="icon-12"></div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
  
  <AboutPlaceholder />
  
  
  </div>
</template>

<script setup>
definePageMeta({
  headerTheme: 'dark'
})
</script>