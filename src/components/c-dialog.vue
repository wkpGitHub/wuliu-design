<script lang="jsx">
import {reactive, computed} from 'vue'
import store from '@/store'

export default {
  props: {
    theme: String,
    showClose: {
      type: Boolean,
      default: false
    },
    title: String,
    width: {
      type: [String, Number],
      default: '680px'
    },
    onConfirm: Function,
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { attrs, slots, emit }) {
    const state = reactive({
      loading: false
    })

    function close() {
      emit('update:modelValue', false)
    }

    function confirm() {
      state.loading = true
      props.onConfirm().then(() => {
        close()
        state.loading = false
      }).catch(() => {
        state.loading = false
      })
    }

    function headerSlot({ close, titleClass }) {
      if (slots.header) {
        return slots.header({ close, titleId, titleClass })
      } else {
        return <div class="c-dialog-header">
          <div class={["c-dialog-header__title", { titleClass }]}>{props.title}</div>
          <i class="c-dialog-header__close iconfont icon-close" onClick={close}></i>
        </div>
      }
    }
    function defaultSlot() {
      if (slots.default) {
        return slots.default()
      }
    }
    function footerSlot() {
      if (!props.showFooter) return null
      if (slots.footer) {
        return slots.footer({confirm, loading: state.loading, close})
      } else {
        return <>
          <el-button onClick={close}>取消</el-button>
          <el-button type="primary" loading={state.loading} onClick={confirm}>保存</el-button>
        </>
      }
    }

    const rewriteSlots = { header: headerSlot, default: defaultSlot, footer: footerSlot }

    const theme = computed(() => props.theme || store.globalSetting['dialog-theme'])

    return () => {
      if (theme.value === 'drawer') {
        return <el-drawer {...attrs} size={props.width} showClose={props.showClose}>{rewriteSlots}</el-drawer>
      } else {
        return <el-dialog {...attrs} width={props.width} showClose={props.showClose}>{rewriteSlots}</el-dialog>
      }
    }
  }
}
</script>

<style lang="scss">
.c-dialog-header {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
  padding: 12px 16px;

  .c-dialog-header__title {
    line-height: 22px;
    font-size: 16px;
    color: #0b1019;
    font-weight: 600;
  }

  &__close {
    cursor: pointer;
    color: #A6ABB4;
    font-size: 20px;
    border-radius: 2px;
    width: 24px;
    height: 24px;
    line-height: 24px;

    &:hover {
      background-color: #F0F2F5;
    }
  }
}
</style>