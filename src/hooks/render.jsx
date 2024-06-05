
/* 这个文件只处理渲染逻辑 */
import {computed, watch} from 'vue'
import ComboGroup from './components/combo-group'

export const popperOptions = {
  modifiers: [
    {
      name: 'offset',
      options: { offset: [0, 4] }
    }
  ]
}

export function genTable(state) {
  // 全选
  const checkedAll = computed(() => {
    const {length} = state.data
    const checkLength = state.data.filter(item => item._checked)?.length
    if (length) {
      return length === checkLength
    } else {
      return false
    }
  })
  // 半勾选
  const indeterminate = computed(() => {
    const {length} = state.data
    const checkLength = state.data.filter(item => item._checked)?.length
    if (checkLength) {
      return length !== checkLength
    } else {
      return false
    }
  })

  function changeCheckStatus(v) {
    state.data.forEach(item => item._checked = v)
  }

  return <ElTable key={state.key} border data={state.data}>
    {state.columns.map(col => genTableColumn({col, changeCheckStatus, checkedAll, indeterminate, fieldList: state.fieldList}))}
  </ElTable>
}

export function genTableColumn({col, changeCheckStatus, checkedAll, indeterminate, fieldList}) {
  // 隐藏列
  if (col.hidden) return null
  let {slots, ...otherProps} = col
  if (col.writeable) {
    slots = Object.assign({}, {
      default: ({row}) => {
        return genField(col, row, fieldList)
      }
    }, slots)
  }
 
  // 复选框
  if (col.type === 'checkbox') {
    return <ElTableColumn width={col.width || 30} resizable={false} label-class-name="table-checkbox-cell" {...otherProps}>{{
      header() {
        return <ElCheckbox v-model={checkedAll.value} indeterminate={indeterminate.value} onChange={changeCheckStatus} />
      },
      default({row}) {
        return <ElCheckbox v-model={row._checked} />
      }
    }}</ElTableColumn>
  } else if (col.type === 'radio') {
    return <ElTableColumn {...otherProps}>{{
      default({row}) {
        return <ElRadio name="radio" v-model={row._checked} />
      }
    }}</ElTableColumn>
  }
  return <ElTableColumn {...otherProps}>{{
    default: slots?.default,
    header: slots?.header
  }}</ElTableColumn>
}

export function genField(item, form, fieldList) {
  if (item.render) {
    return item.render(item, form, fieldList)
  }

  // 这个后续要做成一个映射表
  switch (item.type) {
    case 'select':
      return <ElSelect key={item.prop} v-model={form[item.prop]} placeholder={item.placeholder} multiple={item.multiple} collapse-tags style={item.style} clearable popper-options={popperOptions}>
        {item.options.map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
      </ElSelect>
    // case 'select':
    //   return <ElSelect key={item.prop} v-model={form[item.prop]} placeholder={item.placeholder} multiple={item.multiple} collapse-tags style={item.style} clearable popper-options={popperOptions}>
    //     {item.options.map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
    //   </ElSelect>
    case 'table':
      return genTable({columns: item.columns, data: form[item.prop], key: item.prop, fieldList})
    case 'date':
      return  <el-date-picker type={item.dateType} key={item.prop} v-model={form[item.prop]} start-placeholder={item.startPlaceholder}  end-placeholder={item.endPlaceholder} style={item.style} popper-options={popperOptions} />
    case 'radio':
      return <el-radio-group v-model={form[item.prop]} style={item.style}>
        {item.options.map(o => {
          return item.isButton ? <el-radio-button size={item.size} value={o.value} key={o.value}>{o.label}</el-radio-button> : <el-radio value={o.value} key={o.value}>{o.label}</el-radio>
        })}
      </el-radio-group>
    case 'combo': 
      return <ComboGroup v-model:field={form[item.prop[0]]} v-model:value={form[item.prop[1]]} v-model:list={form[item.prop[2]]} key={item.prop[0]} placeholder={item.placeholder} style={item.style} onSearch={item.onSearch} options={item.options} />
    default:
      return <ElInput key={item.prop} v-model={form[item.prop]} placeholder={item.placeholder} style={item.style} clearable />
  }
}


function getSearchItemStyle(item) {
  const _style = {}
  if (item.span) _style['grid-column'] = `span ${item.span}`
  return _style
}

export function genFormItem(item, form, fieldList) {
  let {rules = []} = item
  if (item.required) {
    rules.unshift({required: true, message: `${item.label}不能为空！`})
  }
  return <el-form-item style={getSearchItemStyle(item)} label={item.label} prop={item.prop} required={item.required} rules={rules}>
    {genField(item, form, fieldList)}
  </el-form-item>
}

export function renderItem(item, form, fieldList) {
  if (item.isGroup) {
    return item.render({
      genChildren: () => item.children.map(c => genFormItem(c, form, fieldList)),
      genFormItem,
      children: item.children,
      form,
      fieldList
    })
  } else {
    return genFormItem(item, form, fieldList)
  }
}

export function genForm (state) {
  return <el-form>
    {state.fieldList.map(item => renderItem(item, state.form, state.fieldList))}
  </el-form>
}