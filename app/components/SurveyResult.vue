<script setup>
import cardGroups from '~/data/cards.json'

defineProps({ results: Object })

const { isDay } = useTimeOfDay()

const availableCards = computed(() => isDay.value ? cardGroups.day : cardGroups.night)

const currentCard = ref(null)
const animState = ref('idle') // 'idle' | 'spinning' | 'revealed'
const hasDrawn = computed(() => animState.value === 'revealed')

function getRandomCard() {
  const pool = availableCards.value
  return pool[Math.floor(Math.random() * pool.length)]
}

function drawCard() {
  if (animState.value !== 'idle') return
  currentCard.value = getRandomCard()
  animState.value = 'spinning'
}

function onAnimationEnd() {
  animState.value = 'revealed'
}
</script>

<template>
  <div class="result">
    <h1 class="result__title" :class="{ 'is-hidden': hasDrawn }">The Result?</h1>

    <div class="result__body">
      <!-- Left: card -->
      <div class="result__left">
        <div class="result__card-wrapper">
          <div
            class="result__card-inner"
            :class="{
              'is-spinning': animState === 'spinning',
              'is-revealed': animState === 'revealed'
            }"
            @animationend.self="onAnimationEnd"
          >
            <div class="result__card-face result__card-face--front">
              <img
                :src="isDay ? '/images/card-back-day.png' : '/images/card-back-night.png'"
                alt="Card back"
                class="result__card-img"
              />
            </div>
            <div class="result__card-face result__card-face--back">
              <div v-if="currentCard" class="ritual-card" :class="currentCard.group.toLowerCase()">
                <img
                  :src="currentCard.symbol"
                  :alt="`${currentCard.word} symbol`"
                  class="card-symbol"
                />
                <div class="card-bottom">
                  <h2 class="card-word">
                    {{ currentCard.wordLower || currentCard.word.toLowerCase() }}
                  </h2>
                  <img
                    :src="`/images/card-symbols/${currentCard.group.toLowerCase()}.png`"
                    :alt="`${currentCard.group} symbol`"
                    class="card-group-symbol"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: stacked content — grid overlay keeps layout stable while fading -->
      <div class="result__right">
        <div class="result__content-stack">

          <!-- Pre-draw: button + result text. Fades out as a unit. -->
          <div class="result__pre-draw" :class="{ 'is-hidden': hasDrawn }">
            <button
              class="result__draw-btn txt-label"
              :disabled="animState !== 'idle'"
              @click="drawCard"
            >
              {{ animState === 'spinning' ? 'Drawing...' : 'Draw Card' }}
            </button>
            <div class="result__text">
              <p>You're not a number.</p>
              <p>We won't give you a type, a colour, or a score. You are not data. You're a human being — tender, tired, radiant, real. And deep down, you already know: more connection is needed. Not the digital kind. The kind that comes from presence. From paying attention to your own life.</p>
              <p>Whether or not you buy a box, start a ritual, or change a single habit — remember this:</p>
              <p>You are not a statistic. You are someone whose time matters.</p>
              <p>Forget the result.</p>
              <p>Live. Connect. Begin again.</p>
            </div>
          </div>

          <!-- Post-draw: card description + ritual. Fades in as a unit. -->
          <div
            class="result__card-text"
            :class="{ 'is-hidden': !hasDrawn || !currentCard }"
          >
            <div class="result__card-block">
              <p class="result__card-label txt-label">Description</p>
              <p class="result__card-body">{{ currentCard?.description }}</p>
            </div>
            <div class="result__divider" />
            <div class="result__card-block">
              <p class="result__card-label txt-label">Ritual</p>
              <p class="result__card-body">{{ currentCard?.ritual }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem var(--outer-padding) 6rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.result__title {
  font-family: Cloister, Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0;
  text-align: center;
  width: 100%;
  transition: opacity 0.6s ease;
}

.result__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
          justify-content: center;
}

.result__left {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

.result__right {
  width: 100%;
  max-width: 520px;
}

/* ── Grid stacking: both content blocks occupy the same cell ─────────────── */
.result__content-stack {
  display: grid;
}

.result__pre-draw,
.result__card-text {
  grid-area: 1 / 1;
  transition: opacity 0.45s ease;
  padding-top: 1.5rem;
}

.result__card-text {
  transition: opacity 0.45s ease 0.3s;
}

.result__card-text.is-hidden {
  transition-delay: 0s;
}

.is-hidden {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}

/* ── Pre-draw content ────────────────────────────────────────────────────── */
.result__pre-draw {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.result__text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result__text p {
  margin: 0;
  font-size: 22px;
}

/* ── Post-draw content ───────────────────────────────────────────────────── */
.result__card-text {
  display: grid;
  gap: 1.5rem;
      align-items: start;
    align-content: center;
}

.result__card-block {
  display: grid;
  gap: 0.5rem;
}

.result__card-label {
  margin: 0;
  color: var(--gold);
}

.result__card-body {
  margin: 0;
  font-size: 22px;
}

.result__divider {
  height: 1px;
  background: var(--gold-10);
}

/* ── Draw button ─────────────────────────────────────────────────────────── */
.result__draw-btn {
  align-self: flex-start;
  background: var(--midnight-blue);
  color: var(--silver);
  border: 1px solid var(--midnight-blue);
  padding: 14px 40px;
  cursor: pointer;
  font-size: 11px;
  letter-spacing: 0.12em;
  transition: background 0.2s ease, color 0.2s ease;
}

.result__draw-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.result__draw-btn:not(:disabled):hover {
  background: transparent;
  color: var(--midnight-blue);
}

/* ── 3D card flip ─────────────────────────────────────────────────────────── */
.result__card-wrapper {
  perspective: 1200px;
  width: min(72vw, 280px);
}

.result__card-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 62 / 100;
  transform-style: preserve-3d;
}

.result__card-inner.is-spinning {
  animation: card-draw-and-reveal 1.8s cubic-bezier(0.3, 0, 0.08, 1) forwards;
}

.result__card-inner.is-revealed {
  transform: rotateY(180deg);
}

.result__card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1.5rem;
  overflow: hidden;
}

.result__card-face--back {
  transform: rotateY(180deg);
}

@keyframes card-draw-and-reveal {
  0%   { transform: rotateY(0deg); }
  100% { transform: rotateY(1260deg); }
}

/* ── Card image / face content ───────────────────────────────────────────── */
.result__card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ritual-card {
  width: 100%;
  height: 100%;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
}

.ritual-card.day {
  background: var(--early-white);
  color: var(--sunlight);
}

.ritual-card.night {
  background: var(--midnight-blue);
  color: var(--moonlight);
}

.card-symbol {
  width: 56%;
  max-height: 38%;
  object-fit: contain;
  margin-top: 22%;
}

.card-bottom {
  display: grid;
  justify-items: center;
  gap: 1.75rem;
  width: 100%;
  margin-bottom: 1rem;
}

.card-word {
  margin: 0;
  font-size: clamp(2.25rem, 3vw, 3.5rem);
  line-height: 0.9;
  font-style: italic;
  font-weight: normal;
  text-transform: lowercase;
}

.card-group-symbol {
  width: 18%;
  min-width: 44px;
  object-fit: contain;
}

/* ── Desktop layout ──────────────────────────────────────────────────────── */
@media (min-width: 768px) {
  .result {
    padding: 6rem var(--outer-padding) 8rem;
    gap: 2.5rem;
  }

  .result__body {
    flex-direction: row;
    align-items: flex-start;
    gap: 3.5rem;
  }

  .result__card-wrapper {
    width: 280px;
  }

  .result__right {
    width: 440px;
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
