<template>
  <div>
    <textarea ref="copyText" class="hidden" />
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item link @click.stop="logout">
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ currentUser.displayName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="(value) in chatrooms"
          :key="value.key"
          :to="`/chatrooms/${value.key}`"
        >
          <v-list-item-action>
            <v-icon>mdi-pound</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="value.name" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/chatrooms/new">
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Create Chat Room'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        v-if="copyButton"
        icon
        @click.stop="copyLocation"
      >
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-alert
          class="copied alert"
          color="green"
          elevation="24"
          dense
          type="success"
          :value="alert"
          transition="scale-transition"
        >
          Link copied, feel free to share it!
        </v-alert>
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'serverless-chat'
    },
    copyButton: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      drawer: true,
      alert: false,
      chatrooms: []
    }
  },

  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },

  created () {
    this.syncUserChatrroms()
  },

  methods: {
    syncUserChatrroms () {
      this.$fireDb.ref(`users/${this.$store.state.currentUser.uid}/groups`).on('child_added', (snapshot) => {
        this.$fireDb.ref(`chatrooms/${snapshot.key}`).on('value', (chatroomSnapshot) => {
          if (chatroomSnapshot.val()) {
            this.chatrooms.push({
              key: snapshot.key,
              ...chatroomSnapshot.val()
            })
          }
        })
      })
    },

    copyLocation () {
      this.$refs.copyText.textContent = window.location.href
      this.$refs.copyText.select()
      this.$refs.copyText.setSelectionRange(0, 99999)

      document.execCommand('copy')

      this.alert = true
      window.setTimeout(() => { this.alert = false }, 3500)
    },

    logout () {
      this.$fireAuth.signOut()
    }
  }
}
</script>

<style scoped>

.hidden {
  position: absolute;
  left: -9999;
}

.copied.alert {
  position: fixed;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
}
</style>
