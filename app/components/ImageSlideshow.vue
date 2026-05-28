<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 2200
  },
  sizes: {
    type: String,
    default: '100vw'
  },
  quality: {
    type: [Number, String],
    default: 80
  }
})

const currentIndex = ref(0)
let timer

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
  }, props.interval)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="slideshow">
    <NuxtImg
      v-for="(image, i) in images"
      :key="image.src"
      :src="image.src"
      :alt="image.alt ?? ''"
      class="slideshow__img"
      :class="{ 'is-active': i === currentIndex }"
      loading="eager"
      format="webp"
      :quality="quality"
      :sizes="sizes"
    />
  </div>
</template>

<style scoped>
.slideshow {
  display: inline-block;
  position: relative;
  vertical-align: top;
}

.slideshow__img {
  opacity: 0;
  transition: opacity 0.7s ease;
}

.slideshow__img.is-active {
  opacity: 1;
}

/* First image stays in document flow — its natural dimensions set the container size */
.slideshow__img:first-child {
  display: block;
}

/* All other images sit absolute on top, cropping to fill that same area */
.slideshow__img + .slideshow__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
