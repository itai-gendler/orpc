<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Platform',
  to: '/',
  active: route.path === '/',
}, {
  label: 'Pricing',
  to: '/pricing',
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        trailing-icon="i-lucide-arrow-right"
        to="/signup"
        class="hidden lg:inline-flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton label="Sign in" color="neutral" variant="subtle" to="/login" block class="mb-3" />
      <UButton label="Sign up" to="/signup" block />
    </template>
  </UHeader>
</template>
