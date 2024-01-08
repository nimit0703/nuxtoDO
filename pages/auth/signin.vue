<template>
  <div class="grid lg:grid-cols-2 h-screen">
    <div
      class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52"
    >
      <div class="header text-center md-6">
        <div class="logo">NextoDo</div>

        <h1 class="text-center text-xl mt-2">Login to Your Account</h1>
      </div>

      <UCard class="mt-8">
        <!-- form  -->
        <UForm
          :state="formState"
          :schema="SigninSchemas"
          class="mt-4"
          @submit="handdleSignIn"
        >
          <UFormGroup class="mb-4" name="email" label="Email">
            <UInput v-model="formState.email" type="email" />
          </UFormGroup>
          <UFormGroup
            v-model="formState.password"
            class="mb-4"
            name="password"
            label="Password"
          >
            <UInput v-model="formState.password" type="password" />
          </UFormGroup>
          <UButton :loading="isLoading" block>Signin</UButton>
        </UForm>
      </UCard>
    </div>

    <div class="right hidden lg:block"></div>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "zod";
import SigninSchemas from "~/schemas/Signin.schemas";
const isLoading = ref(false);

const { signIn } = useAuth();
async function handdleSignIn(
  event: FormSubmitEvent<z.output<typeof SigninSchemas>>
) {
  try {
    isLoading.value = true;
    await signIn("credentials", {
      email: event.data.email,
      password: event.data.password,
    });
    useRouter().push('/')
  } catch (error) {
    console.error(error);
  } finally{
    isLoading.value = false;
  }
}
const formState = reactive({
  email: undefined,
  password: undefined,
});
</script>

<style>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
