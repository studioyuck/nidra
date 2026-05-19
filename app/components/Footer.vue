<script setup lang="ts">
const now = ref(new Date())
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => { now.value = new Date() }, 1000)
})

onUnmounted(() => clearInterval(interval))

const formattedDateTime = computed(() => {
  return now.value.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
})

const { timeOfDay } = useTimeOfDay()
</script>

<template>
  <div class="footer">
    <div class="footer-inner">

      <div class="footer-top">
        <div class="footer-brand">
          <NuxtLink to="/" class="w-inline-block">
            <img
              src="/images/Wordmark-silver.svg"
              loading="lazy"
              alt=""
              class="header-logo-img"
            >
          </NuxtLink>
          <p class="footer-tagline">Put your phone to bed.</p>
        </div>

        <div class="footer-nav">
          <div class="footer-link-group">
            <NuxtLink to="/shop" class="footer-link w-inline-block">
              <div class="txt-label">SHOP</div>
            </NuxtLink>
            <NuxtLink to="/altar-your-habits" class="footer-link w-inline-block">
              <div class="txt-label">ALTAR YOUR HABITS</div>
            </NuxtLink>
            <NuxtLink to="/about" class="footer-link w-inline-block">
              <div class="txt-label">ABOUT</div>
            </NuxtLink>
          </div>

          <div class="footer-link-group">
            <NuxtLink to="/shipping-and-returns" class="footer-link w-inline-block">
              <div class="txt-label">SHIPPING &amp; RETURNS</div>
            </NuxtLink>
            <NuxtLink to="/faq" class="footer-link w-inline-block">
              <div class="txt-label">FAQ</div>
            </NuxtLink>
            <NuxtLink to="/contact" class="footer-link w-inline-block">
              <div class="txt-label">CONTACT</div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="txt-label">© NIDRA 2026, ALL RIGHT RESERVED</div>
        <div class="footer-clock txt-label">
          {{ formattedDateTime }} · {{ timeOfDay.toUpperCase() }}
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: var(--night-shadow);
  color: var(--silver);
}

.footer-inner {
  padding: 72px var(--outer-padding) 0;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 56px;
  gap: 48px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-tagline {
  margin: 0;
  font-style: italic;
  opacity: 0.6;
}

.footer-nav {
  display: flex;
  gap: 64px;
}

.footer-link-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 90px;
  gap: 16px;
}

.footer-clock {
  opacity: 0.4;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .footer-inner {
    padding: 56px var(--outer-padding) 0;
  }

  .footer-top {
    flex-direction: column;
    padding-bottom: 40px;
  }

  .footer-nav {
    gap: 40px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding-bottom: 100px;
  }
}
</style>
