<template>
  <v-card :flat="true">
    <v-card-text>
      <v-form>
        <div v-if="mode === 'login'">
          <div class="d-flex flex-row align-center justify-start">
            <div class="mr-2">Login:</div>
            <v-text-field v-model="login" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Login"
                          style="width: 10vw"
            />
          </div>
          <div class="mt-4 d-flex flex-row align-center justify-start">
            <div class="mr-2">Password:</div>
            <v-text-field v-model="password" type="password" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Password"
                          style="width: 10vw"
            />
          </div>
        </div>
        <div v-else-if="mode === 'register'">
          <div class="d-flex flex-row align-center justify-start">
            <div class="mr-2">Login:</div>
            <v-text-field v-model="login" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Login"
                          style="width: 10vw"
            />
          </div>
          <div class="mt-4 d-flex flex-row align-center justify-start">
            <div class="mr-2">Password:</div>
            <v-text-field v-model="password" type="password" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Password"
                          style="width: 10vw"
            />
          </div>
          <div class="mt-4 d-flex flex-row align-center justify-start">
            <div class="mr-2">Email:</div>
            <v-text-field v-model="email" type="text" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Email"
                          style="width: 10vw"
            />
          </div>
          <div class="mt-4 d-flex flex-row align-center justify-start">
            <div class="mr-2">Firstname:</div>
            <v-text-field v-model="fistName" type="text" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Firstname"
                          style="width: 10vw"
            />
            <div class="mx-2">Last Name:</div>
            <v-text-field v-model="lastName" type="text" single-line
                          density="compact"
                          hide-details
                          solo placeholder="Enter Your Lastname"
                          style="width: 10vw"
            />
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LoginFormComponent',
  props: {
    mode: {
      type: String,
      default: () => 'login'
    }
  },
  data: () => ({
    login: null,
    password: null,
    email: null,
    fistName: null,
    lastName: null
  }),
  computed: {
    computedUserCreds () {
      return {
        login: this.login,
        password: this.password,
        email: this.email,
        fistName: this.fistName,
        lastName: this.lastName
      }
    }
  },
  watch: {
    computedUserCreds: {
      handler (value) {
        if (!value) {
          return
        }
        this.$emit('credsChanged', value)
      },
      deep: true
    }
  }
}
</script>
