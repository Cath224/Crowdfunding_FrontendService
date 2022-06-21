<template>
  <entity-dialog :value="open" title="Project" @close="close">
    <template v-slot:content>
      <entity-form v-if="open" configuration-name="project"
                   entity-repository-name="project"
                   :action="action"
                   :entity-id="projectId"
                   @entityCreated="entityCreated"
                   @entityUpdated="entityUpdated"
      >
      </entity-form>
    </template>

  </entity-dialog>

</template>

<script>
import EntityForm from '@/components/common/EntityForm.vue'
import EntityDialog from '@/components/common/EntityDialog.vue'

export default {
  name: 'ProjectFormComponent',
  components: {
    EntityDialog,
    EntityForm
  },
  props: {
    action: {
      type: String,
      default: () => 'view'
    },
    open: {
      type: Boolean
    },
    projectId: {
      type: String
    }
  },
  methods: {
    entityCreated () {
      this.$emit('entityCreated')
    },
    entityUpdated () {
      this.$emit('entityUpdated')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
