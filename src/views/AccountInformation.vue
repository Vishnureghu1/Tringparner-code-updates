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
                                <h2 class="name_heading mt-4 mr-7 align-self-center">
                                  Basic Information
                                </h2>
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{ name: 'BasicInformation' }">
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7 align-self-center"
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
                                <h2 class="name_heading mt-4 mr-7 align-self-center">
                                  Business Information
                                </h2>
                               
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link
                                  :to="{ name: 'BusinessInformation' }"
                                >
                                  <span
                                    ><v-icon
                                      class="mt-6 mb-5 mr-7 align-self-center"
                                      color="#EE1C25"
                                      >mdi-arrow-right</v-icon
                                    >
                                  </span>
                                </router-link>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>

                            <!-- only if admin -->
                            <v-row>
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                  Change Login Number
                                </h2>
                               
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link
                                  :to="{ name: 'ChangeLoginNumber' }"
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
                                  Caller ID
                                </h2>
                              
                              </v-col>
                              <v-col cols="6" align="end">
                                <router-link :to="{ name: 'CallerID' }">
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
                                <h2 class="name_heading mt-4 mr-7">Sign Out</h2>
                               
                              </v-col>
                              <v-col cols="6" align="end">
                                <span
                                  ><v-icon
                                    @click="logout"
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
import firebase from "firebase";
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
      },
    ],
  }),

  methods: {
    goBack() {
      this.$router.push("/dashboard");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
    logout: function () {
      console.log("clicked logout");
      // firebase.auth()
      firebase.auth().signOut();
      localStorage.removeItem("tpu");
      this.rerenderKey += 1;
      this.$router.push("login").catch(() => {});
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>