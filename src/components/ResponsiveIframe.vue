<template>
  <div class="iframe-container">
    <iframe
      :src="src"
      scrolling="no"
      ref="iframe"
      @load="onIframeLoad"
    ></iframe>
    <q-inner-loading color="primary" class="bg-white" :showing="loading" />
  </div>
</template>

<script>
export default {
  name: "ResponsiveIframe",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true, // Preloader active by default
    };
  },
  mounted() {
    this.resizeIframe();
    window.addEventListener("resize", this.resizeIframe);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeIframe);
  },
  methods: {
    resizeIframe(retry = true) {
      try {
        const container = this.$el;
        const iframe = this.$refs.iframe;
        const parentWidth = container.offsetWidth;

        // Original dimensions of iframe
        const originalWidth = 1440;
        const originalHeight = 792;

        // Calculate scale factor
        const scale = parentWidth / originalWidth;

        // Apply scale transformation
        iframe.style.transform = `scale(${scale})`;
        iframe.style.transformOrigin = "top left";

        // Dynamically set container height to maintain aspect ratio
        container.style.height = `${originalHeight * scale}px`;
      } catch (error) {
        console.error(error);
      }

      // Fix dev tool inspect
      if (retry) {
        setTimeout(() => {
          this.resizeIframe(false);
        }, 100);
      }
    },
    onIframeLoad() {
      this.loading = false; // Hide the preloader when iframe loads
    },
  },
};
</script>

<style lang="scss" scoped>
.iframe-container {
  width: 100%;
  overflow: hidden;
  position: relative;

  iframe {
    width: 1440px;
    height: 792px;
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}
</style>
