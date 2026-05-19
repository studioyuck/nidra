<template>
  <div class="page-in page--nav-padding">


  <section id="section" class="section section--border section--padding-large">
    <div class="copy-01_container">
      <div class="copy-01_text">

        <p>Our phones offer so much, yet quietly ask for more than we ever intended to give.
        <br><br>
The NidraBox, together with its cards, forms a quiet ritual—at night, at waking, and in the long middle of the day.<br>
A simple, beautiful place to set the phone down at the close of your day.<br>
A small, sacred pause.<br>
Here, it will be safe.<br>
And you will be freer.<br>
Rest may come a little easier.<br>
A sense of space may return.<br>
Either way, something profound is gained.<br>
Small acts, quietly repeated, reshape a life.<br>
As natural as brushing your teeth.<br>
Strange only when forgotten.<br>
This ritual will not change your world overnight,<br>
yet it may change the way you meet it.
</p>
        <img src="/images/Pratika-light.svg" loading="lazy" alt="" class="symbol">
<p>Let the start and the end be yours.</p
</p>
      </div>
    </div>
  </section>
  
  <!-- <AboutPlaceholder /> -->
  
  
  </div>
</template>

<script setup>
definePageMeta({
  headerTheme: 'light'
})
</script>

<style scoped>
.page-in {
  background-image: url('/images/hero-1.png');
  background-size: cover;
  background-position: center;
  color: var(--day-shadow);
}

.page-in :deep(.splash-02) {
  background-image: none;
}

.page-in :deep(p),
.page-in :deep(h1),
.page-in :deep(h2),
.page-in :deep(h3) {
  color: var(--day-shadow);
}
</style>