<template>
  <v-container fluid v-if="!!project" class="d-flex flex-row align-start justify-start">
      <v-card class="d-flex flex-column" width="40vw" height="60vh" :flat="true" color="transparent">
        <v-card width="40vw" height="60vh" :flat="true" color="transparent">
          <project-image-component ref="projectImage" :project-id="project.id"/>
        </v-card>
        <div class="my-4 d-flex flex-row justify-space-between align-start">
          <v-file-input
            v-if="computedAccountCurrent"
            v-model="projectImage"
            accept="image/*"
            label="Edit Project Image"
            density="compact"
            prepend-icon="mdi-camera"
            single-line
            clearable
            hide-details
          />
          <v-btn class="ml-4" color="accent" :disabled="!projectImage || !projectImage.length" @click="changeImage">
            Upload
          </v-btn>
        </div>
      </v-card>
      <v-card width="50vw" height="60vh" :flat="true" color="transparent">
        <v-card-title class="d-flex flex-row justify-space-between">
          <div>{{ project.title }}</div>
          <v-btn v-if="computedAccountCurrent" color="accent" @click="editProject">
            Edit
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="auto">{{ project.shortDescription }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="auto">
              <div v-if="!!account" class="d-flex flex-row align-center">
                <account-avatar-component size="small" :current-user="false" :account-id="account.id"/>
                <div class="font-weight-medium ml-2">{{ account.fistName + ' ' + account.lastName }}</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <project-form-component :open="editDialog" action="edit" :project-id="project.id"
                              @entityUpdated="entityUpdated"
                              @close="editDialog = false"
      />
  </v-container>
</template>

<script>
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
import ProjectImageComponent from '@/components/image/ProjectImageComponent.vue'
import AccountAvatarComponent from '@/components/account/AccountAvatarComponent.vue'
import { mapGetters } from 'vuex'
import ProjectFormComponent from '@/components/project/ProjectFormComponent.vue'

export default {
  name: 'ProjectPreviewComponent',
  components: {
    ProjectFormComponent,
    AccountAvatarComponent,
    ProjectImageComponent
  },
  props: {
    project: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    account: null,
    statistics: null,
    errorImage: false,
    editDialog: false,
    projectImage: []
  }),
  computed: {
    ...mapGetters('account', {
      getAccount: 'getAccount'
    }),
    computedAccountCurrent () {
      return !!this.getAccount && !!this.account && this.account.id === this.getAccount.id
    }
  },
  watch: {
    project: {
      handler (value) {
        if (value) {
          this.loadAccount()
          this.loadStatistics()
        }
      },
      deep: true
    }
  },
  methods: {
    loadAccount () {
      RepositoryFactory.get('account').getById(this.project.accountId)
        .then((response) => {
          this.account = response.data
        })
    },
    loadStatistics () {
      RepositoryFactory.get('statistics').getForProject(this.project.id)
        .then((response) => {
          this.statistics = response.data
        })
    },
    editProject () {
      this.editDialog = true
    },
    entityUpdated () {
      this.editDialog = false
      this.$emit('reloadProject')
    },
    changeImage () {
      RepositoryFactory.get('project').uploadImage(this.projectImage[0], this.project.id)
        .then(() => {
          this.$refs.projectImage.reload()
        })
    }
  }
}
</script>
