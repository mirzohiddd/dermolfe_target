<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import StickyCta from '@/components/layout/StickyCta.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProblemsSection from '@/components/sections/ProblemsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SpecialistsSection from '@/components/sections/SpecialistsSection.vue'
import ResultsSection from '@/components/sections/ResultsSection.vue'
import WhySection from '@/components/sections/WhySection.vue'
import LeadFormSection from '@/components/sections/LeadFormSection.vue'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <ProblemsSection />
    <AboutSection />
    <SpecialistsSection />
    <ResultsSection />
    <WhySection />
    <LeadFormSection />
  </main>
  <AppFooter />
  <StickyCta />
</template>
