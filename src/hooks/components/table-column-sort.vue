<script lang="jsx">
import { reactive, watch, computed } from 'vue'
import VueDraggable from 'vuedraggable'

export default {
  props: {
    columns: Array
  },
  setup(props, {emit}) {
    const state = reactive({
      showPopover: false,
      columns: [], // 中间展示的列
      startColumns: [], // 开始列如果包含 index, checkbox
      endColumns: [] // 结束操作列如果包含 handler
    })

    const nextFixedIndex = computed(() => {
      return state.columns.findLastIndex(col => col.fixed === 'left') + 1
    })

    watch(() => state.showPopover, v => {
      if (v) {
        state.columns = []
        state.startColumns = []
        state.endColumns = []
        props.columns.forEach(col => {
          if (['index', 'checkbox'].includes(col.type)) {
            state.startColumns.push(col)
          } else if (col.type === 'handler') {
            state.endColumns.push(col)
          } else {
            col.show = !col.hidden
            state.columns.push({...col})
          }
        })
      }
    })
    // 置顶
    function toTop(element, index) {
      state.columns.splice(index, 1)
      // 如果当前元素是置顶的，直接排到第一位置
      if (element.fixed) {
        state.columns.unshift(element)
      } else {
        // 如果当前元素不是置顶的，排到最后一个置顶元素后面
        state.columns.splice(nextFixedIndex.value, 0, element)
      }
    }
    // 固定和取消固定
    function toFixed(element, index) {
      // 取消固定
      if (element.fixed === 'left') {
        state.columns.splice(index, 1)
        state.columns.splice(nextFixedIndex.value, 0, element)
        Reflect.deleteProperty(element, 'fixed')
        return
      } 
      // 固定,最多7个
      if (nextFixedIndex.value < 7) {
        state.columns.splice(index, 1)
        state.columns.splice(nextFixedIndex.value, 0, element)
        element.fixed = 'left'
      }
    }

    // 反选
    function reverseSelect() {
      state.columns.forEach(item => {
        item.show = !item.show
      })
    }

    function selectAll() {
      state.columns.forEach(item => {
        item.show = true
      })
    }
    // 保存并应用
    function save() {
      const columns = state.columns.map(item => {
        const _item = {...item}
        if (!item.show) {
          item.hidden = true
        }
        return item
      })
      const allColumns = [...state.startColumns, ...columns, ...state.endColumns]
      state.showPopover = false
      emit('update:columns', allColumns)
    }

    function onMove({draggedContext, relatedContext}) {
      if (draggedContext.element.fixed) {
        return !!relatedContext.element.fixed
      }
      if (relatedContext.element.fixed) {
        return !!draggedContext.element.fixed
      } else {
        return true
      }
    }

    function createTopIcon(element, index) {
      // 最后一个固定按钮下面不需要置顶
      if (!element.fixed) {
        return index > nextFixedIndex.value
      } else {
        // 第一个位置不需要置顶
        return index > 0
      }
    }

    return () => <el-popover trigger="click" v-model:visible={state.showPopover} show-arrow={false} popper-class="table-column-sort-popover" popper-options={{ modifiers: [{ name: 'offset', options: { offset: [0, 8] } }] }} placement="bottom-end">{{
      reference: () => <i class={['iconfont', 'icon-setting', {active: state.showPopover}]}></i>,
      default: () => <>
        <div class="sort-section">
          <div class="select-mut">
            <span class="select-mut__title">批量显示操作</span>
            <el-button text type="primary" size="small" onClick={selectAll}>全选</el-button>
            <el-button class="ml-0" text type="primary" size="small" onClick={reverseSelect}>反选</el-button>
          </div>
          <div class="custom-list">
            <div class="sort-limit">最多可固定7项</div>
            <VueDraggable itemKey="prop" animation={300} v-model={state.columns} move={onMove} ghostClass="ghostClass" force-fallback={true} scroll-sensitivity={50}>{{
              item: ({ element, index }) => <div class={{'sort-item': true, 'has-fixed': element.fixed}}>
                <i class="iconfont icon-drag"></i>
                <el-checkbox class="pl-1" v-model={element.show} />
                <span class="sort-item-title oneLine">{element.label}</span>
                <div class="sort-item-right">
                  {createTopIcon(element, index) && <el-tooltip popper-class="show-arrow-popover" content="置顶" effect="dark" placement="top" hide-after={0} enterable={false}>
                    <i class="iconfont icon-top" onClick={() => toTop(element, index)}></i>
                  </el-tooltip>}
                  <el-tooltip popper-class="show-arrow-popover" content={element.fixed ? '取消固定' : '固定'} effect="dark" placement="top"  hide-after={0} enterable={false}>
                    <i class={['iconfont', `${element.fixed ? 'icon-pin-lock' : 'icon-pin'}`, {disabled: nextFixedIndex.value >= 7}]} onClick={() => toFixed(element, index)}></i>
                  </el-tooltip>
                </div>
              </div>
            }}</VueDraggable>
          </div>
        </div>
        <div class="footer-between">
          <el-button size="small">恢复默认</el-button>
          <div class="footer-right">
            <el-button size="small" onClick={() => state.showPopover = false}>关闭</el-button>
            <el-button size="small" type="primary" onClick={save}>保存并应用</el-button>
          </div>
        </div>
        </>
    }}</el-popover>
  }
}
</script>

<style lang="scss">
.table-column-sort-popover {
  &.el-popper{
    width: 400px !important;
    max-height: 540px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .15);
  }

  .custom-list {
    flex: 1;
    overflow: hidden;
  }

  .sort-section {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;

    .select-mut {
      padding: 8px 12px;
      border-bottom: var(--border);
      display: flex;
      align-items: center;

      &__title {
        font-weight: 600;
        color: #0b1019;
        font-size: 12px;
        line-height: 18px;
        margin-right: 8px;
      }
    }

    .sort-limit {
      padding-left: 15px;
      margin-top: 10px;
      padding-bottom: 4px;
      color: #a6abb4;
    }

    .custom-list {
      overflow-y: auto;
      padding-bottom: 10px;
      flex: 1;
    }
    .ghostClass{
      opacity: 0;
    }
    .sort-item {
      display: flex;
      align-items: center;
      height: 32px;
      max-width: 100%;
      padding: 0 12px;
      user-select: none;

      .icon-pin-lock {
        display: block !important;
      }

      &:hover {
        background: rgba(0, 91, 245, .06);

        .sort-item-right .iconfont {
          display: block;
        }
      }
    }

    .icon-drag {
      cursor: grab;
      flex-shrink: 0;
    }

    .sort-item-title {
      flex: 1;
      padding: 0 8px;
      cursor: grab;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sort-item-right {
      display: flex;
      height: 32px;
      align-items: center;

      .iconfont {
        margin-left: 8px;
        color: #888c94;
        line-height: 16px;
        height: 16px;
        display:none;
        &:hover{
          color: var(--el-color-primary);
        }
        &.icon-pin.disabled{
          cursor: not-allowed;
          color: #bfc2c7;
        }
      }
    }
  }
}
</style>