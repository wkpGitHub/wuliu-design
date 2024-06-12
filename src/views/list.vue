<script lang="jsx">
import pageList from '@/components/page-list'
import CDialog from '@/components/c-dialog.vue';
import {useRouter} from 'vue-router'
import {reactive} from 'vue'

export default {
  name: 'list-v',
  setup() {
    const router = useRouter()
    const state = reactive({
      showModal: false,
      isTow: false
    })

    function openModal(isTow) {
      state.isTow = isTow
      state.showModal = true
    }

    const tableColumns = [
      { type: 'checkbox', fixed: 'left' },
      { label: '物流单号', prop: 'date', width: 180, render({row}) {
        return <a onClick={() => router.push('/detail')}>页面详情</a>
      } },
      { label: '运输方式', prop: 'name1', width: 180, slots: { default: () => <a onClick={() => router.push('/detail2')}>页面详情2</a> } },
      { label: '物流商', prop: 'name2', width: 180, render({row}) {
        return <a onClick={() => openModal()}>弹窗详情</a>
      } },
      { label: '物流商', prop: 'name2', width: 180, render({row}) {
        return <a onClick={() => openModal(true)}>弹窗详情2</a>
      } },
      { label: '物流渠道', prop: 'name3', width: 180 , render({row}) {
        return <a onClick={() => router.push('/edit')}>页面编辑</a>
      } },
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
      { label: '报关号集合', prop: 'ff', watch({value, oldValue, form, configList}) {
          console.log(value, oldValue, form, configList)
        }},
      {
        isGroup: true,
        width: 300,
        children: [
          { type: 'select', defaultValue: 1, prop: 'dateType2', width: 100, clearable: false, options: [{ label: '下单日期', value: 1 }, { label: '发货日期', value: 2 }], value: 1 },
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
          { label: '收件人姓名', prop: 'cname', defaultValue: '康平' },
          { label: '收件人公司', prop: 'cc' },
          { label: '收件人地址', prop: 'caddress' },
          {
            isGroup: true,
            span: 2,
            label: '预估其他费用',
            children: [
              { type: 'select', prop: 'dateType', defaultValue: 1, width: 120, style: { width: '200px' }, options: [{ label: '业务日期', value: 1 }, { label: '下单日期', value: 2 }] },
              { type: 'date', dateType: 'daterange', prop: 'date', itemWidth: '260px' },
            ]
          }
        ]
      }
    ]

    const formConfigList = [
      { label: '名称', labelInfo: '对名称的描述信息', prop: 'name' },
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
      <CDialog v-model={state.showModal} title="详情" showFooter={false} width={900}>
        <div class={state.isTow ? 'read-form-grid2' : 'read-form-grid'}>
          <div class="grid-item">
            <label>中文报关名</label>
            <div class="grid-item-content">进出口货物</div>
          </div>
          <div class="grid-item">
            <label>英文报关名</label>
            <div class="grid-item-content">SKU</div>
          </div>
          <div class="grid-item">
            <label>报关清关材质</label>
            <div class="grid-item-content">-</div>
          </div>
          <div class="grid-item">
            <label>报关清关用途</label>
            <div class="grid-item-content">-</div>
          </div>
          <div class="grid-item">
            <label>品牌类型</label>
            <div class="grid-item-content">-</div>
          </div>
          <div class="grid-item">
            <label>出口享惠情况</label>
            <div class="grid-item-content">-</div>
          </div>
          <div class="grid-item">
            <label>特殊属性</label>
            <div class="grid-item-content">-</div>
          </div>
          <div class="grid-item">
            <label>内部编码</label>
            <div class="grid-item-content">-</div>
          </div>
          <div class="grid-item span--4">
            <label>备注</label>
            <div class="grid-item-content">
              {`    钢铁侠，本名托尼·史塔克，是美国漫威漫画旗下的超级英雄。
他初次登场于1963年的《悬疑故事》第39期，由斯坦·李、赖瑞·理柏、唐·赫克和杰克·科比联合创造。
托尼出生于1970年5月29日，是斯塔克工业（STARK INDUSTRIES）的CEO。`}
            </div>
          </div>
        </div>
      </CDialog>
    </pageList>
  }
}
</script>

<style lang="scss" scoped>
.detail-page{
  background: #fff;
  height: 100%;
}
.read-form-grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px 1px;
  border-radius: 4px;
  border: var(--border);
  overflow: hidden;
  background: var(--el-border-color);
  .grid-item{
    background: #fff;
    padding: 6px 8px;
    overflow: hidden;
    label{
      height: 18px;
      color: #888c94;
      line-height: 18px;
      width: 100%;
      flex-shrink: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 12px;
    }
  }
  .grid-item-content{
    line-height: 18px;
    font-size: 12px;
    white-space: pre-wrap;
  }
}
.read-form-grid2{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px 1px;
  border-radius: 4px;
  border: var(--border);
  overflow: hidden;
  background: var(--el-border-color);
  .grid-item{
    background: #fff;
    overflow: hidden;
    display: flex;
    label{
      padding: 8px;
      height: 30px;
      color: #888;
      line-height: 18px;
      width: 100%;
      flex-shrink: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 12px;
      text-align: right;
      width: 90px;
      height: 100%;
      border-right: var(--border);
      background-color: var(--label-bg-color);;
    }
  }
  .grid-item-content{
    padding: 8px;
    line-height: 18px;
    font-size: 12px;
    white-space: pre-wrap;
  }
}
</style>