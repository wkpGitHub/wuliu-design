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
                handlerSlot: () => {},
                showHandler: true,
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
        // 额外的参数,用于新增修改传参数【暂时用不上，后面有特殊处理不了的情况，再考虑】
        extraParams: Object,
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
    setup(props, { slots, expose }) {
        const state = reactive({
            modalTitle: '新增',
            isEdit: false,
            isShowModal: false,
            currentRow: {},
            loading: false
        })
        // 已勾选记录
        const checkedList = computed(() => tableState.data?.filter(item => item._checked) || [])

        // 新增
        function addRow() {
            Object.assign(state, {
                modalTitle: '新增',
                isEdit: false,
                isShowModal: true,
                currentRow: {}
            })
        }

        // 编辑
        function editRow(row, $index) {
            Object.assign(state, {
                modalTitle: '编辑',
                isEdit: true,
                isShowModal: true,
                currentRow: row
            })
        }

        // 删除
        function deleteRow(row) {
            ElMessageBox.confirm('确认删除当前记录?', '提示', {
                type: 'warning',
            }).then(() => {
                return props.api.delete(row)
            }).then(() => {
                ElMessage.success('删除成功！')
            }).catch((err) => {
                console.error(err)
            })
        }

        // 批量删除
        function batchDelete() {
            ElMessageBox.confirm('确认删除已勾选记录?', '提示', {
                type: 'warning',
            }).then(() => {
                return props.api.batchDelete(checkedList.value)
            }).then(() => {
                ElMessage.success('删除成功！')
            }).catch((err) => {
                console.error(err)
            })
        }

        // 保存：真正调用新增、修改接口的地方
        function save({form}) {
            if (state.isEdit) {
                return auth.update(form).then(() => {
                    ElMessage.success('编辑成功！')
                }).catch((err) => {
                    console.error(err)
                })
            } else {
                return auth.create(form).then(() => {
                    ElMessage.success('新增成功！')
                }).catch((err) => {
                    console.error(err)
                })
            }
        }

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
            state.loading = true
            auth.list({ pageSize: paginationState.pageSize }).then(data => {
                tableState.data = data.data
                paginationState.total = data.total
            }).finally(() => {
                state.loading = false
            })
            
        }
        

        // 查询模块
        const { renderSearch, searchState } = useSearch({
            onSearch: search,
            ...props.searchConfig
        })
        // table模块
        const { renderTable, tableState, tableRef } = useTable({
            editRow,
            deleteRow,
            ...props.tableConfig,
        })
        // 分页模块
        const { renderPagination, paginationState } = usePagination({
            onCurrentChange: currentChange,
            onSizeChange: sizeChange
        })

        // 表格上面操作栏
        function operateSlot() {
            if (slots.operate) {
                return slots.operate({addRow, batchDelete, tableState, checkedList})
            } else {
                return <div class="page__operate">
                    <div style={{ display: 'flex' }}>
                        <ElButton type="primary" onClick={addRow}>新增</ElButton>
                        <ElButton type="danger" disabled={checkedList.value.length === 0} plain onClick={batchDelete}>删除</ElButton>
                        <ElButton>审核</ElButton>
                    </div>
                    <div class="page__table-btn">
                        <TableColumSort v-model:columns={tableState.columns} />
                    </div>
                </div>
            }
        }

        expose({
            searchState,
            tableState,
            tableRef,
            paginationState,
            search,
            currentChange,
            sizeChange,
            save,
            addRow,
            editRow,
            deleteRow,
            batchDelete
        })

        getTableData()

        return () => <div class="page-list" v-loading={state.loading}>
            {renderSearch()}
            {operateSlot()}
            {renderTable()}
            {renderPagination()}
            {state.isShowModal && <DialogForm v-model={state.isShowModal} title={state.modalTitle} formConfig={props.formConfig} form={state.currentRow} onConfirm={save} />}
            {slots.default?.()}
        </div>
    }
}
</script>

<style lang="scss" scoped>
.page-list {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>