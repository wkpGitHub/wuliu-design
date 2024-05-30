<template>
  <div class="page__handler">
    <main>
      <slot></slot>
    </main>
    <div class="page__footer">
      <slot name="footer" :save="save">
        <el-button :loading="loading" type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },

  methods: {
    save() {
      this.loading = true
      this.$emit('save', () => {
        this.loading = false
      })
    },

    cancel() {
      this.$emit('cancel')
    }
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