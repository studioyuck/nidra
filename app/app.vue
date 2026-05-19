<template>
  <div class="app-shell">
    <!-- <FloatingSymbols /> -->
    <Header />
    <div class="app-shell__content">
      <NuxtPage />
    </div>
    <Footer />
    <WaitingListButton />
    <WaitingListModal />
  </div>
</template>

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
}
</style>
