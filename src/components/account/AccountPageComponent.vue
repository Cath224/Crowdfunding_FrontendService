<template>
  <v-container v-if="computedAccount" fluid>
    <v-expansion-panels v-model="panels">
      <v-expansion-panel :value="0">
        <v-expansion-panel-title>User</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card height="40vh" flat>
            <div class="d-flex flex-row align-center fill-height">
              <div class="v-card d-flex flex-row flex-column align-center justify-center" style="width: 30vw">
                <account-avatar-component class="mb-4" size="x-large"/>
                <div class="d-flex flex-row justify-center align-center fill-height flex-grow-1" style="width: 20vw">
                  <v-file-input
                    v-model="image"
                    accept="image/*"
                                 label="Edit Avatar"
                                 density="compact"
                                 prepend-icon="mdi-camera"
                                 single-line
                                 clearable

                  />
                </div>
                <v-btn color="accent" :disabled="!image || !image.length" @click="uploadImage">Upload</v-btn>
              </div>
              <div class="v-divider v-divider--vertical mx-4"></div>
              <div>
                <div>Info</div>
                <entity-form configuration-name="account"
                             action="view" entity-repository-name="account"
                             :entity-id="getAccount.id"
                />
              </div>
            </div>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel :value="1">
        <v-expansion-panel-title>
          Subscriptions And Goals
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="5">
              <v-list>
                <v-list-item v-for="subscription of subscriptions" :key="subscription.id">
                  <v-list-item-avatar rounded>
                    <project-image-component cover :project-id="subscription.projectId"/>
                  </v-list-item-avatar>
                  <v-list-item-title class="mx-4">{{ subscription.projectName }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-divider :vertical="true"/>
            <v-col cols="5">

            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountAvatarComponent from '@/components/account/AccountAvatarComponent.vue'
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
import ProjectImageComponent from '@/components/image/ProjectImageComponent.vue'
import EntityForm from '@/components/common/EntityForm.vue'
import EventBus from '@/plugins/event-bus'

export default {
  name: 'AccountPageComponent',
  components: {
    EntityForm,
    ProjectImageComponent,
    AccountAvatarComponent
  },
  data: () => ({
    panels: [0, 1],
    subscriptions: [],
    goals: [],
    edit: false,
    image: []
  }),
  computed: {
    ...mapGetters('account', {
      getAccount: 'getAccount'
    }),
    computedAccount () {
      return !!this.getAccount
    }
  },
  watch: {
    computedAccount: {
      handler (value) {
        if (value) {
          this.loadSubscription()
          this.loadGoals()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    uploadImage () {
      RepositoryFactory.get('account').uploadImage(this.image[0], this.getAccount.id)
        .then(() => {
          EventBus.emit('avatarUpdate')
          this.image = []
        })
    },
    loadSubscription () {
      RepositoryFactory.get('userTier').getByAccountId(this.getAccount.id)
        .then((response) => {
          const userTiers = response.data
          if (!userTiers || !userTiers.length) {
            return
          }
          const ids = userTiers.map((el) => el.tierId)
          RepositoryFactory.get('tier').get(ids)
            .then((tierResponse) => {
              const tiers = tierResponse.data
              if (!tiers || !tiers.length) {
                return
              }
              const projectsIds = tiers.map((el) => el.projectId)
              RepositoryFactory.get('project').get(projectsIds)
                .then((projectResponse) => {
                  const projects = projectResponse.data
                  if (!projects || !projects.length) {
                    return
                  }
                  this.subscriptions = userTiers.map((el) => {
                    const tierByUserTier = tiers.find((tier) => tier.id === el.tierId)
                    if (!tierByUserTier) {
                      return null
                    }
                    const porjectByTier = projects.find((project) => project.id === tierByUserTier.projectId)
                    if (!porjectByTier) {
                      return null
                    }
                    el.projectId = porjectByTier.id
                    el.projectName = porjectByTier.title
                    return el
                  })
                    .filter((el) => !!el)
                })
            })
        })
    },
    editAccount () {
      this.edit = true
    },
    loadGoals () {

    }
  }
}
</script>
