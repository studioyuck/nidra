<script setup lang="ts">
import { getProductBySlug } from '~/data/products'

definePageMeta({ headerTheme: 'dark' })

const route = useRoute()
const product = getProductBySlug(route.params.slug as string)

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const { open } = useWaitingList()

const detailsOpen = ref(false)
const specsOpen = ref(false)
</script>

<template>
  <div class="product-page">

    <!-- ── MOBILE: gallery on top ── -->
    <div class="product-mobile-gallery">
      <ScrollGallery :images="product.images" />
    </div>

    <!-- ── DESKTOP: two-column layout ── -->
    <div class="product-layout">

      <!-- Left: stacked images -->
      <div class="product-images">
        <div
          v-for="(src, i) in product.images"
          :key="i"
          class="product-image-item"
        >
          <NuxtImg
            :src="src"
            format="webp"
            quality="95"
            :loading="i === 0 ? 'eager' : 'lazy'"
            sizes="sm:100vw md:58vw lg:58vw"
            alt=""
            class="product-image"
          />
        </div>
      </div>

      <!-- Right: sticky product info -->
      <div class="product-info-wrap">
        <div class="product-info">

          <div class="product-info__header">
            <h1 class="product-info__name">{{ product.name }}</h1>
            <p class="product-info__tagline">{{ product.tagline }}</p>
          </div>

          <div class="product-info__price-row">
            <span class="product-info__price">{{ product.price }}</span>
            <span class="txt-label product-info__availability">Available soon</span>
          </div>

          <div class="product-info__rule" />

          <div class="product-info__description">
            <p v-for="(para, i) in product.description.split('\n\n')" :key="i">{{ para }}</p>
          </div>

          <div class="product-info__rule" />

          <!-- Details accordion -->
          <div class="product-info__accordion">
            <button
              class="product-info__accordion-trigger txt-label"
              :class="{ 'is-open': detailsOpen }"
              @click="detailsOpen = !detailsOpen"
            >
              Details
              <span class="product-info__accordion-icon">{{ detailsOpen ? '−' : '+' }}</span>
            </button>
            <CollapseTransition :open="detailsOpen">
              <ul class="product-info__details-list">
                <li v-for="(detail, i) in product.details" :key="i">{{ detail }}</li>
              </ul>
            </CollapseTransition>
          </div>

          <div class="product-info__rule" />

          <!-- Specifications accordion -->
          <div class="product-info__accordion">
            <button
              class="product-info__accordion-trigger txt-label"
              :class="{ 'is-open': specsOpen }"
              @click="specsOpen = !specsOpen"
            >
              Specifications
              <span class="product-info__accordion-icon">{{ specsOpen ? '−' : '+' }}</span>
            </button>
            <CollapseTransition :open="specsOpen">
              <table class="product-info__specs">
                <tbody>
                  <tr v-for="(spec, i) in product.specifications" :key="i">
                    <td class="product-info__spec-label txt-label">{{ spec.label }}</td>
                    <td class="product-info__spec-value">{{ spec.value }}</td>
                  </tr>
                </tbody>
              </table>
            </CollapseTransition>
          </div>

          <div class="product-info__rule" />

          <button class="product-info__cta txt-label" @click="open">
            Join the Waiting List
          </button>

        </div>
      </div>
    </div>

    <!-- Mobile: product info below gallery -->
    <div class="product-mobile-info">

      <div class="product-info__header">
        <div class="txt-label product-info__label">The Nidra Collection</div>
        <h1 class="product-info__name">{{ product.name }}</h1>
        <p class="product-info__tagline">{{ product.tagline }}</p>
      </div>

      <div class="product-info__price-row">
        <span class="product-info__price">{{ product.price }}</span>
        <span class="txt-label product-info__availability">Available soon</span>
      </div>

      <div class="product-info__rule" />

      <div class="product-info__description">
        <p v-for="(para, i) in product.description.split('\n\n')" :key="i">{{ para }}</p>
      </div>

      <div class="product-info__rule" />

      <div class="product-info__accordion">
        <button
          class="product-info__accordion-trigger txt-label"
          :class="{ 'is-open': detailsOpen }"
          @click="detailsOpen = !detailsOpen"
        >
          Details
          <span class="product-info__accordion-icon">{{ detailsOpen ? '−' : '+' }}</span>
        </button>
        <CollapseTransition :open="detailsOpen">
          <ul class="product-info__details-list">
            <li v-for="(detail, i) in product.details" :key="i">{{ detail }}</li>
          </ul>
        </CollapseTransition>
      </div>

      <div class="product-info__rule" />

      <div class="product-info__accordion">
        <button
          class="product-info__accordion-trigger txt-label"
          :class="{ 'is-open': specsOpen }"
          @click="specsOpen = !specsOpen"
        >
          Specifications
          <span class="product-info__accordion-icon">{{ specsOpen ? '−' : '+' }}</span>
        </button>
        <CollapseTransition :open="specsOpen">
          <table class="product-info__specs">
            <tbody>
              <tr v-for="(spec, i) in product.specifications" :key="i">
                <td class="product-info__spec-label txt-label">{{ spec.label }}</td>
                <td class="product-info__spec-value">{{ spec.value }}</td>
              </tr>
            </tbody>
          </table>
        </CollapseTransition>
      </div>

      <div class="product-info__rule" />

      <button class="product-info__cta txt-label" @click="open">
        Join the Waiting List
      </button>

    </div>

  </div>
