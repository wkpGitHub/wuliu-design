<script lang="jsx">
import pageList from '@/components/page-list'

export default {
  name: 'list-v',
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
      { label: '转单号集合', prop: 'name' },
      { label: '报关号集合', prop: 'name' },
      { label: '转单号集合', prop: 'name' },
      { label: '转单号集合', prop: 'name' },
      { label: '内单号集合', prop: 'name' },
      { label: '参考号集合', prop: 'name' },
      { label: '业务日期', prop: 'status', type: 'date', dateType:'daterange', span: 2 },
      { label: '目的地二字码集合', prop: 'name' },
      { label: '排除的目的地二字码集合', prop: 'name' },
      { label: '下家供应商', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
      { label: '内部渠道', prop: 'name' },
      { label: '外部渠道', prop: 'name' },
      { label: '渠道别名', prop: 'name' },
      { label: '开户类型', prop: 'name' },
      { label: '客户', prop: 'name' },
      { label: '客户名称集合', prop: 'name' },
      { label: '服务商袋号', prop: 'name' },
      { label: '打印模版', prop: 'status', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
      { label: '收件人姓名', prop: 'name' },
      { label: '收件人公司', prop: 'name' },
      { label: '收件人地址', prop: 'name' },
      { label: '收件人电话', prop: 'name' },
      { label: '收件人邮编', prop: 'name' },
      { label: '收件人省州', prop: 'name' },
      { label: '收件人城市', prop: 'name' },
      { label: '出重', prop: 'name' },
      { label: '计费重', prop: 'name' },
      { label: '申报价', prop: 'name' },
      { label: '是否操作提示', prop: 'name' },
      { label: '是否核收', prop: 'name' },
      { label: '是否核付', prop: 'name' },
      { label: '所属平台', prop: 'name' },
      { label: '归属财务', prop: 'name' },
      { label: '归属客服', prop: 'name' },
      { label: '归属销售', prop: 'name' },
      { label: 'ERP来源', prop: 'name',type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]  },
      { label: '有无IOSS号', prop: 'name',type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]  },
      { label: 'Fusion订单', prop: 'name',type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]  },
      { label: '快捷选项', prop: 'name' ,type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
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
    return () => <pageList tableColumns={tableColumns} searchFieldList={searchFieldList} formFieldList={formFieldList} api={{}}>
    </pageList>
  }
}
</script>