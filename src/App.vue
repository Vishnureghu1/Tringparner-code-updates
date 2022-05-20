<template>

  <v-app app v-if="windowWidth>=991">
    
        <!-- <br> Window height: {{ windowHeight }} <br/>
        <br> Window width: {{ windowWidth }} <br/> -->

  <!-- <Navbar /> -->
  <Navbar :key="$route.fullPath"></Navbar>

    <v-main class="ma-4">
  
    </v-main>
    <vtoast ref="vtoast"/>
  </v-app>
    <v-app app v-else>

<template>
  
  <v-card  align="center" justify="center" class="py-12 row align-center"
    width="100%"
    elevation="0"
  >


    <v-row align="center">
        <v-col cols="12">
          <v-card elevation="0"
            color=""
            light
          >
          <img
          class="mt-2 ml-2 justify-center
"
          :src="require('../public/tring-logo.png')"
          height="35"
        />
            <v-card-title  class="center justify-center
">
             You are viewing our webite on mobile!
            </v-card-title>

            <v-card-subtitle  class="center justify-center
">You can now download our app from Playstore / Appstore by clicking the following link.</v-card-subtitle>

          <v-btn href="https://d28mmsju4zsyhy.cloudfront.net"  class="text-capitalize ma-3 rounded-pill red_button"
                            min-width="140px"
                            color="white"
                            outlined>
                Download Now
              </v-btn>   <v-card-actions class="justify-center
">
             
<div class="d-flex">

  <div>          <img
          class="mt-2 ml-2 justify-center
"
          :src="require('../public/ios.svg')"
          height="100"
        /></div>
              <div><img   class="mt-2 ml-2 justify-center
" :src="require('../public/android.svg')"  height="100"></div>
</div>
            </v-card-actions>
          </v-card>
        </v-col>


      </v-row>

  </v-card>
</template>


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
      data() {
        return {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            txt: ''
        }
    },
  mounted() {
     
    this.$root.vtoast = this.$refs.vtoast;
     this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
  },
      watch: {
        windowHeight(newHeight, oldHeight) {
            this.txt = `it changed to ${newHeight} from ${oldHeight}`;
        },
               windowWidth(newWidth, oldWidth) {
            this.txt = `it changed to ${newWidth} from ${oldWidth}`;
        }
    },

    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },

    methods: {  
        onResize() {
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
        }
    }
};
</script>
