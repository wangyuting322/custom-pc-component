<script>
/**
 * 自动省略并显示tooltip的组件
 */
export default {
  name: 'ToolTip',
  components: {

  },
  props: {
    lineNum: {
      type: Number,
      default: 1
    },
    outerWidth: {
      type: Number,
      default: 120
    },
    content: {
      type: String | Number,
      default: ''
    },
    tooltipProps: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isElTooltipShow: true
    }
  },
  computed: {

  },
  methods: {
    hanldeShowTooltip (e) {
      // 如果是多行省略
      if (this.lineNum > 1) {
        // 判断是否超出高度
        const { scrollHeight, clientHeight } = e.target
        // 作比较：文本实际的宽度与外层壳的宽度
        this.isElTooltipShow = !!(scrollHeight <= clientHeight)
      } else {
        // 判断是否超出宽度
        const { scrollWidth, clientWidth } = e.target
        // 作比较：文本实际的宽度与外层壳的宽度
        this.isElTooltipShow = !!(scrollWidth <= clientWidth)
      }
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  render (h) {
    return (
      <div class="tool-tip">
        <el-tooltip
          effect="dark"
          disabled={this.isElTooltipShow}
          content={this.content}
          placement='top'
          {...{ props: { ...this.tooltipProps }, attrs: { ...this.tooltipProps } }}
        >
           <div class={`${this.lineNum === 1 ? 'ellipsis' : `ellipsis-line-${this.lineNum}`}`} style={{ width: this.outerWidth + 'px' }} onMouseenter={this.hanldeShowTooltip}>
            {this.content}
          </div>
        </el-tooltip>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>

</style>
