<script setup>
const { open } = useWaitingList()
const surveyActive = useState('surveyActive', () => false)
</script>

<template>
  <button
    class="wl-button txt-label"
    :class="{ 'wl-button--hidden': surveyActive }"
    @click="open"
  >
    Join Waiting List
    <img src="/images/pratika-animated.gif" alt="" class="wl-button__icon" />
  </button>
</template>

<style scoped>
.wl-button {
  position: relative;
  isolation: isolate;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: var(--silver);
  padding: 2px 15px;
  cursor: pointer;
  font-size: var(--font-sm);
  letter-spacing: 0.08em;
  transition: color 0.2s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  border-radius: 5px;
  margin: var(--outer-padding) 0 var(--outer-padding) 0;
}

.wl-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--midnight-blue);
  border-radius: 5px;
  filter: url('#rough');
  z-index: -1;
  transition: background 0.2s ease;
}

.wl-button--hidden {
  display: none;
}

@media (min-width: 768px) {
  .wl-button {
    position: fixed;
    bottom: var(--outer-padding);
    left: var(--outer-padding);
    z-index: 9000;
    margin: 0;
  }

  .wl-button--hidden {
    display: flex;
    transform: translateY(calc(100% + var(--outer-padding) + 4px));
  }
}

.wl-button:hover {
  color: var(--midnight-blue);
}

.wl-button:hover::before {
  background: var(--silver);
}

.wl-button__icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

</style>
