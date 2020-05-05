<template>
  <div
    class="font-sans leading-normal tracking-normal antialiased min-h-screen"
  >
    <header>
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
    </header>
    <nuxt />
    <footer class="md:flex text-center p-4 justify-between items-center">
      <div class="menu md:mt-0 items-center">
        <router-link v-if="uid" to="/app">Submit Outeach</router-link>
        <router-link v-if="!uid" to="/signup">Submit Outeach</router-link>
        <router-link
          v-for="nav in app.nav"
          :key="nav.link"
          :to="nav.link"
          class="px-4 py-2 mx-4"
        >
          {{ nav.name }}
        </router-link>
        <a v-if="social.email" :href="`mailto:${social.email}`">Support</a>
      </div>
      <div class="md:flex mt-8 md:mt-0">
        <div v-if="Object.keys(social).length" class="m-3 text-md font-bold">
          Follow us
        </div>
        <div v-if="social.twitter" class="m-3">
          <a
            class="underline hover:no-underline hover:text-blue-500"
            :href="`https://twitter.com/${social.twitter}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <div v-if="social.instagram" class="m-3">
          <a
            class="underline hover:no-underline hover:text-pink-500"
            :href="`https://instagram.com/${social.instagram}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <div v-if="social.facebook" class="m-3">
          <a
            class="underline hover:no-underline hover:text-blue-500"
            :href="`https://facebook.com/${social.facebook}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
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
