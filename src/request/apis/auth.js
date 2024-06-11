import req from '../request'

export const auth = {
  list({ pageSize }) {
    return new Promise(resolve => {
      resolve({
        data: Array.from({ length: pageSize }, () => ({
          id: Math.random(),
          date: Math.random(),
          name: Math.random().toString(16),
          address: 'No. 189, Grove St, Los Angeles',
        })),
        total: Math.floor(Math.random() * 1000)
      })
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