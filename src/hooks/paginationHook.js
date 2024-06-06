import { reactive, watch } from "vue";
import store from '@/store'
export function usePagination({onCurrentChange, onSizeChange, pageSize}) {
  const state = reactive({
    page: 1,
    pageSize: pageSize || store.globalSetting.pageSize,
    total: 400
  })
  watch(() => store.globalSetting, v => {
    debugger
    onSizeChange(pageSize || v.pageSize)
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