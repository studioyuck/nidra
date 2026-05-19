export default defineNuxtPlugin(() => {
  const { timeOfDay } = useTimeOfDay()

  // Stamp the <html> element so CSS can use [data-time="day"] / [data-time="night"]
  watchEffect(() => {
    document.documentElement.setAttribute('data-time', timeOfDay.value)
  })
})
