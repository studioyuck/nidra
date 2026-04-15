<script setup>
defineProps({
  links: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="header-link-wrap only-pc">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="header-link w-inline-block"
    >
      <div class="txt-label">{{ link.label.toUpperCase() }}</div>
      <div class="line-line" />
    </NuxtLink>
  </div>
</template>