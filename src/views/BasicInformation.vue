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

                            <v-row :key="rerenderKey">
                              <v-col cols="6">
                                <!-- TEMP DATA -->
                                <br>
                                 <b>primaryNumber</b>: {{ this.primaryNumber  }}
                                <br>
                                <br>
                                <b>ownerInfo</b> : {{ this.ownerInfo }}
                                <br>
                                 <b>planUsers</b>: {{ this.planUsers }}
                                <br>
                                 <b>planUnAssignedUsers</b>: {{ this.planUnAssignedUsers }}
                                <br>
                                <br>
                                <b>addonUsers</b> : {{ this.addonUsers }}
                                <br>
                                <b>addonUnAssignedUsers</b> : {{ this.addonUnAssignedUsers }}
                                <br>
                                <br>
                                 <b>addonNumbers</b>: {{ this.addonNumbers  }}
                                <!-- TEMP DATA -->

                              </v-col>
                              <v-col cols="6" align="end">

                              </v-col>
                            </v-row>

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

    // this.init();
    this.getBasicInfo();
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
    //forcefully render ui component
    rerenderKey: 0,
    ownerInfo: [],
    primaryNumber: [],
    addonUsers: [],
    planUsers: [],
    addonNumbers: [],
    purchasedUserAddon: 0,
    planUnAssignedUsers: [],
    addonUnAssignedUsers: [],

  }),

  methods: {
    goBack() {
      this.$router.push("/dashboard");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
    getBasicInfo() {
      console.log('this.user', this.user);

      let ownerInfo = [];
      ownerInfo.push({
        Name: this.user.Name,
        number: this.user.PhoneNumber,
        uid: this.user.uid,
        role: this.user.role
      })
      this.ownerInfo = ownerInfo;

      let PlanBaseUsers = this.user.PlanBaseUsers;
      console.log('PlanBaseUsers', PlanBaseUsers);

      let purchasedUserAddon = 0;
      //getting userAddonDetails
      db.collection('UserAddonDetails')
      // .where('Uid', '==', 'eGvqNz3hO0XfjWx23JEth9KXXIe2')
      .where('Uid', '==', this.user.uid)
      .where('Type', '==', 'USER')
      .orderBy('PurchaseDate', "desc")
      .get()
      .then((snapshot) => {
        console.log('UserAddonDetails snapshot.size', snapshot.size);
        purchasedUserAddon = snapshot.size;
        this.purchasedUserAddon = purchasedUserAddon;
      })


      let addonUsers = [];
      let planUsers = [];
      // let addonNumbers = [];

      db.collection('users')
      .where('OwnerUid', '==', this.user.uid)
      .get()
      .then((snapshot) => {

        console.log(snapshot.size);
        let addOnLength = snapshot.size;
        this.addOnLength = addOnLength;

        if (!snapshot.empty) {
          console.log('users snapshot NOT empty');

          snapshot.forEach(async (doc) => {
            console.log(doc.id, " => ", doc.data());

            let snapData = doc.data();

            if ("IsAddon" in snapData) { 

              if(snapData.IsAddon) {
                console.log('addonUsers');

                addonUsers.push({
                  Name: snapData.Name,
                  number: snapData.PhoneNumber,
                  uid: snapData.uid,
                  role: snapData.role,
                  status: false,
                  isAddon: snapData.IsAddon,
                });
              } else {
                console.log('planUsers');
                planUsers.push({
                  Name: snapData.Name,
                  number: snapData.PhoneNumber,
                  uid: snapData.uid,
                  role: snapData.role,
                  status: false,
                  isAddon: snapData.IsAddon,
                });
              }

            }            
          })

          this.addonUsers = addonUsers;
          this.planUsers = planUsers;

          let planUnAssignedUsers = [];
          if(planUsers.length < PlanBaseUsers) {
            console.log('create unAssignedSlots for planUsers');
            planUnAssignedUsers.push({
              name: 'Unassigned User',
              number: '',
              uid: this.user.uid,
              role: '',
              status: false,
              isAddon: false
            })
          }
          this.planUnAssignedUsers = planUnAssignedUsers;

          let addonUnAssignedUsers = [];
          if(addonUsers.length < this.purchasedUserAddon) {
            console.log('addon users unAssignedSlots available ');
            addonUnAssignedUsers.push({
              name: 'Unassigned User',
              number: '',
              uid: this.user.uid,
              role: '',
              status: false,
              isAddon: false
            })
          }
          this.addonUnAssignedUsers = addonUnAssignedUsers;


        } else {
          console.log('users snapshot empty');
        }
      })

      //user virtual numbers
      db.collection('uservirtualNumber')
      .where('Uid', '==', this.user.uid)
      .get()
      .then((snapshot) => {
        console.log('uservirtualNumber',snapshot.size);

        let primaryNumber = [];
        let addonNumbers = [];

        if (!snapshot.empty) {

          snapshot.forEach(async (doc) => {
            console.log(doc.id, " => ", doc.data());

            let snapData = doc.data();

            console.log('uservirtualNumber snapData', snapData);

            if ("IsPrimary" in snapData) { 

              if(snapData.IsPrimary) {
                primaryNumber.push({
                  VirtualNumber: snapData.VirtualNumber,
                  Source: snapData.Source,
                  PurchaseDate: snapData.PurchaseDate
                });
              } else {
                addonNumbers.push({
                  VirtualNumber: snapData.VirtualNumber,
                  Source: snapData.Source,
                  PurchaseDate: snapData.PurchaseDate
                });
              }
            }

          });
        }
        this.primaryNumber = primaryNumber;
        this.addonNumbers = addonNumbers;
      })

      // call this function if any ui component needs rerender 
      // after assigning :key="rerenderKey" to the component
      // this.forceRerenderKey();


    },
    forceRerenderKey: function() {
      this.rerenderKey += 1;
    }
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>