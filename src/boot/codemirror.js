import { boot } from "quasar/wrappers";
import { basicSetup } from "codemirror";
import VueCodemirror from "vue-codemirror";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(VueCodemirror, {
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: "Code goes here...",
    extensions: [basicSetup],
  });
});
