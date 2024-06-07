<script lang="jsx">
import {watch} from 'vue'
import {useForm} from '@/hooks/formHook'
import CDialog from '@/components/c-dialog'

export default {
  props: {
    formConfig: {
      type: Object,
      default: () => ({
        configList: [],
        labelWidth: 75,
        grid: 2
      })
    },
    form: {
      type: Object,
      default: () => ({})
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    onConfirm: Function
  },
  setup(props, {attrs, slots}) {
    const {renderForm, formRef, formState} = useForm(props.formConfig, props.form)
    watch(() => props.form, v => {
      formState.form = {...v}
    })

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