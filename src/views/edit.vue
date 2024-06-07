<script lang="jsx">
import PageHandler from '@/components/page-handler'
import FormCard from '@/components/formCard'
import { useForm } from '@/hooks/formHook'

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
            <div class="grid-columns-4">{genChildren()}</div>
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
            <div class="grid-columns-4">{genChildren()}</div>
          </FormCard>
        }
      }
    ]
    const { renderForm, formRef, formState } = useForm({ configList: fieldList, labelWidth: 80, span: 4 }, {rb: [{}, {}]})

    function setErrorMessage(config) {
      if (config.prop === 'consigneeName') {
        config.formItem = {
          'error': '收件人名字必填!',

        }
      }
    } 
    setTimeout(() => {
      formState.configList.forEach(config => {
        if (config.isGroup) {
          config.children.forEach(c => setErrorMessage(c))
        } else {
          setErrorMessage(config)
        }
      })
    }, 2000)


    async function confirm() {
      await formRef.value.validate()
      await new Promise((r) => {
        setTimeout(() => {
          r()
        }, 2000);
      })
    }
    return () => <PageHandler onConfirm={confirm}>
      <div class="ma-4">
        {renderForm()}
      </div>
    </PageHandler>
  }
}
</script>