// @ts-nocheck
import CustomDialog from './CustomDialog.vue';

let customDialog = {}
customDialog.install = (Vue) => {
  // 创建组件构造器
  const CustomDialogwConstructor = Vue.extend(CustomDialog);
  // 创建组件对象
  const dialog = new CustomDialogwConstructor()
  // 将组件挂到某个元素上
  dialog.$mount(document.createElement('div'))
  // 在body上挂元素
  document.body.appendChild(dialog.$el);

  Vue.prototype.$customDialog = ({ title = '标题', content = '内容', onOk, onCancel, isFooter = false, isFull = true, dialogStyle = {} }) => {
    dialog.isVisible = true;
    dialog.isFooter = isFooter;
    dialog.isFull = isFull;
    dialog.dialogStyle = dialogStyle;
    dialog.$slots.title = typeof (title) === 'function' ? title() : title
    dialog.$slots.content = typeof (content) === 'function' ? content() : content
    dialog.ok = onOk;
    dialog.cancel = onCancel;
  }
};

export default customDialog;
