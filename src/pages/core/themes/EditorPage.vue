<template>
  <q-page>
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          size="10px"
          icon="fas fa-arrow-right-from-bracket"
          :to="{ name: 'Themes' }"
        />
        <div class="q-ml-sm title">Customize for {{ theme?.name }}</div>
        <q-space />
        <base-btn
          label="Preview"
          link
          dense
          :href="theme?.preview"
          target="_blank"
        ></base-btn>
      </q-toolbar>
    </q-header>
    <div class="row">
      <div class="col-lg-2 col-sm-4 col-xs-12">
        <div class="theme-paths-container">
          <q-scroll-area style="height: calc(100vh - 85px)">
            <q-tree
              ref="files"
              :nodes="fileTree"
              label-key="name"
              node-key="basepath"
              icon="fas fa-folder"
              @update:selected="onFileSelect"
              class="theme-paths"
              no-selection-unset
              no-connectors
              v-model:selected="selected"
            >
              <template v-slot:header-add="prop">
                <div @click.stop="addNewFile(prop)" class="row items-center">
                  <q-icon
                    :name="prop.node.icon || 'fas fa-plus'"
                    class="q-mr-sm"
                  />
                  <div>{{ prop.node.name }}</div>
                </div>
              </template>
              <template v-slot:header-file="prop">
                <div class="row items-center">
                  <q-icon
                    :name="prop.node.icon || 'fas fa-code'"
                    class="q-mr-sm"
                  />
                  <div>{{ prop.node.name }}</div>
                  <q-space />
                  <q-icon
                    v-if="!prop.node.root"
                    @click.stop="removeFile(prop)"
                    class="btn-delete"
                    name="fas fa-trash-can"
                  />
                </div>
              </template>
            </q-tree>
          </q-scroll-area>
        </div>
      </div>
      <div class="col-lg-10 col-sm-8 col-xs-12">
        <div class="editor-container q-px-md q-pb-md bg-grey-2">
          <q-toolbar v-if="selectedNode" class="q-px-none">
            <div class="file-title">
              <div class="text-subtitle2">{{ selectedNode.basepath }}</div>
              <div class="text-grey-6">
                Last updated:
                {{ $core.formatDateAsHuman(selectedNode.modified_at) }}
              </div>
            </div>
            <q-space />
            <base-btn
              :disable="canSave"
              label="Save"
              padding="2px 10px"
              @click="onSaveFile"
            ></base-btn>
          </q-toolbar>
          <template v-if="fileType === 'code'">
            <codemirror
              class="editor"
              v-model="code"
              :style="{ height: 'calc(100% - 50px)' }"
              v-bind="editorOptions"
            />
          </template>
          <div class="assets flex flex-center" v-else-if="fileType === 'image'">
            <q-img :style="imageStyle" :src="fileContent" />
          </div>
          <div class="no-selection" v-else>
            <q-responsive :ratio="1" style="max-height: calc(100vh - 120px)">
              <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
              <q-card-section class="border-radius-inherit flex flex-center">
                <div class="text-center">
                  <q-icon
                    style="opacity: 0.2"
                    size="100px"
                    name="fad fa-laptop-code"
                  />
                  <div class="q-mt-sm text-subtitle2">
                    Edit your theme's files
                  </div>
                  <div>Choose a file to start editing</div>
                </div>
              </q-card-section>
            </q-responsive>
          </div>
          <q-inner-loading color="primary" :showing="loading">
            <q-spinner-ios size="50px" />
          </q-inner-loading>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useThemeStore } from "stores/themes";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "quasar";
import AddThemeFile from "src/components/AddThemeFile.vue";
import AddThemeAsset from "src/components/AddThemeAsset.vue";
import core from "src/services/core";

