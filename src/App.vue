<template>
  <v-app app>
	<Navbar v-if="this.$router.history.current.fullPath == '/manageUsers' || this.$router.history.current.fullPath == '/billing_details' || this.$router.history.current.fullPath == '/myinfo' || this.$router.history.current.fullPath == '/calllogs' || this.$router.history.current.fullPath == '/add_agents' || this.$router.history.current.fullPath == '/active_call' || this.$router.history.current.fullPath == '/missed_call' || this.$router.history.current.fullPath == '/greeting' || this.$router.history.current.fullPath == '/blocked_calls' || this.$router.history.current.fullPath == '/addons' || this.$router.history.current.fullPath == '/analytics'" />

    <v-main class="ma-4">
      <router-view v-if="this.$router.history.current.fullPath != '/calllogs'"></router-view>
      <!-- <router-view v-if="this.$router.history.current.fullPath != '/billing_details'"></router-view> -->
    </v-main>
  
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',

  components: {
	Navbar,
  },


};
</script>
