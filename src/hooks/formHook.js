import { reactive, ref, watch } from "vue";
import { renderItem } from "./render";
import {setDependOn, getDefaultValues} from './utils'

export function useForm(config, form) {
  const {configList, labelWidth=60, grid=2, ...formProps} = config
  const defaultValues = getDefaultValues(configList)

  const state = reactive({
    form: { ...defaultValues, ...form },
    configList
  })
  const formRef = ref()

  setDependOn(configList, state.form)

  function renderForm () {
    return <el-form style={{display: 'grid', 'grid-template-columns': `repeat(${grid}, 1fr)`}} class="lj-form" ref={formRef} model={state.form} label-width={labelWidth} {...formProps}>
      {state.configList.map(config => renderItem(config, state.form))}
    </el-form>
  }

  return {
    renderForm,
    formRef,
    formState: state
  }
}