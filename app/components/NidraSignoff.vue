<template>
  <div class="nidra-signoff">
    <span class="nidra-signoff__tagline" v-html="taglineSvg" />
    <span class="nidra-signoff__pratika" v-html="pratikaSvg" />
  </div>
</template>

<script setup>
const taglineSvg = ref('')
const pratikaSvg = ref('')

function makeCurrentColor(svg) {
  return svg
    // Replace any hardcoded hex fill (but leave fill="none" intact)
    .replace(/fill="(?!none")[^"]+"/g, 'fill="currentColor"')
    // Replace fill inside <style> blocks
    .replace(/fill:\s*#[0-9a-fA-F]{3,6}/g, 'fill:currentColor')
}

onMounted(async () => {
  try {
    const [t, p] = await Promise.all([
      fetch('/images/tagline.svg').then(r => r.text()),
      fetch('/images/Pratika-light.svg').then(r => r.text())
    ])
    taglineSvg.value = makeCurrentColor(t)
    pratikaSvg.value = makeCurrentColor(p)
  } catch {}
})
</script>

<style scoped>
.nidra-signoff {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding-top: 2rem;
}

.nidra-signoff__tagline :deep(svg) {
  display: block;
  width: 260px;
  height: auto;
  fill: currentColor;
}

.nidra-signoff__pratika :deep(svg) {
  display: block;
  width: 60px;
  height: auto;
  fill: currentColor;
}

@media (max-width: 767px) {
  .nidra-signoff__tagline :deep(svg) {
    width: 260px;
  }

  .nidra-signoff__pratika :deep(svg) {
    width: 60px;
  }
}
</style>
