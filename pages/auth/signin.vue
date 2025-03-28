<template>
  <WrapperAuth title="Sign In to your account">
    <UForm :state="formState" :schema="SigninSchemas" class="mt-4">
      <UFormGroup class="mb-4" name="email" label="Email">
        <UInput v-model="formState.email" type="email" />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" label="Password">
        <UInput v-model="formState.password" type="password" />
      </UFormGroup>
      <UButton :loading="isLoading" block @click="handleSignIn">Signin</UButton>
      <div class="mt-4 text-center">
        <NuxtLink to="/auth/signup"> Dont have an account? Sign up </NuxtLink>
      </div>
    </UForm>
  </WrapperAuth>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "zod";
import SigninSchemas from "~/schemas/Signin.schemas";

const isLoading = ref(false);
const router = useRouter();
const { signIn } = useAuth();
const toast = useToast();

async function handleSignIn(
  event: FormSubmitEvent<z.output<typeof SigninSchemas>>
) {
  try {
    isLoading.value = true;
    const res = await signIn("credentials", {
      email: formState.email,
      password: formState.password,
      redirect: false, // This prevents the page reload
    });

    console.log(res);

    if (res?.error) {
      toast.add({
        title: "Login Failed",
        description: res.error || "Invalid credentials",
        color: "red",
      });
    } else {
      toast.add({
        title: "Login Successful",
        description: "You have been logged in successfully",
        color: "green",
      });
      // Navigate to the dashboard or home page
      router.push("/");
    }
  } catch (error:any) {
    toast.add({
      title: "Login Failed",
      description: error.message || "An error occurred",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
}

const formState = reactive({
  email: "",
  password: "",
});
</script>
