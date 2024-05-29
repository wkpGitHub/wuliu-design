import {reactive} from 'vue'
import {genTable as renderTable} from './render'
export function useTable({columns}) {
  const state = reactive({
    data: [],
    checkedAll: false,
    columns,
    indeterminate: false
  })

  function genTable() {
    return  <div class="page__main">
      {renderTable(state)}
    </div>
  }

  return {
    genTable,
    table: state
  }
}