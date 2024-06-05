import { reactive, computed, ref } from 'vue'
import { genTableColumn } from './render'
export function useTable({ columns, withTableHandler, tableHandlerSlot, tableHandlerWidth, editRow, deleteRow }) {
  const state = reactive({
    data: [],
    columns
  })

  if (withTableHandler) {
    columns.push({
      label: '操作', type: 'handler', fixed: 'right', width: tableHandlerWidth, slots: {
        default({ row, $index }) {
          return tableHandlerSlot ? tableHandlerSlot({editRow, deleteRow, row, $index}) : <>
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
      <ElTable class="remove-border-table" border ref={tableRef} data={state.data}>
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