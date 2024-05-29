
import {ref} from 'vue'
export function genTable(state) {
  function changeCheckStatus(isCheckAllBox, v) {
    if (isCheckAllBox) {
      state.indeterminate = v
      state.data.forEach(item => item._checked = v)
    } else {
      const {length} = state.data
      // 如果有数据
      if (length) {
        const checkLength = state.data.filter(item => item._checked).length
        // 如果有勾选
        if (checkLength) {
          if (checkLength === length) {
            state.checkedAll = true
            state.indeterminate = false
          } else {
            state.indeterminate = true
          }
        } else {
          state.indeterminate = false
          state.checkedAll = false
        }
      } else {
        state.indeterminate = false
        state.checkedAll = false
      }
    }
  }

  return <ElTable key={state.key} border data={state.data}>
    {state.columns.map(col => {
      let {slots, ...otherProps} = col
      if (col.writeable) {
        slots = Object.assign({}, {
          default: ({row}) => {
            return genField(col, row)
          }
        }, slots)
      }

      // 复选框
      if (col.type === 'checkbox') {
        return <ElTableColumn {...otherProps}>{{
          header() {
            return <ElCheckbox v-model={state.checkedAll} indeterminate={state.indeterminate} onChange={v => changeCheckStatus(true, v)} />
          },
          default({row}) {
            return <ElCheckbox v-model={row._checked} onChange={() => changeCheckStatus()} />
          }
        }}</ElTableColumn>
      } else if (col.type === 'radio') {
        return <ElTableColumn {...otherProps}>{{
          default() {
            return <ElRadio name="radio" v-model={row._checked} />
          }
        }}</ElTableColumn>
      }
      return <ElTableColumn {...otherProps}>{{
        default: slots?.default,
        header: slots?.header
      }}</ElTableColumn>
    })}
  </ElTable>
}

export function genField(item, form) {
  if (item.render) {
    return item.render(item, form)
  }
  switch (item.type) {
    case 'select':
      return <ElSelect key={item.prop} v-model={form[item.prop]} placeholder={`请选择${item.label}`} clearable>
        {item.options.map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
      </ElSelect>
    case 'table':
      return genTable({columns: item.columns, data: form[item.prop], key: item.prop, isCheckAll: ref(false), indeterminate: ref(false)})
    default:
      return <ElInput key={item.prop} v-model={form[item.prop]} placeholder={`请输入${item.label}`} clearable />
  }
}

export function genFormItem(item, form) {
  return <el-form-item label={item.label} prop={item.prop}>
    {genField(item, form)}
  </el-form-item>
}

export function renderItem(item, form) {
  if (item.isGroup) {
    return item.render({
      genChildren: () => item.children.map(c => genFormItem(c, form)),
      genFormItem,
      children: item.children,
      form
    })
  } else {
    return genFormItem(item, form)
  }
}

export function genForm (state) {
  return <el-form>
    {state.fieldList.map(item => renderItem(item, state.form))}
  </el-form>
}