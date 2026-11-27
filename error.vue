<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const notFound = computed(() => props.error.statusCode === 404);

useHead({ title: notFound.value ? "Not found" : "Error" });
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
    <p class="text-sm font-semibold text-primary-500">{{ error.statusCode }}</p>
    <h1 class="mt-2 text-3xl font-bold sm:text-4xl">
      {{ notFound ? "We couldn’t find that page" : "Something went wrong" }}
    </h1>
    <p class="mt-3 max-w-sm text-neutral-500 dark:text-neutral-400">
      {{ notFound ? "The board may have been deleted, or the link is wrong." : error.message }}
    </p>
    <UButton class="mt-8" size="lg" @click="clearError({ redirect: '/' })">Back to boards</UButton>
  </div>
</template>
