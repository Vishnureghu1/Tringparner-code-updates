<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-8">
                  <v-row>
                    <v-col cols="12" sm="10">
                      <h2 class="page_title mt-6 ml-5">
                        <v-icon class="mr-2" color="black" @click="goBack()"
                          >mdi-arrow-left</v-icon
                        >
                        Call and IVR Configuration
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5 pl-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12">
 <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                  Greeting Message Audio
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Welcome users with pre-recorded audio clips.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{ name: 'GreetingMessage', query: { bn: this.bussinessNumber } }">
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                  Caller Tune Audio
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Configure to play pre-recorded audio clips
                                  while put on hold.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{ name: 'CallerTune', query: { bn: this.bussinessNumber } }">
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <!-- <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                 IVR and Call Routing
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Configure how incoming calls are redirected
                                  between your agents.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                               
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25" 
                                      @click="callRouting()"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                              
                              </v-col>
                            </v-row>
                            <v-divider></v-divider> -->
         
                       <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                 IVR and Call Routing
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Configure how incoming calls are redirected
                                  between your agents.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                               
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25" 
                                      @click="IVRandcallRouting()"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                              
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                  Set Working Hours and Offline Audio
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Set a duration for which this number will be
                                  active.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">

                                <router-link :to="{ name: 'WorkingHours', query: { bn: this.bussinessNumber } }">
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2
                                  class="name_heading mt-4 mr-7"
                                  @click="callPauseNumber()"
                                >
                                 No Answer Audio
                                </h2>
                                <h2
                                  class="comment_heading mt-1 mb-5 mr-7"
                                  @click="callPauseNumber()"
                                >Set audio customers will hear when the call is not answered
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span
                                  ><v-icon
                                    class="mt-6 mb-5 mr-7"
                                    @click="callPauseNumber()"
                                    color="#EE1C25"
                                    >mdi-arrow-right</v-icon
                                  >
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                          </v-col>
                        </v-row>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
// import NotificationSettingsVue from './NotificationSettings.vue';
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top
    this.bussinessNumber = this.$route.query.bn;
  },
  data: () => ({
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
      },
      {
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "Call and IVR Configuration",
        disabled: true,
      },
    ],
    bussinessNumber:''

  }),

  methods: {
    goBack() {
       // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/BusinessNumber?bn="+this.bussinessNumber);
    },
    callPauseNumber() {
       // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/PauseNumber?bn="+this.bussinessNumber);
    },
    callRouting() {
       // const getNumber =  Object.keys(this.$route.query)[0]
       this.$router.push("/CallPreference?bn="+this.bussinessNumber);
    },

    IVRandcallRouting(){
    this.$router.push("/IVRandCallRouting?bn="+this.bussinessNumber);
    },
    MissedCallRouting() {
      // const getNumber =  Object.keys(this.$route.query)[0]
       this.$router.push("/MissedCallDistribution?bn="+this.bussinessNumber);
    },
    WorkingHours(){
      // const getNumber =  Object.keys(this.$route.query)[0]
       this.$router.push("/MissedCallDistribution?bn="+this.bussinessNumber);
    },
    NotificationSettings(){
       this.$router.push("/NotificationSettings?bn="+this.bussinessNumber);
    }
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>