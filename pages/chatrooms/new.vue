<template>
  <chatrooms-dashboard :title="title">
    <div>
      TODO: This page will be responsible for creating new chatrooms, asigning the current user to it and then rediricting him to the new room.
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
      title: 'Create Chat Room'
    }
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>
