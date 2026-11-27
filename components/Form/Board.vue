<script lang="ts" setup>
import BoardSchema from "~/schemas/Board.schemas";
import type { BoardDocument } from "~/server/models/board.model";

const props = defineProps<{ initialData?: BoardDocument }>();
const emit = defineEmits<{ (e: "saved"): void }>();

const isLoading = ref(false);
const formState = reactive({
  name: props.initialData?.name,
  coverImage: props.initialData?.coverImage ?? null,
});

async function handleSubmit() {
  isLoading.value = true;
  try {
    const id = props.initialData?._id;
    await $fetch(id ? `/api/boards/${id}` : "/api/boards", {
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
</script>

<template>
  <UForm :state="formState" :schema="BoardSchema" class="space-y-5" @submit="handleSubmit">
    <UFormGroup name="name" label="Name">
      <UInput v-model="formState.name" placeholder="e.g. Product launch" size="lg" autofocus />
    </UFormGroup>

    <UFormGroup name="coverImage" label="Cover">
      <ImagePicker v-model="formState.coverImage" />
    </UFormGroup>

    <UButton type="submit" block size="lg" :loading="isLoading">
      {{ initialData ? "Save changes" : "Create board" }}
    </UButton>
  </UForm>
</template>
