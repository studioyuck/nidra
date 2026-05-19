<template>
  <div
    class="header"
    :class="[
      headerThemeClass,
      { 'header--scrolled': isScrolled || route.meta.headerSolid },
      { 'header--no-border': route.meta.headerSolid && !isScrolled }
    ]"
  >
    <MobileMenu
      :is-open="isMenuOpen"
      :links="allLinks"
      @close="isMenuOpen = false"
    />

    <div class="header-container">
      <!-- Hamburger — mobile only (hidden on desktop via .mobile-menu-wrap CSS) -->
      <div class="mobile-menu-wrap">
        <a
          href="#"
          class="menu-link w-inline-block"
          @click.prevent="isMenuOpen = true"
        >
          <div class="txt-label">MENU</div>
          <div class="menu-circle">
            <div class="icon-12 w-embed">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 4L12.5 4" stroke="CurrentColor" />
                <path d="M0.5 8L12.5 8" stroke="CurrentColor" />
              </svg>
            </div>
          </div>
        </a>
      </div>

      <!-- Left nav — desktop only -->
      <div class="header-left">
        <DesktopMenu :links="leftLinks" />
      </div>

      <NuxtLink to="/" class="header-logo w-inline-block">
        <Logo :width="84" />
      </NuxtLink>

      <!-- Right nav — desktop only -->
      <div class="header-right">
        <DesktopMenu :links="rightLinks" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const leftLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Altar Your Habits', to: '/altar-your-habits' }
]

const rightLinks = [
  { label: 'About', to: '/about' },
  { label: 'Survey', to: '/survey' }
]

const allLinks = [...leftLinks, ...rightLinks]

const headerThemeClass = computed(() => {
  return route.meta.headerTheme === 'light' ? 'header--light' : 'header--dark'
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    handleScroll()
  }
)
</script>