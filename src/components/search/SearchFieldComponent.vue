<template>
  <v-text-field
    class="ma-0"
    v-model="searchRequest"
    :loading="loading"
    placeholder="Start typing to Search"
  ></v-text-field>
</template>

<script>
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'

export default {
  name: 'SearchFieldComponent',
  data: () => ({
    model: null,
    searchRequest: null,
    items: [],
    loading: false
  }),
  watch: {
    searchRequest (value) {
      if (!value) {
        this.items = []
      }
      this.search(value)
    },
    'items.length': {
      handler () {
        this.$emit('search', this.items)
      }
    }
  },
  methods: {
    search (value) {
      this.loading = true
      RepositoryFactory.get('search').searchForProject(value)
        .then((response) => {
          this.items = response.data
        }).finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
.v-autocomplete__content .v-list__tile {
  height: auto;
}
</style>