</template>

<style scoped>
/* ── Page shell ── */
.product-page {
  color: var(--midnight-blue);
}

/* ── Mobile gallery: shown only on mobile ── */
.product-mobile-gallery {
  display: none;
  padding-top: 70px; /* clear fixed header */
}

/* ── Desktop two-column layout ── */
.product-layout {
  display: grid;
  grid-template-columns: 50% 50%;
}

/* Left: stacked images flush to viewport top */
.product-images {
  display: flex;
  flex-direction: column;
}

.product-image-item {
  width: 100%;
  overflow: hidden;
}


.product-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

/* Right: sticky info panel */
.product-info-wrap {
  position: relative;
}

.product-info {
  position: sticky;
  top: 70px;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  scrollbar-width: none;
  padding: var(--outer-padding);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.product-info::-webkit-scrollbar {
  display: none;
}

/* ── Mobile info panel: hidden on desktop ── */
.product-mobile-info {
  display: none;
  padding: var(--outer-padding);
  flex-direction: column;
}

/* ── Shared info styles ── */
.product-info__label {
  opacity: 0.5;
  margin-bottom: 12px;
  display: block;
}

.product-info__name {
  font-family: Cloister, Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(32px, 3.5vw, 48px);
  line-height: 1.1;
  margin: 0 0 10px;
}

.product-info__tagline {
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 14px;
  color: var(--b400);
  margin: 0;
  line-height: 1.5;
}

.product-info__header {
  margin-bottom: 28px;
}

.product-info__price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 28px;
}

.product-info__price {
  font-size: 1.5em;
  font-weight: 500;
  color: var(--midnight-blue);
}

.product-info__availability {
  opacity: 0.45;
}

.product-info__rule {
  border: none;
  border-top: 1px solid var(--gold-10);
  margin: 0 0 24px;
}

.product-info__description {
  margin-bottom: 24px;
}

.product-info__description p {
  margin: 0 0 12px;
}

.product-info__description p:last-child {
  margin-bottom: 0;
}

/* Accordions */
.product-info__accordion {
  margin-bottom: 24px;
}

.product-info__accordion-trigger {
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  color: var(--midnight-blue);
  font-size: 11px;
  letter-spacing: 0.08em;
  margin-bottom: 0;
}

.product-info__accordion-icon {
  font-size: 16px;
  line-height: 1;
}

.product-info__details-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-info__details-list li {
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding-left: 14px;
  position: relative;
}

.product-info__details-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--b300);
  font-size: 10px;
  top: 2px;
}

.product-info__specs {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.product-info__spec-label,
.product-info__spec-value {
  padding: 8px 0;
  border-bottom: 1px solid var(--gold-10);
  font-size: 12px;
  vertical-align: top;
}

.product-info__spec-label {
  color: var(--b400);
  width: 44%;
  letter-spacing: 0.06em;
}

.product-info__spec-value {
  font-family: Bdogrotesk Vf, Arial, sans-serif;
  color: var(--midnight-blue);
}

/* CTA button */
.product-info__cta {
  width: 100%;
  background: var(--midnight-blue);
  color: var(--silver);
  border: 1px solid var(--midnight-blue);
  padding: 18px 24px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.1em;
  transition: background 0.2s ease, color 0.2s ease;
  margin-top: 8px;
}

.product-info__cta:hover {
  background: transparent;
  color: var(--midnight-blue);
}

/* ── Responsive ── */
@media screen and (max-width: 991px) {
  .product-layout {
    display: none;
  }

  .product-mobile-gallery {
    display: block;
  }

  .product-mobile-info {
    display: flex;
  }
}
</style>
