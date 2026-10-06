<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost | light
  size: { type: String, default: 'md' }, // md | lg | xl
  href: { type: String, default: '' },
  type: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  block: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const variants = {
  primary:
    'bg-leaf-600 text-white shadow-[var(--shadow-cta)] hover:bg-leaf-700 active:bg-leaf-700',
  secondary: 'bg-white text-navy-700 ring-1 ring-navy-100 hover:ring-navy-200 hover:bg-navy-50',
  ghost: 'text-navy-700 hover:bg-navy-50',
  light: 'bg-white text-navy-800 hover:bg-leaf-50 shadow-[var(--shadow-soft)]',
}
const sizes = {
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base sm:text-[17px]',
  xl: 'h-16 px-8 text-lg',
}

const classes = computed(() => [
  'group inline-flex select-none items-center justify-center gap-2 rounded-2xl font-bold tracking-[-0.01em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-70',
  variants[props.variant],
  sizes[props.size],
  props.block && 'w-full',
])
</script>

<template>
  <a v-if="href" :href="href" :class="classes" target="_blank" rel="noopener">
    <slot />
    <AppIcon v-if="icon" :name="icon" :size="20" class="transition-transform group-hover:translate-x-0.5" />
  </a>
  <button v-else :type="type" :class="classes" :disabled="disabled || loading">
    <span
      v-if="loading"
      class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
      aria-hidden="true"
    />
    <slot />
    <AppIcon
      v-if="icon && !loading"
      :name="icon"
      :size="20"
      class="transition-transform group-hover:translate-x-0.5"
    />
  </button>
</template>
