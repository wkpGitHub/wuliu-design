import { reactive, ref, watch } from "vue";
import { genForm as renderForm } from "./render";
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
  const formRef = ref()

  fieldList.forEach(filed => {
    if (filed.onChange) {
      watch(() => state.form[filed.prop], v => filed.onChange(v, state.form, state.fieldList))
    }
  })

  function genForm () {
    return <el-form>
      {renderForm(state)}
    </el-form>
  }

  return {
    genForm,
    formRef,
    formState: state
  }
}