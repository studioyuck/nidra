<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const symbolCount = 3
const screenPadding = 0.01
const minDistance = 260
const maxPlacementAttempts = 120
const symbolSize = 150

const svgList = [
  '/symbols/nidrasymbols__Awareness.svg',
  '/symbols/nidrasymbols__Balance.svg',
  '/symbols/nidrasymbols__Boredom.svg',
  '/symbols/nidrasymbols__Boundary.svg',
  '/symbols/nidrasymbols__Breath.svg',
  '/symbols/nidrasymbols__Change.svg',
  '/symbols/nidrasymbols__Chaos.svg',
  '/symbols/nidrasymbols__Choice.svg',
  '/symbols/nidrasymbols__Courage.svg',
  '/symbols/nidrasymbols__Create.svg',
  '/symbols/nidrasymbols__Dance.svg',
  '/symbols/nidrasymbols__Deception.svg',
  '/symbols/nidrasymbols__Desire.svg',
  '/symbols/nidrasymbols__Discern.svg',
  '/symbols/nidrasymbols__Discipline.svg',
  '/symbols/nidrasymbols__Dream.svg',
  '/symbols/nidrasymbols__Escape.svg',
  '/symbols/nidrasymbols__Focus.svg',
  '/symbols/nidrasymbols__Friendship.svg',
  '/symbols/nidrasymbols__Generosity.svg',
  '/symbols/nidrasymbols__Gratitude.svg',
  '/symbols/nidrasymbols__Hope.svg',
  '/symbols/nidrasymbols__Illusion.svg',
  '/symbols/nidrasymbols__Imagination.svg',
  '/symbols/nidrasymbols__Integrity.svg',
  '/symbols/nidrasymbols__Intuition.svg',
  '/symbols/nidrasymbols__Joy.svg',
  '/symbols/nidrasymbols__Listen.svg',
  '/symbols/nidrasymbols__Love_Day.svg',
  '/symbols/nidrasymbols__Love_Night.svg',
  '/symbols/nidrasymbols__Magic.svg',
  '/symbols/nidrasymbols__Miracle.svg',
  '/symbols/nidrasymbols__Move.svg',
  '/symbols/nidrasymbols__Mystery.svg',
  '/symbols/nidrasymbols__Nature.svg',
  '/symbols/nidrasymbols__Notice.svg',
  '/symbols/nidrasymbols__Nurture.svg',
  '/symbols/nidrasymbols__Passion.svg',
  '/symbols/nidrasymbols__Patience.svg',
  '/symbols/nidrasymbols__Perspective.svg',
  '/symbols/nidrasymbols__Play.svg',
  '/symbols/nidrasymbols__Presence.svg',
  '/symbols/nidrasymbols__Purpose.svg',
  '/symbols/nidrasymbols__Question.svg',
  '/symbols/nidrasymbols__Rebel.svg',
  '/symbols/nidrasymbols__Renewal.svg',
  '/symbols/nidrasymbols__Resistance.svg',
  '/symbols/nidrasymbols__Rest.svg',
  '/symbols/nidrasymbols__Risk.svg',
  '/symbols/nidrasymbols__Sacred.svg',
  '/symbols/nidrasymbols__Secret.svg',
  '/symbols/nidrasymbols__Simplicity.svg',
  '/symbols/nidrasymbols__Smile.svg',
  '/symbols/nidrasymbols__Solitude.svg',
  '/symbols/nidrasymbols__Space.svg',
  '/symbols/nidrasymbols__Spirit.svg',
  '/symbols/nidrasymbols__Strength.svg',
  '/symbols/nidrasymbols__Surprise.svg',
  '/symbols/nidrasymbols__Surrender.svg',
  '/symbols/nidrasymbols__Time.svg',
  '/symbols/nidrasymbols__Touch.svg',
  '/symbols/nidrasymbols__Transform.svg',
  '/symbols/nidrasymbols__Trust.svg',
  '/symbols/nidrasymbols__Truth.svg',
  '/symbols/nidrasymbols__Understand.svg',
  '/symbols/nidrasymbols__Union.svg',
  '/symbols/nidrasymbols__Unlearn.svg',
  '/symbols/nidrasymbols__Unravel.svg',
  '/symbols/nidrasymbols__Voice.svg',
  '/symbols/nidrasymbols__Warmth.svg'
]

