import { reactive, watch, computed } from "vue";
import { genField } from "./render";
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'

export function useSearch({ fieldList, labelWidth, onSearch, onReset }) {
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.value) {
      total[current.prop] = current.value
    }
    return total
  }, {})
  const state = reactive({
    form: { ...defaultVals },
    showMore: false,
    span: 6
  })

  const showFieldList = computed(() => {
    if (state.showMore) {
      return fieldList 
    } else {
      return fieldList.slice(0, state.span)
    }
  })

  fieldList.forEach(filed => {
    if (fieldList.dependOns?.length) {
      watchValues = fieldList.dependOns.map(key => () => state.form[key])
      watch(watchValues, values => {
        // const valueMap = 
        if (filed.changeValue) {
          state.form[filed.prop] = filed.changeValue({dependOnValues})
        }
        if (filed.changeConfig) {
          Object.assign(filed, filed.changeConfig(filed, dependOnValues))
        }
      })
    }
    if (filed.onChange) {
      watch(() => state.form[filed.prop], v => filed.onChange(v, state.form, fieldList))
    }
  })

  function reset() {
    state.form = { ...defaultVals }
    onSearch()
    onReset()
  }

  function getLabelWidth() {
    if (labelWidth) {
      return {width: labelWidth + 'px'};
    }
  }

  function getSearchItemStyle(item) {
    const _style = {}
    if (item.span) _style['grid-column'] = `span ${item.span}`
    return _style
  }

  function renderSearch() {
    return <div class="page__search">
        <div class="page__search-content">
          {showFieldList.value.map(item => <div class="page__search-item" style={getSearchItemStyle(item)}>
            <label style={getLabelWidth(item)}>{item.label}</label>
            {genField(item, state.form)}
          </div>)}
        </div>
        <div class="page__search-btns">
          <ElButton type="primary" onClick={onSearch}>查询</ElButton>
          <ElButton onClick={reset}>重置</ElButton>
          {fieldList?.length > state.span && <ElButton class="square-btn" icon={state.showMore ? ArrowUpBold : ArrowDownBold} onClick={() => {state.showMore = !state.showMore}}></ElButton>}
        </div>

    </div>
  }

  return {
    renderSearch,
    searchState: state
  }
}