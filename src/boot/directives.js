import { boot } from "quasar/wrappers";

const createComment = (el, vnode, comment) => {
  vnode.elm = comment;
  vnode.text = " ";
  vnode.isComment = true;
  vnode.context = undefined;
  vnode.tag = undefined;

  if (vnode.componentInstance) {
    vnode.componentInstance.$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.directive("guard", (el, binding, vnode) => {
    const { arg } = binding;
    if (!app.config.globalProperties.$app.isGuard(arg)) {
      const comment = document.createComment(` guard:${arg} `);
      createComment(el, vnode, comment);
    }
  });
  app.directive("can", (el, binding, vnode) => {
    const { value } = binding;
    if (!app.config.globalProperties.$app.can(...value)) {
      const comment = document.createComment(` v-can `);
      createComment(el, vnode, comment);
    }
  });

  app.directive("tenant", (el, vnode) => {
    if (!app.config.globalProperties.$app.isMode("tenant")) {
      const comment = document.createComment(` v-tenant `);
      createComment(el, vnode, comment);
    }
  });

  app.directive("central", (el, vnode) => {
    if (!app.config.globalProperties.$app.isMode("central")) {
      const comment = document.createComment(` v-central `);
      createComment(el, vnode, comment);
    }
  });
});
