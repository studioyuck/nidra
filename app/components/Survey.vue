<template>
  <div class="page--survey survey__wrapper" :style="themeVars">

    <!-- Background image layer — cross-fades independently of content -->
    <Transition name="survey-bg">
      <div :key="bgKey" class="survey__bg" :style="{ backgroundImage: `url('${currentBgImage}')` }" />
    </Transition>

    <!-- Content sits above the bg layer -->
    <div class="survey__content">
    <transition name="fade-slide" mode="out-in">
      <!-- Night Intro -->
      <CategoryIntro
        v-if="state === 'nightIntro'"
        :title="survey.night.title"
        :description="survey.night.description"
        @continue="startNight"
      />

      <!-- Night Questions -->
      <div
        v-else-if="state === 'nightQuestions'"
        :key="'night-' + questionIndex"
        class="survey__question"
      >
        <div class="heading q__header">
          {{ currentQuestion.question }}
        </div>
        <SurveyQuestion
          :question="currentQuestion"
          @answered="onAnswered"
        />
        <button
          v-if="currentQuestion.input_type !== 'single_choice'"
          :disabled="lastPoints === null"
          class="q__answers-button q__answers-button--continue"
          @click="submitAnswer('night')"
        >
          Continue
        </button>
      </div>

      <!-- Day Intro -->
      <CategoryIntro
        v-else-if="state === 'dayIntro'"
        :title="survey.day.title"
        :description="survey.day.description"
        @continue="startDay"
      />

      <!-- Day Questions -->
      <div
        v-else-if="state === 'dayQuestions'"
        :key="'day-' + questionIndex"
        class="survey__question"
      >
        <div class="heading q__header">
          {{ currentQuestion.question }}
        </div>
        <SurveyQuestion
          :question="currentQuestion"
          @answered="onAnswered"
        />
        <button
          v-if="currentQuestion.input_type !== 'single_choice'"
          :disabled="lastPoints === null"
          class="q__answers-button q__answers-button--continue"
          @click="submitAnswer('day')"
        >
          Continue
        </button>
      </div>

      <!-- Ritual Intro -->
      <CategoryIntro
        v-else-if="state === 'ritualIntro'"
        :title="survey.ritual.title"
        :description="survey.ritual.description"
        @continue="startRitual"
      />

      <!-- Ritual Questions -->
      <div
        v-else-if="state === 'ritualQuestions'"
        :key="'ritual-' + questionIndex"
        class="survey__question"
      >
        <div class="heading q__header">
          {{ currentQuestion.question }}
        </div>
        <SurveyQuestion
          :question="currentQuestion"
          @answered="onAnswered"
        />
        <button
          v-if="currentQuestion.input_type !== 'single_choice'"
          :disabled="lastPoints === null"
          class="q__answers-button q__answers-button--continue"
          @click="submitAnswer('ritual')"
        >
          Continue
        </button>
      </div>

      <!-- Results -->
      <SurveyResult
        v-else-if="state === 'results'"
        :results="results"
      />
    </transition>
    </div><!-- /survey__content -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import survey from '~/data/survey.json'
import SurveyQuestion from './SurveyQuestion.vue'
import SurveyResult from './SurveyResult.vue'
import SurveyProgress from './SurveyProgress.vue'
import CategoryIntro from './CategoryIntro.vue'

const props = defineProps({
  initialState: { type: String, default: 'nightIntro' }
})

const state = ref(props.initialState)
const questionIndex = ref(0)
const results = reactive({})
const lastPoints = ref(null)

const musicEnabled = useState('music', () => false)

// compute section and current question
const currentSection = computed(() => {
  if (state.value.endsWith('Intro')) return state.value.replace('Intro', '').toLowerCase()
  if (state.value.endsWith('Questions')) return state.value.replace('Questions', '').toLowerCase()
  return ''
})

const currentQuestion = computed(() => {
  return survey[currentSection.value]?.questions[questionIndex.value]
})

// ── Theme sequencing ────────────────────────────────────────────────────────
// themeState lags behind state by the leave-transition duration so the
// background only starts changing after the content has faded out.
const LEAVE_MS = 350
const themeState = ref(props.initialState)
let themeTimer: ReturnType<typeof setTimeout>
let sectionTimer: ReturnType<typeof setTimeout>

watch(state, (newState) => {
  clearTimeout(themeTimer)
  themeTimer = setTimeout(() => { themeState.value = newState }, LEAVE_MS)
})

