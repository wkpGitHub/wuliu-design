import { reactive, ref, watch } from "vue";
import { renderItem } from "./render";
export function useForm({form, fieldList, labelWidth, labelPosition, inline, span=2}) {
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.value) {
      total[current.prop] = current.value
    }
    return total
  }, {})

  const state = reactive({
    form: { ...defaultVals, ...form },
    fieldList
  })
  const formRef = ref()

  fieldList.forEach(filed => {
    if (filed.onChange) {
      watch(() => state.form[filed.prop], v => filed.onChange(v, state.form, state.fieldList))
    }
  })

  function renderForm () {
    return <el-form style={{display: 'grid', 'grid-template-columns': `repeat(${span}, 1fr)`}} class="lj-form" ref={formRef} model={state.form} label-width={labelWidth} label-position={labelPosition} inline={inline}>
      {state.fieldList.map(item => renderItem(item, state.form))}
    </el-form>
  }

  return {
    renderForm,
    formRef,
    formState: state
  }
}