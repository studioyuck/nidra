<template>
  <div class="progress__container">
    <div class="progress__bar" :style="{ width: `${percentage}%` }"></div>
  </div>
</template>

<script setup>
const progress = useState('progress')
const percentage = computed(() =>
  progress.value.total === 0
    ? 0
    : Math.round((progress.value.current / progress.value.total) * 100)
)
</script>

<style scoped>
.progress {
  height: 4px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.progress__bar {
  height: 100%;
  background: var(--accent);
  transition: width 1s ease;
}
</style>