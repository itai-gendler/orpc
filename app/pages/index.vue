<script setup lang="ts">
useSeoMeta({
  title: 'Lunaria',
  description: 'A Nuxt UI platform for managing planets through the existing oRPC API.',
})

const heroLinks = [{
  label: 'Open platform',
  to: '/dashboard',
  icon: 'i-lucide-layout-dashboard',
  trailing: true,
}, {
  label: 'API reference',
  to: '/api',
  target: '_blank',
  icon: 'i-lucide-book-open',
  color: 'neutral' as const,
  variant: 'subtle' as const,
}]

const features = [{
  title: 'Authenticated workspace',
  description: 'Users sign in through the existing Better Auth endpoint before entering the platform.',
  icon: 'i-lucide-shield-check',
}, {
  title: 'oRPC-backed data',
  description: 'Dashboard pages call the current type-safe planet queries, mutations, and streams.',
  icon: 'i-lucide-route',
}, {
  title: 'Operational dashboard',
  description: 'The product area uses Nuxt UI dashboard primitives for navigation, tables, forms, and actions.',
  icon: 'i-lucide-panels-top-left',
}]
</script>

<template>
  <div>
    <UPageHero
      title="Lunaria"
      description="Manage the platform through a polished Nuxt UI experience while keeping the current API, auth, and database stack in place."
      :links="heroLinks"
    >
      <img
        src="https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png"
        alt="Nuxt UI dashboard preview"
        class="mx-auto w-full max-w-5xl rounded-lg border border-default shadow-xl"
      >
    </UPageHero>

    <UPageSection
      title="Built around the app you already have"
      description="The UI layer changes, but the server routes, Better Auth integration, Drizzle schema, and oRPC contracts stay central."
    >
      <UPageGrid>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          v-bind="feature"
          spotlight
        />
      </UPageGrid>
    </UPageSection>

    <USeparator />

    <UPageCTA
      title="Start from the dashboard"
      description="Sign in and work with the current planet API from dedicated platform pages."
      :links="[{ label: 'Sign in', to: '/login', icon: 'i-lucide-log-in' }]"
      variant="naked"
    />
  </div>
</template>
