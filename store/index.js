export const state = () => ({
  currentUser: null
})

export const mutations = {
  setCurrentUser (state, user) {
    if (user) {
      state.currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }
    } else {
      state.currentUser = user
    }
  }
}
