import req from '../request'

export const auth = {
  list({ pageSize }) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: Array.from({ length: pageSize }, () => ({
            id: Math.random().toString(16).slice(2, 12),
            date: Math.random().toString(16).slice(2, 12),
            name: Math.random().toString(16).slice(2, 12),
            address: 'No. 189, Grove St, Los Angeles',
          })),
          total: Math.floor(Math.random() * 1000)
        })
      }, 400)
    })
  },

  create(f) {
    return new Promise(resolve => {
      setTimeout(resolve, 3000)
    })
  },

  update() {

  },

  delete() {

  },

  batchDelete() {

  }
}