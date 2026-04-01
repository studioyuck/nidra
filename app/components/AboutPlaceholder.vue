<template>
<section class="section section--border">
  <div class="copy-02_container">
    <div class="image-tab w-tabs">
      <div class="image-tab-right w-tab-menu">
        <a
          href="#"
          class="image-tab-link w-inline-block w-tab-link"
          :class="{ 'w--current': activeTab === 'Tab 1' }"
          @click.prevent="activeTab = 'Tab 1'"
        >
          <img
            sizes="2000px"
            srcset="/images/orla12-p-500.webp 500w, /images/orla12-p-800.webp 800w, /images/orla12-p-1080.webp 1080w, /images/orla12-p-1600.webp 1600w, /images/orla12.webp 2000w"
            alt=""
            src="/images/orla12.webp"
            loading="lazy"
            class="image-tab-thumbnail"
          >
          <div class="txt-label image-tab-link">TAB 1</div>
        </a>

        <a
          href="#"
          class="image-tab-link w-inline-block w-tab-link"
          :class="{ 'w--current': activeTab === 'Tab 2' }"
          @click.prevent="activeTab = 'Tab 2'"
        >
          <img
            sizes="2000px"
            srcset="/images/orla10-p-500.webp 500w, /images/orla10-p-800.webp 800w, /images/orla10-p-1080.webp 1080w, /images/orla10-p-1600.webp 1600w, /images/orla10.webp 2000w"
            alt=""
            src="/images/orla10.webp"
            loading="lazy"
            class="image-tab-thumbnail"
          >
          <div class="txt-label image-tab-link">TAB 2</div>
        </a>

        <a
          href="#"
          class="image-tab-link w-inline-block w-tab-link"
          :class="{ 'w--current': activeTab === 'Tab 3' }"
          @click.prevent="activeTab = 'Tab 3'"
        >
          <img
            sizes="2000px"
            srcset="/images/orla14-p-500.webp 500w, /images/orla14-p-800.webp 800w, /images/orla14-p-1080.webp 1080w, /images/orla14-p-1600.webp 1600w, /images/orla14.webp 2000w"
            alt=""
            src="/images/orla14.webp"
            loading="lazy"
            class="image-tab-thumbnail"
          >
          <div class="txt-label image-tab-link">TAB 3</div>
        </a>
      </div>

      <div class="image-tab-left w-tab-content">
        <div
          v-show="activeTab === 'Tab 1'"
          class="image-tab-contents w-tab-pane"
          :class="{ 'w--tab-active': activeTab === 'Tab 1' }"
        >
          <div class="image-tab-inner">
            <div class="image-tab-inner-left">
              <img
                sizes="(max-width: 2000px) 100vw, 2000px, 100vw"
                srcset="/images/orla12-p-500.webp 500w, /images/orla12-p-800.webp 800w, /images/orla12-p-1080.webp 1080w, /images/orla12-p-1600.webp 1600w, /images/orla12.webp 2000w"
                alt=""
                src="/images/orla12.webp"
                loading="lazy"
                class="tab-img"
              >
            </div>
            <div class="image-tab-inner-right">
              <div class="txt-label image-tab-title">PLACEHOLDER</div>
              <div class="image-tab-text-group">
                <h1 class="txt-heading--1">Placeholder heading</h1>
                <p class="txt-body--large">Placeholder copy goes here for now. This section will be updated with final content later in the process.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="activeTab === 'Tab 2'"
          class="image-tab-contents w-tab-pane"
          :class="{ 'w--tab-active': activeTab === 'Tab 2' }"
        >
          <div class="image-tab-inner">
            <div class="image-tab-inner-left">
              <img
                sizes="(max-width: 2000px) 100vw, 2000px"
                srcset="/images/DTS_Sian_in_Jasper_by-Sian-Richardson_004-p-500.jpg 500w, /images/DTS_Sian_in_Jasper_by-Sian-Richardson_004-p-800.jpg 800w, /images/DTS_Sian_in_Jasper_by-Sian-Richardson_004-p-1080.jpg 1080w, /images/DTS_Sian_in_Jasper_by-Sian-Richardson_004-p-1600.jpg 1600w, /images/DTS_Sian_in_Jasper_by-Sian-Richardson_004.jpg 2000w"
                alt=""
                src="/images/DTS_Sian_in_Jasper_by-Sian-Richardson_004.jpg"
                loading="lazy"
                class="tab-img"
              >
            </div>
            <div class="image-tab-inner-right">
              <div class="txt-label image-tab-title">PLACEHOLDER</div>
              <div class="image-tab-text-group">
                <h1 class="txt-heading--1">Placeholder heading</h1>
                <p class="txt-body--large">Placeholder copy goes here for now. This section will be updated with final content later in the process.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="activeTab === 'Tab 3'"
          class="image-tab-contents w-tab-pane"
          :class="{ 'w--tab-active': activeTab === 'Tab 3' }"
        >
          <div class="image-tab-inner">
            <div class="image-tab-inner-left">
              <img
                sizes="(max-width: 2000px) 100vw, 2000px, 100vw"
                srcset="/images/orla14-p-500.webp 500w, /images/orla14-p-800.webp 800w, /images/orla14-p-1080.webp 1080w, /images/orla14-p-1600.webp 1600w, /images/orla14.webp 2000w"
                alt=""
                src="/images/orla14.webp"
                loading="lazy"
                class="tab-img"
              >
            </div>
            <div class="image-tab-inner-right">
              <div class="txt-label image-tab-title">PLACEHOLDER</div>
              <div class="image-tab-text-group">
                <h1 class="txt-heading--1">Placeholder heading</h1>
                <p class="txt-body--large">Placeholder copy goes here for now. This section will be updated with final content later in the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
const activeTab = ref('Tab 2')
</script>