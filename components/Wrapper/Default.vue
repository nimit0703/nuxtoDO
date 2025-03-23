<template>
  <div>
    <header class="p-2 border-2 dark:border-gray-700 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="flex justify-between">
          <NuxtLink to="/"><div class="w-8 h-8">NuxtToDO</div></NuxtLink>
          <div class="inline-flex justify-end gap-4 items-center">
            <slot name="actions"></slot>
            <ColourSwitcher />
            <UDropdown :items="dropdownItems">
                <UIcon class="w-6 h-6" name="i-heroicons-user-circle"/>
                <template #profile>
                <div class="text-left">
                  <p>Signed in as</p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ data?.user?.email }}
                  </p>
                </div>
              </template>
            </UDropdown>
          </div>
        </div>
      </UContainer>
    </header>
    <main class="my-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
const { data, signOut } = useAuth();

const dropdownItems = ref([
  [{ label: "profile", slot: "profile", enable: true }],
  [{ label: "Billing", icon: "i-heroicons-credit-card", click: () => {} }],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: handleSignout,
    },
  ],
]);

async function handleSignout() {
  await signOut();
}
</script>

<style lang="scss" scoped></style>
