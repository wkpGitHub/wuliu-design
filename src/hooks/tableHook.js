import { reactive, computed, ref } from 'vue'
import { genTableColumn } from './render'
export function useTable({ columns, withHandler=true, handlerSlot, handlerWidth=90, editRow, deleteRow }, data = []) {
  const state = reactive({
    data,
    columns
  })

  if (withHandler) {
    columns.push({
      label: '操作', type: 'handler', fixed: 'right', width: handlerWidth, slots: {
        default({ row, $index }) {
          return handlerSlot ? handlerSlot({editRow, deleteRow, row, $index}) : <>
            <ElButton link type="primary" onClick={() => editRow(row, $index)}>编辑</ElButton>
            <ElButton link type="danger" onClick={() => deleteRow(row, $index)}>删除</ElButton>
          </>
        }
      }
    })
  }

  const tableRef = ref()

  // 全选
  const checkedAll = computed(() => {
    const { length } = state.data
    const checkLength = state.data.filter(item => item._checked)?.length
    if (length) {
      return length === checkLength
    } else {
      return false
    }
  })
  // 半勾选
  const indeterminate = computed(() => {
    const { length } = state.data
    const checkLength = state.data.filter(item => item._checked)?.length
    if (checkLength) {
      return length !== checkLength
    } else {
      return false
    }
  })

  function changeCheckStatus(v) {
    state.data.forEach(item => item._checked = v)
  }

  function renderTable() {
    return <div class="page__main">
      <ElTable row-key="id" class="remove-border-table" border ref={tableRef} data={state.data}>
        {state.columns.map(col => genTableColumn({ col, changeCheckStatus, checkedAll, indeterminate }))}
      </ElTable>
    </div>
  }

  return {
    renderTable,
    tableState: state,
    tableRef
  }
}