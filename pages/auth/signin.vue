<template>
  <div class="grid lg:grid-cols-2 h-screen">
    <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52">
      <div class="header text-center md-6">
        <div class="logo">NextoDo</div>
        <h1 class="text-center text-xl mt-2">Login to Your Account</h1>
      </div>

      <UCard class="mt-8">
        <UForm :state="formState" :schema="SigninSchemas" class="mt-4">
          <UFormGroup class="mb-4" name="email" label="Email">
            <UInput v-model="formState.email" type="email" />
          </UFormGroup>
          <UFormGroup class="mb-4" name="password" label="Password">
            <UInput v-model="formState.password" type="password" />
          </UFormGroup>
          <UButton :loading="isLoading" block @click="handleSignIn">Signin</UButton>
          <div class="mt-4 text-center">
            <NuxtLink to="/auth/signup">Don't have an account? Sign up</NuxtLink>
          </div>
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
const router = useRouter();
const { signIn } = useAuth();
const toast = useToast();

async function handleSignIn(event: FormSubmitEvent<z.output<typeof SigninSchemas>>) {
  try {
    isLoading.value = true;
    const res = await signIn("credentials", {
      email: formState.email,
      password: formState.password,
      redirect: false // This prevents the page reload
    });
    
    console.log(res);
    
    if (res?.error) {
      toast.add({ 
        title: "Login Failed", 
        description: res.error || "Invalid credentials", 
        color: "red" 
      });
    } else {
      toast.add({ 
        title: "Login Successful", 
        description: "You have been logged in successfully", 
        color: "green" 
      });
      // Navigate to the dashboard or home page
      router.push('/');
    }
  } catch (error) {
    toast.add({ 
      title: "Login Failed", 
      description: error.message || "An error occurred", 
      color: "red" 
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