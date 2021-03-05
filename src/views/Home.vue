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
        isFooter: true,
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
     * tips:如果内容为组件，组件中需要调用store，则直接用store，不要用this.$store（指针异常）
     */
    renderContent () {
      return (
        <div>
          fsdfdgfdneir内容
          <button onClick={() => {
            this.$customDialog({
              title: "ss标题",
              content: 'this.renderContent',
              isFooter: true,
            })
          }}>4546</button>
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
