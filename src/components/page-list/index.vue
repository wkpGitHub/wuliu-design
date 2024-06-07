<script lang="jsx">
import { useSearch } from '@/hooks/searchHook'
import { useTable } from '@/hooks/tableHook'
import { usePagination } from '@/hooks/paginationHook'
import { reactive, computed } from 'vue'
import DialogForm from '@/components/dialog-form'
import { ElMessage, ElMessageBox } from 'element-plus'
import TableColumSort from '@/components/table-column-sort'
import {auth} from '@/request'

export default {
    name: 'page-list',
    props: {
        tableConfig: {
            type: Object,
            default: () => ({
                columns: [],
                withHandler: true,
                handlerWidth: 90
            })
        },
        searchConfig: {
            type: Object,
            default: () => ({
                labelWidth: 75,
                configList: [],
                onSearch: () => {},
                onReset: () => {}
            })
        },

        formConfig: {
            type: Object,
            default: () => ({
                configList: [],
                labelWidth: 75,
                grid: 2
            })
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
            handlerSlot: slots.tableHandler,
            editRow,
            deleteRow,
            ...props.tableConfig,
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
            onSearch: search,
            ...props.searchConfig
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
            auth.list({ pageSize: paginationState.pageSize }).then(data => {
                tableState.data = data.data
                paginationState.total = data.total
            })
            
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

        function save({form}) {
            return auth.create(form)
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
            <DialogForm v-model={state.isShowModal} title={state.modalTitle} formConfig={props.formConfig} form={state.currentRow} onConfirm={save} />
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