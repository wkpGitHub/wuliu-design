import {reactive} from 'vue'
export function useTable({columns}) {
  const state = reactive({
    data: []
  })

  function genTable() {
    return  <div class="page__main">
      <ElTable border data={state.data}>
        {columns.map(item => {
          const {slots} = item
          return <ElTableColumn {...item}>{slots}</ElTableColumn>
        })}
      </ElTable>
    </div>
  }

  return {
    genTable,
    table: state
  }
}