import { reactive, watch, computed } from "vue";
import { genField } from "./render";
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'

export function useSearch({ fieldList }) {
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.value) {
      total[current.prop] = current.value
    }
    return total
  }, {})
  const state = reactive({
    form: { ...defaultVals },
    fieldList,
    showMore: false,
    span: 6
  })

  const showFieldList = computed(() => {
    if (state.showMore) {
      return state.fieldList 
    } else {
      return state.fieldList.slice(0, state.span)
    }
  })

  fieldList.forEach(filed => {
    if (filed.onChange) {
      watch(() => state.form[filed.prop], v => filed.onChange(v, state.form, state.fieldList))
    }
  })

  function reset(search) {
    state.form = { ...defaultVals }
    search()
  }

  function getLabelWidth(item) {
    if (item.width) {
      return item.width + 'px';
    }
    return '80px'
  }

  function getSearchItemStyle(item) {
    const _style = {}
    if (item.span) _style['grid-column'] = `span ${item.span}`
    return _style
  }

  function genSearch({ search }) {
    return <div class="page__search">
        <div class="page__search-content">
          {showFieldList.value.map(item => <div class="page__search-item" style={getSearchItemStyle(item)}>
            <label>{item.label}</label>
            {genField(item, state.form)}
          </div>)}
        </div>
        <div class="page__search-btns">
          <ElButton type="primary" onClick={search}>查询</ElButton>
          <ElButton onClick={() => reset(search)}>重置</ElButton>
          <ElButton class="square-btn" icon={state.showMore ? ArrowUpBold : ArrowDownBold} onClick={() => {state.showMore = !state.showMore}}></ElButton>
        </div>

    </div>
  }

  return {
    genSearch,
    searchState: state
  }
}