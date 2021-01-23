import CustomDialog from './CustomDialog.vue';

let customDialog={}
customDialog.install = (Vue) => {
   // 1.创建组件构造器
   const CustomDialogwConstructor = Vue.extend(CustomDialog);

  Vue.prototype.$customDialog=(title='标题',content='内容',onOk,onCancel,isFooter=false,isFull=true,dialogStyle={})=>{
    const dialog = new CustomDialogwConstructor()
    dialog.$mount(document.createElement('div'))
    dialog.isVisible  = true;
    dialog.isFooter  = isFooter;
    dialog.isFull  = isFull;
    dialog.dialogStyle  = dialogStyle;
    dialog.$slots.title = typeof(title)==='function'?title():title
    dialog.$slots.content  =  typeof(content)==='function'?content():content
     dialog.ok  = onOk;
    dialog.cancel  = onCancel;
    // dialog.$emit.ok  = onOk;
    // dialog.$emit.cancel  = onCancel;
    // dialog.native.onOk  = onOk;
    // dialog.native.onCancel  = onCancel;
    // dialog.on.onOk  = onOk;
    // dialog.on.onCancel  = onCancel;
    // dialog.on.ok  = onOk;
    // dialog.on.cancel  = onCancel;
    // dialog.nativeOn.onOk  = onOk;
    // dialog.nativeOn.onCancel  = onCancel;
    // dialog.$listeners.onOk  = onOk;
    // dialog.$listeners.onCancel  = onCancel;
    // dialog.nativeOn.ok  = onOk;
    // dialog.nativeOn.cancel  = onCancel;
    // dialog.$listeners.ok  = onOk;
    // dialog.$listeners.cancel  = onCancel;
// 在body上挂在元素
    document.body.appendChild(dialog.$el);
  }
};

export default customDialog;
