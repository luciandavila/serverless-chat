<template>
  <v-app dark>
    <loading v-if="waitingForAuthResult" />
    <div v-else>
      <nuxt v-if="currentUser" />
      <login v-else />
    </div>
  </v-app>
</template>

<script>

import Loading from '~/components/Loading.vue'
import Login from '~/components/Login.vue'

export default {
  components: {
    Loading,
    Login
  },

  data () {
    return {
      waitingForAuthResult: true
    }
  },

  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },

  created () {
    this.$fireAuth.onAuthStateChanged((user) => {
      this.setCurrentUser(user)
    })

    this.$fireAuth.getRedirectResult().then((result) => {
      if (result.user) {
        this.setCurrentUser(result.user)
      }

      this.waitingForAuthResult = false
    })
  },

  methods: {
    setCurrentUser (user) {
      this.$store.commit('setCurrentUser', user)

      this.afterSetCurrentUser()
    },

    afterSetCurrentUser () {
      if (!this.$store.state.currentUser) {
        return null
      }
      this.detachListeners()
      this.syncChatrooms()
    },

    detachListeners () {
      this.$fireDb.ref(`users/${this.$store.state.currentUser.uid}/groups`).off()
    },

    syncChatrooms () {
      this.$store.commit('chatrooms/clear')

      this.$fireDb.ref(`users/${this.$store.state.currentUser.uid}/groups`).on('child_added', (snapshot) => {
        this.$fireDb.ref(`chatrooms/${snapshot.key}`).on('value', (chatroomSnapshot) => {
          if (chatroomSnapshot.val()) {
            this.$store.commit('chatrooms/add', {
              key: snapshot.key,
              ...chatroomSnapshot.val()
            })
          }
        })
      })
    }
  }
}
</script>
