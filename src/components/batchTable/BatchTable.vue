<template>
  <div class="BatchTable">
    <el-table ref="params-table" :data="tableData" style="width: 100%" height="300" size="mini" @selection-change="handleSelectionChange"  v-on="$listeners">
      <el-table-column type="selection" width="55" :selectable="selectable">
      </el-table-column>
      <el-table-column prop="key" label="键" min-width="120" header-align="center">
        <template slot-scope="scope">
          <el-input type="textarea" size="small" v-model="scope.row.key" @input="handleInput(scope)" autosize placeholder="key"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="值" min-width="120" header-align="center">
        <template slot-scope="scope">
          <el-input type="textarea" size="small" v-model="scope.row.value" @input="handleInput(scope)" autosize placeholder="value"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="" width="50" header-align="center">
        <template slot-scope="scope">
          <div class='operation-wrapper'>
            <i class="el-icon-delete pointer" @click="delRow(scope)" v-show="!scope.row.noDel"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'BatchTable',
  components: {

  },
  props: {

  },
  data () {
    return {
      tableData: []
    }
  },
  computed: {

  },
  methods: {
    /**
     * 输入事件
     */
    handleInput ({ $index, row }) {
      if ($index === this.tableData.length - 1) {
        // 是最后一行输入文字
        const table = this.$refs['params-table']
        if (table) {
          // 此行勾选中
          table.toggleRowSelection(row, true)
          row.isSelected = true
        }
        // 此行可删除
        row.noDel = false
        // 在下方添加一个空格行
        this.tableData.push({ key: '', value: '', noDel: true, isSelected: false })
      }
      // 此处是为了防止输入事件没有触发勾选事件导致的数据不同步问题
      this.$emit('change', this.tableData.filter(item => item.isSelected))
    },
    /**
     * 删除行
     */
    delRow ({ row, $index }) {
      if (!($index === 0 && this.tableData.length === 1)) {
        this.tableData.splice($index, 1)
      } else {
        // 只有一行，且此行有数据
        this.tableData.splice($index, 1, { key: '', value: '', noDel: true, isSelected: false })
      }
    },
    /**
     * 可以选中的行
     */
    selectable (row, index) {
      return !row.noDel
    },
    /**
     * 勾选发生变化
     */
    handleSelectionChange (e) {
      this.tableData.forEach(item => {
        item.isSelected = false
      })
      e.forEach(item => {
        item.isSelected = true
      })
      this.handleSend()
    },
    handleSend () {
      this.$emit('change', this.tableData.filter(item => item.isSelected))
    }
  },
  watch: {

  },
  created () {
    this.tableData.push({ key: '', value: '', noDel: true, isSelected: false })
  },
  mounted () {

  },
  beforeDestroy () {

  }
}
</script>
<style lang="scss" scoped>
.BatchTable {
  font-size: 12px;
}
</style>
