import {reactive, computed, ref} from 'vue'
import {genTableColumn} from './render'
export function useTable({columns}) {
  const state = reactive({
    data: [],
    columns
  })

  const tableRef = ref()

  // 全选
  const checkedAll = computed(() => {
    const {length} = state.data
    const checkLength = state.data.filter(item => item._checked)?.length
    if (length) {
      return length === checkLength
    } else {
      return false
    }
  })
  // 半勾选
  const indeterminate = computed(() => {
    const {length} = state.data
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
    return  <div class="page__main">
      <ElTable ref={tableRef} border data={state.data}>
        {columns.map(col => genTableColumn({col, changeCheckStatus, checkedAll, indeterminate}))}
      </ElTable>
    </div>
  }

  return {
    renderTable,
    table: state,
    tableRef
  }
}