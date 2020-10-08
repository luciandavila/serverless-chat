<template>
  <div class="text-center">
    <v-overlay>
      <v-card
        class="mx-auto"
        max-width="90%"
      >
        <v-card-text>
          <div>Welcome to</div>
          <p class="display-1 text--primary">
            serverless-chat
          </p>
          <div class="text--primary">
            <p>
              Simple serverless chat app created with Nuxt.js, connected to google cloud tools like Firebase Authentication and Firebase Realtime Database.
            </p>

            <v-btn
              tile
              @click.stop="login"
            >
              <v-icon left>
                mdi-google
              </v-icon>
              login with google
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <p class="subtitle-2 font-weight-light pt-6">
        The app can be installed as a PWA, take a try!
        <br>
        Developed by <a href="https://github.com/luciandavila">luciandavila</a>
      </p>
    </v-overlay>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      const provider = new this.$fireAuthObj.GoogleAuthProvider()

      this.$fireAuth.signInWithRedirect(provider)
    }
  }
}
</script>
