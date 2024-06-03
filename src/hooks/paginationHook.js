import { reactive } from "vue";
export function usePagination({onCurrentChange, onSizeChange}) {
  const state = reactive({
    page: 1,
    pageSize: 50,
    total: 400
  })

  function renderPagination () {
    return <div class="page__pagination">
      <el-pagination
        v-model:current-page={state.page}
        v-model:page-size={state.pageSize}
        page-sizes={[10, 20, 50, 100]}
        layout="total, sizes, prev, pager, next, jumper"
        total={state.total}
        onSizeChange={onSizeChange}
        onCurrentChange={onCurrentChange}
      />
    </div>
  }

  return {
    renderPagination,
    paginationState: state
  }
}