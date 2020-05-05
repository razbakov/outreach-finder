<template>
  <div>
    <main
      class="flex items-end justify-center w-screen mt-16 md:max-w-2xl mx-auto"
    >
      <div class="p-4 w-full min-h-screen">
        <div class="flex">
          <input
            v-model="search"
            class="flex-1 border rounded p-2"
            placeholder="Find outreach near you"
          />
          <TButton class="ml-4">Search</TButton>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import useAuth from '~/use/auth'
import TButton from '~/components/TButton'

export default {
  components: {
    TButton
  },
  setup() {
    const { uid } = useAuth()
    const app = process.env.app

    return {
      uid,
      app
    }
  },
  data: () => ({
    search: ''
  })
}
</script>
