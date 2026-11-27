<script lang="ts" setup>
import CardSchema from "~/schemas/Card.schema";
import type { CardDocument } from "~/server/models/Card.model";

const props = defineProps<{ listId: string; initialData?: CardDocument }>();
const emit = defineEmits<{ (e: "saved"): void }>();

const { destroy } = useCard();
const form = ref();
const isLoading = ref(false);
const formState = reactive({
  title: props.initialData?.title,
  description: props.initialData?.description ?? undefined,
  list: props.listId,
});

async function handleSubmit() {
  isLoading.value = true;
  try {
    const id = props.initialData?._id;
    await $fetch(id ? `/api/lists/${props.listId}/cards/${id}` : `/api/lists/${props.listId}/cards`, {
      method: id ? "PUT" : "POST",
      body: formState,
    });
    emit("saved");
  } catch (e) {
    toastError(e);
  } finally {
    isLoading.value = false;
  }
}

function handleDelete() {
  destroy(props.listId, props.initialData!._id, () => emit("saved"));
}
</script>

<template>
  <UForm
    ref="form"
    :state="formState"
    :schema="CardSchema"
    class="space-y-5"
    @submit="handleSubmit"
    @keydown.meta.enter.prevent="form?.submit()"
    @keydown.ctrl.enter.prevent="form?.submit()"
  >
    <UFormGroup name="title" label="Title">
      <UInput v-model="formState.title" placeholder="What needs doing?" size="lg" autofocus />
    </UFormGroup>

    <UFormGroup name="description" label="Notes">
      <ClientOnly>
        <QuillEditor
          v-model:content="formState.description"
          theme="snow"
          toolbar="minimal"
          content-type="html"
          placeholder="Add more detail…"
        />
        <template #fallback>
          <div class="h-40 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        </template>
      </ClientOnly>
    </UFormGroup>

    <div class="flex items-center gap-3">
      <UButton
        v-if="initialData"
        color="red"
        variant="ghost"
        icon="i-heroicons-trash"
        aria-label="Delete card"
        @click="handleDelete"
      />
      <span class="ml-auto hidden text-xs text-neutral-400 sm:inline">⌘/Ctrl + Enter to save</span>
      <UButton type="submit" :loading="isLoading" size="lg">
        {{ initialData ? "Save" : "Add card" }}
      </UButton>
    </div>
  </UForm>
</template>

<style>
.ql-toolbar.ql-snow {
  @apply rounded-t-lg border-neutral-200 dark:border-neutral-700;
}
.ql-container.ql-snow {
  @apply h-36 rounded-b-lg border-neutral-200 text-sm dark:border-neutral-700;
  font-family: inherit;
}
.dark .ql-snow .ql-stroke {
  stroke: theme("colors.neutral.300");
}
.dark .ql-snow .ql-fill {
  fill: theme("colors.neutral.300");
}
.dark .ql-editor.ql-blank::before {
  color: theme("colors.neutral.500");
}
</style>
