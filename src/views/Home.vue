<script>

export default {
  name: "Home",
  components: {

  },
  data () {
    return {
      tagArr1: ['sds', 'dsahfldkfld的身份的撒大第三的灵魂凤凰号火星疯狂的事犯了dasd'],
      tagArr: [],
      theme:[
        {
          text:'dark',
          theme:'dark'
        },{
          text:'light',
          theme:'light'
        }
      ]
    };
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
    handleDelete (item) {
      this.tagArr1 = this.tagArr1.filter(it => it !== item)
    },
    changeTheme (theme) {
      this.$store.commit('changeTheme',theme);
      window.document.documentElement.setAttribute("data-theme", theme);
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
              content: '我居中了( •̀ ω •́ )y，我的长度和高度都是30%吼',
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
        <div>
          <span>1、自定义弹窗</span>
          <button onClick={this.showDialog}>弹窗</button>
        </div>
        <div>
          <span>2、标签</span>
          {this.tagArr1.map(item => {
            return <Tag closable mode='dark' onDelete={() => { this.handleDelete(item) }}>{item}</Tag>
          })}
        </div>
        <div>
          <span>3、标签输入框，使用空格进行分割</span>
          <TagInput v-model={this.tagArr}></TagInput>
        </div>
        <div class='flex-row'>
          <span>4、div输入框</span>
          <div id="textarea" contenteditable="true" placeholder="请输入文字,不得少于100字"></div>
        </div>
        <div class='flex-row'>
          <span>5、修改主题色（transition: background-color进行过渡）</span>
          {
            this.theme.map(item => {
              let { text, theme } = item
              return <button onClick={() => this.changeTheme(theme)}>{text}</button>
            })
          }
          <div class='common-util' style='width:100px;height:100px;'></div>
        </div>
        <div class='flex-row'>
          <span>6、数字动画</span>
         <NumAnimation fromNum={-2666665} toNum={31310.55} toColor='#D32F2F' distanceNum={0}></NumAnimation>
        </div>
        <div class='flex-col'></div>
          <div>7、自动省略显示tooltip</div>
          <ToolTip lineNum={1} content={'4545fddsadafsafasffds'}></ToolTip>
          <ToolTip lineNum={1} content={'4545'}></ToolTip>
          <ToolTip lineNum={3} content={'454fsfsafasfaFsafasfbsahf飞洒发生asffasjfsakbfas飞洒发你拉石帆胜丰5'}></ToolTip>
          <ToolTip lineNum={1} content={'4545'}></ToolTip>
        </div>
      </div>
    );
  }
};
</script>
<style lang="scss" scoped>
// @import "@/style/_handle.scss";
.common-util {
  font-size: 18px;
  @include font_color("font_color1");
  @include background_color("background_color4");
  @include border_color("border_color4");
  // 颜色渐变
  transition: background-color .5s;  
}
</style>