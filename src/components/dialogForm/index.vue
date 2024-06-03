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
    },
    title: String
  },
  setup(props, {emit}) {
    const {renderForm, formRef, formState} = useForm({fieldList: props.fieldList, labelWidth: 60, form: props.form})
    const state = reactive({
      loading: false
    })

    function confirm() {
      state.loading = true
      formRef.value.validate(valid => {
        if (valid) {
          emit('save', state)
          console.log(valid, 'vvvvvvvvvvvvvvv')
        } else {
          state.loading = false
        }
      })
    }

    return () => <el-dialog class="page__dialog" model-value={true} title={props.title} draggable onClose={() => emit('close')} close-on-click-modal={false}>{{
      default: () => renderForm(),
      footer: () => <div>
        <el-button onClick={() => emit('close')}>取消</el-button>
        <el-button type="primary" loading={state.loading} onClick={confirm}>保存</el-button>
      </div>
    }}</el-dialog>
  }
}
</script>

<style lang="scss"></style>