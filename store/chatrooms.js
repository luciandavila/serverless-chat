export const state = () => ({
  list: {}
})

export const getters = {
  getChatroomById: (state, getters) => (id) => {
    return state.list.find(chatroom => chatroom.key === id)
  }
}

export const mutations = {
  clear (state) {
    state.list = []
  },

  add (state, item) {
    state.list.push(item)
  }
}
