<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "zod";
import SignupSchema from "~/schemas/Signup.schemas";

useHead({ title: "Create account" });

const formState = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
});
const isLoading = ref(false);

async function handleSubmit(event: FormSubmitEvent<z.output<typeof SignupSchema>>) {
  isLoading.value = true;
  try {
    await $fetch("/api/auth/signup", { method: "POST", body: event.data });
    useToast().add({
      title: "Account created",
      description: "Sign in to get started.",
      color: "green",
      icon: "i-heroicons-check-circle",
    });
    await navigateTo("/auth/signin");
  } catch (e) {
    toastError(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <WrapperAuth title="Create your account" subtitle="Organize anything with boards, lists and cards.">
    <UForm :state="formState" :schema="SignupSchema" class="space-y-4" @submit="handleSubmit">
      <UFormGroup name="name" label="Name">
        <UInput v-model="formState.name" autocomplete="name" size="lg" autofocus />
      </UFormGroup>
      <UFormGroup name="email" label="Email">
        <UInput v-model="formState.email" type="email" autocomplete="email" size="lg" />
      </UFormGroup>
      <UFormGroup name="password" label="Password" hint="8+ characters">
        <UInput v-model="formState.password" type="password" autocomplete="new-password" size="lg" />
      </UFormGroup>
      <UFormGroup name="passwordConfirm" label="Confirm password">
        <UInput
          v-model="formState.passwordConfirm"
          type="password"
          autocomplete="new-password"
          size="lg"
        />
      </UFormGroup>
      <UButton :loading="isLoading" type="submit" block size="lg">Create account</UButton>
    </UForm>

    <template #footer>
      Already have an account?
      <NuxtLink to="/auth/signin" class="font-medium text-primary-500 hover:underline">
        Sign in
      </NuxtLink>
    </template>
  </WrapperAuth>
</template>
