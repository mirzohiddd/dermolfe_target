<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  before: { type: String, required: true },
  after: { type: String, required: true },
  alt: { type: String, default: '' },
})

const position = ref(50)
const root = ref(null)
let dragging = false

function setFromClientX(clientX) {
  const rect = root.value.getBoundingClientRect()
  const pct = ((clientX - rect.left) / rect.width) * 100
  position.value = Math.min(100, Math.max(0, pct))
}
function onPointerDown(e) {
  dragging = true
  root.value.setPointerCapture?.(e.pointerId)
  setFromClientX(e.clientX)
}
function onPointerMove(e) {
  if (dragging) setFromClientX(e.clientX)
}
function onPointerUp() {
  dragging = false
}
</script>

<template>
  <div
    ref="root"
    class="relative aspect-[3/4] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-2xl bg-navy-50 select-none"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <img
      :src="props.after"
      :alt="`${alt} — keyin`"
      loading="lazy"
      decoding="async"
      width="600"
      height="800"
      draggable="false"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <img
      :src="props.before"
      :alt="`${alt} — oldin`"
      loading="lazy"
      decoding="async"
      width="600"
      height="800"
      draggable="false"
      class="absolute inset-0 h-full w-full object-cover"
      :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
    />

    <span
      class="pointer-events-none absolute top-3 left-3 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-bold text-white backdrop-blur"
    >
      Oldin
    </span>
    <span
      class="pointer-events-none absolute top-3 right-3 rounded-full bg-leaf-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur"
    >
      Keyin
    </span>

    <div class="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow" :style="{ left: `${position}%` }">
      <div
        class="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-700 shadow-[var(--shadow-lift)]"
      >
        <AppIcon name="chevrons-lr" :size="20" :stroke-width="2.2" />
      </div>
    </div>

    <input
      v-model.number="position"
      type="range"
      min="0"
      max="100"
      step="1"
      class="sr-only"
      :aria-label="`${alt}: oldin va keyin taqqoslash`"
    />
  </div>
</template>
