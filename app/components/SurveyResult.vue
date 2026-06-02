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

    <!-- Intro text: sits above card on mobile, hidden on desktop (shown inside right col) -->
    <div class="result__intro result__intro--mobile" :class="{ 'is-hidden': hasDrawn }">
      <p>Your relationship with your phone isn't a problem to be measured — it's a life to be lived, beautifully.<br><br>
      Please take as a gift, our first Nidra offering!</p>
    </div>

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

          <!-- Pre-draw content: fades out as a unit -->
          <div class="result__pre-draw" :class="{ 'is-hidden': hasDrawn }">

            <!-- Intro text: desktop only (mobile version sits above card) -->
            <p class="result__intro result__intro--desktop">
              Your relationship with your phone isn't a problem to be measured — it's a life to be lived, beautifully.<br><br>
              Please take as a gift, our first Nidra offering!
            </p>

            <button
              class="result__draw-btn txt-label"
              :disabled="animState !== 'idle'"
              @click="drawCard"
            >
              {{ animState === 'spinning' ? 'Drawing...' : 'Draw Card' }}
            </button>

            <p class="result__cta-text">
              Ritual brings us back to our senses, one small act at a time.<br><br>
              Is it time to altar your habits?
            </p>

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

    <NidraSignoff class="result__signoff" />

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

@media (min-width: 768px) {
  .result__right {
    width: 580px;
    max-width: 580px;
  }
}

/* ── Grid stacking: both content blocks occupy the same cell ─────────────── */
.result__content-stack {
  display: grid;
}

.result__pre-draw,
.result__card-text {
  grid-area: 1 / 1;
  transition: opacity 0.45s ease;
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

/* ── Intro text visibility ───────────────────────────────────────────────── */
.result__intro {
  margin: 0;
  font-size: 22px;
}

/* Mobile: shown above card (natural DOM position), hidden inside right col */
.result__intro--desktop { display: none; }
.result__intro--mobile  { display: block; text-align: center; max-width: 560px; }

/* ── Pre-draw content ────────────────────────────────────────────────────── */
.result__pre-draw {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.result__cta-text {
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
  position: relative;
  isolation: isolate;
  align-self: flex-start;
  background: transparent;
  color: var(--silver);
  border: none;
  padding: 14px 40px;
  cursor: pointer;
  font-size: 11px;
  letter-spacing: 0.12em;
  transition: color 0.2s ease;
}

.result__draw-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--midnight-blue);
  border-radius: 5px;
  filter: url('#rough');
  z-index: -1;
  transition: background 0.2s ease;
}

.result__draw-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.result__draw-btn:not(:disabled):hover {
  color: var(--midnight-blue);
}

.result__draw-btn:not(:disabled):hover::before {
  background: var(--silver);
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

.result__signoff {
  margin-top: 3rem;
  opacity: 0.7;
}

/* ── Mobile layout ───────────────────────────────────────────────────────── */
@media (max-width: 767px) {
  .result__right {
    width: 100%;
    text-align: center;
  }

  .result__pre-draw {
    align-items: center;
  }

  .result__draw-btn {
    width: min(72vw, 280px);
    align-self: center;
    padding: 14px 0;
    text-align: center;
  }

  .result__cta-text {
    text-align: center;
  }

  .result__card-text {
    align-items: center;
    text-align: center;
  }

  .result__card-label {
    text-align: center;
  }
}

/* ── Desktop layout ──────────────────────────────────────────────────────── */
@media (min-width: 768px) {
  .result {
    padding: 6rem var(--outer-padding) 8rem;
    gap: 2.5rem;
  }

  .result__body {
    flex-direction: row;
    align-items: center;
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

  /* Desktop: show intro inside right column, hide the one above card */
  .result__intro--desktop { display: block; }
  .result__intro--mobile  { display: none; }
}
</style>
