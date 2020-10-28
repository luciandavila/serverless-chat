<template>
  <chatrooms-dashboard :title="title">
    <v-form @submit.prevent="create">
      <v-text-field
        v-model="name"
        label="Chatroom Name"
        required
      />

      <v-btn
        block
        :disabled="name.length === 0"
        @click="create"
      >
        Create
      </v-btn>
    </v-form>
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
      title: 'Create Chat Room',
      name: ''
    }
  },

  methods: {
    create () {
      this.$fireDb.ref('chatrooms').push({
        name: this.name
      }).then((snapshot) => {
        window.location.pathname = `/chatrooms/${snapshot.key}`
      })
    }
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>
