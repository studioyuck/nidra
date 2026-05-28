<template>
  <div class="survey__intro category-intro">
    <span
      class="category-intro__symbol fade-word"
      style="animation-delay: 0s"
      v-html="svgContent"
    />

    <h1 class="heading category-intro__title">
      <span
        v-for="(word, index) in words"
        :key="index"
        class="fade-word"
        :style="{ animationDelay: `${(index + 1) * 0.2}s` }"
      >
        {{ word }}<span v-if="index < words.length - 1" aria-hidden="true">&nbsp;</span>
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
const symbols = [
  'Awareness','Balance','Boredom','Boundary','Breath','Change','Chaos','Choice',
  'Courage','Create','Dance','Deception','Desire','Discern','Discipline','Dream',
  'Escape','Focus','Friendship','Generosity','Gratitude','Hope','Illusion',
  'Imagination','Integrity','Intuition','Joy','Listen','Magic','Miracle',
  'Move','Mystery','Nature','Notice','Nurture','Passion','Patience','Perspective',
  'Play','Presence','Purpose','Question','Rebel','Renewal','Resistance','Rest',
  'Risk','Sacred','Secret','Simplicity','Smile','Solitude','Space','Spirit',
  'Strength','Surprise','Surrender','Time','Touch','Transform','Trust','Truth',
  'Understand','Union','Unlearn','Unravel','Voice','Warmth'
]

const props = defineProps({
  title: String,
  description: String
})
const emit = defineEmits(['continue'])

const words = props.title.split(' ')
const showDescription = ref(false)
const svgContent = ref('')

onMounted(async () => {
  const name = symbols[Math.floor(Math.random() * symbols.length)]
  try {
    const res = await fetch(`/symbols/nidrasymbols__${name}.svg`)
    svgContent.value = await res.text()
  } catch {}

  const totalDelay = (words.length + 1) * 200
  setTimeout(() => { showDescription.value = true }, totalDelay + 400)
  setTimeout(() => { emit('continue') }, totalDelay + 3500)
})
</script>

<style scoped>
.category-intro__symbol {
  display: block;
  width: 192px;
  height: 192px;
  margin-top: -2rem;
  margin-bottom: 0.5rem;
}

.category-intro__symbol :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

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
