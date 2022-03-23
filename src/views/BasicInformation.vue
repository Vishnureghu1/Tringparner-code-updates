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
                        Basic Information
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
                                
                              </v-col>
                            </v-row>
                            

                            <!-- <v-divider></v-divider> -->

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
  import { db } from "@/main.js";

export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top

    let localStorageUserObj = localStorage.getItem("tpu");

    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      console.log('parsedUser',parsedUser);
      this.user = parsedUser;
    }

    this.init();
  },
  data: () => ({
    user:{},
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashbaord",
      },
      {
        text: "Account Information",
        disabled: false,
        href: "AccountInformation",
      },
      {
        text: "Basic Information",
        disabled: true
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
    init() {
      console.log('this.user.uid', this.user.uid);
      db.collection('uservirtualNumber')
      // .where('Uid', '==', 'eGvqNz3hO0XfjWx23JEth9KXXIe2')
      .where('Uid', '==', this.user.uid)
      .get()
      .then((snapshot) => {

        if (!snapshot.empty) {

          snapshot.forEach(async (doc) => {

            console.log(doc.id, " => ", doc.data());
            let snapData = doc.data();

            // if (doc.data().containsKey('IsPurchased')) {
            if ("IsPurchased" in snapData) {
              console.log('snapshot containsKey IsPurchased');
            } else {

              if(!("IsPrimary" in snapData)) {

                console.log('Not Primary');
              }
              if ("IsPrimary" in snapData) {
                console.log('snapshot containsKey IsPrimary');
                let primary = snapData.VirtualNumber;
                let primarySource = snapData.Source;

                console.log('primary', primary);
                console.log('primarySource', primarySource);
              }
            }


          })
          // const snapshotData = snapshot.data();
          // console.log('snapshotData', snapshotData);
          // do something with document
          // let org_id = user["org_id"];
          // console.log("org id:" + org_id);
        } else {
          console.log("No data returned!");
        }
      })
    }
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>