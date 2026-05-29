<script setup>
definePageMeta({ headerTheme: 'light' })

const route = useRoute()
const initialState = route.query.preview === 'results' ? 'results' : 'start'
</script>

<template>
  <Survey :initial-state="initialState" />
</template>
