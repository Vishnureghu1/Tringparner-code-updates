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
                            <v-row v-if="isHide">
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
                            <v-divider v-if="isHide"></v-divider>
                            <v-row v-if="isHide">
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
                            <v-divider v-if="isHide"></v-divider>

                            <!-- only if admin -->
                            <v-row v-if="isHide">
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

                            <v-divider v-if="isHide"></v-divider>

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
                                <h2 class="name_heading mt-4 mr-7" style="color:rgb(238, 28, 37)">Delete My Account</h2>
                               
                              </v-col>
                              <v-col cols="6" align="end">
                                <span
                                  ><v-icon
                                   @click="deleteAccountDialog = true"
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


     <!-- RENAME deleteAccountDialog SECTION -->
    <v-dialog v-model="deleteAccountDialog" max-width="332px">
      <v-card v-model="deleteAccountDialog" class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Are you sure?</h3>
        </v-card-title>
        <v-card-text class="pt-0">
         <p class="pb-0 mb-0" align="center">Are you sure want to delete your Account? </p>
         <p class="pb-0 mb-0 " color="primary--text" align="center">Warning! This action can't be undone!</p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="red" text class="ma-2 text-capitalize rounded-pill p-3 red_button_outline" min-width="140px"
            @click="deleteAccountDialog = false">
            No
          </v-btn>
          <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px" color="white" outlined
            @click="deleteAccount()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- RENAME deleteAccountDialog SECTION -->
  </v-app>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.isHide = (localStorageUserObj.role == "AGENT")?false:true
  },
  data: () => ({
    deleteAccountDialog:false,
    isHide:false,
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
      this.$router.push("/");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
          deleteAccount() {
      var token = localStorage.getItem("token");
      const user_data = {
        url: this.$cloudfareApi + "/deteleaccount",
        method: "POST",
        data: {
          uid: this.uid,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(user_data);
      axios(user_data)
        .then(() => {

          console.log("clicked logout");
      // firebase.auth()
      firebase.auth().signOut();
     localStorage.removeItem("tpu");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("planId");
      localStorage.removeItem("PlanId");
      localStorage.removeItem("ActiveTab");
      localStorage.removeItem("IVRPlanradio");
      localStorage.removeItem("nonIVRPlanradio");
      
      this.rerenderKey += 1;
      this.$router.push("login").catch(() => {});
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    logout: function () {
      console.log("clicked logout");
      // firebase.auth()
      firebase.auth().signOut();
     localStorage.removeItem("tpu");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("planId");
      localStorage.removeItem("PlanId");
      localStorage.removeItem("ActiveTab");
      localStorage.removeItem("IVRPlanradio");
      localStorage.removeItem("nonIVRPlanradio");
      
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