export default defineAppConfig({
  ui: {
    primary: "azure",
    gray: "neutral",
    button: {
      rounded: "rounded-lg",
      base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-60 flex-shrink-0 transition-[background-color,transform] duration-100 active:scale-[0.97]",
    },
    input: { rounded: "rounded-lg" },
    card: {
      rounded: "rounded-2xl",
      ring: "ring-1 ring-black/5 dark:ring-white/10",
      shadow: "shadow-sm",
    },
    modal: {
      rounded: "rounded-2xl",
      background: "bg-white dark:bg-neutral-900",
      ring: "ring-1 ring-black/5 dark:ring-white/10",
      overlay: { background: "bg-black/30 dark:bg-black/60" },
      transition: {
        enter: "ease-out duration-200",
        leave: "ease-in duration-150",
      },
    },
    slideover: {
      overlay: { background: "bg-black/30 dark:bg-black/60" },
    },
    dropdown: {
      rounded: "rounded-xl",
      background: "bg-white/85 dark:bg-neutral-800/85 backdrop-blur-xl",
      ring: "ring-1 ring-black/5 dark:ring-white/10",
      shadow: "shadow-xl",
      item: { rounded: "rounded-lg" },
    },
    notifications: {
      position: "top-0 bottom-auto end-0",
    },
    notification: {
      rounded: "rounded-xl",
      background: "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl",
      ring: "ring-1 ring-black/5 dark:ring-white/10",
    },
  },
});
