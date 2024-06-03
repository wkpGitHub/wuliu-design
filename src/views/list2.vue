<script lang="jsx">
import pageList from '@/components/page-list'

export default {
  name: 'list-2',
  setup() {
    const tableColumns = [
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
    ]
    const searchFieldList = [
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

    const formFieldList = [
      { label: '名称', prop: 'name' },
      { label: '名称2', prop: 'name2' },
      { label: '名称3', prop: 'name3' },
      { label: '状态', prop: 'status', required: true, type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
      {
        label: '表格', type: 'table', prop: 'users', span: 2, value: [{ name: 'kp', age: 32 }, { name: 'kp', age: 32 }], columns: [
          { label: '名称', prop: 'name', writeable: true },
          { label: '年龄', prop: 'age' },
          {
            label: '操作', width: 50, slots: {
              default() {
                return <ElButton link type="danger">删除</ElButton>
              }
            }
          }
        ]
      }
    ]
    return () => <pageList class="page-list-2" tableColumns={tableColumns} searchFieldList={searchFieldList} formFieldList={formFieldList} api={{}}>
    </pageList>
  }
}
</script>

<style lang="scss">
.page-list-2{
  overflow: auto;
  .page__main{
    overflow: visible;
    flex: unset;
  }
  .el-table{
    position: unset;
    overflow: visible;
  }
  .el-table__header-wrapper{
    position: sticky;
    top: 0;
    z-index: 9;
  }
  .el-table__inner-wrapper{
    position: unset;
  }
}
</style>