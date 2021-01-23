<script>
export default {
  name: "CustomDialog",
  props: {
    // 是否显示底部按钮
    isFooter: {
      type: Boolean,
      default: false
    },
    // 是否满屏
    isFull: {
      type: Boolean,
      default: true
    },
    // 非满屏状态下的对话框样式
    dialogStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    ok: () => {
      return true;
    },
    cancel: () => {
      return true;
    }
  },
  data() {
    return {
      // 是否显示
      isVisible: false
    };
  },
  computed: {
    customDialogStyle() {
      if (!this.isVisible) {
        return {
          display: "none"
        };
      }
      if (this.isFull) {
        return {
          position: "fixed",
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        };
      } else {
        return {
          // width: "100%",
          position: "relative",
          ...this.dialogStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        };
      }
    }
  },
  methods: {
    /**
     * 关闭
     **/
    async handleCancel() {
      let res = await this.cancel();
      this.isVisible = false;
      // this.$emit("cancel", this);
    },
    /**
     * 确定
     **/
    async handleOk() {
      let res = await this.ok();
      this.isVisible = false;
      // this.$emit("ok", this);
    }
  },
  watch: {},
  mounted() {},
  render() {
    return (
      <div
        class="custom-dialog"
        v-show={this.isVisible}
        style={this.customDialogStyle}
      >
        {/**头部 */}
        <div class="custom-dialog-header">
          {/**标题 */}
          <div class="custom-dialog-header-title">{this.$slots.title}</div>
          {/**标题右侧控制器 */}
          <div class="custom-dialog-header-controller">
            <div
              class="header-controller close-controller pointer"
              onClick={this.handleCancel}
              title="关闭"
            >
              X
            </div>
          </div>
        </div>
        {/**内容 */}
        <div class="custom-dialog-body">{this.$slots.content}</div>
        {/**按钮 */}
        <div class="custom-dialog-footer" v-show={this.isFooter}>
          {/**标题右侧控制器 */}
          <div class="custom-dialog-footer-controller">
            <div
              class="footer-controller cancel-button pointer"
              onClick={this.handleCancel}
            >
              取消
            </div>
            <div
              class="footer-controller ok-button pointer"
              onClick={this.handleOk}
            >
              确定
            </div>
          </div>
        </div>
      </div>
    );
  }
};
</script>
<style>
.custom-dialog {
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
}
.custom-dialog-header {
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  font-weight: 400;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 16px !important;
}
.custom-dialog-header-title {
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  margin: auto auto auto 0px;
}
.custom-dialog-header-controller {
  flex-grow: 0;
  display: flex;
  justify-content: flex-end;
  margin: auto 0px auto auto;
}
.header-controller {
  height: 32px;
  line-height: 32px;
  border-radius: 5px;
  font-size: 18px;
  white-space: nowrap;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
  padding: 0 15px;
  color: rgba(0, 0, 0, 0.5);
}
.header-controller:hover {
  color: rgba(0, 0, 0, 1);
}
.size-controller {
  /* font-size: 24px; */
}
.close-controller {
  margin-left: 8px;
}
.custom-dialog-body {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  overflow: auto;
}
.custom-dialog-footer {
  flex-grow: 0;
  flex-shrink: 0;
  padding: 10px 16px;
  background: transparent;
  border-top: 1px solid #e8e8e8;
}
.custom-dialog-footer-controller {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: auto 0px auto auto;
}
.footer-controller {
  height: 32px;
  line-height: 32px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  border: 1px solid #d9d9d9;
  text-align: center;
  padding: 0 15px;
}
.cancel-button {
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
}
.ok-button {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  margin-left: 8px;
}
.pointer {
  cursor: pointer;
}
</style>
