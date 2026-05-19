<template>
  <div class="ayhs-page">
    <section class="article-splash">
      <div class="article-splash__left">
        <div class="article-splash__title">
          <h1 class="txt-heading--1">Stephen Ellcock</h1>
        </div>

        <div class="article-splash__text">
          <div class="journal-detail-section-01-text-left">
            <div class="photo-info">
              <div class="txt-label">PHOTOS:</div>
              <div class="txt-label">JOHN SMITH</div>
            </div>
          </div>

          <p class="txt-body--small">
            Stephen Ellcock is a London-based online collector and curator of images, author, researcher and former musician and bookseller
          </p>
        </div>
      </div>

      <div class="article-splash__right">
        <img
          src="/images/WhatsApp-Image-2026-02-03-at-17.40.29.jpeg"
          loading="lazy"
          alt=""
          class="journal-detail-cover"
        >
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ headerTheme: 'dark' })
</script>

<style scoped>
.ayhs-page {
  display: flex;
  flex-direction: column;
}

/* Override global .section padding — this splash is full-bleed */
.article-splash {
  padding: 0;
}

/* Left panel gets its own breathing room */
.article-splash__left {
  padding: 0 var(--outer-padding);
}

/* Right image panel goes edge-to-edge */
.article-splash__right {
  margin-right: 0;
}
</style>
