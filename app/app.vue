<template>
  <div class="app-shell">
    <!-- Hand-drawn border filter — referenced as url('#rough') in CSS -->
    <svg width="0" height="0" style="position:absolute">
      <defs>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>

    <!-- <FloatingSymbols /> -->
    <Header />
    <div class="app-shell__content">
      <NuxtPage :transition="pageTransition" />
    </div>
    <Footer />
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
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.app-shell__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

@media (max-width: 767px) {
  .app-shell__content {
    padding-bottom: 160px;
  }
}
</style>
