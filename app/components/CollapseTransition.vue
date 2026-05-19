<template>
  <div class="collapse" :class="{ 'collapse--open': open }">
    <div class="collapse__inner">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, required: true },
})
</script>

<style scoped>
.collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.collapse--open {
  grid-template-rows: 1fr;
}

.collapse__inner {
  overflow: hidden;
}
</style>
