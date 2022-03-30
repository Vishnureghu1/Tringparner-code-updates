<template>
  <v-app app>
  <Navbar />

    <v-main class="ma-4">
    </v-main>
    <vtoast ref="vtoast"/>
  </v-app>
</template>

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