export default {
  components: {
    Codemirror,
  },
  setup() {
    const themeStore = useThemeStore();
    const route = useRoute();
    const router = useRouter();
    const fileTree = ref([]);
    const selected = ref(null);
    const selectedNode = ref(null);
    const files = ref(null);
    const theme = ref(null);
    const fileContent = ref("");
    const fileType = ref(null);
    const code = ref("");
    const loading = ref(false);
    const defaultCode = ref("");
    const extenstions = [githubLight];
    const editorOptions = ref({
      autofocus: true,
      disabled: false,
      extensions: [...extenstions],
    });
    const canSave = computed(() => defaultCode.value === code.value);
    const imageStyle = computed(() => {
      if (selectedNode.value.dimensions) {
        const { width, height } = selectedNode.value.dimensions;
        return {
          width: width + "px",
          "max-width": "90vw",
        };
      }
      return {};
    });

    const loadThemeFiles = async (themeKey) => {
      try {
        const { files, info } = await themeStore.files(themeKey);
        theme.value = info;
        fileTree.value = files.map((item) => {
          // Recursively map through children and add `parent`
          const traverseChildren = (node) => {
            if (Array.isArray(node.children)) {
              const children = node.children.map((child) => ({
                ...child,
                parent: node.basepath, // Add the parent property
                children: traverseChildren(child), // Recursively handle deeper levels
              }));

              if (!["assets", "views"].includes(node.basepath)) {
                // Add the 'add' item at the beginning of the children array
                children.unshift({
                  name: node.addLabel, // Assuming `addLabel` exists on the node
                  basepath: `${node.basepath}/add`,
                  parent: node.basepath,
                  header: "add",
                });
              }

              return children;
            }

            // Return empty array if no children exist
            return [];
          };

          // Start the recursive traversal from the root node
          item.children = traverseChildren(item);
          item.root = true;

          return item;
        });
      } catch (error) {
        console.error("Failed to load theme files:", error);
        router.push({ name: "Themes" });
      }
    };

    const onFileSelect = async (key) => {
      const fileRef = files.value;
      const file = fileRef.getNodeByKey(key);

      if (!key) return key;

      if (file.header === "directory") {
        return fileRef.setExpanded(file.basepath, selected.value !== key);
      }

      selectedNode.value = file;

      const ext = getFileExtension(file.name);
      if (["html", "css", "scss", "sass", "js", "php", "json"].includes(ext)) {
        fileType.value = "code";
        await loadFileContent(file);
      } else if (["png", "jpg", "svg", "jpg"].includes(ext)) {
        fileType.value = "image";
        fileContent.value = core.apiBaseURL(
          `/themes/${theme.value.key}/assets?path=${file.basepath}`
        );
      }
    };

    const loadFileContent = async (file) => {
      try {
        loading.value = true;
        const { content } = await themeStore.fileContent({
          theme: route.params.name,
          query: { key: file.basepath },
        });

        code.value = content; // Set the file content to the code variable
        defaultCode.value = content; // Set the file content to the code variable

        // Change the mode based on file extension
        switch (getFileExtension(file.name)) {
          case "html":
          case "php":
            editorOptions.value.extensions = [html(), ...extenstions]; // Set the extension for HTML
            break;
          case "css":
          case "scss":
          case "sass":
            editorOptions.value.extensions = [css(), ...extenstions]; // Set the extension for CSS
            break;
          case "js":
          case "json":
            editorOptions.value.extensions = [javascript(), ...extenstions]; // Set the extension for JavaScript
            break;
          default:
            editorOptions.value.extensions = [...extenstions];
            break;
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.error("Error loading file content:", error);
      }
    };

    const onSaveFile = async () => {
      themeStore
        .update({
          theme: route.params.name,
          data: { key: selected.value, content: code.value },
        })
        .then(() => {
          defaultCode.value = code.value;
        })
        .catch((err) => {
          core.error(err);
        });
    };

    const getFileExtension = (fileName) => {
      return fileName.split(".").pop().toLowerCase();
    };

    const addNewFile = (props) => {
      const parent = props.node.parent;
      const node = props.tree.getNodeByKey(parent);
      Dialog.create({
        component: node.ext ? AddThemeFile : AddThemeAsset,
        componentProps: {
          options: {
            children: node.children,
            basepath: node.basepath,
            ext: node.ext,
            theme: theme.value.key,
          },
          fileCreate: themeStore.fileCreate,
          title: node.addLabel,
        },
      }).onOk((file) => {
        console.log(file);

        node.children.push({ ...file, parent });
      });
    };

    const removeFile = (props) => {
      const { tree, node } = props;
      const parent = tree.getNodeByKey(node.parent);

      core
        .confirm(
          `Are you sure you want to delete <b>${node.basepath}</b>?
          This will affect your frontend and the action cannot be undone.`
        )
        .then(() => {
          themeStore
            .fileDestroy({
              theme: route.params.name,
              query: { key: node.basepath },
            })
            .then(() => {
              // Find the index of the file to remove in node.children
              const children = parent.children;
              const index = children.findIndex(
                ({ basepath }) => basepath === node.basepath
              );

              // If the file is found, remove it using splice
              if (index !== -1) {
                children.splice(index, 1);
                fileType.value = null;
                code.value = "";
              }
            })
            .catch((err) => {
              core.error(err);
            });
        });
    };

    onMounted(async () => {
      const themeKey = route.params.name; // Assuming route.params.name is defined
      await loadThemeFiles(themeKey);
      fileTree.value.forEach((element) => {
        files.value.setExpanded(element.basepath, true);
      });
    });

    return {
      theme,
      selected,
      files,
      fileTree,
      fileContent,
      fileType,
      code,
      addNewFile,
      removeFile,
      editorOptions,
      onFileSelect,
      onSaveFile,
      canSave,
      selectedNode,
      imageStyle,
      loading,
    };
  },
};
</script>

<style lang="scss">
.theme-paths {
  padding-right: 16px;
  .q-tree__arrow--rotate {
    transform: none;
    &:before {
      content: "\f07c" !important;
    }
  }
  .q-tree__icon,
  .q-tree__node-header-content .q-icon {
    font-size: 13px;
    margin-top: 3.25px;
  }
  .q-tree__node {
    padding: 0 0 3px 0px;
  }
  .q-tree__node-header {
    .q-tree__node-header-content .btn-delete {
      display: none;
    }
    &.q-tree__node--selected {
      .q-tree__node-header-content {
        display: block;
        .btn-delete {
          display: block;
        }
      }
    }
  }
}
.theme-paths-container {
  padding: 16px;
  padding-right: 0px;
  border-right: 1px solid $separator-color;
}
.editor-container {
  position: relative;
  height: calc(100vh - 55px);
}
.assets,
.no-selection {
  height: calc(100vh - 115px);
}
.assets > * {
  max-height: 100%;
}

.ͼo .cm-gutters {
  background-color: #f0f0f0;
}
.cm-editor {
  border: 1px solid $separator-color;
  &.cm-focused {
    outline: none;
  }
}
</style>
