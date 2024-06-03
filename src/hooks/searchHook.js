import { reactive, watch, computed } from "vue";
import { genField, popperOptions } from "./render";
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
import { ElButton } from "element-plus";

export function useSearch({ fieldList, labelWidth, onSearch, onReset }) {
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.value) {
      total[current.prop] = current.value
    }
    return total
  }, {})
  const state = reactive({
    form: { ...defaultVals },
    showMore: false
  })

  const showFieldList = computed(() => {
    if (state.showMore) {
      return fieldList 
    } else {
      return fieldList.slice(0, 20)
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

  function setSearchItemStyle(item, notLabelWidth) {
    if (item.label) {
      item.placeholder = item.label
    }
    let _width = item.width
    if (!(notLabelWidth || _width) && item.label) {
      _width = item.label.length * 12 + 46
    }
    item.style = Object.assign({
      width: _width && `${_width}px`
    }, item.style)
  }

  function genMoreSearch(item) {
    const {children, cols=1} = item
    return <el-popover trigger="click" v-model:visible={state.showMore} show-arrow={false} popper-class="page__search-filter-popover" popper-options={popperOptions}>{{
      reference: () => <ElButton class="square-btn"><i class="iconfont icon-filter-records"></i></ElButton>,
      default: () => <div class={`popover-body cols-${cols}`}>
        <el-scrollbar max-height="380">
          <div class="filter-popover" style={{'grid-template-columns': `repeat(${cols}, 1fr)`}}>
            {children.map(c => <div style={{columnSpan: `span ${c.span || 1}`}}>
              <label>{c.label}</label>
              {genSearchItem(c, true)}
            </div>)}
          </div>
        </el-scrollbar>
        <div class="footer-btn">
          <el-button size="small" onClick={() => state.showMore = false}>关闭</el-button>
          <el-button type="primary" size="small">查询</el-button>
        </div>
      </div>
    }}</el-popover>
  }

  function genSearchItem(item, notLabelWidth) {
    setSearchItemStyle(item, notLabelWidth)
    if (item.isMore) {
      return genMoreSearch(item)
    } else if (item.isGroup) {
      return <div class="page__search-group">
        {item.children.map(c => genSearchItem(c))}
      </div>
    } else {
      return genField(item, state.form)
    }
  }

  function renderSearch() {
    return <div class="page__search">
        <div class="page__search-content">
          {fieldList.map(item => genSearchItem(item))}
          <div class="page__search-btns">
            <ElButton type="primary" onClick={onSearch}>查询</ElButton>
            <ElButton onClick={reset}>重置</ElButton>
          </div>
        </div>
        <div class="filter-section">
          <div class="tag-view">
            <label>采购员：超级管理员</label>
            <i class="iconfont icon-close"></i>
          </div>
          <div class="tag-view">
            <label>采购员：超级管理员</label>
            <i class="iconfont icon-close"></i>
          </div>
          <i class="close-all iconfont icon-delete"></i>
        </div>
    </div>
  }

  return {
    renderSearch,
    searchState: state
  }
}