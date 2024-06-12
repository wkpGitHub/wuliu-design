<template>
  <div class="form__card">
    <header>{{ header }}</header>
    <slot></slot>
  </div>
</template>

<script>
export default{
  props: {
    header: String
  }
}
</script>

<style>
.form__card{
  padding: 16px;
  background: #ffffff;
  border-radius: 4px;
}
.form__card header{
  color: #0b1019;
  line-height: 14px;
  font-size: 14px;
  display: inline-block;
  font-weight: 600;
  padding-left: 8px;
  margin-bottom: 16px;
  border-left: 2px solid var(--el-color-primary);
}
</style>