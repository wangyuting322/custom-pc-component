<script>

export default {
  name: "Home",
  components: {

  },
  data () {
    return {};
  },
  methods: {
    showDialog () {
      this.$customDialog({
        title: "标题",
        content: this.renderContent,
        onOnk: this.handleOk,
        onCancel: this.handleCancel,
        // isFooter: false,
        // isFull: false,
        // dialogStyle: {
        //   height: '400px'
        // }
      }
      );
    },
    /**
     * 弹窗ok事件
     */
    handleOk (value) {
      return new Promise((resolve, reject) => {
        resolve();
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
          fsdfdgfdneir内容
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
