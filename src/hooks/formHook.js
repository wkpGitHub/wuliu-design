import { reactive, watch } from "vue";
export function useForm({fieldList}) {
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.value) {
      total[current.prop] = current.value
    }
    return total
  }, {})
  const state = reactive({
    form: { ...defaultVals },
    fieldList
  })

  fieldList.forEach(filed => {
    if (filed.onChange) {
      watch(() => state.form[filed.prop], v => filed.onChange(v, state.form, state.fieldList))
    }
  })

  function genTable(item, form) {
    return <ElTable border data={form[item.prop]}>
      {item.columns.map(col => {
        let {slots} = col
        if (col.writeable) {
          slots = Object.assign({}, slots, {
            default: ({row}) => {
              return genField(col, row)
            }
          })
        }
        return <ElTableColumn {...col}>{slots}</ElTableColumn>
      })}
    </ElTable>
  }

  function genField(item, form) {
    switch (item.type) {
      case 'select':
        return <ElSelect v-model={form[item.prop]} placeholder={item.label} clearable>
          {item.options.map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
        </ElSelect>
      case 'table':
        return genTable(item, form)
      default:
        return <ElInput v-model={form[item.prop]} placeholder={item.label} clearable />
    }
  }

  function genFormItem(item) {
    return <el-form-item label={item.label} prop={item.prop}>
      {genField(item, state.form)}
    </el-form-item>
  }

  function renderItem(item) {
    if (item.isGroup) {
      return item.render({
        genChildren: () => item.children.map(c => genFormItem(c)),
        genFormItem,
        children: item.children
      })
    } else {
      return genFormItem(item)
    }
  }

  function genForm () {
    return <div class="page__card">
      <el-form>
        {state.fieldList.map(item => renderItem(item))}
      </el-form>
    </div>
  }

  return {
    genForm,
    formState: state
  }
}