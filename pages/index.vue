<template>
  <div>
    <main class="flex items-end justify-center w-screen md:max-w-2xl mx-auto">
      <div class="p-4 w-full min-h-screen">
        <div class="flex justify-evenly mb-4 items-center">
          <input
            v-model="search"
            class="flex-grow border rounded p-2 mr-2"
            placeholder="Find outreach near you"
          />
          <TSelect
            v-model="selectedTopic"
            class="mr-2"
            :options="topics"
            hide-label
            placeholder="Topic"
          />
          <TSelect
            v-model="selectedAudience"
            class="mr-2"
            :options="audiences"
            hide-label
            placeholder="Audience"
          />
        </div>
        <div>
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="border shadow p-4 mb-4"
          >
            <div class="font-bold">{{ item.name }}</div>
            <div v-if="item.organisation">
              Organisation: {{ item.organisation }}
            </div>
            <div>Topics: {{ item.topics.join(', ') }}</div>
            <div>Audience: {{ item.audiences.join(', ') }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import useAuth from '~/use/auth'

export default {
  setup() {
    const { uid } = useAuth()
    const app = process.env.app

    return {
      uid,
      app
    }
  },
  data: () => ({
    search: '',
    items: [],
    topics: [],
    audiences: [],
    selectedTopic: '',
    selectedAudience: ''
  }),
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        let result = true

        if (this.selectedTopic) {
          result = result && item.topics.includes(this.selectedTopic)
        }

        if (this.selectedAudience) {
          result = result && item.audiences.includes(this.selectedAudience)
        }

        if (this.search) {
          result =
            result &&
            item.name.toLowerCase().includes(this.search.toLowerCase())
        }

        return result
      })
    }
  },

  async mounted() {
    const response = await axios.get(
      'https://v2-api.sheety.co/b18d9c93b86879edbf22952ace1b2554/outreachFinder/southCarolina'
    )

    const topicsList = ['']
    const audiencesList = ['']

    this.items = response.data.southCarolina.map((item) => {
      const topics = []
      const audiences = []

      for (let i = 1; i <= 3; i++) {
        const topic = item[`topic${i}`]
        const audience = item[`audience${i}`]

        if (topic) {
          topics.push(topic)
          topicsList.push(topic)
        }

        if (audience) {
          audiences.push(audience)
          audiencesList.push(audience)
        }
      }

      return {
        ...item,
        topics,
        audiences
      }
    })

    this.topics = _.uniq(topicsList)
    this.audiences = _.uniq(audiencesList)
  }
}
</script>
