<script setup>
import { watch, onBeforeUnmount, ref, nextTick } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  labelledby: { type: String, default: '' },
})
const emit = defineEmits(['close'])
const panel = ref(null)
let lastFocused = null

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement
      document.documentElement.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
      await nextTick()
      panel.value?.focus()
    } else {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocused?.focus?.({ preventScroll: true })
    }
  },
)

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-end justify-center bg-navy-900/55 p-4 backdrop-blur-sm sm:items-center"
        @click.self="emit('close')"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledby"
          tabindex="-1"
          class="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-[var(--shadow-lift)] outline-none sm:p-8"
        >
          <button
            type="button"
            class="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-navy-50 hover:text-navy-700"
            aria-label="Yopish"
            @click="emit('close')"
          >
            <AppIcon name="x" :size="20" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
