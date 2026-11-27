<template>
  <div>
    <NuxtPage />
    <ConfirmDialog />
    <UNotifications />
  </div>
</template>

<style>
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  @apply bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100;
}

h1,
h2,
h3 {
  letter-spacing: -0.02em;
}

/* Route transition: short cross-fade, no slide */
.page-enter-active,
.page-leave-active {
  transition: opacity 150ms ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .glass {
    backdrop-filter: none !important;
    @apply !bg-white dark:!bg-neutral-900;
  }
}
</style>
