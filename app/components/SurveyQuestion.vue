<template>
  <div class="q__wrapper">
    <ul v-if="isChoice" class="q__answers">
      <li v-for="(option, index) in question.options" :key="index">
        <button
          class="q__answers-button"
          :class="{ selected: isSelected(option) }"
          @click="handleClick(option)"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>

    <textarea
      v-else-if="isText"
      v-model="textAnswer"
      rows="5"
      class="q__text-input"
      @input="emit('answered', textAnswer)"
    />

    <div v-else-if="isContact" class="q__contact">
      <input
        v-model="contactName"
        type="text"
        class="q__contact-input"
        placeholder="Your name"
        autocomplete="name"
        @input="emit('answered', { name: contactName, email: contactEmail })"
      />
      <input
        v-model="contactEmail"
        type="email"
        class="q__contact-input"
        placeholder="your@email.com"
        autocomplete="email"
        @input="emit('answered', { name: contactName, email: contactEmail })"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: { type: Object, required: true },
  savedAnswer: { default: null }
})
const emit = defineEmits(['answered'])

// Restore multi-choice selections from saved pipe-separated string
const selectedOptions = ref(
  props.question.input_type === 'multi_choice' && props.savedAnswer
    ? String(props.savedAnswer).split('|').map(label => ({ label }))
    : []
)

// Restore single-choice selection
const lastSelected = ref(
  props.question.input_type === 'single_choice' && props.savedAnswer
    ? props.savedAnswer
    : null
)

const textAnswer = ref(
  props.question.input_type === 'text' ? (props.savedAnswer || '') : ''
)
const contactName = ref(
  props.question.input_type === 'contact' ? (props.savedAnswer?.name || '') : ''
)
const contactEmail = ref(
  props.question.input_type === 'contact' ? (props.savedAnswer?.email || '') : ''
)

const isMulti    = computed(() => props.question.input_type === 'multi_choice')
const isText     = computed(() => props.question.input_type === 'text')
const isContact  = computed(() => props.question.input_type === 'contact')
const isChoice   = computed(() => props.question.input_type === 'single_choice' || isMulti.value)

function handleClick(option) {
  if (!isMulti.value) {
    lastSelected.value = option.label
    emit('answered', option.label)
    return
  }
  const idx = selectedOptions.value.findIndex(o => o.label === option.label)
  if (idx > -1) {
    selectedOptions.value.splice(idx, 1)
  } else {
    selectedOptions.value.push(option)
  }
  emit('answered', selectedOptions.value.map(o => o.label))
}

function isSelected(option) {
  if (isMulti.value) return selectedOptions.value.some(o => o.label === option.label)
  return lastSelected.value === option.label
}
</script>

<style scoped>
.q__contact {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.q__contact-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(172, 173, 184, 0.3);
  padding: 10px 0;
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 17px;
  color: var(--primary);
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
}

.q__contact-input::placeholder {
  color: color-mix(in srgb, var(--primary) 35%, transparent);
}

.q__contact-input:focus {
  border-bottom-color: var(--primary);
}
</style>
