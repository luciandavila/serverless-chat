<template>
  <chatrooms-dashboard
    :title="title"
    :show-drawer="false"
    copy-button
  >
    <div>
      <div>
        {{ id }}
      </div>

      <div>
        TODO: this page be responsible for loading the chat messages and sending new ones.
        <br>
        The page will also be responsible for showing the chatroom title in the top and a copy icon in the right, which will copy chatroom link in the clipboard and show a message "Chat Room link copied, feel free to share it."
        <br>
        When the current user is not assigned to the chat room, it must me assigned during the created hook in this view.
      </div>

      <v-text-field
        solo
        label="Type a message..."
        append-icon="mdi-send"
      />
    </div>
  </chatrooms-dashboard>
</template>

<script>
import ChatroomsDashboard from '~/components/ChatroomsDashboard.vue'

export default {

  components: {
    ChatroomsDashboard
  },

  data () {
    return {
      id: null,
      title: 'chatroom_name'
    }
  },

  created () {
    this.id = this.$route.params.id
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>
