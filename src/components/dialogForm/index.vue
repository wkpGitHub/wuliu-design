<script lang="jsx">
import {useForm} from '@/hooks/formHook'
import {reactive} from 'vue'

export default {
  props: {
    fieldList: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, {emit}) {
    const {renderForm, formRef, formState} = useForm({fieldList: props.fieldList, labelWidth: 60, form: props.form})
    const state = reactive({
      loading: false
    })

    function confirm() {
      state.loading = true
      formRef.value.validate(valid => {
        console.log(valid, 'vvvvvvvvvvvvvvv')
      })
      console.log(formState)
    }

    return () => <el-dialog class="page__dialog" model-value={true} title="新增" draggable onClose={() => emit('close')} close-on-click-modal={false}>{{
      default: () => renderForm(),
      footer: () => <div>
        <el-button type="primary" loading={state.loading} onClick={confirm}>保存</el-button>
        <el-button onClick={() => emit('close')}>取消</el-button>
      </div>
    }}</el-dialog>
  }
}
</script>

<style lang="scss"></style>