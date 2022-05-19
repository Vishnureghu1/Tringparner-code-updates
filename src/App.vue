<template>
  <v-app app>
  <!-- <Navbar /> -->
  <Navbar :key="$route.fullPath"></Navbar>

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
export default {
  name: 'App',
  components: {
  Navbar,
  vtoast 
  },
  mounted() {
     
    this.$root.vtoast = this.$refs.vtoast;
  }
};
</script>
