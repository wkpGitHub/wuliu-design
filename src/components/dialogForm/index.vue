<script lang="jsx">
import {useForm} from '@/hooks/formHook'
import {reactive} from 'vue'

export default {
  props: {
    fieldList: {
      type: Array,
      default: []
    }
  },
  setup(props, {emit}) {
    const {genForm, formRef, formState} = useForm({fieldList: props.fieldList})

    function confirm() {
    }

    return () => <el-dialog model-value={true} title="新增" draggable onClose={() => emit('close')} close-on-click-modal={false}>{{
      default: () => genForm(),
      footer: () => <div>
        <el-button onClick={() => emit('close')}>取消</el-button>
        <el-button type="primary" onClick={confirm}>保存</el-button>
      </div>
    }}</el-dialog>
  }
}
</script>

<style lang="scss"></style>