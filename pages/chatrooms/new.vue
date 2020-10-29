<template>
  <chatrooms-dashboard :title="title">
    <loading v-if="loading" />

    <v-form
      v-if="!lastCreatedId"
      @submit.prevent="create"
    >
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

    <div v-else class="text-center">
      <p class="mb-6 mt-5">
        Chatroom created!
      </p>
      <v-btn
        class="mb-2"
        block
        :to="`/chatrooms?id=${lastCreatedId}`"
      >
        Access it
      </v-btn>
      <v-btn
        block
        @click="lastCreatedId = null"
      >
        Create another one
      </v-btn>
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
      title: 'Create Chat Room',
      name: '',
      lastCreatedId: '',
      loading: false
    }
  },

  methods: {
    create () {
      this.loading = true

      this.$fireDb.ref('chatrooms').push({
        name: this.name
      }).then((snapshot) => {
        this.$fireDb.ref(`users/${this.$store.state.currentUser.uid}/groups/${snapshot.key}`).set(true)

        this.name = ''
        this.loading = false
        this.lastCreatedId = snapshot.key
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
