<script setup lang="ts">
withDefaults(defineProps<{ immersive?: boolean }>(), { immersive: false });

const { data, signOut } = useAuth();

const initial = computed(
  () => (data.value?.user?.name || data.value?.user?.email || "?")[0].toUpperCase()
);

const menuItems = [
  [{ label: "profile", slot: "profile", disabled: true }],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-right-on-rectangle",
      click: () => signOut({ callbackUrl: "/auth/signin" }),
    },
  ],
];
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col">
    <header
      class="glass sticky top-0 z-30 border-b backdrop-blur-xl backdrop-saturate-150"
      :class="
        immersive
          ? 'border-white/10 bg-black/30 text-white'
          : 'border-black/5 bg-white/70 dark:border-white/10 dark:bg-neutral-900/70'
      "
    >
      <UContainer :ui="{ constrained: immersive ? 'max-w-none' : 'max-w-7xl' }">
        <div class="flex h-14 items-center gap-3">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 rounded-lg font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="NuxtoDo home"
          >
            <span
              class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white shadow-sm"
            >
              <UIcon name="i-heroicons-check-20-solid" class="h-4 w-4" />
            </span>
            <span class="hidden sm:inline">NuxtoDo</span>
          </NuxtLink>

          <div class="min-w-0 flex-1">
            <slot name="title" />
          </div>

          <div class="flex items-center gap-1 sm:gap-2">
            <slot name="actions" />
            <ColourSwitcher :class="immersive && '!text-white hover:!bg-white/10'" />
            <UDropdown :items="menuItems" :popper="{ placement: 'bottom-end' }">
              <button
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-neutral-200 to-neutral-300 text-sm font-semibold text-neutral-700 ring-1 ring-black/5 transition active:scale-95 dark:from-neutral-600 dark:to-neutral-700 dark:text-white"
                aria-label="Account menu"
              >
                {{ initial }}
              </button>
              <template #profile>
                <div class="min-w-0 text-left">
                  <p class="truncate font-medium text-neutral-900 dark:text-white">
                    {{ data?.user?.name }}
                  </p>
                  <p class="truncate text-xs text-neutral-500">
                    {{ data?.user?.email }}
                  </p>
                </div>
              </template>
            </UDropdown>
          </div>
        </div>
      </UContainer>
    </header>

    <main class="flex min-h-0 flex-1 flex-col">
      <slot />
    </main>
  </div>
</template>
