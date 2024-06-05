<script lang="jsx">
import { useSearch } from '@/hooks/searchHook'
import { useTable } from '@/hooks/tableHook'
import { usePagination } from '@/hooks/paginationHook'
import { reactive, computed } from 'vue'
import DialogForm from '@/components/dialogForm'
import { ElMessage, ElMessageBox } from 'element-plus'
import TableColumSort from '@/hooks/components/table-column-sort'


export default {
    name: 'page-list',
    props: {
        tableColumns: {
            type: Array,
            default: () => []
        },
        searchFieldList: {
            type: Array,
            default: () => []
        },
        formFieldList: {
            type: Array,
            default: () => []
        },
        withTableHandler: {
            type: Boolean,
            default: true
        },
        tableHandlerWidth: {
            type: Number,
            default: 90
        },
        api: {}
    },
    setup(props, { slots }) {
        const state = reactive({
            modalTitle: '新增',
            isShowModal: false,
            currentRow: {},
        })

        const { renderTable, tableState } = useTable({
            columns: props.tableColumns,
            withTableHandler: props.withTableHandler,
            tableHandlerSlot: slots.tableHandler,
            tableHandlerWidth: props.tableHandlerWidth,
            editRow,
            deleteRow
        })

        function editRow(row, $index) {
            Object.assign(state, {
                modalTitle: '编辑',
                isShowModal: true,
                currentRow: row
            })
        }

        function deleteRow(row) {
            ElMessageBox.confirm('确认删除当前记录?', '提示', {
                type: 'warning',
            })
        }

        const { renderPagination, paginationState } = usePagination({
            onCurrentChange: currentChange,
            onSizeChange: sizeChange
        })

        const { renderSearch, searchState } = useSearch({
            labelWidth: 75,
            fieldList: props.searchFieldList,
            onSearch: search
        })

        function sizeChange(pageSize) {
            paginationState.page = 1
            paginationState.pageSize = pageSize
            getTableData()
        }

        function currentChange(page) {
            paginationState.page = page
            getTableData()
        }

        function search() {
            paginationState.page = 1
            getTableData()
        }

        function getTableData() {
            tableState.data = Array.from({ length: paginationState.pageSize }, () => ({
                date: Math.random(),
                name: Math.random().toString(16),
                address: 'No. 189, Grove St, Los Angeles',
            }))
            paginationState.total = Math.floor(Math.random() * 1000)
        }
        getTableData()

        const checkedList = computed(() => tableState.data?.filter(item => item._checked) || [])

        function addRow() {
            Object.assign(state, {
                modalTitle: '新增',
                isShowModal: true,
                currentRow: {}
            })
        }

        return () => <div class="page-list">
            {renderSearch()}
            <div class="page__operate">
                <div style={{ display: 'flex' }}>
                    <ElButton type="primary" onClick={addRow}>新增</ElButton>
                    <ElButton type="danger" disabled={checkedList.value.length === 0} plain>删除</ElButton>
                    <ElButton onClick={addRow}>审核</ElButton>
                </div>
                <div class="page__table-btn">
                    <TableColumSort v-model:columns={tableState.columns} />
                </div>
            </div>

            {renderTable()}
            {renderPagination()}
            {state.isShowModal && <DialogForm title={state.modalTitle} fieldList={props.formFieldList} form={state.currentRow} onClose={() => state.isShowModal = false} />}
            {slots.default?.()}
        </div>
    }
}
</script>

<style lang="scss">
.page-list {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>