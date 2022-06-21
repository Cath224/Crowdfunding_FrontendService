<template>
    <v-card :flat="true" height="80vh" class="d-flex flex-row justify-start my-2">
      <project-preview-component ref="previewProject" :project="project"
                                 @reloadProject="loadProject"
      />
    </v-card>
    <v-divider/>
    <v-card :flat="true"  class="d-flex flex-row justify-center my-2">
      <project-content-component :project="project" @userSubscribed="subscription"/>
    </v-card>
</template>

<script>
import ProjectPreviewComponent from './ProjectPreviewComponent.vue'
import ProjectContentComponent from './ProjectContentComponent.vue'
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'

export default {
  name: 'ProjectMainComponent',
  components: {
    ProjectContentComponent,
    ProjectPreviewComponent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    project: null
  }),
  mounted () {
    this.loadProject()
  },
  methods: {
    loadProject () {
      RepositoryFactory.get('project').getById(this.id)
        .then((response) => {
          this.project = response.data
        })
    },
    subscription () {
      this.$refs.previewProject.loadStatistics()
    }
  }
}
</script>
