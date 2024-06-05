<script lang="jsx">
export default{
  props: {
    theme: String
  },
  setup(props, {attrs, slots}) {
    return () => {
      if (props.theme === 'drawer') {
        return <el-drawer {...attrs}>{slots}</el-drawer>
      } else {
        return <el-dialog {...attrs}>{slots}</el-dialog>
      }
    }
  }
}
</script>