<script>
// 方法
import { preventDefault, cancelBubble } from '@/utils/common'

// 使用Enter分隔
export default {
  name: 'TagInputEnter',
  model: {
    props: 'value',
    event: 'change'
  },
  components: {

  },
  props: {
    value: {
      type: [String, Array],
      default: () => []
    },
    /**
     * tag的name的最大长度+1 - 要包含空格的长度
     */
    maxlength: {
      type: Number,
      default: 51
    }
  },
  data () {
    return {
      // 输入的值
      inputText: '',
      // 输入框的值
      textValue: '',
      // tag标签，对象数组，包含id，name，cacheKey
      tagArr: [],
      // 是否聚焦
      isActive: false,
      // 需要修改name的项
      nameItem: null
    }
  },
  computed: {

  },
  methods: {
    /**
     * 点击容器
     */
    handleClickWrapper () {
      this.$nextTick(() => {
        const input = this.$refs['tag-input']
        if (input) {
          input.focus()
        }
      })
    },
    /**
     * 聚焦
     */
    handleFocus () {
      this.isActive = true
    },
    /**
     * 取消聚焦
     */
    handleBlur () {
      this.isActive = false
    },
    /**
     * 输入文字
     */
    handleChange (e) {
      // 去除开头和结尾的空格
      this.textValue = e.target.value.trim()
      this.resetHeight()
    },
    /**
     * 重置输入框的高度
     */
    resetHeight () {
      this.$nextTick(() => {
        const input = this.$refs['tag-input']
        if (input) {
          const scrollHeight = input.scrollHeight
          if (!this.textValue) {
            // 没有文字时，内容回到最初的高度
            input.style.height = 'fit-content'
          } else {
            // textarea中有文字时，高度被文字撑开
            input.style.height = scrollHeight + 'px'
          }
        }
      })
    },
    /**
     * 监听按键
     */
    onKeyup (e) {
      let { key, code } = e
      const keyCode = e.keyCode
      if (key === 'Enter' && code === 'Enter') {
        // enter，且不是输入中的
        // 去除textarea的enter换行默认事件
        preventDefault(e)
        // 截断
        // 去除重复的tag
        this.tagArr.push({ name: this.textValue, key:new Date().getTime() })
        this.$emit('change', this.tagArr)
        this.textValue = ''
        this.changeTagArr()
        this.resetHeight()
      }
      if (keyCode === 32) {
        // 空格

      }
    },
    /**
     * 禁止粘贴
     */
    handlePaste (e) {
      // preventDefault(e)
    },
    /**
     * 删除tag
     */
    handleDelTag (index) {
      this.tagArr.splice(index, 1)
      this.changeTagArr()
    },
    /**
     * 修改名字
     */
    changeName (e) {
      this.nameItem.name = e.target.value
      this.$nextTick(() => {
        const input = this.$refs['rename-tag-input']
        if (input) {
          const scrollHeight = input.scrollHeight
          // textarea中有文字时，高度被文字撑开
          input.style.height = scrollHeight + 'px'
        }
      })
    },
    /**
     * 双击标签
     */
    handleDblclick (item, index) {
      this.nameItem = {
        ...item,
        index
      }
      this.$nextTick(() => {
        const input = this.$refs['rename-tag-input']
        input && input.focus()
        if (input) {
          const scrollHeight = input.scrollHeight
          // textarea中有文字时，高度被文字撑开
          input.style.height = scrollHeight + 'px'
        }
      })
    },
    /**
     * 确认修改name
     */
    confirmName () {
      const { id, name, index } = this.nameItem
      this.tagArr.splice(index, 1, { id, name })
      this.changeTagArr()
      this.nameItem = null
    },
    /**
     * 触发修改tagArr的事件
     */
    changeTagArr () {
      this.$emit('change', this.tagArr)
    },
    /**
     * 修改tag时输入enter
     */
    onKeyup2 (e) {
      let { key, code } = e
      if (key === 'Enter' && code === 'Enter') {
        // enter，且不是输入中的
        // 去除textarea的enter换行默认事件
        preventDefault(e)
        this.confirmName()
      }
    },
    /**
     * 渲染tag
     */
    renderTagItem (item, index) {
      const { id, name, key } = item
      const { nameItem } = this
      return (
        <div class='tag-item flex-row flex-ai-baseline m2 pl5 pr5 border-box' key={key} onClick={cancelBubble}>
          {
            nameItem && nameItem.index === index ? (
              <textarea
                ref='rename-tag-input'
                class='rename-tag-input'
                style='width:150px'
                value={nameItem.name}
                onInput={this.changeName}
                onKeyup={this.onKeyup2}
                maxlength={this.maxlength}
                minlength={1}
                rows={1}
                onBlur={this.confirmName}></textarea>
            ) : (
              <div class='tag-item-label  flex-row flex-ai-center flex-jc-center' onDblclick={() => this.handleDblclick(item, index)}>{name}</div>
            )
          }
          <div class='tag-item-del flex-row flex-ai-center flex-jc-center ml5 mt3 mb3 pointer' onClick={() => this.handleDelTag(index)}>x</div>
        </div>
      )
    }
  },
  watch: {
    value: {
      handler (newV) {
        if (newV) {
          this.tagArr = newV
        } else {
          this.tagArr = []
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  render (h) {
    return (
      <div class={`tag-input-wrapper ${this.isActive ? 'active-input' : ''}`} onClick={this.handleClickWrapper}>
        <div class='tag-wrapper flex-row flex-wrap'>
          {
            this.tagArr.map((item, index) => {
              return this.renderTagItem(item, index)
            })
          }
          <textarea class='tag-input' ref='tag-input' value={this.textValue} onFocus={this.handleFocus} onBlur={this.handleBlur} rows={1} minlength={1} maxlength={this.maxlength} onInput={this.handleChange} onKeyup={this.onKeyup} onPaste={this.handlePaste} {...{ attrs: this.$attrs, props: { ...this.$attrs } }} />
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.is-error .tag-input-wrapper {
  border-color: #f56c6c !important;
}
.active-input {
  border-color: $primary-color !important;
}
.tag-input-wrapper {
  padding: 8px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  font-size: 13px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.tag-wrapper {
  align-items: center;
}
.tag-item {
  border-radius: 5px;
  background: $primary-color;
  color: white;
  flex-shrink: 0;
  height: fit-content;
  max-width: calc(100% - 14px);
  &-label {
    max-width: calc(100% - 25px);
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
.rename-tag-input {
  border: none;
  resize: none;
  border-width: 0px;
  outline: none;
  color: #606266;
  max-width: calc(100% - 25px);
  padding: 0px;
  font-size: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
  word-break: break-all;
  overflow-x: hidden;
  overflow-y: hidden;
  &::placeholder {
    color: #c0c4cc;
    font-size: 13px;
  }
}
.tag-input {
  border: none;
  resize: none;
  border-width: 0px;
  outline: none;
  color: #606266;
  max-width: 100%;
  padding: 0px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 13px;
  word-break: break-all;
  overflow-x: hidden;
  overflow-y: hidden;
  flex-grow: 1;
  flex-shrink: 0;
  &::placeholder {
    color: #c0c4cc;
    font-size: 13px;
  }
}
</style>
