<template>
  <q-page>
    <q-html-builder
      ref="editor"
      custom
      :plugins="localPlugins"
      :plugins-opts="pluginsOpts"
      :config="config"
      :remote="remote"
    />
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import { usePageStore } from "stores/page";
import { ref, computed, onMounted } from "vue";
import { useAppStore } from "stores/app";
import { plugins } from "quasar-ui-qhtmlbuilder";
import { shortcodes, assetManager } from "src/services/editor";
import core from "src/services/core";

const editor = ref(null);
const page = usePageStore();
const app = useAppStore();
const route = useRoute();
const id = computed(() => route.params.id);

const apiURL = (path) => core.apiBaseURL(path);

const remote = {
  async load() {
    return page.show(id.value).then(({ data }) => {
      return data;
    });
  },
  async store(data) {
    return page.update({ ...data, id: id.value }).then(({ data }) => {
      return data.data;
    });
  },
};

const localPlugins = [assetManager];

const config = {
  height: "100vh",
  storageManager: {
    type: "remote",
    stepsBeforeSave: 3,
    options: {
      remote: {
        onStore: (data, editor) => ({
          data,
          body: editor.getHtml(),
          styles: editor.getCss(),
        }),
        onLoad: (result) => result,
      },
    },
  },
  assetManager: {
    assets: [],
    uploadName: "media",
    upload: apiURL("/files/store?assets=true"),
    headers: {
      Authorization: `Bearer ${app.token}`,
    },
    onUploaded: (editor, response) => {
      editor.assetManager.add(response?.url);
    },
  },
};

const pluginsOpts = {
  [plugins]: {
    projects: apiURL("/pages/templates"),
    blocks: apiURL("/pages/blocks"),
    headers: {
      Accpet: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${app.token}`,
    },
    shortcodes: {
      loader: (el, shortcode) => {
        page
          .shortCode({ content: shortcode })
          .then((response) => {
            el.innerHTML = response;
          })
          .catch((err) => {
            console.error(err);
            el.innerHTML = content;
          });
      },
      items: [...shortcodes],
    },
  },
};

const editorTheme = () => {
  return page
    .editorTheme()
    .then((data) => data)
    .catch(() => ({}));
};

onMounted(async () => {
  const e = editor.value;
  e.render({ canvas: await editorTheme() });
});
</script>
