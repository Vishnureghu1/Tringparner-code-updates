<template>
  <v-app app>
  <Navbar :isLoggedIn="isLoggedIn"/>

    <v-main class="ma-4">
    </v-main>
    <vtoast ref="vtoast"/>
  </v-app>
</template>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js" integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>
<script>
import Navbar from '@/components/Navbar.vue';
import vtoast from '@/components/snackbar.vue';
import EventBus from '@/event-bus.js';

export default {
  props: ['isLoggedIn'],
  name: 'App',
  components: {
  Navbar,
  vtoast
  },
  data() {
    return {
      loggedIn: false
    }
  },
  computed: {
    isLoggedIn() {
      if (localStorage.getItem('loggedIn')) return localStorage.getItem("loggedIn") === "true";
      return this.loggedIn
    }
  },
  created () {
    EventBus.$on('OnLogin', (isLogin) => {
      this.loggedIn = isLogin
    })
  },
   mounted() {
    this.$root.vtoast = this.$refs.vtoast;
  }
};
</script>
