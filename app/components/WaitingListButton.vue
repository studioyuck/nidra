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
  position: fixed;
  bottom: var(--outer-padding);
  left: var(--outer-padding);
  z-index: 9000;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--midnight-blue);
  color: var(--silver);
  padding: 2px 15px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.08em;
  transition: background 0.2s ease, color 0.2s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}

.wl-button--hidden {
  transform: translateY(calc(100% + var(--outer-padding) + 4px));
}

.wl-button:hover {
  background: var(--silver);
  color: var(--midnight-blue);
}

.wl-button__icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}
</style>
