<script lang="jsx">
import {watch} from 'vue'
import {useForm} from '@/hooks/formHook'
import CDialog from '@/components/c-dialog'

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
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    onConfirm: Function,
    span: Number,
    labelWidth: Number
  },
  setup(props, {attrs, slots}) {
    const {renderForm, formRef, formState} = useForm(props)

    async function confirm() {
      await formRef.value.validate()
      await props.onConfirm(formState)
    }

    return () => <CDialog {...attrs} draggable closeOnClickModal={props.closeOnClickModal} onConfirm={confirm}>{{
      default: () => renderForm(),
      footer: slots.footer
    }}</CDialog>
  }
}
</script>

<style lang="scss"></style>