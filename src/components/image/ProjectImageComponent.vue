<template>
  <v-img ref="projectImage" :src="getSrc()" :lazy-src="computedLogoSrc"
         :cover="cover"
         @error="imageErrorHandler" />
</template>

<script>
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'

export default {
  name: 'ProjectImageComponent',
  props: {
    projectId: {
      type: String,
      required: true
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    src: null,
    errorImage: false
  }),
  computed: {
    computedLogoSrc () {
      return new URL('../../assets/project_logo_template.webp', import.meta.url).href
    }
  },
  mounted () {
    this.errorImage = false
    this.reload()
  },
  methods: {
    reload () {
      this.src = this.loadProjectImage()
      this.$forceUpdate()
    },
    getSrc () {
      return this.src
    },
    loadProjectImage () {
      if (this.errorImage) {
        return this.computedLogoSrc
      }
      return RepositoryFactory.get('project').getImage(this.projectId)
    },
    imageErrorHandler () {
      this.errorImage = true
      this.reload()
    }
  }
}
</script>
