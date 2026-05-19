const DAY_START = 6   // 06:00
const DAY_END = 18    // 18:00

function computeTimeOfDay(): 'day' | 'night' {
  const hour = new Date().getHours()
  return hour >= DAY_START && hour < DAY_END ? 'day' : 'night'
}

export function useTimeOfDay() {
  const timeOfDay = useState<'day' | 'night'>('timeOfDay', () => computeTimeOfDay())

  // Only run the interval on the client
  if (import.meta.client) {
    const update = () => { timeOfDay.value = computeTimeOfDay() }

    // Re-check every minute so a page left open stays accurate
    const interval = setInterval(update, 60_000)
    onUnmounted(() => clearInterval(interval))
  }

  const isDay = computed(() => timeOfDay.value === 'day')
  const isNight = computed(() => timeOfDay.value === 'night')

  return { timeOfDay, isDay, isNight }
}
