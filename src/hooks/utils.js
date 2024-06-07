import {watch} from 'vue'

function keysToObject(keys, data) {
  return keys.reduce((total, key) => {
    total[key] = data[key]
    return total
  }, {})
}

function valueToObject(keys, value) {
  return Array.isArray(keys) ? keys.reduce((total, key, index) => {
    total[key] = value[index]
    return total
  }, {}) : value
}

export function setDependOn(configList, form) {
  configList.forEach(config => {
    if (config.watch) {
      const watchFn = Array.isArray(config.prop) ? config.prop.map(key => () => form[key]) : () => form[config.prop]
      if (typeof config.watch == 'function') {
        watch(watchFn, (value, oldValue) => {
          config.watch({value: valueToObject(config.prop, value),  oldValue: valueToObject(config.prop, oldValue), form, config, configList})
        })
      } else if (typeof config.watch == 'object') {
        const {handler, deep, immediate} = config.watch
        watch(watchFn, (value, oldValue) => {
          handler({value: valueToObject(config.prop, value),  oldValue: valueToObject(config.prop, oldValue), form, config, configList})
        }, {deep, immediate})
      }
    }

    if (config.dependOns?.length) {
      const watchValues = config.dependOns.map(key => () => form[key])
      watch(watchValues, values => {
        const dependOnValues = values.reduce((total, current, index) => {
          total[config.dependOns[index]] = current
          return total
        }, {})
        if (config.changeEffect) {
          const isArrayProp = Array.isArray(config.prop)
          const _value = isArrayProp ? keysToObject(config.prop, form) : form[config.prop]
          const result = config.changeEffect({dependOnValues, value: _value, form, config, configList})
          // 是否返回值
          if (result?.value) {
            // 如果是数组
            if (isArrayProp) Object.assign(form, result.value)
            else { form[config.prop] = result.value }
          }
        }
      })
    }
  })
}

/* 获取默认值 */
function setValue(total, current) {
  if (current.hasOwnProperty('defaultValue')) {
    // 如果prop是多个值，那么defaultValue是个对象
    if (Array.isArray(current.prop)) {
      Object.assign(total, current.defaultValue)
    } else {
      total[current.prop] = current.defaultValue
    }
  }
}

export function getDefaultValues(configList) {
  return configList.reduce((total, current) => {
    if (current.isGroup) {
      current.children.forEach(c => setValue(total, c))
    } else if (current.isMore) {
      current.children.forEach(c => setValue(total, c))
    } else {
      setValue(total, current)
    }
    return total
  }, {})
}