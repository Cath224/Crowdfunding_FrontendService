<template>
  <v-container v-if="!!entity" fluid>
    <v-card class="d-flex flex-column flex-row align-content-space-between fill-height"
            min-height="30vh" min-width="50vw" :flat="true">
      <v-card-text class="pa-0 ma-0">
        <v-container v-if="entityAction === 'view'" fluid>
          <v-row v-for="(row, rowIndex) of configuration.rows" :key="rowIndex" class="ma-0">
            <v-col v-for="(col, colIndex) of row.cols" :key="colIndex" class="ma-0">
              <div class="d-flex flex-row align-center">
                <div class="text-grey text-body-2">{{ col.name }}:</div>
                <div class="ml-2 text-body-1">{{ getEntityValue(col.field) }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card v-else :flat="true">
          <v-row v-for="(row, rowIndex) of configuration.rows" :key="rowIndex" class="ma-0">
            <v-col v-for="(col, colIndex) of row.cols" :key="colIndex" class="ma-0">
              <div class="d-flex flex-row align-end">
                <div class="text-grey text-body-2 mr-2">{{ col.name }}:</div>
                <v-text-field v-model="entity[col.field]" v-if="col.type === 'text'"
                              single-line
                              density="compact"
                              hide-details
                              solo
                              bg-color="transparent"
                />
                <v-textarea v-model="entity[col.field]" v-else-if="col.type === 'text-area'"
                            hide-details
                            density="compact"
                            bg-color="transparent"
                />
                <v-select v-model="entity[col.field]" v-else-if="col.type === 'switch'"
                          :items="getSelectItems(col.dictionary)"
                          hide-details
                          solo
                          density="compact"
                          bg-color="transparent"
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
      <v-card-actions class="d-flex flex-row justify-end align-end flex-grow-1">
        <v-btn color="accent" @click="editAction">{{actionButtonName}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { ConfigurationFactory } from '@/utils/configuration/ConfigurationFactory'
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
import { DictionaryFactory } from '@/utils/dictionary/DictionaryFactory'

export default {
  name: 'EntityForm',
  props: {
    configurationName: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    entityRepositoryName: {
      type: String,
      required: true
    },
    loadEntityMethodName: {
      type: String,
      default: () => 'getById',
      required: false
    },
    entityId: {
      type: String
    }
  },
  data: () => ({
    entityAction: 'view',
    entity: null,
    configuration: null,
    actionButtonName: 'Edit'
  }),
  watch: {
    action: {
      handler (value) {
        if (value) {
          this.entityAction = value
        } else {
          this.entityAction = 'view'
        }
      },
      immediate: true
    },
    entityAction: {
      handler (value) {
        if (value === 'edit' || value === 'create') {
          this.actionButtonName = 'Save'
        } else {
          this.actionButtonName = 'Edit'
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (!this.configurationName) {
      return
    }
    this.loadConfiguration()
    this.initEntity()
  },
  methods: {
    loadConfiguration () {
      this.configuration = ConfigurationFactory.get(this.configurationName)
    },
    initEntity () {
      if (this.entityAction === 'view' || this.entityAction === 'edit') {
        this.loadEntity().then((response) => {
          this.entity = response.data
        })
      } else if (this.entityAction === 'create') {
        this.entity = {}
      }
    },
    loadEntity () {
      return RepositoryFactory.get(this.entityRepositoryName)[this.loadEntityMethodName](this.entityId)
    },
    getEntityValue (fieldName) {
      if (!fieldName) {
        return null
      }
      return this.entity[fieldName]
    },
    editAction () {
      if (this.entityAction === 'view') {
        this.entityAction = 'edit'
      } else if (this.entityAction === 'edit') {
        RepositoryFactory.get(this.entityRepositoryName).update(this.entity, this.entityId)
          .then((response) => {
            this.entity = response.data
            this.entityAction = 'view'
            this.$emit('entityUpdated', response.data)
          })
      } else if (this.entityAction === 'create') {
        RepositoryFactory.get(this.entityRepositoryName).create(this.entity)
          .then((response) => {
            this.entity = response.data
            this.entityAction = 'view'
            this.$emit('entityCreated', response.data)
          })
      }
    },
    getSelectItems (name) {
      const dictionary = DictionaryFactory.get(name)
      return dictionary ? dictionary.items : []
    }
  }
}
</script>
