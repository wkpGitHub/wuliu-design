import {watch} from 'vue'

export function setDependOn(fieldList, form) {
  fieldList.forEach(filed => {
    if (filed.dependOns?.length) {
      const watchValues = filed.dependOns.map(key => () => form[key])
      watch(watchValues, values => {
        const dependOnValues = values.reduce((total, current, index) => {
          total[filed.dependOns[index]] = current
          return total
        }, {})
        if (filed.changeValue) {
          form[filed.prop] = filed.changeValue(dependOnValues, form)
        }
        if (filed.changeConfig) {
          Object.assign(filed, filed.changeConfig(filed, dependOnValues, form, fieldList))
        }
      })
    }
  })
}