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
                        Account Information
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
                                  Basic Information
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Manage how you get notifications for each type
                                  of vent on your Virtual Number
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link
                                  :to="{ name: 'BasicInformation' }"
                                >
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
                                  Bussiness Information
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Configure how incoming calls are redirected
                                  between your agents.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <!-- <router-link :to="{ name: 'CallPreference' }"> -->
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
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
                                  Caller ID
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Configure how missed calls are managed between
                                  your agents.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span
                                  ><v-icon
                                    class="mt-6 mb-5 mr-7"
                                    color="#EE1C25"
                                    >mdi-arrow-right</v-icon
                                  >
                                </span>
                              </v-col>
                            </v-row>
                            
                            <v-divider></v-divider>

                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                  Sign Out
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Configure how missed calls are managed between
                                  your agents.
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <span
                                  ><v-icon
                                    class="mt-6 mb-5 mr-7"
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
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top
  },
  data: () => ({
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashbaord",
      },
      {
        text: "Account Information",
        disabled: false,
        to: { name: "AccountInformation" },
      }
    ],
  }),

  methods: {
    goBack() {
      this.$router.push("/dashboard");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>