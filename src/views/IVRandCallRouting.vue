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
                        <v-icon class="mr-2" color="black" @click="goBack()">mdi-arrow-left</v-icon>
                        IVR and Call Routing
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>

                  <v-card color="transparent" outlined class="mt-5 pl-5" max-width="1069">
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <div class="center align-center" align="center">

                              <p>Please choose your plan</p>

                  <v-btn-toggle 
                    v-model="toggle_IVR"
                    rounded
                    elivation="5"
                    class="toggle_IVR"
                    borderless 
                  >
                    <v-btn
                      width="200"
                      @click="isIvr(1)" class="active"
                      v-class="{ active: isActive }"
                    >
                      IVR
                    </v-btn>
                     <v-btn
                      width="200"
                      @click="isIvr(2)"
                      v-class="{ active: isActive }"
                    >
                     Direct (No IVR)
                    </v-btn>
                  

                 
                  </v-btn-toggle>
                            </div> 
                            <div v-if="IvrPlan==1">
                            <h2 class="name_heading mt-0 mr-0 mb-0">
                              Basic IVR Audio Settings
                            </h2>


                            <v-row>
                              <v-col cols="6">
                                <h2 class="light3 nunito-font mt-4 mr-7 text--red f18">
                                  Introduction and Departments Audio
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{
                                  name: 'basicIvrAudio',
                                  query: { key: 'intro', bn: this.bussinessNumber },
                                }">
                                  <span>
                                    <v-icon class="mt-3 mb-4 mr-7" color="#EE1C25">mdi-arrow-right</v-icon>
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="light3 nunito-font mt-4 mr-7 text--red f18">
                                  No Keypress Audio
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{
                                  name: 'basicIvrAudio',
                                  query: { key: 'nokeypress', bn: this.bussinessNumber },
                                }">
                                  <span>
                                    <v-icon class="mt-3 mb-4 mr-7" color="#EE1C25">mdi-arrow-right</v-icon>
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="light3 nunito-font mt-4 mr-7 text--red f18">
                                  Wrong Keypress Audio
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{
                                  name: 'basicIvrAudio',
                                  query: { key: 'wrongkeypress', bn: this.bussinessNumber },
                                }">
                                  <span>
                                    <v-icon class="mt-3 mb-4 mr-7" color="#EE1C25">mdi-arrow-right</v-icon>
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>


                            <h2 class="name_heading mt-10 mr-0 mb-0">
                              Key Press Department Selection
                            </h2>



                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "1"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('1')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress"2"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('2')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "3"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('3')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "4"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('4')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "5"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('5')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "6"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('6')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "7"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('7')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "8"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('8')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "9"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('9')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "0"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('0')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "*"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('*')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7 light4">
                                  Keypress "#"
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Sales Enquiry
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span>
                                  <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25" @click="keyPressDepartment('#')">
                                    mdi-arrow-right</v-icon>
                                </span>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            </div>
                             <div v-else-if="IvrPlan==2">
                             <v-row>
                                                                    <v-col cols="6">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            Select Agents
                                                                        </h2>
                                                                        <h2 class="comment_heading mt-1 mb-5 mr-7">
                                                                            Manage how you will get notifications for
                                                                            each type of event on your Virtual Number
                                                                        </h2>
                                                                    </v-col>
                                                                    <v-col cols="6" align="end">
                                                                        <!-- <router-link :to="{ name: 'CallRouting' }"> -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25" @click="callRouting()">
                                                                                mdi-arrow-right</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                                <v-row>
                                                                    <v-col cols="6">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            Call Routing Settings
                                                                        </h2>
                                                                        <h2 class="comment_heading mt-1 mb-5 mr-7">
                                                                            Configure how incoming calls are redirected
                                                                            between your agents.
                                                                        </h2>
                                                                    </v-col>
                                                                    <v-col cols="6" align="end">
                                                                        <!-- <router-link :to="{ name: 'CallRouting' }"> -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25" @click="callRouting()">
                                                                                mdi-arrow-right</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                                <v-row>
                                                                    <v-col cols="6">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            Missed Call Distribution
                                                                        </h2>
                                                                        <h2 class="comment_heading mt-1 mb-5 mr-7">
                                                                            Configure how missed calls are managed
                                                                            between
                                                                            your agents.
                                                                        </h2>
                                                                    </v-col>
                                                                    <v-col cols="6" align="end">
                                                                        <!-- <router-link
                                  :to="{ name: 'MissedCallDistribution' }"
                                > -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25"
                                                                                @click="MissedCallRouting()">
                                                                                mdi-arrow-right</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                             </div>
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
      IvrPlan: 1,
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
        disabled: false,
        to: { name: "CallandIVRConfig" },
      },
      {
        text: " IVR and Call Routing",
        disabled: true,
      },
    ],
    bussinessNumber: "",
  }),

  methods: {
       isIvr(i) {
     this.IvrPlan=i;
     console.log(i);
    },
    goBack() {
      // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/BusinessNumber?bn=" + this.bussinessNumber);
    },
    callPauseNumber() {
      // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/PauseNumber?bn=" + this.bussinessNumber);
    },
    callRouting() {
      // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/CallPreference?bn=" + this.bussinessNumber);
    },

    IVRandcallRouting() {
      this.$router.push("/IVRandCallRouting?bn=" + this.bussinessNumber);
    },
    MissedCallRouting() {
      // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/MissedCallDistribution?bn=" + this.bussinessNumber);
    },
    WorkingHours() {
      // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/MissedCallDistribution?bn=" + this.bussinessNumber);
    },
    NotificationSettings() {
      this.$router.push("/NotificationSettings?bn=" + this.bussinessNumber);
    },
    keyPressDepartment(key) {
      this.$router.push("/keyPressDepartment?key=" + key + "&bn=" + this.bussinessNumber);
    }
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>