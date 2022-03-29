<script>
export default {
  name: 'NumAnimation',
  components: {

  },
  props: {
    /**
     * 起始数值
     */
    fromNum: {
      type: Number,
      default: 0
    },
    /**
     * 结束数值
     */
    toNum: {
      type: Number,
      default: 0
    },
    /**
     * 结束时的颜色
     */
    toColor: {
      type: String,
      default: ''
    },
    /**
     * 递增/递减的间隔数值 - 若为0的话，则自动计算间隔数值
     */
    distanceNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      timer: null,
      currentNum: 0,
      // 间隔倍数 - 自动生成递增数时用到 - fromNum和toNum之间差距太大时，成倍递增
      distanceMul:60
    }
  },
  computed: {
    cacheDistanceNum () {
      let { fromNum, toNum, distanceNum } = this
      if (distanceNum) return distanceNum
      // 使用%进行取整，防止浮点型误差 https://blog.csdn.net/MFWSCQ/article/details/97783178
      // toNumber的小数部分长度
      let toDe=this.getDecimal(toNum)
      // fromNumber的小数部分长度
      let fromDe=this.getDecimal(fromNum)
      // toNumber的小数
      let toDistance = Math.abs(toNum % 1).toFixed(toDe)
      // fromNumber的小数
      let fromDistance = Math.abs(fromNum % 1).toFixed(fromDe)
      // 当fromNum和toNum之间差距太大时，成倍递增
      let dis = Math.abs(fromNum - toNum)
      let distance = (dis / 60).toFixed(Math.max(toDe,fromDe)) || 1
      return Math.max(toDistance, fromDistance, 1, distance)
    }
  },
  methods: {
    /**
     * 获取小数的小数位数长度
     */
    getDecimal (num) {
      // 获取整数部分
      let inter = Math.trunc(num)
      if (inter === num) {
        return 0
      } else {
        // 小数部分 - 防止浮点型产生的误差
        let decimalNum = inter.toString(10).replaceAll(/-*\d*\./g, '0.')
        return decimalNum.slice(2).length
      }
    },
    /**
     * 动态修改当前数值
     */
    changeNum () {
      let from = this.currentNum
      let to = this.toNum
      let { cacheDistanceNum } = this
      if (to > from) {
        this.timer = requestAnimationFrame(() => {
          this.timer && cancelAnimationFrame(this.timer)
          if (from + cacheDistanceNum >= to) {
            this.currentNum = to
            // this.timer && cancelAnimationFrame(this.timer)
          } else {
            // toFixed之后会变字符串
            this.currentNum = Number((from + cacheDistanceNum).toFixed(this.getDecimal(cacheDistanceNum)))
            this.changeNum()
          }
        })
      } else if (to < from) {
        this.timer = requestAnimationFrame(() => {
          this.timer && cancelAnimationFrame(this.timer)
          if (from - cacheDistanceNum <= to) {
            this.currentNum = to
          } else {
            // toFixed之后会变字符串
            this.currentNum = Number((this.currentNum - cacheDistanceNum).toFixed(this.getDecimal(cacheDistanceNum)))
            this.changeNum()
          }
        })
      }
    }
  },
  watch: {
    fromNum: {
      handler (newV, oldV) {
        if (newV !== undefined) {
          this.currentNum = newV
        }
      },
      immediate: true
    },
    toNum: {
      handler (newV, oldV) {
        if (newV !== undefined && newV !== this.fromNum) {
          this.changeNum()
        }
      },
      immediate: true
    },

  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {
    this.timer && cancelAnimationFrame(this.timer)
  },
  render (h) {
    return (
      <div>
        <div class='num-content' style={{ color: this.toColor }}>
          {this.currentNum}
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.num-content {
  transition: color 300ms;
}
</style>