onUnmounted(() => {
  clearTimeout(themeTimer)
  clearTimeout(sectionTimer)
})

function themeFor(s) {
  if (s === 'nightIntro' || s === 'nightQuestions') {
    return { '--shadow': '#2F324D', '--base': '#131627', '--primary': '#ACADB8', '--accent': '#C1E3F4' }
  }
  if (s === 'dayIntro' || s === 'dayQuestions') {
    return { '--shadow': '#EbE6DF', '--base': '#f4f2ef', '--primary': '#131627', '--accent': '#131627' }
  }
  return { '--shadow': '#E27D2D', '--base': '#f4f2ef', '--primary': '#EbE6DF', '--accent': '#EbE6DF' }
}

const themeVars = computed(() => themeFor(themeState.value))

const bgKey = computed(() => {
  if (themeState.value === 'nightIntro' || themeState.value === 'nightQuestions') return 'night'
  if (themeState.value === 'dayIntro' || themeState.value === 'dayQuestions') return 'day'
  return 'ritual'
})

const currentBgImage = computed(() => {
  if (bgKey.value === 'night') return '/images/bg-night.jpg'
  if (bgKey.value === 'day') return '/images/bg-day.jpg'
  return '/images/bg-mixed.jpg'
})

// ── Navigation ──────────────────────────────────────────────────────────────
function startNight() {
  questionIndex.value = 0
  progress.value.current = 0
  state.value = 'nightQuestions'
}

function startDay() {
  questionIndex.value = 0
  progress.value.current = 0
  state.value = 'dayQuestions'
}

function startRitual() {
  questionIndex.value = 0
  progress.value.current = 0
  state.value = 'ritualQuestions'
}

function onAnswered(points) {
  lastPoints.value = points
  if (currentQuestion.value.input_type === 'single_choice') {
    submitAnswer(currentSection.value)
  }
}

function submitAnswer(section) {
  const pts = lastPoints.value || 0
  if (!results[section]) results[section] = 0
  results[section] += pts
  lastPoints.value = null

  const isLast = questionIndex.value >= survey[section].questions.length - 1
  progress.value.current = survey[section].questions.length

  if (!isLast) {
    questionIndex.value++
  } else if (section === 'night') {
    sectionTimer = setTimeout(() => { state.value = 'dayIntro' }, 400)
  } else if (section === 'day') {
    sectionTimer = setTimeout(() => { state.value = 'ritualIntro' }, 400)
  } else {
    state.value = 'results'
  }
}

// ── Arrow-key navigation (for testing) ─────────────────────────────────────
function goForward() {
  const s = state.value
  if (s === 'nightIntro') return startNight()
  if (s === 'nightQuestions') return submitAnswer('night')
  if (s === 'dayIntro') return startDay()
  if (s === 'dayQuestions') return submitAnswer('day')
  if (s === 'ritualIntro') return startRitual()
  if (s === 'ritualQuestions') return submitAnswer('ritual')
}

function goBack() {
  const s = state.value
  const qi = questionIndex.value

  if (s === 'nightIntro') return
  if (s === 'nightQuestions' && qi > 0) { questionIndex.value--; return }
  if (s === 'nightQuestions') { state.value = 'nightIntro'; return }
  if (s === 'dayIntro') { state.value = 'nightQuestions'; questionIndex.value = survey.night.questions.length - 1; return }
  if (s === 'dayQuestions' && qi > 0) { questionIndex.value--; return }
  if (s === 'dayQuestions') { state.value = 'dayIntro'; return }
  if (s === 'ritualIntro') { state.value = 'dayQuestions'; questionIndex.value = survey.day.questions.length - 1; return }
  if (s === 'ritualQuestions' && qi > 0) { questionIndex.value--; return }
  if (s === 'ritualQuestions') { state.value = 'ritualIntro'; return }
  if (s === 'results') { state.value = 'ritualQuestions'; questionIndex.value = survey.ritual.questions.length - 1 }
}

function onKeydown(e) {
  if (e.key === 'ArrowRight') goForward()
  if (e.key === 'ArrowLeft') goBack()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

// ── Progress ────────────────────────────────────────────────────────────────
const progress = useState('progress', () => ({ current: 0, total: 0 }))

watch(
  [state, questionIndex],
  () => {
    const section = state.value.replace(/Intro|Questions/, '').toLowerCase()
    if (!survey[section]) return

    progress.value.total = survey[section].questions.length
    progress.value.current = state.value.endsWith('Intro') ? 0 : questionIndex.value
  },
  { immediate: true }
)
</script>