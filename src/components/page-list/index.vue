<script lang="jsx">
import { useSearch } from '@/hooks/searchHook'
import { useTable } from '@/hooks/tableHook'
import { usePagination } from '@/hooks/paginationHook'
import { useForm } from '@/hooks/formHook'
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
                { label: 'Date', prop: 'date', width: 280 },
                { label: 'Name', prop: 'name' },
                { label: 'Address', prop: 'address' },
                {
                    label: '操作', fixed: 'right', width: 110, slots: {
                        default: ({ row, $index }) => <>
                            <ElButton link type="primary" onClick={() => console.log(row, $index)}>编辑</ElButton>
                            <ElButton link type="primary" onClick={() => console.log(row, $index)}>删除</ElButton>
                        </>
                    }
                },
            ]
        })

        const { genPagination, pagination } = usePagination()

        const { genSearch, searchState } = useSearch({
            fieldList: [
                {
                    label: '名称', key: 'name', type: '', defaultValue: '', onChange(v, form, fieldList) {
                        if (v) {
                            form.status = 0
                            fieldList.find(item => item.key === 'status').label = '是否启用'
                        }
                    }
                },
                { label: '状态', key: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
            ]
        })

        const {genForm, formState} = useForm({
            fieldList: [
                {
                    isGroup: true,
                    render({genChildren}) {
                        return <div class="page__card">
                            <h4>标题</h4>
                            {genChildren()}
                        </div>
                    },
                    children: [
                        {label: '名称', prop: 'name'},
                        {label: '名称2', prop: 'name2'},
                        {label: '名称3', prop: 'name3'},
                    ]
                },
                { label: '状态', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
                {label: '表格', type: 'table', prop: 'users',  value: [{name: 'kp', age: 32},{name: 'kp', age: 32}], columns: [
                    {label: '名称', prop: 'name', writeable: true},
                    {label: '年龄', prop: 'age'},
                ]}
            ]
        })

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

        return () => <div class="page-list">
            {genSearch({ search })}
            {genTable()}
            {genPagination({
                sizeChange,
                currentChange
            })}
            {genForm()}
        </div>
    }
}
</script>

<style lang="scss">
.page-list{
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 100%;
    gap: 16px;
}
</style>