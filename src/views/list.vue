<script lang="jsx">
import pageList from '@/components/page-list'

export default {
  name: 'list-v',
  setup() {
    const tableColumns = [
      { type: 'checkbox', fixed: 'left' },
      { label: '物流单号', prop: 'date', width: 180 },
      { label: '运输方式', prop: 'name1', width: 180, slots: { default: () => <div>444</div> } },
      { label: '物流商', prop: 'name2', width: 180 },
      { label: '物流渠道', prop: 'name3', width: 180 },
      { label: '发货仓库', prop: 'name4', width: 180 },
      { label: '到货仓库', prop: 'name5', width: 180 },
      { label: '收货国家', prop: 'name6', width: 180 },
      { label: '关联单据', prop: 'name7', width: 180 },
      { label: '关联货件', prop: 'name8', width: 180 },
      { label: '物流商单号', prop: 'name9', width: 180 },
      { label: '轨迹信息', prop: 'name10', width: 180 },
      { label: '物流状态时间', prop: 'name11', width: 180 },
      { label: '物流状态详情', prop: 'name12', width: 180 },
      { label: '预估费用合计', prop: 'name13', width: 180 },
      { label: '实际费用合计', prop: 'name14', width: 180 },
      { label: '剩余到货天数', prop: 'name15', width: 180 },
      { label: 'Address', prop: 'address', width: 280 },
    ]
    const searchConfigList = [
      { type: 'radio', isButton: true, defaultValue: 'all', prop: 'r', options: [{ label: '全部', value: 'all' }, { label: '普通商品', value: 'pt' }] },
      {
        label: '转单号集合转单号集合', prop: 'name', dependOns: ['r', 'dateType2'], changeEffect(dependOnValues, form) {
          return {value: 'kp'}
        }
      },
      { label: '报关号集合', prop: 'ff', defaultValue: '喜欢', watch({value, oldValue, form, configList}) {
          console.log(value, oldValue, form, configList)
        }},
      {
        isGroup: true,
        width: 300,
        children: [
          { type: 'select', prop: 'dateType2', width: 100, clearable: false, options: [{ label: '下单日期', value: 1 }, { label: '发货日期', value: 2 }], value: 1 },
          { prop: 'status', type: 'date', dateType: 'daterange' },
        ]
      },
      { label: '目的地二字码集合', prop: 'name' },
      { label: '排除的目的地二字码集合', prop: 'name' },
      { label: '下家供应商', prop: 'xjgy', type: 'select', minWidth: 160, multiple: true, options: [{ label: 'United Arab Emirates', value: 1 }, { label: '北美洲\美国', value: 61 }, { label: '北美洲\巴西', value: 71 }, { label: '日本', value: 81 }, { label: '阿联酋', value: 0 }] },
      { type: 'combo', defaultValue: {search_field: 'all'}, prop: ['search_field', 'search_value', 'seniorSearchList'], dependOns: ['r'],  width: 320, options: [{ label: '转单号', value: 'all' }, { label: '正式单', value: 'pt' }], changeEffect({dependOnValues, value, config, form, configList}) {
          return {
            value: {
              search_field: 'all',
              search_value: '890',
              seniorSearchList: [
                {name:"转单号", search_field: 'all', search_value:['af', '11111']}
              ]
            }
          }
        } },
      {
        isMore: true,
        grid: 2,
        children: [
          { label: '收件人姓名', prop: 'cname' },
          { label: '收件人公司', prop: 'cc' },
          { label: '收件人地址', prop: 'caddress' },
          {
            isGroup: true,
            span: 2,
            label: '预估其他费用',
            children: [
              { type: 'select', prop: 'dateType', width: 120, style: { width: '200px' }, options: [{ label: '业务日期', value: 'yw' }, { label: '下单日期', value: 'xd' }] },
              { type: 'date', dateType: 'daterange', prop: 'date', itemWidth: '260px' },
            ]
          }
        ]
      }
    ]

    const formConfigList = [
      { label: '名称', prop: 'name' },
      { label: '名称2', prop: 'name2' },
      { label: '名称3', prop: 'name3' },
      { label: '状态', prop: 'status', required: true, type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
      {
        label: '表格', type: 'table', prop: 'users', span: 2, defaultValue: [{ name: 'kp', age: 32 }, { name: 'kp', age: 32 }], columns: [
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
    return () => <pageList tableConfig={{columns: tableColumns}} searchConfig={{configList: searchConfigList}} formConfig={{configList: formConfigList}} api={{}}>
    </pageList>
  }
}
</script>