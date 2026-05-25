<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <UButton
      icon="i-lucide-chevron-left"
      to="/"
      size="xl"
      color="neutral"
      variant="subtle"
      class="absolute left-6 top-6 rounded-full"
      aria-label="Back home"
    />

    <UPageCard variant="subtle" class="w-full max-w-sm">
      <slot />
    </UPageCard>
  </div>
</template>
