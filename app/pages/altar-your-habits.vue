<template>
  <div class="page-in page--nav-padding">
    <section class="section section--border section--padding-large">
      <div class="copy-01_container">
        <div class="copy-01_text">

          <p>Our phones offer so much, yet ask for more than we ever meant to give.<br><br>
Have we forgotten that the first and last moments of a day are sacred?<br><br>
The world of Nidra is coming soon.<br><br>
Bringing with it offerings and inspiration to help you close the day and meet the morning as yourself.<br><br>
But first, we are listening.<br><br>
Share your experiences. A few minutes on your rituals and boundaries around your phone.<br><br>
Small acts, quietly repeated, reshape a life — and your experiences will help us shape this beautiful world of rituals we are creating.<br><br>
In return we offer the wisdom of the ancients, modern day experts and artists all hoping for a less distracted world.<br><br>
Our dream is quiet but ambitious — that the Nidra symbol becomes a shared language, appearing wherever our attention is most needed. At dinner tables. Beside the bed. Not as a law. As a remembering.<br><br>
When enough people raise a hand, something stops being a dream and starts belonging to a culture.<br><br>
Are the start and end of your day still yours?</p>

          <NuxtLink to="/" class="button-text w-inline-block">
            <div class="txt-label">TAKE THE SURVEY →</div>
          </NuxtLink>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ headerTheme: 'dark', headerSolid: false })
</script>

<style scoped>
.page-in {
  background-image: url('/images/bg-day.jpg');
  background-size: cover;
  background-position: center;
  color: var(--midnight-blue);
}

.page-in :deep(p),
.page-in :deep(h1),
.page-in :deep(h2),
.page-in :deep(h3) {
  color: var(--midnight-blue);
}
</style>
