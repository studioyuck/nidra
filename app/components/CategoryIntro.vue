<template>
  <div class="survey__intro category-intro">
    <h1 class="heading category-intro__title">
      <span
        v-for="(word, index) in words"
        :key="index"
        class="fade-word"
        :style="{ animationDelay: `${index * 0.2}s` }"
      >
        {{ word }}<span aria-hidden="true">&nbsp;</span>
      </span>
    </h1>

    <p
      class="category-intro__description fade-in"
      :class="{ 'is-visible': showDescription }"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String
})
const emit = defineEmits(['continue'])

const words = props.title.split(' ')
const showDescription = ref(false)

onMounted(() => {
  const totalDelay = words.length * 200
  setTimeout(() => {
    showDescription.value = true
  }, totalDelay + 400)

  setTimeout(() => {
    emit('continue')
  }, totalDelay + 3500)
})
</script>

<style scoped>
.fade-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-intro__description {
  opacity: 0;
  transition: opacity 1s ease;
  min-height: 1em; /* prevents jump even if hidden */
}

.category-intro__description.is-visible {
  opacity: 1;
}
</style>
