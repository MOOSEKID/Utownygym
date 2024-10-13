import { Dialog } from "quasar";
import FileSelectorDialog from "src/components/FileSelectorDialog.vue";

export default (editor) => {
  try {
    const { Commands } = editor;
    Commands.add("open-assets", {
      run(editor, sender, opts) {
        const { select } = opts;
        const { AssetManager } = editor;
        const { Asset } = AssetManager;

        Dialog.create({
          component: FileSelectorDialog,
          componentProps: { loadFromServer: true },
        }).onOk((payload) => {
          select(new Asset({ src: payload.url }));
        });
      },
    });
  } catch (error) {
    console.error("Error setting the command:", error);
  }
};
