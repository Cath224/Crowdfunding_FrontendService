<template>
  <v-container v-if="!!project" fluid>

  <v-row v-if="!!project">
    <v-col>
      <v-card :flat="true" width="60vw">
        <v-tabs
          v-model="tab"
          color="accent"
        >
          <v-tab :fixed="true" :value="1">Description</v-tab>
          <v-tab :fixed="true" :value="2">Posts</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :key="1" :value="1">
            <div class="text-start">
              {{ project.description }}
            </div>
          </v-window-item>
          <v-window-item :key="2" :value="2">
            <div v-if="!!posts" class="text-start">
              <v-card v-for="post of posts" :key="post.id" :flat="true" :border="true" class="ma-2">
                <v-card-title>{{ post.title }}</v-card-title>
                <v-card-text>
                  <div>
                    {{ post.content }}
                  </div>
                  <div v-if="!!files[post.id] && files[post.id].length">
                    <v-img v-for="file of files[post.id]" :key="file.id"
                           :src="loadResource(post.id, file.resource)"></v-img>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
    <v-divider class="my-2" :vertical="true"/>
    <v-col v-if="!!computedGoalsOrTiers">
      <div v-if="!computedGoalsOrTiers.length" class="text-center">
        No Goals or Tiers
      </div>
      <v-card v-for="paymentContent of computedGoalsOrTiers" :key="paymentContent.id" :flat="true" :border="true"
              width="30vw">
        <v-card-header class="d-flex flex-row justify-space-between flex-grow-1">
          <div>
            {{ paymentContent.title }}
          </div>
          <div v-if="subscribe && paymentContent.id === subscribe" class="text-grey">
            Subscribed
          </div>
        </v-card-header>
        <v-card-text>Amount: {{ paymentContent.amount }}</v-card-text>
        <v-card-actions>
          <v-btn v-if="!subscribe || paymentContent.id !== subscribe" color="primary"
                 @click="subscribeOrDonate(paymentContent)">{{ computedGoalsOrTiersButtonName }}
          </v-btn>
          <v-btn v-else @click="cancelSubscription">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import { RepositoryFactory } from '@/utils/repository/RepositoryFactory'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectContentComponent',
  props: {
    project: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    tab: 1,
    posts: [],
    files: {},
    goals: [],
    tiers: [],
    subscribe: null
  }),
  computed: {
    ...mapGetters('account', {
      getAccount: 'getAccount'
    }),
    computedGoalsOrTiers () {
      if (!this.project) {
        return []
      }
      if (this.project.type === 'ONE_TIME') {
        return this.goals
      } else if (this.project.type === 'PERMANENT') {
        return this.tiers
      }
      return []
    },
    computedGoalsOrTiersButtonName () {
      if (this.project.type === 'ONE_TIME') {
        return 'Donate'
      } else if (this.project.type === 'PERMANENT') {
        return 'Subscribe'
      }
      return null
    }
  },
  watch: {
    project: {
      handler (value) {
        if (!value) {
          return
        }
        this.loadPosts(value)
        this.loadGoalOrTiers(value)
        this.loadSubscribes(value)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    loadResource (postId, resourceName) {
      return RepositoryFactory.get('post').getResource(postId, resourceName)
    },
    loadPosts (value) {
      if (!value) {
        return
      }
      RepositoryFactory.get('post').getByProjectId(value.id)
        .then((response) => {
          this.posts = response.data
          if (this.posts != null && !!this.posts.length) {
            this.posts.forEach((post) => {
              this.loadFiles(post.id)
            })
          }
        })
    },
    loadFiles (postId) {
      RepositoryFactory.get('file').getByPostId(postId)
        .then((response) => {
          const data = response.data
          if (!data) {
            return
          }
          this.files[postId] = [...data]
        })
    },
    loadGoalOrTiers (value) {
      if (!value) {
        return
      }
      if (value.type === 'ONE_TIME') {
        RepositoryFactory.get('goal').getByProjectId(value.id)
          .then((response) => {
            this.goals = response.data
          })
      } else if (value.type === 'PERMANENT') {
        RepositoryFactory.get('tier').getByProjectId(value.id)
          .then((response) => {
            this.tiers = response.data
          })
      }
    },
    subscribeOrDonate (paymentContent) {
      if (this.project.type === 'ONE_TIME') {
        RepositoryFactory.get('userGoal').create({
          goalId: paymentContent.id,
          accountId: this.getAccount.id,
          amount: paymentContent.amount
        }).then(() => {
          this.loadSubscribes(this.project)
          this.$emit('userSubscribed')
        })
      } else if (this.project.type === 'PERMANENT') {
        RepositoryFactory.get('userTier').create({
          tierId: paymentContent.id,
          accountId: this.getAccount.id,
          amount: paymentContent.amount
        }).then(() => {
          this.loadSubscribes(this.project)
          this.$emit('userSubscribed')
        })
      }
    },
    loadSubscribes (value) {
      if (!value) {
        return
      }
      if (value.type === 'ONE_TIME') {
        RepositoryFactory.get('userGoal').getByAccountId(this.getAccount.id, value.id)
          .then((response) => {
            this.subscribe = response.data.goalId
            this.$forceUpdate()
          })
      } else if (value.type === 'PERMANENT') {
        console.log(value)
        RepositoryFactory.get('userTier').getByAccountIdAndProjectId(this.getAccount.id, value.id)
          .then((response) => {
            this.subscribe = response.data.tierId
            this.$forceUpdate()
          })
      }
    },
    cancelSubscription () {
      if (this.project.type === 'ONE_TIME') {
        RepositoryFactory.get('userGoal').deleteByAccountIdAndProjectId(this.getAccount.id, this.project.id)
          .then(() => {
            this.loadSubscribes(this.project)
            this.$emit('userSubscribed')
          })
      } else if (this.project.type === 'PERMANENT') {
        RepositoryFactory.get('userTier').deleteByAccountIdAndProjectId(this.getAccount.id, this.project.id)
          .then(() => {
            this.loadSubscribes(this.project)
            this.$emit('userSubscribed')
          })
      }
    }
  }
}
</script>
