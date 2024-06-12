
/* 这个文件只处理渲染逻辑, 不涉及响应式数据等问题 */
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

export function genTable(config, data) {
  // 全选
  const checkedAll = computed(() => {
    const {length} = data
    const checkLength = data.filter(item => item._checked)?.length
    if (length) {
      return length === checkLength
    } else {
      return false
    }
  })
  // 半勾选
  const indeterminate = computed(() => {
    const {length} = data
    const checkLength = data.filter(item => item._checked)?.length
    if (checkLength) {
      return length !== checkLength
    } else {
      return false
    }
  })

  function changeCheckStatus(v) {
    data.forEach(item => item._checked = v)
  }
  const {columns, prop, ...otherProps} = config || {}
  return <ElTable class="remove-border-table table-in-form" {...otherProps} key={prop} border data={data}>
    {columns.map(col => genTableColumn({col, changeCheckStatus, checkedAll, indeterminate, parentKey: prop}))}
  </ElTable>
}

export function genTableColumn({col, changeCheckStatus, checkedAll, indeterminate, parentKey}) {
  // 隐藏列
  if (col.hidden) return null
  let {slots, ...otherProps} = col
  if (col.writeable) {
    slots = Object.assign({}, {
      default: ({row, index}) => {
        return genFormItem(col, row, index)
      }
    }, slots)
  }
 
  // 复选框
  if (col.type === 'checkbox') {
    return <ElTableColumn width={col.width || 30} resizable={false} label-class-name="no-border-cell" class-name="no-border-cell" {...otherProps}>{{
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
    default: col?.render || slots?.default,
    header: slots?.header
  }}</ElTableColumn>
}

export function genField(config, form) {
  if (config.render) {
    return config.render(config, form)
  }

  const {type, label, defaultValue, formItem, slots, prop, watch, dependOns, changeEffect, options, ...otherProps} = config

  // 这个后续要做成一个映射表
  switch (type) {
    case 'select':
      // TODO：多个值,既需要value，又需要label
      return <ElSelect key={prop} v-model={form[prop]} collapse-tags popper-options={popperOptions} clearable {...otherProps}>
        {options.map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
      </ElSelect>
    case 'table':
      return genTable(config, form[prop] || [])
    case 'date':
      return  <el-date-picker type={config.dateType} key={prop} v-model={form[prop]} popper-options={popperOptions} clearable {...otherProps} />
    case 'radio':
      return <el-radio-group v-model={form[prop]}>
        {options.map(o => {
          return config.isButton ? <el-radio-button {...o} key={o.value}>{o.label}</el-radio-button> : <el-radio {...o} key={o.value}>{o.label}</el-radio>
        })}
      </el-radio-group>
    case 'combo': 
      return <ComboGroup v-model:field={form[prop[0]]} v-model:value={form[prop[1]]} v-model:list={form[prop[2]]} key={prop[0]} options={options} {...otherProps} />
    default:
      return <ElInput key={prop} v-model={form[prop]} clearable {...otherProps}>{slots}</ElInput>
  }
}


function getFormItemStyle(config) {
  const _style = Object.assign({}, config.formItem?.style)
  if (config.span) _style['grid-column'] = `span ${config.span}`
  return _style
}

export function genFormItem(config, form) {
  if (config.hidden) return null

  let {rules = [], formItem} = config
  if (config.required) {
    rules.unshift({required: true, message: `${config.label}不能为空！`})
  }
  const {slots={}, ...formProps} = formItem || {}
  Object.assign(slots, {
    // error: ({error}) => ,
    default: () => genField(config, form)
  })
  function labelSlot() {
    if (slots.label) return slots.label()
    else {
      return config.label && <div class="flex--middle">
        {config.label}
        {config.labelInfo && <el-tooltip content={config.labelInfo} placement="top" offset={4} popperClass="show-arrow-popover"><i class="iconfont icon-info"></i></el-tooltip>}
      </div>
    } 
  }
  function defaultSlot() {
    if (slots.default) return slots.default()
    else return genField(config, form)
  }

  return <el-form-item style={getFormItemStyle(config)} label={config.label} prop={config.prop} required={config.required} rules={rules} {...formProps}>{{
    error: slots.error,
    label: labelSlot,
    default: defaultSlot 
  }}</el-form-item>
}

export function renderItem(config, form) {
  if (config.isGroup) {
    return config.render({
      genChildren: () => config.children.map(c => genFormItem(c, form)),
      genFormItem,
      children: config.children,
      form
    })
  } else {
    return genFormItem(config, form)
  }
}

export function genForm (props) {
  const {form, configList, ...otherProps} = props
  return <el-form {...otherProps}>
    {props.configList.map(config => renderItem(config, props.form))}
  </el-form>
}

function genGridContent(config, form) {
  if (config.render) {
    return config.render(config, form)
  }
  let _content = ''
  switch (config.type) {

    default: 
      _content = form[config.prop]
  }
  return _content || '-'
}

export function renderReadForm({configList, grid=4}, form) {
  return <div class={`read-form-grid grid--${grid}`}>
    {configList.map(config => {
      const {slots} = config || {}
      return <div class="grid-item">
        <label>{slots.label ? slots.label() : config.label}</label>
        <div class="grid-item-content">{genGridContent(config, form)}</div>
      </div>
    })}
  </div>
}