<template>
  <div class="ayh-gallery">
    <NuxtLink
      v-for="(img, i) in images"
      :key="i"
      to="/altar-your-habits-single"
      class="ayh-gallery__item"
    >
      <NuxtImg
        :src="img"
        alt=""
        loading="lazy"
        format="webp"
        quality="80"
        sizes="sm:100vw md:50vw"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
const images = [
  '/images/altar-1.png',
  '/images/altar-2.png',
  '/images/altar-3.png',
  '/images/altar-4.png',
  '/images/altar-3.png',
  '/images/altar-4.png',
  '/images/altar-1.png',
  '/images/altar-2.png',
]
</script>

<style scoped>
.ayh-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  width: 100%;
}

.ayh-gallery__item {
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 5;
}

.ayh-gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.ayh-gallery__item:hover img {
  transform: scale(1.04);
}

@media (max-width: 767px) {
  .ayh-gallery {
    grid-template-columns: 1fr;
  }

  .ayh-gallery__item {
    aspect-ratio: 4 / 5;
  }
}
</style>
