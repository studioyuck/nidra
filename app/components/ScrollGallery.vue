<script setup lang="ts">
const props = defineProps<{
  images: string[]
  link?: string
}>()
</script>

<template>
  <section class="scroll-gallery">
    <div class="scroll-gallery__track">
      <template v-for="(src, i) in images" :key="i">
        <NuxtLink
          v-if="props.link"
          :to="props.link"
          class="scroll-gallery__item"
        >
          <NuxtImg
            :src="src"
            format="webp"
            quality="95"
            loading="lazy"
            sizes="sm:100vw md:60vw lg:60vw"
            alt=""
            class="scroll-gallery__img"
          />
        </NuxtLink>
        <div v-else class="scroll-gallery__item">
          <NuxtImg
            :src="src"
            format="webp"
            quality="95"
            loading="lazy"
            sizes="sm:100vw md:60vw lg:60vw"
            alt=""
            class="scroll-gallery__img"
          />
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.scroll-gallery {
  width: 100%;
  overflow: hidden;
  padding-bottom: 24px;
}

.scroll-gallery__track {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
}

.scroll-gallery__track:active {
  cursor: grabbing;
}

.scroll-gallery__track::-webkit-scrollbar {
  display: none;
}

.scroll-gallery__item {
  flex: 0 0 auto;
  /* ~2.5 items: left-pad(24) + 2×gap(16) = 40px */
  width: calc((100vw - 40px) / 2.5);
  scroll-snap-align: start;
  overflow: hidden;
  text-decoration: none;
  display: block;
}

.scroll-gallery__img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

/* Tablet */
@media screen and (max-width: 991px) {
  .scroll-gallery__item {
    width: calc((100vw - 40px) / 2.2);
  }
}

/* Mobile */
@media screen and (max-width: 767px) {
  .scroll-gallery {
    padding-bottom: 16px;
  }

  .scroll-gallery__track {
    gap: 6px;
    scroll-padding-left: 16px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .scroll-gallery__item {
    /* ~1.5 items: left-pad(16) + 1×gap(6) = 22px */
    width: calc((100vw - 22px) / 1.5);
  }
}
</style>
