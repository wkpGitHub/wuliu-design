import { reactive, withModifiers, onUnmounted } from "vue";
import { genField, popperOptions } from "./render";
import { ElButton } from "element-plus";
import {setDependOn, getDefaultValues} from './utils'

export function useSearch({ configList, onSearch, onReset }, form = {}) {
  const defaultValues = getDefaultValues(configList)

  const state = reactive({
    form: { ...defaultValues, ...form },
    configList,
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
  setTagMap(configList)


  setDependOn(configList, state.form)

  function reset() {
    state.form = { ...defaultValues }
    search()
    onReset?.()
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

  function hideMorePopover() {
    state.showMore = false
  }
  window.addEventListener('click', hideMorePopover)
  onUnmounted(() => {
    window.removeEventListener('click', hideMorePopover)
  })

  function genMoreSearch(item) {
    const {children, grid=1} = item
 
    return <el-popover trigger="click" visible={state.showMore} show-arrow={false} popper-class="page__search-filter-popover" popper-options={popperOptions}>{{
      reference: () => <ElButton class="square-btn" onClick={withModifiers(() => state.showMore = true, ['stop'])}><i class="iconfont icon-filter-records"></i></ElButton>,
      default: () => <div class={`popover-body cols-${grid}`} onClick={withModifiers(() => {}, ['stop'])}>
        <el-scrollbar max-height="380">
          <div class={["filter-popover", `grid--${grid}`]}>
            {children.map(c => <div class={`span--${c.span || 1}`}>
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
    if (item.hidden) return null
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

  function genTag(tag, index) {
    const {length} = tag.values
    if (length > 3) {
      const _v = tag.values.slice(0, 3).join(' , ') + ` 等${length}项`
      return <el-popover popper-class="global-pop" placement="bottom-start" offset={4} width={300}>{{
        reference: () => <div key={index} class="tag-view">
          <label>{tag.label}：{_v}</label>
          <i class="iconfont icon-close" onClick={() => removeTags(tag)}></i>
        </div>,
        default: () => <el-scrollbar>
          {tag.values.map(v => <div class="tag-item">{v}</div>)}
        </el-scrollbar>
      }}</el-popover>
    } else {
      return <div key={index} class="tag-view">
        <label>{tag.label}：{tag.values.join(' , ')}</label>
        <i class="iconfont icon-close" onClick={() => removeTags(tag)}></i>
      </div>
    }
  }

  function renderSearch() {
    return <div class="page__search">
        <div class="page__search-content">
          {configList.map(config => genSearchItem(config))}
          <div class="page__search-btns">
            <ElButton type="primary" onClick={search}>查询</ElButton>
            <ElButton onClick={reset}>重置</ElButton>
          </div>
        </div>
        {!!state.tags.length && <div class="filter-section">
          {state.tags.map((tag, index) => genTag(tag, index))}
          {state.tags.length > 1 && <i class="close-all iconfont icon-delete" onClick={() => removeTags({}, true)}></i>}
        </div>}
    </div>
  }

  return {
    renderSearch,
    searchState: state
  }
}