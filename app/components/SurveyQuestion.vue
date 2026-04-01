<template>
  <div class="q__wrapper">
    <ul v-if="!isText" class="q__answers">
      <li v-for="(option, index) in question.options" :key="index">
        <button
          @click="handleClick(option)"
          class="q__answers-button"
          :class="isMulti ? { selected: isSelected(option) } : ''"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>

    <textarea
      v-if="isText"
      v-model="textAnswer"
      rows="5"
      class="q__text-input"
      @input="onTextInput"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['answered'])

const selectedOptions = ref([])
const textAnswer = ref('')

const isMulti = computed(() => props.question.input_type === 'multi_choice')
const isText  = computed(() => props.question.input_type === 'text')

function handleClick(option) {
  if (props.question.input_type === 'single_choice') {
    emit('answered', option.points)
    return
  }
  // multi-choice toggle
  const idx = selectedOptions.value.findIndex(o => o.label === option.label)
  if (idx > -1) {
    selectedOptions.value.splice(idx, 1)
  } else {
    selectedOptions.value.push(option)
  }
  const sumPoints = selectedOptions.value.reduce((sum, o) => sum + o.points, 0)
  emit('answered', sumPoints)
}

function isSelected(option) {
  return selectedOptions.value.some(o => o.label === option.label)
}

function onTextInput() {
  // emit zero points so parent can enable continue button
  emit('answered', 0)
}
</script>

<style scoped>

</style>