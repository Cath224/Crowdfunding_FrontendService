<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col cols="4">
        <v-img :src="computedLogoSrc" :lazy-src="computedLogoSrc" />
      </v-col>
    </v-row>
    <v-divider class="my-5"/>
    <v-row align="start" justify="center">
      <v-col cols="auto">
        <div class="text-center text-h2 text-primary">
          {{ totalSpentAmount }}
        </div>
        <div class="text-center text-subtitle-1">
          Total money allocated to projects
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-5"/>
    <v-row class="mt-4">
      <v-col>
        <v-row justify="center">
          <v-col cols="auto">
            <v-card width="40vw" height="60vh" :flat="true">
              <v-card-title>Top Projects</v-card-title>
              <v-card-text>
                <v-list height="45vh">
                  <v-list-item v-for="(project, index) of topProjects" :key="project.id"
                               :to="{name: 'project', params: {id: project.id}}"
                  >
                    <v-list-item-avatar>
                      <project-image-component :project-id="project.id" :cover="true" />
                    </v-list-item-avatar>
                    <v-list-item-title class="ml-4">{{ `${index + 1}. ${project.title}` }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-divider :vertical="true"/>
          <v-col cols="auto">
            <v-card width="40vw" height="60vh" :flat="true">
              <v-card-title>New Projects</v-card-title>
              <v-card-text>
                <v-list height="45vh">
                  <v-list-item v-for="(project, index) of newProjects" :key="project.id"
                               :to="{name: 'project',  params: {id: project.id}}"
                  >
                    <v-list-item-avatar>
                      <project-image-component :project-id="project.id" :cover="true" />
                    </v-list-item-avatar>
                    <v-list-item-title class="ml-4">{{ `${index + 1}. ${project.title}` }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
import ProjectImageComponent from '@/components/image/ProjectImageComponent.vue'

export default {
  name: 'HomeComponent',
  components: { ProjectImageComponent },
  data: () => ({
    totalSpentAmount: 0,
    topProjects: [],
    newProjects: []
  }),
  computed: {
    computedLogoSrc () {
      return new URL('../../assets/project_logo_template.webp', import.meta.url).href
    }
  },
  mounted () {
    this.loadTotalAmount()
    this.loadTopProjects()
    this.loadNewProjects()
  },
  methods: {
    loadTotalAmount () {
      RepositoryFactory.get('statistics').getTotalAmountPayment()
        .then((response) => {
          this.totalSpentAmount = response.data.amount
        })
    },
    loadTopProjects () {
      RepositoryFactory.get('statistics').getTopAmountProject()
        .then((response) => {
          this.topProjects = response.data
        })
    },

    loadNewProjects () {
      RepositoryFactory.get('statistics').getTopNewProject()
        .then((response) => {
          this.newProjects = response.data
        })
    }
  }
}
</script>
