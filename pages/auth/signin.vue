<script lang="ts" setup>
import SigninSchemas from "~/schemas/Signin.schemas";

useHead({ title: "Sign in" });

const { signIn } = useAuth();
const isLoading = ref(false);
const formState = reactive({ email: "", password: "" });

async function handleSignIn() {
  isLoading.value = true;
  try {
    const res: any = await signIn("credentials", {
      email: formState.email,
      password: formState.password,
      redirect: false,
    });
    if (res?.error) {
      useToast().add({
        title: "Couldn’t sign in",
        description: "Check your email and password and try again.",
        color: "red",
        icon: "i-heroicons-exclamation-circle",
      });
      return;
    }
    await navigateTo("/");
  } catch (e) {
    toastError(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <WrapperAuth title="Sign in to NuxtoDo" subtitle="Welcome back. Pick up where you left off.">
    <UForm :state="formState" :schema="SigninSchemas" class="space-y-4" @submit="handleSignIn">
      <UFormGroup name="email" label="Email">
        <UInput v-model="formState.email" type="email" autocomplete="email" size="lg" autofocus />
      </UFormGroup>
      <UFormGroup name="password" label="Password">
        <UInput
          v-model="formState.password"
          type="password"
          autocomplete="current-password"
          size="lg"
        />
      </UFormGroup>
      <UButton type="submit" :loading="isLoading" block size="lg">Sign in</UButton>
    </UForm>

    <template #footer>
      New to NuxtoDo?
      <NuxtLink to="/auth/signup" class="font-medium text-primary-500 hover:underline">
        Create an account
      </NuxtLink>
    </template>
  </WrapperAuth>
</template>
