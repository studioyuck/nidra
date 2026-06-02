<template>
  <div class="page-in page--nav-padding">
    <section class="section section--border section--padding-large">
      <div class="copy-01_container">
        <div class="copy-01_text">

          <div class="home-intro">
            <h2 class="home-heading">Are you sleeping with your phone?</h2>
            <p class="home-subtitle">A 3 minute survey on rituals and<br>boundaries around our screens.</p>
          </div>

          <NuxtLink to="/survey" class="home-cta-btn">
            Start Survey
          </NuxtLink>

          <NidraSignoff />

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ headerTheme: 'dark', headerSolid: false })

useHead({ bodyAttrs: { class: 'page--home' } })
</script>

<style scoped>
.page-in {
  color: var(--midnight-blue);
}

.page-in :deep(p),
.page-in :deep(h1),
.page-in :deep(h2),
.page-in :deep(h3) {
  color: var(--midnight-blue);
}

.home-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.home-heading {
  font-family: Cloister, Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(2.2rem, 5vw, 3.75rem);
  line-height: 1;
  margin: 0;
  color: var(--midnight-blue);
}

.home-subtitle {
  margin: 0;
  font-family: Cloister, Georgia, serif;
  font-size: 22px;
  color: var(--midnight-blue);
  opacity: 0.65;
}


.home-cta-btn {
  display: inline-block;
  position: relative;
  isolation: isolate;
  padding: 14px 36px;
  border: none;
  background: transparent;
  color: var(--beige);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  transition: color 0.2s ease;
}

.home-cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--midnight-blue);
  border: 1px solid transparent;
  border-radius: 5px;
  filter: url('#rough');
  z-index: -1;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.home-cta-btn:hover {
  color: var(--midnight-blue);
}

.home-cta-btn:hover::before {
  background: transparent;
  border-color: var(--midnight-blue);
}
</style>
