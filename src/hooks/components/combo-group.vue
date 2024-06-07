<script lang="jsx">
import {reactive, watch} from 'vue'
import {popperOptions} from '../render'

export default {
  props: {
    options: Array,
    field: String,
    value: String,
    list: Array
  },
  emits: ['update:field','update:value','update:list', 'search'],
  setup(props, {emit, attrs}) {
    const state = reactive({
      showPopover: false,
      textValue: ''
    })

    function updateValue(key, v) {
      emit(`update:${key}`, v)
    }

    let valueMemoMap = {}
    watch(() => props.list, v => {
      valueMemoMap = (v || []).reduce((total, current) => {
        total[current.search_field] = current.search_value
        return total
      }, {})
      onChange(props.field)
    })

    const valueToLabelMap = props.options.reduce((total, current) => {
      total[current.value] = current.label
      return total
    }, {})

    function search() {
      state.showPopover = false
      valueMemoMap[props.field] = state.textValue.trim().split('\n')
      const list = Object.keys(valueMemoMap).map(key => ({
        search_field: key,
        name: valueToLabelMap[key],
        search_value: valueMemoMap[key]
      }))
      updateValue('list', list)
      emit('search')
    }

    function onChange(v) {
      updateValue('field', v)
      if (Array.isArray(valueMemoMap[v])) {
        state.textValue = valueMemoMap[v].join('\n')
      } else {
        state.textValue = ''
      }
    }
 
    return () => {
      const placeholder = attrs.placeholder || '双击显示多项精确搜索'
      return <div class="combo-group page__search-group">
          <el-select popper-options={popperOptions} modelValue={props.field} onUpdate:modelValue={onChange}>
            {(props.options || []).map(opt => <ElOption label={opt.label} value={opt.value} key={opt.value} />)}
          </el-select>
          <ElInput onDblclick={() => state.showPopover = true} modelValue={props.value} onUpdate:modelValue={v => updateValue('value', v)} key={attrs.prop} placeholder={placeholder} style={{width: '220px'}} clearable />
          <el-popover trigger="click" v-model:visible={state.showPopover} show-arrow={false} popper-class="combo-group-popover" popper-options={{ modifiers: [{ name: 'offset', options: { offset: [6, 8] } }] }} placement="bottom-end">{{
            reference: () => <i class="iconfont icon-combo_filter show-popover-icon"></i>,
            default: () => <div class="popover-body" style={{ width: '250px' }}>
              <el-input v-model={state.textValue} class="popover-textarea" type="textarea" placeholder="精确搜索，一行一项，最多支持200行" />
              <div class="footer-btn-between">
                <el-button size="small" onClick={() => state.textValue = ''}>清空</el-button>
                <div class="btn-right">
                  <el-button size="small" onClick={() => state.showPopover = false}>关闭</el-button>
                  <el-button type="primary" size="small" onClick={search}>查询</el-button>
                </div>
              </div>
            </div>
          }}</el-popover>
      </div>
    }

  }
}
</script>

<style lang="scss">
.combo-group {
  position: relative;

  .el-input {
    height: 32px;
    flex-shrink: 0;
  }

  .el-input__wrapper {
    padding-right: 36px;
  }

  .show-popover-icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    background-color: #F0F2F5;
    z-index: 3;
    cursor: pointer;

    &:hover {
      background-color: #E9F1FC;
    }
  }
}

.combo-group-popover {
  &.el-popper {
    font-size: 12px;
    padding: 0 !important;
    width: auto !important;
  }

  .footer-btn-between {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 0 0 #e6e8eb inset;
  }

  .btn-right {
    display: flex;
  }

  .popover-textarea .el-textarea__inner {
    overflow: auto;
    padding: 12px;
    line-height: 20px;
    width: 100%;
    height: 220px;
    color: #333;
    font-size: 12px;
    font-weight: 400;
    border: none !important;
    box-shadow: none !important;
    resize: none;
    outline: 0;
  }
}
</style>