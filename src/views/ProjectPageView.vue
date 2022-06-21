<template>
  <project-main-component :id="id"/>
</template>

<script>
import ProjectMainComponent from '@/components/project/ProjectMainComponent.vue'

export default {
  name: 'ProjectPageView',
  components: { ProjectMainComponent },
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
