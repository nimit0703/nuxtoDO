export const useBoard = () => {
  const { confirm } = useConfirm();

  function destroy(id: string, name: string, onDestroy?: () => void) {
    confirm({
      title: `Delete “${name}”?`,
      description: "This board and all of its lists will be permanently removed.",
      confirmLabel: "Delete board",
      onConfirm: async () => {
        await $fetch(`/api/boards/${id}`, { method: "DELETE" });
        onDestroy?.();
      },
    });
  }

  return { destroy };
};
