<template>
  <chatrooms-dashboard
    :title="chatroom.name"
    :show-drawer="false"
    copy-button
  >
    <div
      id="messages-container"
      class="pl-0 pr-0"
    >
      <message
        v-if="Object.keys(messages).length === 0"
        text="Be the first one to say something!"
      />
      <message
        v-for="(value) in messages"
        v-else
        :key="value.key"
        :text="value.message"
        :user-name="value.userName"
        :user-uid="value.userUid"
      />
    </div>

    <v-text-field
      v-model="newMessage"
      solo
      full-width
      hide-details
      label="Type a message..."
      append-icon="mdi-send"
      :loading="loadingInput"
      @click:append="sendMessage"
      @keydown="onInputKeydown"
    />
  </chatrooms-dashboard>
</template>

<script>
import ChatroomsDashboard from '~/components/ChatroomsDashboard.vue'
import Message from '~/components/Message.vue'

export default {
  components: {
    ChatroomsDashboard,
    Message
  },

  data () {
    return {
      id: null,
      loadingInput: false,
      newMessage: '',
      messages: []
    }
  },

  computed: {
    chatroom () {
      return this.$store.getters['chatrooms/getChatroomById'](this.id) || {}
    }
  },

  watch: {
    '$route.query': 'handleChatroomId'
  },

  middleware ({ redirect, route }) {
    if (!route.query.id) {
      return redirect('/chatrooms/new')
    }
  },

  created () {
    this.handleChatroomId()
  },

  updated () {
    this.scroolToBottom()
  },

  methods: {
    handleChatroomId () {
      this.detachChatroomListeners()

      this.id = this.$route.query.id

      this.addUserToChatroom()
      this.syncMessages()
    },

    detachChatroomListeners () {
      if (this.id) {
        this.$fireDb.ref(`messages/${this.id}`).off()
        this.$fireDb.ref(`chatrooms/${this.id}`).off()
      }
    },

    addUserToChatroom () {
      const userGroupRef = this.$fireDb.ref(`users/${this.$store.state.currentUser.uid}/groups/${this.id}`)

      userGroupRef.on('value', (snapshot) => {
        if (!snapshot.val()) {
          userGroupRef.set(true).then(() => {
            this.$fireDb.ref(`messages/${this.id}`).push({
              message: `${this.$store.state.currentUser.displayName} has entered the chatroom.`
            })
          })
        }
      })
    },

    syncMessages () {
      this.messages = []
      this.$fireDb.ref(`messages/${this.id}`).on('child_added', (snapshot) => {
        this.messages.push({
          ...snapshot.val(),
          key: snapshot.key
        })
      })
    },

    onInputKeydown (event) {
      if (event.code === 'Enter') {
        this.sendMessage(event)
      }
    },

    sendMessage (event) {
      const newMessage = this.newMessage.trim()

      if (!newMessage) {
        return null
      }

      this.loadingInput = true
      const messageObject = {
        userUid: this.$store.state.currentUser.uid,
        userName: this.$store.state.currentUser.displayName,
        message: newMessage
      }

      this.$fireDb.ref(`messages/${this.id}`).push(messageObject).then(() => {
        this.loadingInput = false
        this.newMessage = ''
      })
    },

    scroolToBottom () {
      document.getElementsByClassName('v-application--wrap')[0].scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  },

  head () {
    return {
      title: this.chatroom.name
    }
  }
}
</script>

<style scoped>
  #messages-container {
    min-height: calc(100vh - 144px);
  }
</style>
