<template>
  <div>
    <v-card
      class="mb-3 user message pt-0 pr-0"
      :class="{ no: !userUid, current: isCurrentUserUid }"
      elevation="5"
      :shaped="!!userUid"
    >
      <v-card-text>
        <div
          v-if="userName"
          :class="{'text-right': isCurrentUserUid }"
        >
          {{ userName }}
        </div>
        <div
          class="text--primary"
          :class="{ 'text-center': !userUid, 'text-right': isCurrentUserUid }"
        >
          {{ text }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },

    userUid: {
      type: String,
      default: ''
    },

    userName: {
      type: String,
      default: ''
    }
  },

  computed: {
    isCurrentUserUid () {
      return this.userUid === this.$store.state.currentUser.uid
    }
  }
}
</script>

<style scoped>
  .message {
    width: max-content;
    max-width: 70%;
  }

  .current.user.message {
    margin-left: auto;
  }

  .no.user.message {
    margin: 0 auto;
  }
</style>
