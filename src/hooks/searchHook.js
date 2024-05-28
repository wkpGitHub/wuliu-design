import { reactive, watch } from "vue";
export function useSearch({ fieldList }) {
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.value) {
      total[current.key] = current.value
    }
    return total
  }, {})
  const state = reactive({
    form: { ...defaultVals },
    fieldList
  })

  fieldList.forEach(filed => {
    if (filed.onChange) {
      watch(() => state.form[filed.key], v => filed.onChange(v, state.form, state.fieldList))
    }
  })

  function genField(item) {
    switch (item.type) {
      case 'select':
        return <ElSelect v-model={state.form[item.key]} placeholder={item.label} clearable>
          {item.options.map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
        </ElSelect>
      default:
        return <ElInput v-model={state.form[item.key]} placeholder={item.label} clearable />
    }
  }

  function reset(search) {
    state.form = { ...defaultVals }
    search()
  }

  function genSearch({ search }) {
    return <div class="page__search">
      <ElRow>
        {state.fieldList.map(item => <ElCol span={6}>
          {genField(item)}
        </ElCol>)}
        
        <ElCol span={6}>
          <ElButton type="primary" onClick={search}>查询</ElButton>
          <ElButton onClick={() => reset(search)}>重置</ElButton>
        </ElCol>
      </ElRow>
    </div>
  }

  return {
    genSearch,
    searchState: state
  }
}