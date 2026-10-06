<script setup>
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import ProductCard from '@/components/sections/ProductCard.vue'
import { products } from '@/data/content'

const steps = [
  { icon: 'heart', title: 'Ichdan', text: 'Sirop organizmni tozalaydi, asab va immunitetni qo‘llab-quvvatlaydi.' },
  { icon: 'leaf', title: 'Tashqaridan', text: 'Krem terini tinchlantiradi, namlaydi va tiklanishni faollashtiradi.' },
  { icon: 'shield', title: 'Har kuni', text: 'Sovun terini yumshoq tozalaydi va himoya pardasini saqlaydi.' },
]

const openId = ref(products[0].id)
</script>

<template>
  <section id="dermolife" class="section">
    <div class="container-page">
      <SectionHeading
        eyebrow="Dermolife nima?"
        title="Teri uchun 3 bosqichli tabiiy kompleks"
        text="Dermolife Complex — terini faqat ustidan emas, balki ichdan ham parvarish qiladigan yondashuv. Bunday kompleks nafaqat terini, balki butun organizmni uyg‘oq va sog‘lom holatga keltirishga yordam beradi."
      />

      <!-- qanday yechim beradi -->
      <div class="mb-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
        <div
          v-for="(s, i) in steps"
          :key="s.title"
          v-reveal="i * 80"
          class="flex items-start gap-4 rounded-2xl bg-navy-700 p-5 text-white sm:flex-col sm:p-6"
        >
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-leaf-400">
            <AppIcon :name="s.icon" :size="22" />
          </span>
          <div>
            <p class="text-lg font-extrabold">{{ s.title }}</p>
            <p class="mt-1 text-[15px] leading-relaxed text-navy-100">{{ s.text }}</p>
          </div>
        </div>
      </div>

      <div class="grid items-start gap-5 lg:grid-cols-3">
        <ProductCard
          v-for="(p, i) in products"
          :key="p.id"
          v-reveal="i * 100"
          :product="p"
          :open="openId === p.id"
          @toggle="openId = openId === p.id ? null : p.id"
        />
      </div>
    </div>
  </section>
</template>
