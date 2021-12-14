<template>
  <v-app app>
  <Navbar />

    <v-main class="ma-4">
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
