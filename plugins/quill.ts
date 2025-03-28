import { defineNuxtPlugin } from "#app";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    import('@vueup/vue-quill').then(({ QuillEditor }) => {
      nuxtApp.vueApp.component('QuillEditor', QuillEditor)
    })
  }
})
