<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        Built with Nuxt UI.
      </p>
    </template>

    <template #right>
      <UButton
        icon="i-lucide-book-open"
        color="neutral"
        variant="ghost"
        to="/api"
        target="_blank"
        aria-label="API reference"
      />
    </template>
  </UFooter>
</template>
