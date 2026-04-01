<template>
  <div
    class="header"
    :class="[
      headerThemeClass,
      { 'header--scrolled': isScrolled }
    ]"
  >
    <div v-if="isMenuOpen" class="menu">
      <div class="menu-header">
<NuxtLink to="/" class="header-logo w-inline-block">
  <Logo />
</NuxtLink>

        <a
          href="#"
          class="close-link w-inline-block"
          @click.prevent="isMenuOpen = false"
        >
          <div class="txt-label dark">close</div>
          <div class="menu-circle dark">
            <div class="icon-12 w-embed">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.75 1.75L10.25 10.25" stroke="CurrentColor" />
                <path d="M1.75 10.25L10.25 1.75" stroke="CurrentColor" />
              </svg>
            </div>
          </div>
        </a>
      </div>

      <div id="w-node-_98e15297-5795-6f48-15d1-643952716781-52716777" class="menu-left" />
      <div id="w-node-_98e15297-5795-6f48-15d1-643952716785-52716777" class="menu-right">
        <div class="menu-link-wrap">
          <NuxtLink to="/shop" class="menu-link-text w-inline-block" @click="isMenuOpen = false">
            <div class="menu-text">Shop</div>
          </NuxtLink>

          <NuxtLink to="/altar-your-habits" class="menu-link-text w-inline-block" @click="isMenuOpen = false">
            <div class="menu-text">Altar Your Habits</div>
          </NuxtLink>

          <NuxtLink to="/about" class="menu-link-text w-inline-block" @click="isMenuOpen = false">
            <div class="menu-text">About</div>
          </NuxtLink>

          <NuxtLink to="/survey" class="menu-link-text w-inline-block" @click="isMenuOpen = false">
            <div class="menu-text">Survey</div>
          </NuxtLink>
        </div>

        <div class="menu-right-label">
          <div class="txt-label">© NIDRA, 2026</div>
        </div>
      </div>
    </div>

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

        <div class="header-link-wrap only-pc">
          <NuxtLink to="/shop" class="header-link w-inline-block">
            <div class="txt-label">SHOP</div>
            <div class="line-line" />
          </NuxtLink>

          <NuxtLink to="/altar-your-habits" class="header-link w-inline-block">
            <div class="txt-label">ALTAR YOUR HABITS</div>
            <div class="line-line" />
          </NuxtLink>

          <NuxtLink to="/about" class="header-link w-inline-block">
            <div class="txt-label">ABOUT</div>
            <div class="line-line" />
          </NuxtLink>

          <NuxtLink to="/survey" class="header-link w-inline-block">
            <div class="txt-label">SURVEY</div>
            <div class="line-line" />
          </NuxtLink>
        </div>
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