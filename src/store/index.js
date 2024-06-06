import {reactive} from 'vue'
function getSetting() {
  return JSON.parse(window.localStorage.getItem('preference-set')) || {'dialog-theme': 'dialog', pageSize: 20}
}

const store = reactive({
  globalSetting: getSetting(),
  setGlobalSetting(data) {
    window.localStorage.setItem('preference-set', JSON.stringify(data))
    store.globalSetting = {...data}
  }
})

export default store