<script lang="jsx">
import { useSearch } from '@/hooks/searchHook'
import { useTable } from '@/hooks/tableHook'
import { usePagination } from '@/hooks/paginationHook'
import { reactive } from 'vue'
import DialogForm from '@/components/dialogForm'
import {computed} from 'vue'

export default {
    name: 'page-list',
    props: {
        tableColumns: [],
        searchColumns: [],
        formColumns: [],
        apiMap: {}
    },
    setup() {
        const { genTable, table } = useTable({
            columns: [
                { type: 'checkbox', fixed: 'left', width: 35 },
                { label: 'Date', prop: 'date', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Name', prop: 'name', width: 180 },
                { label: 'Address', prop: 'address', width: 280 },
                {
                    label: '操作', fixed: 'right', width: 90, slots: {
                        default ({ row, $index }) {
                            return <div>
                            <ElButton link type="primary" onClick={() => editRow(row, $index)}>编辑</ElButton>
                            <ElButton link type="danger" onClick={() => console.log(row, $index)}>删除</ElButton>
                        </div>
                        }
                    }
                },
            ]
        })

        function editRow(row) {
            state.isShowModal = true
            state.currentRow = row
        }

        const { genPagination, pagination } = usePagination()

        const { genSearch, searchState } = useSearch({
            fieldList: [
                {
                    label: '名称', prop: 'name', type: '', defaultValue: '', onChange(v, form, fieldList) {
                        if (v) {
                            form.status = 0
                            fieldList.find(item => item.prop === 'status').label = '是否启用'
                        }
                    }
                },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                { label: '占两格', prop: 'span', span: 2, options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
            ]
        })


        const formFieldList = [
            {
                isGroup: true,
                
                render({ genChildren }) {
                    return <div class="page__card" style={{gridColumn: 'span 2'}}>
                        <h4>标题</h4>
                        {genChildren()}
                    </div>
                },
                children: [
                    { label: '名称', prop: 'name' },
                    { label: '名称2', prop: 'name2' },
                    { label: '名称3', prop: 'name3' },
                ]
            },
            { label: '状态', prop: 'status', required: true, type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
            {
                label: '表格', type: 'table', prop: 'users', span: 2, value: [{ name: 'kp', age: 32 }, { name: 'kp', age: 32 }], columns: [
                    { label: '名称', prop: 'name', writeable: true },
                    { label: '年龄', prop: 'age' },
                    {label: 'cc', slots: {
                        default() {
                            return <ElButton>删除</ElButton>
                        }
                    }}
                ]
            }
        ]

        function sizeChange(pageSize) {
            pagination.page = 1
            pagination.pageSize = pageSize
            getTableData()
        }

        function currentChange(page) {
            pagination.page = page
            getTableData()
        }

        function search() {
            pagination.page = 1
            console.log(table.data)
            debugger
            getTableData()
        }

        function getTableData() {
            console.log(searchState.form)
            table.data = Array.from({ length: pagination.pageSize }, () => ({
                date: Math.random(),
                name: Math.random().toString(16),
                address: 'No. 189, Grove St, Los Angeles',
            }))
            pagination.total = Math.floor(Math.random() * 1000)
        }
        getTableData()

        const state = reactive({
            isShowModal: false,
            currentRow: {}
        })

        const checkedList = computed(() => table.data?.filter(item => item._checked) || [])

        return () => <div class="page-list">
            {genSearch({ search })}
            <div class="page__operate">
                <ElButton type="primary" onClick={() => state.isShowModal = true}>新增</ElButton>
                <ElButton type="danger" disabled={checkedList.value.length === 0} plain>删除</ElButton>
            </div>
            {genTable()}
            {genPagination({
                sizeChange,
                currentChange
            })}
            {state.isShowModal && <DialogForm fieldList={formFieldList} form={state.currentRow} onClose={() => state.isShowModal = false} />}
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