<template>
  <v-app theme="light" style="background: gainsboro">
    <v-app-bar v-if="$route.name !== 'auth'" color="primary">
      <v-app-bar-title>
        <div class="d-flex flex-row justify-start align-center">
          <div class="d-flex flex-column v-col-auto mx-0 px-0">
            <v-img :src="computedLogoSrc" width="8vw" :cover="true" @click="clickLogo">
            </v-img>
          </div>
          <div class="d-flex flex-column v-col-auto mx-0 px-0 font-weight-bold text-lime-lighten-4">
            아티스트 펀딩
          </div>
        </div>
      </v-app-bar-title>
      <v-spacer/>
      <div class="d-flex flex-row justify-center align-center">
        <v-btn color="secondary" :to="{name: 'home'}">Home</v-btn>
        <v-btn color="secondary" :to="{name: 'search'}">Search</v-btn>
        <v-btn :icon="true" :to="{name: 'user'}">
          <account-avatar-component/>
        </v-btn>
        <v-btn color="secondary" @click="logout">Logout</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
import AccountAvatarComponent from '@/components/account/AccountAvatarComponent.vue'
import { TokenFactory } from '@/plugins/token'

export default {
  name: 'App',
  components: { AccountAvatarComponent },
  data: () => ({
    showMenu: false,
    errorSnackbar: null
  }),
  computed: {
    ...mapGetters('account', {
      getAccount: 'getAccount'
    }),
    computedLogoSrc () {
      return new URL('./assets/logo.svg', import.meta.url).href
    },
    computedAccountName () {
      return this.getAccount ? `${this.getAccount.fistName} ${this.getAccount.lastName}` : null
    }
  },
  created () {
    if (TokenFactory.get()) {
      this.$store.dispatch('account/loadAccount')
    }
  },
  methods: {
    clickLogo () {
      this.$router.push({ name: 'home' })
    },
    logout () {
      TokenFactory.remove()
      this.$store.dispatch('account/unloadAccount')
      this.$router.push({ name: 'auth' })
    }
  }
}
</script>
