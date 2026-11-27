<script lang="ts" setup>
const { state } = useConfirm();
const isLoading = ref(false);

const open = computed({
  get: () => !!state.value?.open,
  set: (v) => {
    if (!v && state.value && !isLoading.value) state.value.open = false;
  },
});

async function handleConfirm() {
  if (!state.value) return;
  isLoading.value = true;
  try {
    await state.value.onConfirm();
    state.value.open = false;
  } catch (e) {
    toastError(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'sm:max-w-sm' }">
    <div v-if="state" class="p-6 text-center" role="alertdialog">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10"
      >
        <UIcon name="i-heroicons-trash" class="h-6 w-6 text-red-500" />
      </div>
      <h2 class="text-lg font-semibold">{{ state.title }}</h2>
      <p
        v-if="state.description"
        class="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400"
      >
        {{ state.description }}
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3">
        <UButton
          color="gray"
          variant="soft"
          size="lg"
          block
          :disabled="isLoading"
          @click="open = false"
        >
          Cancel
        </UButton>
        <UButton
          color="red"
          size="lg"
          block
          :loading="isLoading"
          @click="handleConfirm"
        >
          {{ state.confirmLabel || "Delete" }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>
