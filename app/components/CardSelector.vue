<script setup>
import cardGroups from '~/data/cards.json'

const cards = [
  ...cardGroups.day,
  ...cardGroups.night
]

const currentCard = ref(cards[0])
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
  <section class="card-generator">
    <div
      class="ritual-card"
      :class="[
        currentCard.group.toLowerCase(),
        { 'is-drawing': isDrawing }
      ]"
    >
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

    <button class="draw-button" @click="drawCard">
      {{ isDrawing ? 'DRAWING...' : 'DRAW CARD' }}
    </button>

    <Transition name="fade">
      <div v-if="hasDrawn" class="card-text">
        <div class="text-block">
          <p class="text-label">Description</p>
          <p>{{ currentCard.description }}</p>
        </div>

        <div class="text-divider" />

        <div class="text-block">
          <p class="text-label">Ritual</p>
          <p>{{ currentCard.ritual }}</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.card-generator {
  display: grid;
  justify-items: center;
  gap: 2rem;
  padding: 5em;
  text-align: center;
}

.ritual-card {
  width: min(78vw, 320px);
  aspect-ratio: 62 / 100;

  border-radius: 2rem;
  padding: 2.5rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
  overflow: hidden;

  transition:
    transform 0.4s ease,
    background 0.4s ease,
    color 0.4s ease;

  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.ritual-card.day {
  background: var(--early-white);
  color: var(--sunlight);
}

.ritual-card.night {
  background: var(--midnight-blue);
  color: var(--moonlight);
}

.ritual-card.is-drawing {
  transform: scale(0.9) rotate(-0.75deg);
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

.draw-button {
  min-width: 260px;
  border: 1px solid var(--gold-10);
  background: var(--day-shadow);
  color: inherit;
  padding: 1rem 2rem;
  border-radius: 999px;
  cursor: pointer;

  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.draw-button:hover {
  transform: translateY(-2px);
}

.card-text {
  width: min(100%, 640px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 1.5rem;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
}

.text-block {
  display: grid;
  gap: 0.75rem;
}

.text-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color:var(--gold);
}

.text-block p {
  margin: 0;
}

.text-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}
</style>