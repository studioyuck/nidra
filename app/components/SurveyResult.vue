<script setup>
import cardGroups from '~/data/cards.json'

defineProps({ results: Object })

const { isDay } = useTimeOfDay()

const cards = [...cardGroups.day, ...cardGroups.night]
const currentCard = ref(null)
const isDrawing = ref(false)
const hasDrawn = ref(false)

function getRandomCard() {
  return cards[Math.floor(Math.random() * cards.length)]
}

function drawCard() {
  if (isDrawing.value) return
  isDrawing.value = true
  hasDrawn.value = false

  const finalCard = getRandomCard()
  const delays = [
    18, 18, 20, 20, 22, 24, 26, 28, 30, 34,
    40, 50, 65, 85, 110, 140, 180, 230, 300, 380, 460
  ]
  let index = 0

  function tick() {
    const isFinalTick = index === delays.length
    currentCard.value = isFinalTick ? finalCard : getRandomCard()
    if (isFinalTick) {
      setTimeout(() => {
        isDrawing.value = false
        hasDrawn.value = true
      }, 350)
      return
    }
    setTimeout(tick, delays[index])
    index++
  }

  tick()
}
</script>

<template>
  <div class="result">
    <!-- Left: card -->
    <div class="result__left">
      <div class="result__card" :class="{ 'is-drawing': isDrawing }">
        <template v-if="hasDrawn && currentCard">
          <div class="ritual-card" :class="currentCard.group.toLowerCase()">
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
        </template>
        <template v-else>
          <img
            :src="isDay ? '/images/card-back-day.png' : '/images/card-back-night.png'"
            alt="Card"
            class="result__card-img"
          />
        </template>
      </div>
    </div>

    <!-- Right: title, button, content -->
    <div class="result__right">
      <h1 class="result__title">The Result?</h1>

      <button class="result__draw-btn txt-label" :disabled="isDrawing" @click="drawCard">
        {{ isDrawing ? 'Drawing...' : 'Draw Card' }}
      </button>

      <Transition name="fade" mode="out-in">
        <div v-if="hasDrawn && currentCard" key="card-info" class="result__card-text">
          <div class="result__card-block">
            <p class="result__card-label txt-label">Description</p>
            <p class="result__card-body">{{ currentCard.description }}</p>
          </div>
          <div class="result__divider" />
          <div class="result__card-block">
            <p class="result__card-label txt-label">Ritual</p>
            <p class="result__card-body">{{ currentCard.ritual }}</p>
          </div>
        </div>
        <div v-else key="result-text" class="result__text">
          <p>You're not a number.</p>
          <p>We won't give you a type, a colour, or a score. You are not data. You're a human being — tender, tired, radiant, real. And deep down, you already know: more connection is needed. Not the digital kind. The kind that comes from presence. From paying attention to your own life.</p>
          <p>Whether or not you buy a box, start a ritual, or change a single habit — remember this:</p>
          <p>You are not a statistic. You are someone whose time matters.</p>
          <p>Forget the result.</p>
          <p>Live. Connect. Begin again.</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 4rem var(--outer-padding) 6rem;
}

.result__left {
  display: flex;
  justify-content: center;
}

.result__right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 560px;
}

.result__title {
  font-family: Cloister, Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0;
}

.result__card {
  transition: transform 0.4s ease;
}

.result__card.is-drawing {
  transform: scale(0.93) rotate(-1deg);
}

.result__card-img {
  display: block;
  width: min(72vw, 280px);
  aspect-ratio: 62 / 100;
  object-fit: cover;
  border-radius: 1.5rem;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
}

.ritual-card {
  width: min(72vw, 280px);
  aspect-ratio: 62 / 100;
  border-radius: 1.5rem;
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

.result__card-text {
  display: grid;
  gap: 1.5rem;
  border-top: 1px solid var(--gold-10);
  padding-top: 1.5rem;
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

.result__text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--gold-10);
  padding-top: 1.5rem;
}

.result__text p {
  margin: 0;
  font-size: 22px;

}

@media (min-width: 768px) {
  .result {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    padding: 6rem var(--outer-padding) 8rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .result__left {
    flex-shrink: 0;
  }

  .result__card-img,
  .ritual-card {
    width: 280px;
  }

  .result__right {
    max-width: 480px;
  }

  .result__title {
    text-align: left;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
