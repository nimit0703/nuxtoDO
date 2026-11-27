export const useCard = () => {
  const { confirm } = useConfirm();

  function destroy(listId: string, cardId: string, onDestroy?: () => void) {
    confirm({
      title: "Delete this card?",
      description: "This can’t be undone.",
      confirmLabel: "Delete card",
      onConfirm: async () => {
        await $fetch(`/api/lists/${listId}/cards/${cardId}`, {
          method: "DELETE",
        });
        onDestroy?.();
      },
    });
  }

  function update(listId: string, cardId: string, data: Record<string, unknown>) {
    return $fetch(`/api/lists/${listId}/cards/${cardId}`, {
      method: "PUT",
      body: data,
    });
  }

  return { destroy, update };
};
