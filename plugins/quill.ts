import "@vueup/vue-quill/dist/vue-quill.snow.css";

// Lazy chunk: Quill only downloads when a card editor opens (always inside <ClientOnly>)
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(
    "QuillEditor",
    defineAsyncComponent(() => import("@vueup/vue-quill").then((m) => m.QuillEditor))
  );
});