const placedSymbols = ref([])

let animationFrame = null

const mouse = {
  targetX: 0,
  targetY: 0,
  currentX: 0,
  currentY: 0
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function distanceBetween(a, b) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

function getRandomSymbol() {
  return svgList[Math.floor(Math.random() * svgList.length)]
}

async function loadSVG(path) {
  const res = await fetch(path)
  let svg = await res.text()

  svg = svg.replace(
    '<svg',
    '<svg style="display:block;width:100%;height:100%;fill:currentColor;stroke:currentColor;color:var(--gold);"'
  )

  return svg
}

function getRandomPosition(existingSymbols = []) {
  const width = window.innerWidth
  const height = window.innerHeight

  const paddingX = width * screenPadding
  const paddingY = height * screenPadding

  const minX = paddingX
  const maxX = width - paddingX - symbolSize
  const minY = paddingY
  const maxY = height - paddingY - symbolSize

  for (let attempt = 0; attempt < maxPlacementAttempts; attempt++) {
    const candidate = {
      x: randomBetween(minX, Math.max(minX, maxX)),
      y: randomBetween(minY, Math.max(minY, maxY))
    }

    const tooClose = existingSymbols.some(symbol => {
      return distanceBetween(candidate, symbol) < minDistance
    })

    if (!tooClose) {
      return candidate
    }
  }

  return {
    x: randomBetween(minX, Math.max(minX, maxX)),
    y: randomBetween(minY, Math.max(minY, maxY))
  }
}

function updateMousePosition(event) {
  const width = window.innerWidth
  const height = window.innerHeight

  mouse.targetX = (event.clientX / width - 0.5) * 2
  mouse.targetY = (event.clientY / height - 0.5) * 2
}

function animateSymbols(time) {
  mouse.currentX += (mouse.targetX - mouse.currentX) * 0.035
  mouse.currentY += (mouse.targetY - mouse.currentY) * 0.035

  for (const symbol of placedSymbols.value) {
    const mouseX = mouse.currentX * symbol.mouseStrengthX
    const mouseY = mouse.currentY * symbol.mouseStrengthY

    const floatX = Math.sin(time * symbol.floatSpeedX + symbol.floatOffset) * symbol.floatAmountX
    const floatY = Math.cos(time * symbol.floatSpeedY + symbol.floatOffset) * symbol.floatAmountY

    symbol.driftX += (mouseX + floatX - symbol.driftX) * symbol.inertia
    symbol.driftY += (mouseY + floatY - symbol.driftY) * symbol.inertia
  }

  animationFrame = requestAnimationFrame(animateSymbols)
}

async function buildSymbols() {
  const items = []

  for (let i = 0; i < symbolCount; i++) {
    const svgPath = getRandomSymbol()
    const svgContent = await loadSVG(svgPath)
    const position = getRandomPosition(items)

    items.push({
      id: i,
      x: position.x,
      y: position.y,
      driftX: 0,
      driftY: 0,
      mouseStrengthX: randomBetween(50, 150),
      mouseStrengthY: randomBetween(50, 150),
      floatAmountX: randomBetween(2, 10),
      floatAmountY: randomBetween(2, 10),
      floatSpeedX: randomBetween(0.0003, 0.0007),
      floatSpeedY: randomBetween(0.0003, 0.0007),
      floatOffset: randomBetween(0, Math.PI * 2),
      inertia: randomBetween(0.5, 0.9),
      svg: svgContent
    })
  }

  placedSymbols.value = items
}

onMounted(async () => {
  await buildSymbols()
  window.addEventListener('mousemove', updateMousePosition)
  animationFrame = requestAnimationFrame(animateSymbols)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updateMousePosition)

  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="floating-symbols">
    <div
      v-for="symbol in placedSymbols"
      :key="symbol.id"
      class="floating-symbol"
      :style="{
        left: `${symbol.x}px`,
        top: `${symbol.y}px`,
        transform: `translate3d(${symbol.driftX}px, ${symbol.driftY}px, 0)`
      }"
      v-html="symbol.svg"
    />
  </div>
</template>

<style scoped>
.floating-symbol {
z-index:999;
  position: fixed;
  width: 120px;
  pointer-events: none;
  will-change: transform;
}
</style>