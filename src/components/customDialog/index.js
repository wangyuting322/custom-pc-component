// @ts-nocheck
import CustomDialog from './CustomDialog.vue';

CustomDialog.install = (Vue) => {
  Vue.component(CustomDialog.name, CustomDialog);
  // 创建组件构造器
  const CustomDialogConstructor = Vue.extend(CustomDialog);

  Vue.prototype.$customDialog = function ({ title = '标题', content = '内容', onOk, onCancel, isFooter = false, isFull = true, dialogStyle = {} }) {
    // 构造器构造一个dialog对象
    let dialog = new CustomDialogConstructor({store:this.$store});
    // 将组件挂到某个元素上
    let { $el } = dialog.$mount(document.createElement('div'));
    // 在body上挂元素
    document.body.appendChild($el);
    // 监听close事件，去除当前的窗口
    dialog.$on("close", () => {
      dialog.$nextTick(() => {
        document.body.removeChild($el)
      })
    })
    dialog.$nextTick(() => {
      dialog.isVisible = true;
    })
    dialog.isFooter = isFooter;
    dialog.isFull = isFull;
    dialog.dialogStyle = dialogStyle;
    dialog.content = content
    dialog.title = title
    dialog.ok = onOk;
    dialog.cancel = onCancel;
    dialog.close = () => {
      dialog.handleCancel()
    }
    return dialog;
  }
};

export default CustomDialog;
