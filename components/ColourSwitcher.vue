<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

function toggle() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    />
    <template #fallback>
      <div class="h-8 w-8" />
    </template>
  </ClientOnly>
</template>
