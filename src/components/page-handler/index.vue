<script lang="jsx">
import {reactive} from 'vue'

export default {
  props: {
    onConfirm: Function
  },

  setup(props, {slots, emit}) {

    const state = reactive({
      loading: false
    })

    function close() {
      emit('close')
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

    function footerSlot() {
      if (slots.footer) {
        return slots.footer({confirm, loading: state.loading, close})
      } else {
        return <>
          <el-button onClick={close}>返回</el-button>
          <el-button type="primary" loading={state.loading} onClick={confirm}>保存</el-button>
        </>
      }
    }

    return () => <div class="page__handler">
      <main>{slots.default()}</main>
      <div class="page__footer">{footerSlot()}</div>
    </div>
  }
}
</script>

<style>
.page__handler {
  height: 100%;
  background-color: var(--bg-color);
  overflow: hidden;
}

.page__handler main {
  height: calc(100% - 50px);
  overflow: auto;
}

.page__footer {
  background-color: #fff;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
}
</style>