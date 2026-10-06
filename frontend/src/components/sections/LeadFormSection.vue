<script setup>
import { reactive, ref, computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { problemOptions } from '@/data/content'
import { PHONE_PREFIX, formatPhone, extractDigits, validatePhone, toE164 } from '@/composables/usePhoneMask'
import { submitLead, LeadError } from '@/services/leadService'
import { site, phoneHref } from '@/config/site'

const form = reactive({ name: '', problem: '', phone: '', website: '' /* honeypot */ })
const errors = reactive({ name: '', problem: '', phone: '' })
const touched = ref(false)
const loading = ref(false)
const submitError = ref('')
const successOpen = ref(false)
const submittedName = ref('')

const benefits = [
  'Mutaxassis siz bilan tez orada bog‘lanadi',
  'Muammongiz bo‘yicha shaxsiy tavsiya',
  'Kompleksni to‘g‘ri qo‘llash tartibi',
]

/* ---------- validation ---------- */
const validators = {
  name(v) {
    const val = v.trim()
    if (!val) return 'Ismingizni kiriting'
    if (val.length < 2) return 'Ism kamida 2 ta harfdan iborat bo‘lsin'
    if (!/^[\p{L}\s'‘’ʻʼ`-]+$/u.test(val)) return 'Ismda faqat harflar bo‘lishi mumkin'
    return ''
  },
  problem(v) {
    return v ? '' : 'Muammoni tanlang'
  },
  phone(v) {
    return validatePhone(v)
  },
}

function validateField(field) {
  errors[field] = validators[field](form[field])
  return !errors[field]
}
function validateAll() {
  return ['name', 'problem', 'phone'].map(validateField).every(Boolean)
}
const onBlur = (field) => touched.value && validateField(field)

/* ---------- phone mask ---------- */
function onPhoneInput(e) {
  const digits = extractDigits(e.target.value)
  form.phone = digits.length ? formatPhone(digits) : PHONE_PREFIX
  e.target.value = form.phone
  if (touched.value || digits.length === 9) validateField('phone')
}
function onPhoneFocus() {
  if (!form.phone) form.phone = PHONE_PREFIX
}
function onPhoneBlur() {
  if (!extractDigits(form.phone).length) form.phone = ''
  onBlur('phone')
}
function onPhoneKeydown(e) {
  // "+998 " prefiksini o'chirib bo'lmasin
  if ((e.key === 'Backspace' || e.key === 'Delete') && form.phone.length <= PHONE_PREFIX.length) {
    e.preventDefault()
  }
}

const problemLabel = computed(() => problemOptions.find((o) => o.value === form.problem)?.label || '')

/* ---------- submit ---------- */
async function onSubmit() {
  touched.value = true
  submitError.value = ''
  if (!validateAll()) {
    const firstInvalid = ['name', 'problem', 'phone'].find((f) => errors[f])
    document.getElementById(`lead-${firstInvalid}`)?.focus()
    return
  }
  if (form.website) return // bot

  loading.value = true
  try {
    await submitLead({
      name: form.name.trim(),
      problem: form.problem,
      problemLabel: problemLabel.value,
      phone: toE164(form.phone),
    })
    submittedName.value = form.name.trim()
    successOpen.value = true
    Object.assign(form, { name: '', problem: '', phone: '', website: '' })
    Object.assign(errors, { name: '', problem: '', phone: '' })
    touched.value = false
  } catch (err) {
    submitError.value = err instanceof LeadError ? err.message : 'Kutilmagan xatolik. Iltimos, qayta urinib ko‘ring.'
  } finally {
    loading.value = false
  }
}

const inputBase =
  'block h-14 w-full rounded-2xl border bg-white px-4 text-[16px] font-semibold text-navy-900 transition placeholder:font-medium placeholder:text-muted/70 focus:outline-none focus:ring-4'
const inputClass = (field) =>
  [
    inputBase,
    errors[field]
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-navy-100 hover:border-navy-200 focus:border-leaf-500 focus:ring-leaf-100',
  ].join(' ')
</script>

<template>
  <section id="ariza" class="section bg-white">
    <div class="container-page">
      <div
        v-reveal
        class="grid overflow-hidden rounded-[32px] bg-navy-800 shadow-[var(--shadow-lift)] lg:grid-cols-[0.95fr_1.05fr]"
      >
        <!-- chap: matn -->
        <div class="relative overflow-hidden p-7 text-white sm:p-10 lg:p-12">
          <div aria-hidden="true" class="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-leaf-600/25 blur-3xl" />
          <p class="text-xs font-bold tracking-[0.16em] text-leaf-400 uppercase">Konsultatsiya</p>
          <h2 class="mt-3 text-[28px] leading-[1.15] font-extrabold tracking-[-0.025em] text-balance sm:text-4xl">
            Mutaxassisdan konsultatsiya oling
          </h2>
          <p class="mt-4 leading-relaxed text-navy-100 sm:text-lg">
            Ma’lumotlaringizni qoldiring — mutaxassisimiz qo‘ng‘iroq qilib, muammongiz bo‘yicha maslahat beradi.
          </p>
          <ul class="relative mt-7 space-y-3.5">
            <li v-for="b in benefits" :key="b" class="flex items-center gap-3 font-semibold">
              <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-leaf-600">
                <AppIcon name="check" :size="15" :stroke-width="3" />
              </span>
              {{ b }}
            </li>
          </ul>
          <a
            v-if="site.contacts.phone"
            :href="phoneHref(site.contacts.phone)"
            class="relative mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 font-bold transition hover:bg-white/15"
          >
            <AppIcon name="phone" :size="20" class="text-leaf-400" />
            {{ site.contacts.phone }}
          </a>
        </div>

        <!-- o'ng: forma -->
        <div class="bg-white p-6 sm:p-10 lg:p-12">
          <form novalidate class="space-y-5" aria-label="Konsultatsiya uchun ariza" @submit.prevent="onSubmit">
            <div>
              <label for="lead-name" class="mb-2 block text-sm font-bold text-navy-800">Ism</label>
              <input
                id="lead-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="given-name"
                placeholder="Ismingiz"
                maxlength="60"
                :class="inputClass('name')"
                :aria-invalid="!!errors.name"
                aria-describedby="lead-name-error"
                @blur="onBlur('name')"
                @input="touched && validateField('name')"
              />
              <p v-if="errors.name" id="lead-name-error" class="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="lead-problem" class="mb-2 block text-sm font-bold text-navy-800">Muammo</label>
              <div class="relative">
                <select
                  id="lead-problem"
                  v-model="form.problem"
                  name="problem"
                  :class="[inputClass('problem'), 'appearance-none pr-12', !form.problem && 'text-muted/80 font-medium']"
                  :aria-invalid="!!errors.problem"
                  aria-describedby="lead-problem-error"
                  @change="validateField('problem')"
                  @blur="onBlur('problem')"
                >
                  <option value="" disabled>Muammoni tanlang</option>
                  <option v-for="o in problemOptions" :key="o.value" :value="o.value" class="text-navy-900">
                    {{ o.label }}
                  </option>
                </select>
                <AppIcon
                  name="chevron-down"
                  :size="20"
                  class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-navy-700"
                />
              </div>
              <p v-if="errors.problem" id="lead-problem-error" class="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                {{ errors.problem }}
              </p>
            </div>

            <div>
              <label for="lead-phone" class="mb-2 block text-sm font-bold text-navy-800">Telefon raqam</label>
              <input
                id="lead-phone"
                :value="form.phone"
                type="tel"
                name="phone"
                inputmode="numeric"
                autocomplete="tel"
                placeholder="+998 __ ___ __ __"
                maxlength="17"
                :class="[inputClass('phone'), 'tracking-wide tabular-nums']"
                :aria-invalid="!!errors.phone"
                aria-describedby="lead-phone-error"
                @input="onPhoneInput"
                @focus="onPhoneFocus"
                @blur="onPhoneBlur"
                @keydown="onPhoneKeydown"
              />
              <p v-if="errors.phone" id="lead-phone-error" class="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                {{ errors.phone }}
              </p>
            </div>

            <!-- honeypot (botlar uchun) -->
            <input
              v-model="form.website"
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <p
              v-if="submitError"
              class="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700"
              role="alert"
            >
              <AppIcon name="info" :size="18" class="mt-0.5 shrink-0" />
              {{ submitError }}
            </p>

            <BaseButton type="submit" size="xl" block :loading="loading">
              {{ loading ? 'Yuborilmoqda…' : 'Konsultatsiya olish' }}
            </BaseButton>

            <p class="flex items-center justify-center gap-2 text-center text-xs font-medium text-muted">
              <AppIcon name="lock" :size="14" />
              Ma’lumotlaringiz faqat siz bilan bog‘lanish uchun ishlatiladi
            </p>
          </form>
        </div>
      </div>
    </div>

    <BaseModal :open="successOpen" labelledby="success-title" @close="successOpen = false">
      <div class="text-center">
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-50 text-leaf-600">
          <AppIcon name="check-circle" :size="36" :stroke-width="2" />
        </div>
        <h3 id="success-title" class="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-navy-800">
          Rahmat{{ submittedName ? `, ${submittedName}` : '' }}!
        </h3>
        <p class="mt-3 leading-relaxed text-muted">
          Arizangiz qabul qilindi. Mutaxassisimiz tez orada siz bilan bog‘lanadi — telefoningiz yoningizda bo‘lsin.
        </p>
        <BaseButton class="mt-7" block size="lg" @click="successOpen = false">Yaxshi</BaseButton>
      </div>
    </BaseModal>
  </section>
</template>
