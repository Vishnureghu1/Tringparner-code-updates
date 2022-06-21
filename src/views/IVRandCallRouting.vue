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
                        IVR and Call Routing
                      </h2>

                      <v-breadcrumbs divider=">" class="breadcrumbs" :items="items">
                          <template v-slot:item="{ item }">
                              <router-link style="text-decoration: none" v-if="!item.disabled"
                                  :to="item.route">
                                  <v-breadcrumbs-item :disabled="item.disabled">
                                      {{ item.text }}
                                  </v-breadcrumbs-item>
                              </router-link>

                              <!-- <router-link style="text-decoration: none;" v-if="item.disabled" :to="item.route"> -->
                              <v-breadcrumbs-item v-if="item.disabled" :disabled="item.disabled">
                                  {{ item.text }}
                              </v-breadcrumbs-item>
                              <!-- </router-link> -->
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
                            <div class="center align-center" align="center">
                              <!-- <p>Please choose your plan</p> -->

                              <v-btn-toggle
                                rounded
                                elivation="05"
                                class="toggle_IVR"
                                borderless
                                v-model="toggle_exclusive"
                              >
                                <v-btn
                                  v-if="checkIvrStatus == false"
                                  width="200"
                                  @click="MovetoBilling(1)"
                                  :class="{ active: checkIvrStatus == true }"
                                >
                                  IVR
                                </v-btn>
                                <v-btn
                                  v-else
                                  width="200"
                                  @click="isIvr(1)"
                                  :class="{ active: IvrPlan == 1 }"
                                >
                                  IVR
                                </v-btn>

                                <v-btn
                                  v-if="checkIvrStatus == true"
                                  width="200"
                                  @click="isIvr(2)"
                                  :class="{ active: IvrPlan == 2 }"
                                >
                                  Direct (No IVR)
                                </v-btn>
                                <v-btn
                                  v-else
                                  width="200"
                                  @click="isIvr(2)"
                                  :class="{ active: checkIvrStatus == false }"
                                >
                                  Direct (No IVR)
                                </v-btn>
                              </v-btn-toggle>
                            </div>
                           
                            <div v-if="IvrPlan == 1 && checkIvrStatus==true">
                              <h2 class="name_heading mt-0 mr-0 mb-0">
                                Basic IVR Audio Settings
                              </h2>

                              <v-row>
                                <v-col cols="6">
                                  <h2
                                    class="light3 nunito-font mt-4 mr-7 text--red f18"
                                  >
                                    Introduction and Departments Audio
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <router-link
                                    :to="{
                                      name: 'IntroductionandDepartmentsAudio',
                                      query: {
                                        key: 'intro',
                                        bn: this.bussinessNumber,
                                      },
                                    }"
                                  >
                                    <span>
                                      <v-icon
                                        class="mt-3 mb-4 mr-7"
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
                                    class="light3 nunito-font mt-4 mr-7 text--red f18"
                                  >
                                    No Keypress Audio
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <router-link
                                    :to="{
                                      name: 'NoKeypressAudio',
                                      query: {
                                        key: 'nokeypress',
                                        bn: this.bussinessNumber,
                                      },
                                    }"
                                  >
                                    <span>
                                      <v-icon
                                        class="mt-3 mb-4 mr-7"
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
                                    class="light3 nunito-font mt-4 mr-7 text--red f18"
                                  >
                                    Wrong Keypress Audio
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <router-link
                                    :to="{
                                      name: 'WrongKeypressAudio',
                                      query: {
                                        key: 'wrongkeypress',
                                        bn: this.bussinessNumber,
                                      },
                                    }"
                                  >
                                    <span>
                                      <v-icon
                                        class="mt-3 mb-4 mr-7"
                                        color="#EE1C25"
                                        >mdi-arrow-right</v-icon
                                      >
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
                                    {{ source1 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('1')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source2 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('2')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source3 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('3')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source4 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('4')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source5 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('5')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source6 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('6')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source7 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('7')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source8 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('8')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    {{ source9 }}
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="keyPressDepartment('9')"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
                                  </span>
                                </v-col>
                              </v-row>
                              <v-divider></v-divider>
                            </div>
                            <div v-else-if="IvrPlan == 2">
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
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="callRouting()"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="callRouting()"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
                                    between your agents.
                                  </h2>
                                </v-col>
                                <v-col cols="6" align="end">
                                  <!-- <router-link
                                  :to="{ name: 'MissedCallDistribution' }"
                                > -->
                                  <span>
                                    <v-icon
                                      class="mt-6 mb-5 mr-7"
                                      color="#EE1C25"
                                      @click="MissedCallRouting()"
                                    >
                                      mdi-arrow-right</v-icon
                                    >
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
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Are you Sure!</h3>
        </v-card-title>
        <v-card-body>
          <h4 class="mb-3 mt-3 text-center">
            Do you want to Upgrade the plan?
          </h4>
        </v-card-body>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="proccedToIVR(2)"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="proccedToIVR(1)"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
// import NotificationSettingsVue from './NotificationSettings.vue';
import { db } from "@/main.js";
import axios from "axios";
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top
    this.bussinessNumber = this.$route.query.bn;
    this.setBreadcrumbs(this.bussinessNumber);
    this.initial_value();
  },
  data: () => ({
    ivrActive: false,
    directActive: false,
    toggle_exclusive: undefined,

    source1: "",
    source2: "",
    source3: "",
    source4: "",
    source5: "",
    source6: "",
    source7: "",
    source8: "",
    source9: "",
    owneruid: "",
    uid: "",
    IvrPlan: "",
    dialog: false,
    items: [
      
    ],
    bussinessNumber: "",
    AccountId: "",
  }),

  methods: {
    setBreadcrumbs(bussinessNumber) {
        this.items = [
            {
              text: "More",
              disabled: false,
              href: "Dashboard",
              route: { name: "Dashboard", query: {} },
            },
            {
              text: "Business Numbers",
              disabled: false,
              route: { name: "BusinessNumber", query: {} },
            },
            {
              text: "Call and IVR Configuration",
              disabled: false,
              // to: { name: "CallandIVRConfig" },
              route: {
                  name: "CallandIVRConfig",
                  query: { bn: [bussinessNumber] },
              },
            },
            {
              text: " IVR and Call Routing",
              disabled: true,
            },
        ];
    },
    proccedToIVR(i) {
      if (i == 1) {
        const options = {
          url: this.$cloudfareApi + "/callDistribution/ivr/status",
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            owner_uid: this.owneruid,
            updated_by: this.uid,
            virtual_number: this.bussinessNumber,
            AccountId: this.AccountId,
            IsIvr: i == 1 ? true : false,
          },
        };

        axios(options)
          .then((response) => {
            this.dialog = false;
            console.log(response.data);
            this.$root.vtoast.show({
              message: "Updated Successfully!",
              color: "#07C421",
              timer: 2000,
            });

            this.$router.push(
              "/BillingInformation?upgrade=" + i + "&bn=" + this.bussinessNumber
            );
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.dialog = false;
        this.IvrPlan = i;
        this.ivrActive = false;
        this.directActive = true;
      }
    },
    MovetoBilling(i) {
      if (i == 1) {
        this.dialog = true;
      }
    },
    isIvr(i) {
      this.IvrPlan = i; // 1 for ivr plan
      this.ivrActive = i == 1 ? true : false;
      this.directActive = i == 1 ? false : true;

      // console.log(options);

      //  console.log("jgrj",i);
    },
    initial_value() {
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
      //  this.isHide = (localStorageUserObj.role == "OWNER")?true:false;

      // local storage isIV get data here
      // if false then noIVR
      this.checkIvrStatus = localStorageUserObj.IsIvr;
      // this.checkIvrStatus = false;

      const owneruid =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.uid
          : localStorageUserObj.OwnerUid;
      // console.log("vetri",owneruid)
      this.owneruid = owneruid;
      this.AccountId =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.AccountId
          : localStorageUserObj.OwnerAccountId;
      this.uid = localStorageUserObj.uid;
      // this.addonNumbers=[]
      db.collection("uservirtualNumber")
        .where("Uid", "==", owneruid)
        .where("VirtualNumber", "==", parseInt(this.bussinessNumber))
        .get()
        .then(async (snap) => {
          // console.log("test.........",snap.docs.data());
          const data = snap.docs[0].data();
          console.log(data);
          this.source1 =
            data.Ivr["1"].IsActive == true ? data.Ivr["1"].Source : "Not Used";
          this.source2 =
            data.Ivr["2"].IsActive == true ? data.Ivr["2"].Source : "Not Used";
          this.source3 =
            data.Ivr["3"].IsActive == true ? data.Ivr["3"].Source : "Not Used";
          this.source4 =
            data.Ivr["4"].IsActive == true ? data.Ivr["4"].Source : "Not Used";
          this.source5 =
            data.Ivr["5"].IsActive == true ? data.Ivr["5"].Source : "Not Used";
          this.source6 =
            data.Ivr["6"].IsActive == true ? data.Ivr["6"].Source : "Not Used";
          this.source7 =
            data.Ivr["7"].IsActive == true ? data.Ivr["7"].Source : "Not Used";
          this.source8 =
            data.Ivr["8"].IsActive == true ? data.Ivr["8"].Source : "Not Used";
          this.source9 =
            data.Ivr["9"].IsActive == true ? data.Ivr["9"].Source : "Not Used";
          // this.isIvr(data.IsIvr==false?2:1)
          this.ivrActive = data.IsIvr == true ? true : false;
          this.directActive = data.IsIvr == true ? false : true;
          this.IvrPlan = data.IsIvr == false ? 2 : 1;
          // this.IvrPlan = 2;
          // snap.docs.forEach((element)=> {
          //   // this.addonNumbers.push({VirtualNumber:element.data().VirtualNumber,Source:element.data().Source,cron:element.data().IsPrimary,Options:(element.data().IsPrimary == true)?[{ title:"Change Title", type:"Edit", headline:"Edit User", color: "black--text",function:"edit_source"}]:[{ title:"Change Title", type:"Edit", headline:"Edit User", color: "black--text",function:"edit_source"},{ title:"Delete", type:"Edit", headline:"Delete Number", color: "black--text",function:"delete_number"}]
          //   // })
          // });
          // console.log(this.addonNumbers)
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    goBack() {
      // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/CallandIVRConfig?bn=" + this.bussinessNumber);
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
      this.$router.push(
        "/keyPressDepartment?key=" + key + "&bn=" + this.bussinessNumber
      );
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>
