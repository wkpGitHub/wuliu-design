import { reactive, watch, computed } from "vue";
import { genField, popperOptions } from "./render";
import { ElButton } from "element-plus";

export function useSearch({ fieldList, onSearch, onReset }) {
  function setValue(total, current) {
    if (current.value) {
      if (Array.isArray(current.value)) {
        current.value.forEach((v, index) => {
          total[current.prop[index]] = v
        })
      } else {
        total[current.prop] = current.value
      }
    }
  }
  const defaultVals = fieldList.reduce((total, current) => {
    if (current.isGroup) {
      current.children.forEach(c => setValue(total, c))
    } else if (current.isMore) {
      current.children.forEach(c => setValue(total, c))
    } else {
      setValue(total, current)
    }
    return total
  }, {})

  const state = reactive({
    form: { ...defaultVals },
    showMore: false,
    tags: []
  })

  function valueToText(field) {
    switch (field.type) {
      case 'select':
        const valueMap = field.options.reduce((total, current) => {
          total[current.value] = current.label
          return total
        }, {})
        if (field.multiple) {
          return state.form[field.prop].map(v => valueMap[v])
        } else {
          return [valueMap[state.form[field.prop]]]
        }
      default: 
        return [state.form[field.prop]]
    }
  }

  function isEmpty(v) {
    if (Array.isArray(v)) {
      return v.length > 0
    } else if (typeof v === 'string') {
      return !!v.trim()
    } else {
      return !!v
    }
  }


  function setTags() {
    const tags = []
    Object.keys(state.form).forEach(key => {
      if (Reflect.has(needTagMap, key)) {
        const _currentField = needTagMap[key]
        if (_currentField.isGroup) {
          const _childrenProps = _currentField.children.map(field => field.prop)
          const _childrenValues = _childrenProps.map(prop => state.form[prop])
          if (_childrenValues.every(v => isEmpty(v))) {
            tags.push({
              props: _childrenProps,
              label: _currentField.label,
              values: _currentField.children.map(field => valueToText(field))
            })
          }
        } else if (_currentField.type === 'combo') {
          state.form[key].forEach(v => {
            if (v.search_value?.length) {
              tags.push({
                props: [v.search_field],
                label: v.name,
                values: v.search_value
              })
            }
          })
        } else if (_currentField.type === 'select') {
          if (isEmpty(state.form[key])) {
            tags.push({
              props: [_currentField.prop],
              label: _currentField.label,
              values: valueToText(_currentField)
            })
          }
        } else {
          if (isEmpty(state.form[key])) {
            tags.push({
              props: [key],
              label: _currentField.label,
              values: [valueToText(_currentField)]
            })
          }
        }
      }
    })
    state.tags = tags
  }

  function removeTags(tag, isAll) {
    function removeTag(tag) {
      tag.props.forEach(prop => {
        state.form[prop] = undefined
      })
    }
    if (isAll) {
      state.tags.forEach(tag => removeTag(tag))
    } else {
      removeTag(tag)
    }
   
    search()
  }

  // 需要单独tag展示出来的字段映射表
  const needTagMap = {}
  function setTagMap(list) {
    list.forEach(field => {
      if (field.isMore) {
        field.children.forEach(c => {
          needTagMap[c.prop] =  c
        })
      } else if (field.type==='select' && field.multiple) {
        needTagMap[field.prop] =  field
        field.onSearch = search
      } else if (field.type === 'combo') {
        needTagMap[field.prop[2]] =  field
        field.onSearch = search
      } else if (field.isGroup) {
        setTagMap(field.children)
      }
    })
  }
  setTagMap(fieldList)


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
    // if (filed.onChange) {
    //   watch(() => state.form[filed.prop], v => filed.onChange(v, state.form, fieldList))
    // }
  })

  function reset() {
    state.form = { ...defaultVals }
    search()
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
    const originWidthStyle = _width ? { width: `${_width}px`  } : {}
    if (item.minWidth) {
      originWidthStyle.minWidth = `${item.minWidth}px`
    }
    item.style = Object.assign(originWidthStyle, item.style)
  }

  function searchMore() {
    state.showMore = false
    search()
  }

  function search() {
    setTags()
    onSearch()
  }

  function genMoreSearch(item) {
    const {children, cols=1} = item
 
    return <el-popover trigger="click" v-model:visible={state.showMore} show-arrow={false} popper-class="page__search-filter-popover" popper-options={popperOptions}>{{
      reference: () => <ElButton class="square-btn"><i class="iconfont icon-filter-records"></i></ElButton>,
      default: () => <div class={`popover-body cols-${cols}`}>
        <el-scrollbar max-height="380">
          <div class="filter-popover" style={{'grid-template-columns': `repeat(${cols}, 1fr)`}}>
            {children.map(c => <div style={{gridColumn: `span ${c.span || 1}`}}>
              <label>{c.label}</label>
              {genSearchItem(c, true)}
            </div>)}
          </div>
        </el-scrollbar>
        <div class="footer-btn">
          <el-button size="small" onClick={() => state.showMore = false}>关闭</el-button>
          <el-button type="primary" size="small" onClick={searchMore}>查询</el-button>
        </div>
      </div>
    }}</el-popover>
  }

  function genSearchItem(item, notLabelWidth) {
    setSearchItemStyle(item, notLabelWidth)
    if (item.isMore) {
      return genMoreSearch(item)
    } else if (item.isGroup) {
      return <div class="page__search-group" style={item.style}>
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
            <ElButton type="primary" onClick={search}>查询</ElButton>
            <ElButton onClick={reset}>重置</ElButton>
          </div>
        </div>
        {!!state.tags.length && <div class="filter-section">
          {state.tags.map((tag, index) => <div key={index} class="tag-view">
            <label>{tag.label}：{tag.values.join(' , ')}</label>
            <i class="iconfont icon-close" onClick={() => removeTags(tag)}></i>
          </div>)}
          {state.tags.length > 1 && <i class="close-all iconfont icon-delete" onClick={() => removeTags({}, true)}></i>}
        </div>}
    </div>
  }

  return {
    renderSearch,
    searchState: state
  }
}