<template>
  <div >
  <v-avatar v-if="computedAccount"  color="accent" :size="size">
      <v-img v-if="!errorImage" :src="getSrc()"
             @error="imageErrorHandler"/>
      <div v-else>{{ computedAccountInitials }}</div>
  </v-avatar>
  </div>
</template>

<script>
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
import { mapGetters } from 'vuex'
import EventBus from '@/plugins/event-bus'

export default {
  name: 'AccountAvatarComponent',
  props: {
    size: {
      type: String,
      default: () => 'default'
    },
    currentUser: {
      type: Boolean,
      default: true
    },
    accountId: {
      type: String
    }
  },
  data: () => ({
    errorImage: false,
    src: null,
    loading: false,
    account: null
  }),
  computed: {
    ...mapGetters('account', {
      getAccount: 'getAccount'
    }),
    computedLogoSrc () {
      return new URL('../../assets/project_logo_template.webp', import.meta.url).href
    },
    computedAccount () {
      return this.currentUser ? this.getAccount : this.account
    },
    computedAccountId () {
      return this.computedAccount ? this.computedAccount.id : null
    },
    computedAccountInitials () {
      return this.computedAccount ? `${this.computedAccount.fistName[0]}${this.computedAccount.lastName[0]}`.toUpperCase() : 'AC'
    }
  },
  watch: {
    getAccount: {
      handler (value) {
        if (!value) {
          return
        }
        this.reload()
      },
      deep: true,
      immediate: true
    },
    currentUser: {
      handler (value) {
        if (value) {
          return
        }
        this.loadAccount()
      },
      immediate: true
    }
  },
  mounted () {
    EventBus.on('avatarUpdate', () => {
      this.reload()
    })
  },
  methods: {
    loadAccount () {
      RepositoryFactory.get('account').getById(this.accountId)
        .then((response) => {
          this.account = response.data
        })
    },
    reload () {
      this.src = this.loadProjectImage()
    },
    getSrc () {
      this.$forceUpdate()
      return this.src
    },
    loadProjectImage () {
      if (this.errorImage) {
        return null
      }
      if (!this.computedAccountId) {
        this.imageErrorHandler()
      }
      return RepositoryFactory.get('account').getImage(this.computedAccountId)
    },
    imageErrorHandler () {
      this.errorImage = true
      this.reload()
    }
  }

}
</script>
