export function getSetting() {
  return JSON.parse(window.localStorage.getItem('preference-set')) || {'dialog-theme': 'dialog', pageSize: 20}
}

export function setSetting(form) {
  window.localStorage.setItem('preference-set', JSON.stringify(form))
}