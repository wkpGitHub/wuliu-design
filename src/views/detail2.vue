<script lang="jsx">
import FormCard from '@/components/formCard'
import { useForm } from '@/hooks/formHook'
import {renderReadForm, genTable} from '@/hooks/render'

export default {
  setup() {
    const fieldList = [
      {
        isGroup: true,
        children: [
          { label: '物流渠道', prop: 'consigneeName', required: true },
          { label: '物流商', prop: 'consigneeEmail', required: true },
        ],
        render({ genChildren }) {
          return <FormCard header="基本信息" style="grid-column: span 4" class="mb-4">
            <div class="grid-4">{genChildren()}</div>
          </FormCard>
        }
      },
      {
        isGroup: true,
        children: [
          { label: '计费规则', prop: 'rule' },
          { label: '材积参数', prop: 'cs', required: true },
          { label: '分抛计算', prop: 'cs', required: true, type: 'select', options: [] },
          {
            label: '规则列表', prop: 'rb', required: true, type: 'table', columns: [
              { label: '名称', prop: 'name', type: 'checkbox' },
              { label: '名称', prop: 'name', writeable: true },
              { label: '年龄', prop: 'age' },
              {
                label: '操作', width: 80, slots: {
                  default() {
                    return <ElButton>删除</ElButton>
                  }
                }
              }
            ], span: 3
          },
        ],
        render({ genChildren }) {
          return <FormCard header="运费规则" style="grid-column: span 4" class="mb-4">
            <div class="grid-4">{genChildren()}</div>
          </FormCard>
        }
      }
    ]
    const { renderForm, formRef, formState } = useForm({ configList: fieldList, labelWidth: 80, span: 4 }, {rb: [{}, {}]})

    const tableData = [
      {name: '比亚迪4S店', b: '人民币', s: '是', l: '82', order: '202409186022' },
      {name: '比亚迪4S店', b: '人民币', s: '是', l: '82', order: '202409186022' },
      {name: '比亚迪4S店', b: '人民币', s: '是', l: '82', order: '202409186022' },
      {name: '比亚迪4S店', b: '人民币', s: '是', l: '82', order: '202409186022' },
      {name: '比亚迪4S店', b: '人民币', s: '是', l: '82', order: '202409186022' },
      {name: '比亚迪4S店', b: '人民币', s: '是', l: '82', order: '202409186022' }
    ]

    const columns = [
      {prop: 'name', label: '供应商名称'},
      {prop: 'b', label: '币种', width: 90},
      {prop: 's', label: '含税', width: 90},
      {prop: 'l', label: '采购量', width: 90},
      {prop: 'order', label: '单号'},
    ]


    return () => <div class="detail-page">
      <FormCard header="基本信息" style="width: 1200px">
        <div class="read-form-grid">
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
      </FormCard>
      <FormCard header="基本信息" style="width: 1200px">
        <div class="read-form-grid">
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
          <div class="grid-item span--4" style="grid-area: 1/3/5/5">
            <label>备注</label>
            <div class="grid-item-content">
              {`    钢铁侠，本名托尼·史塔克，是美国漫威漫画旗下的超级英雄。
他初次登场于1963年的《悬疑故事》第39期，由斯坦·李、赖瑞·理柏、唐·赫克和杰克·科比联合创造。
托尼出生于1970年5月29日，是斯塔克工业（STARK INDUSTRIES）的CEO。`}
            </div>
          </div>
        </div>
      </FormCard>
      <FormCard header="清关费用" style="width: 1200px">
        {genTable({columns}, tableData)}
      </FormCard>
    </div>
  }
}
</script>

<style lang="scss" scoped>
.detail-page{
  background: #fff;
  height: 100%;
  overflow: auto;
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
    overflow: hidden;
    display: flex;
    label{
      padding: 8px;
      height: 30px;
      color: #888;
      line-height: 18px;
      width: 100%;
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