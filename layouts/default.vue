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

  async created () {
    this.$fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setCurrentUser(user)
      }
    })

    await this.$fireAuth.getRedirectResult().then((result) => {
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
      this.$fireDb.ref(`users/${this.$store.state.currentUser.uid}`).on('value', (snapshot) => {
        if (!snapshot.val()) {
          this.$fireDb.ref('users').push({
            groups: {}
          })
        }
      })
    }
  }
}
</script>
