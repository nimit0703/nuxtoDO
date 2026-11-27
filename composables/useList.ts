export const useList = () => {
  const { confirm } = useConfirm();

  function destroy(id: string, name: string, onDestroy?: () => void) {
    confirm({
      title: `Delete “${name}”?`,
      description: "The list and its cards will be removed from this board.",
      confirmLabel: "Delete list",
      onConfirm: async () => {
        await $fetch(`/api/lists/${id}`, { method: "DELETE" });
        onDestroy?.();
      },
    });
  }

  function update(id: string, data: Record<string, unknown>) {
    return $fetch(`/api/lists/${id}`, { method: "PUT", body: data });
  }

  return { destroy, update };
};
