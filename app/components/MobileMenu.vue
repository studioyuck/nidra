<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  links: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="isOpen"
    class="mobile-menu"
    @click="emit('close')"
  >
    <div class="mobile-menu__left" />

    <div class="mobile-menu__right">
      <div class="mobile-menu__links">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="mobile-menu__link w-inline-block"
          @click.stop="emit('close')"
        >
          <div class="mobile-menu__text">{{ link.label }}</div>
        </NuxtLink>
      </div>

      <div class="mobile-menu__footer">
        © NIDRA, 2026
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-menu {
  z-index: 9999;
  background-color: var(--night-shadow);
  color: var(--silver);
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: fixed;
  inset: 0;
}

.mobile-menu__left {
  text-align: center;
  background-image: url('/images/DTS_Sian_in_Jasper_by-Sian-Richardson_004.jpg');
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 40px;
  display: flex;
}

.mobile-menu__right {
  color: var(--silver);
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
}

.mobile-menu__links {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.mobile-menu__link {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 54px;
  text-decoration: none;
  display: flex;
  overflow: hidden;
  color: var(--silver);
}

.mobile-menu__link:hover {
  color: var(--moonlight);
}

.mobile-menu__text {
  font-size: 54px;
  line-height: 1em;
}

.mobile-menu__footer {
  position: absolute;
  bottom: 40px;
  color: var(--silver);
  letter-spacing: -.005em;
  text-transform: uppercase;
  margin: 0;
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
}

@media screen and (max-width: 767px) {
  .mobile-menu {
    grid-template-columns: 1fr;
  }

  .mobile-menu__left {
    display: none;
  }

  .mobile-menu__right {
    grid-column: 1;
    width: 100%;
    padding: 0 24px;
  }

  .mobile-menu__links {
    width: 100%;
  }

  .mobile-menu__link {
    height: auto;
    min-height: 48px;
  }

  .mobile-menu__text {
    text-align: center;
  }

  .mobile-menu__footer {
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
  }
}
</style>