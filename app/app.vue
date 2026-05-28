<template>
  <div class="app-shell">
    <!-- <FloatingSymbols /> -->
    <Header />
    <div class="app-shell__content">
      <NuxtPage :transition="pageTransition" />
    </div>
    <Footer />
    <WaitingListButton />
    <WaitingListModal />
  </div>
</template>

<script setup>
const router = useRouter()
const prevPath = ref('')

router.beforeEach((to, from) => {
  prevPath.value = from.path
})

const pageTransition = computed(() =>
  prevPath.value === '/survey'
    ? { name: 'survey-exit', duration: 250 }
    : { name: 'page' }
)
</script>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-shell__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
