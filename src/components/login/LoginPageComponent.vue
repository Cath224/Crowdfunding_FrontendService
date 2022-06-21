<template>
<v-container fluid>
  <v-row justify="center" align="center" align-content="center">
    <v-col align-self="center" cols="auto">
      <v-card min-width="35vw" min-height="65vh">
        <v-card-title class="d-flex flex-row align-start justify-center">
          <div>
            <v-img :src="computedLogoSrc" width="8vw" :cover="true" />
            <div class="mx-0 px-0 font-weight-bold text-lime-lighten-1">
              아티스트 펀딩
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <login-form-component :mode="mode" @credsChanged="credsChanged" />
        </v-card-text>
        <v-card-actions class="d-flex flex-row align-center justify-end">
          <v-btn color="text"  @click="changeMode">{{mode === 'login' ? 'Register' : 'Login'}}</v-btn>
          <v-btn color="primary" :disabled="!user" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import LoginFormComponent from '@/components/login/LoginFormComponent.vue'
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
export default {
  name: 'LoginPageComponent',
  components: { LoginFormComponent },
  data: () => ({
    user: null,
    mode: 'login'
  }),
  computed: {
    computedLogoSrc () {
      return new URL('../../assets/logo.svg', import.meta.url).href
    }
  },
  methods: {
    credsChanged (value) {
      this.user = Object.assign({}, value)
    },
    changeMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else if (this.mode === 'register') {
        this.mode = 'login'
      }
    },
    submit () {
      if (this.mode === 'login') {
        this.login()
      } else if (this.mode === 'register') {
        this.register()
      }
    },
    login () {
      RepositoryFactory.get('auth').login(this.user).then((response) => {
        localStorage.setItem('token', response.headers.authorization
          .replace('Bearer ', ''))
        this.$store.dispatch('account/loadAccount')
        this.$router.push({ name: 'home' })
      })
    },
    register () {
      const user = Object.assign({}, this.user)
      RepositoryFactory.get('auth').register(user).then(() => {
        RepositoryFactory.get('auth').login(user).then((response) => {
          localStorage.setItem('token', response.headers.authorization
            .replace('Bearer ', ''))
          delete user.login
          delete user.password
          RepositoryFactory.get('account').create(user).then(() => {
            this.$store.dispatch('account/loadAccount').then(() => {
              this.$router.push({ name: 'home' })
            })
          })
        })
      })
    }
  }
}
</script>
