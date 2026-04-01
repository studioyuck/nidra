<template>
  <div class="page--survey survey__wrapper" :style="themeVars">
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
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import survey from '~/data/survey.json'
import SurveyQuestion from './SurveyQuestion.vue'
import SurveyResult from './SurveyResult.vue'
import SurveyProgress from './SurveyProgress.vue'
import CategoryIntro from './CategoryIntro.vue'

const state = ref('nightIntro')
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
  return survey[currentSection.value].questions[questionIndex.value]
})

// local survey theme vars only
const themeVars = computed(() => {
  if (state.value === 'nightIntro' || state.value === 'nightQuestions') {
    return {
      '--shadow': '#2F324D',
      '--base': '#131627',
      '--bg': 'url("/images/bg-night.jpg")',
      '--primary': '#ACADB8',
      '--accent': '#C1E3F4'
    }
  }

  if (state.value === 'dayIntro' || state.value === 'dayQuestions') {
    return {
      '--shadow': '#EbE6DF',
      '--base': '#f4f2ef',
      '--bg': 'url("/images/bg-day.jpg")',
      '--primary': '#131627',
      '--accent': '#131627'
    }
  }

  if (
    state.value === 'ritualIntro' ||
    state.value === 'ritualQuestions' ||
    state.value === 'results'
  ) {
    return {
      '--shadow': '#E27D2D',
      '--base': '#f4f2ef',
      '--bg': 'url("/images/bg-mixed.jpg")',
      '--primary': '#EbE6DF',
      '--accent': '#EbE6DF'
    }
  }

  return {}
})

// navigation
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

// handle answered from SurveyQuestion
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
    setTimeout(() => {
      state.value = 'dayIntro'
    }, 400)
  } else if (section === 'day') {
    setTimeout(() => {
      state.value = 'ritualIntro'
    }, 400)
  } else {
    state.value = 'results'
  }
}

// progress
const progress = useState('progress', () => ({ current: 0, total: 0 }))

watch(
  [state, questionIndex],
  () => {
    const section = state.value.replace(/Intro|Questions/, '').toLowerCase()
    if (!survey[section]) return

    progress.value.total = survey[section].questions.length
    progress.value.current = state.value.endsWith('Intro')
      ? 0
      : questionIndex.value
  },
  { immediate: true }
)
</script>