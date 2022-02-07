<script>

export default {
  name: "Home",
  components: {

  },
  data () {
    return {};
  },
  methods: {
    /**
     * 显示弹窗
     */
    showDialog () {
      this.$customDialog({
        title: "标题",
        content: this.renderContent,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
        isFooter: true,
      }
      );
    },
    /**
     * 弹窗ok事件
     */
    handleOk (value) {
       return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },
    /**
     * 弹窗cancel事件
     */
    handleCancel (value) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    /**
     * 弹窗内容
     */
    renderContent () {
      return (
        <div>
          我是第一个全屏弹窗,点击确定按钮时，两秒之后才关闭哦~~~
          <button onClick={() => {
            this.$customDialog({
              title: "二次弹窗",
              isFull: false,
              dialogStyle: {
                width: '30%',
                height: '30%',
                margin: 'auto',
                padding: '0'
              },
              content:'我居中了( •̀ ω •́ )y，我的长度和高度都是30%吼',
              isFooter: true,
            })
          }}>二次弹窗</button>
        </div>
      );
    }
  },
  mounted () { },
  render () {
    return (
      <div>
        <button onClick={this.showDialog}>弹窗</button>
      </div>
    );
  }
};
</script>
