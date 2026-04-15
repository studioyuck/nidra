<template>
  <div
    class="header"
    :class="[
      headerThemeClass,
      { 'header--scrolled': isScrolled }
    ]"
  >
   
   
   <MobileMenu
  :is-open="isMenuOpen"
  :links="navLinks"
  @close="isMenuOpen = false"
/>

    <div class="header-container">
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

      <div class="header-left">
<NuxtLink to="/" class="header-logo w-inline-block">
  <Logo :width="84" />
</NuxtLink>

<DesktopMenu :links="navLinks" />

      </div>

      <div class="header-right">
        <div class="header-link-wrap">
          <a href="#" class="cart-button w-inline-block" @click.prevent>
            <div class="txt-label w-inline-block">Cart</div>
          </a>

          <a
            href="#"
            class="menu-link m-hide w-inline-block"
            @click.prevent="isMenuOpen = true"
          >
            <div class="txt-label">MENU</div>

          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Altar Your Habits', to: '/altar-your-habits' },
  { label: 'About', to: '/about' },
  { label: 'Survey', to: '/survey' }
]

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