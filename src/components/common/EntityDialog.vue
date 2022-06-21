<template>
  <v-dialog :model-value="value" min-width="80vw" min-height="60vh" @click:outside="close">
    <v-card min-width="80wh" min-height="60vh">
      <v-card-title>
        <div class="d-flex flex-row justify-space-between align-center fill-height flex-grow-1">
          <div>{{ title }}</div>
          <v-btn :icon="true" :flat="true" @click="close">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <div class="d-flex flex-row flex-grow-1 fill-height">
        <slot name="content"></slot>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EntityDialog',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
