<script setup lang="ts">
useSeoMeta({
  title: 'Pricing',
  description: 'Simple placeholder pricing page using Nuxt UI SaaS layout primitives.',
})
</script>

<template>
  <UPageSection
    title="Pricing"
    description="Pricing can be connected to the product model when billing is introduced."
  >
    <UPageGrid>
      <UPageCard
        title="Platform"
        description="Everything needed to manage planets through the authenticated dashboard."
        icon="i-lucide-rocket"
        spotlight
      >
        <template #footer>
          <UButton label="Get started" to="/signup" trailing-icon="i-lucide-arrow-right" />
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
