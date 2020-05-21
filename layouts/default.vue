<template>
  <div
    class="font-sans leading-normal tracking-normal antialiased min-h-screen"
  >
    <div class="md:flex items-start">
      <nav class="flex items-center justify-between flex-wrap p-6">
        <router-link
          to="/"
          class="no-underline flex items-center justify-center leading-none hover:no-underline text-4xl"
        >
          <TIcon class="h-32 w-64" name="logo" />
        </router-link>

        <div class="menu flex md:mt-0 items-center">
          <router-link
            v-for="nav in app.nav"
            :key="nav.link"
            :to="localePath(nav.link)"
            class="px-4 py-2 mx-4 md:block hidden"
          >
            {{ nav.name }}
          </router-link>
        </div>
      </nav>
      <nuxt />
    </div>

    <footer class="flex text-center p-4 justify-center items-center mb-8">
      <div>
        <TButton v-if="uid" to="/app">Submit Outeach</TButton>
        <TButton v-if="!uid" to="/signup">Submit Outeach</TButton>
        <a v-if="social.email" :href="`mailto:${social.email}`">Contact</a>
      </div>
    </footer>
  </div>
</template>

<script>
import useAuth from '~/use/auth'
import TIcon from '~/components/TIcon'

export default {
  components: {
    TIcon
  },
  data: () => ({
    isMenuOpen: false
  }),
  setup() {
    const { uid, account } = useAuth()

    const app = process.env.app
    const social = app.social

    return {
      uid,
      account,
      app,
      social
    }
  },
  watch: {
    $route() {
      this.isMenuOpen = false
    }
  }
}
</script>
