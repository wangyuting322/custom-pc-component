<script>
export default {
  name: 'Tag',
  components: {

  },
  props: {
    /**
     * 模式 - dark | plain
     */
    mode: {
      type: String,
      default: 'dark'
    },
    /**
     * 是否需要关闭
     */
    closable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#428FFC'
    },
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  },
  computed: {
    formatStyle () {
      let { mode, color, customStyle } = this
      let style = null
      if (mode === 'dark') {
        style = {
          backgroundColor: color,
          color: 'white',
          ...customStyle
        }
      } else if (mode === 'plain') {
        style = {
          backgroundColor: 'white',
          color: color,
          border: ` ${color} 1px solid`,
          ...customStyle
        }
      } else {
        style = {
          ...customStyle
        }
      }
      return style
    }
  },
  methods: {
    handleDel () {
      this.$emit('delete')
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
      <transition name='scaleX'>
        <div class={`custom-tag flex-row flex-ai-center`} style={{ ...this.formatStyle }}>
          <div class='custom-tag-label'>
            {this.$slots.default}
          </div>
          <div class='custom-tag-del flex-row flex-ai-center flex-jc-center ml5 mt3 mb3 pointer' v-show={this.closable} onClick={this.handleDel}>x</div>
        </div>
      </transition>
    )
  }
}
</script>
<style lang="scss" scoped>
.custom-tag {
  border-radius: 5px;
  width: fit-content;
  padding: 1px 4px;
  margin: 1px;
  &-label {
    flex-shrink: 0;
    flex-grow: 0;
    width: fit-content;
    line-height: 20px;
  }
  &-del {
    width: 20px;
    height: 20px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    }
  }
}

// 放大缩小
.scaleX-enter-active, .scaleX-leave-active {
  transition: all .3s;
  transform-origin: center;
}
.scaleX-enter, .scaleX-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scaleX(0);
}
</style>
