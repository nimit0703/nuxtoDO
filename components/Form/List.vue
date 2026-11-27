<script lang="ts" setup>
import ListSchema from "~/schemas/List.schemas";
import type { ListDocument } from "~/server/models/List.model";

const props = defineProps<{ boardId: string; initialData?: ListDocument }>();
const emit = defineEmits<{ (e: "saved"): void; (e: "cancel"): void }>();

const isLoading = ref(false);
const formState = reactive({ name: props.initialData?.name, board: props.boardId });

async function handleSubmit() {
  isLoading.value = true;
  try {
    const id = props.initialData?._id;
    await $fetch(id ? `/api/lists/${id}` : "/api/lists", {
      method: id ? "PUT" : "POST",
      body: id ? { name: formState.name } : formState,
    });
    formState.name = undefined;
    emit("saved");
  } catch (e) {
    toastError(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UForm :state="formState" :schema="ListSchema" class="space-y-3" @submit="handleSubmit">
    <UFormGroup name="name" :label="initialData ? 'Name' : undefined">
      <UInput
        v-model="formState.name"
        placeholder="List name"
        autofocus
        @keydown.esc="emit('cancel')"
      />
    </UFormGroup>
    <div class="flex gap-2">
      <UButton type="submit" :loading="isLoading" :block="!!initialData">
        {{ initialData ? "Save" : "Add list" }}
      </UButton>
      <UButton v-if="!initialData" color="gray" variant="ghost" @click="emit('cancel')">
        Cancel
      </UButton>
    </div>
  </UForm>
</template>
