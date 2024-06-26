const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/b',
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: config.define?.__VUE_OPTIONS_API__ ?? true,
        __VUE_PROD_DEVTOOLS__: config.define?.__VUE_PROD_DEVTOOLS__ ?? false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: config.define?.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ ?? false
      })
      return definitions
    })
  }
})
