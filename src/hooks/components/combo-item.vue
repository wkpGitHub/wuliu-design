<script lang="jsx">
import {reactive, computed} from 'vue'

export default {
  props: {
    modelValue: String
  },
  emits: ['update:modelValue', 'search'],
  setup(props, {emit, attrs}) {
    const state = reactive({
      showPopover: false
    })

    function updateModelValue(v) {
      emit('update:modelValue', v)
    }

    const textareaVal = computed({
      get() {
        if (props.modelValue) {
          return props.modelValue.replace(/,/g, '\n')
        } else {
          return ''
        }
      },
      set(v) {
        emit('update:modelValue', v.replace(/\n/g, ','))
      }
    })

    function search() {
      state.showPopover = false
      emit('search')
    }
 
    return () => {
      const style = Object.assign({width: '220px'}, attrs.style)
      const placeholder = attrs.placeholder || '双击显示多项精确搜索'
      return <div class="combo-group">
          <ElInput onDblclick={() => state.showPopover = true} modelValue={props.modelValue} onUpdate:modelValue={updateModelValue} key={attrs.prop} placeholder={placeholder} style={style} clearable />
          <el-popover trigger="click" v-model:visible={state.showPopover} show-arrow={false} popper-class="combo-group-popover" popper-options={{ modifiers: [{ name: 'offset', options: { offset: [6, 8] } }] }} placement="bottom-end">{{
            reference: () => <i class="iconfont icon-combo_filter show-popover-icon"></i>,
            default: () => <div class="popover-body" style={{ width: '250px' }}>
              <el-input v-model={textareaVal.value} class="popover-textarea" type="textarea" placeholder="精确搜索，一行一项，最多支持200行" />
              <div class="footer-btn-between">
                <el-button size="small" onClick={() => updateModelValue('')}>清空</el-button>
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