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
                        Call Flow Settings
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
                                <h2 class="name_heading mr-7">
                                  Notification Settings
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Manage how you get notifications for each type
                                  of vent on your Virtual Number
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <!-- <router-link
                                  :to="{ name: 'NotificationSettings', params: { bn: this.bussinessNumber }}"
                                > -->
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="NotificationSettings()"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                                <!-- </router-link> -->
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                           
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                  Blocked Numbers
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Block unwanted incoming and spam callers.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{ name: 'BlockedNumbers', query: { bn: this.bussinessNumber } }">
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
                                  Set Working Hours
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
                                  Pause Virtual Number
                                </h2>
                                <h2
                                  class="comment_heading mt-1 mb-5 mr-7"
                                  @click="callPauseNumber()"
                                >
                                  Temporarily pause receiving calls on this
                                  virtual number.
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
        text: "Call Flow Settings",
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