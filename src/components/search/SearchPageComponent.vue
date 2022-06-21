<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <search-field-component @search="search"/>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row>
      <v-col class="ma-10" v-for="item of items" :key="item.id" cols="2">
        <v-card height="60vh" width="20vw" :to="{name: 'project', params: {
          id: item.id
        }}">
          <v-sheet height="20vh" width="100%">
            <project-image-component :project-id="item.id"/>
          </v-sheet>
          <v-card-header>
            <v-card-title>{{ item.title }}</v-card-title>
          </v-card-header>
          <v-card-text>
            {{ getShortDescription(item) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchFieldComponent from '@/components/search/SearchFieldComponent.vue'
import ProjectImageComponent from '@/components/image/ProjectImageComponent.vue'

export default {
  name: 'SearchPageComponent',
  components: {
    ProjectImageComponent,
    SearchFieldComponent
  },
  data: () => ({
    items: []
  }),
  methods: {
    search (items) {
      this.items = items
    },
    getShortDescription (item) {
      return item.shortDescription && item.shortDescription.length > 160 ? item.shortDescription.substr(0, 160) + '...' : item.shortDescription
    }
  }
}
</script>
