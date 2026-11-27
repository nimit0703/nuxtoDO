interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => Promise<unknown> | unknown;
}

// Single app-wide dialog rendered by <ConfirmDialog /> in app.vue
export const useConfirm = () => {
  const state = useState<(ConfirmOptions & { open: boolean }) | null>(
    "confirm-dialog",
    () => null
  );

  function confirm(options: ConfirmOptions) {
    state.value = { ...options, open: true };
  }

  return { state, confirm };
};

/** Toast the server's message (h3 errors put it in data.message). */
export function toastError(e: any) {
  useToast().add({
    title: "Something went wrong",
    description: e?.data?.message || e?.message || "Please try again.",
    color: "red",
    icon: "i-heroicons-exclamation-circle",
  });
}
