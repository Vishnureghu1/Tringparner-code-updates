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
                      <h2 class="page_title mt-6 pl-5">
                        <v-icon class="mr-2" color="black" @click="goBack()"
                          >mdi-arrow-left</v-icon
                        >
                        Buy New Business Number
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="9">
                      <h2 class="comment_heading ml-5">
                        Choose any new Virtual Number or tap refresh to get new
                        list of numbers
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn class="ma-0" color="primary" dark>
                        + Refresh List (0 Sec)
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12" sm="12">
                            <div v-if="numberList">
                              <h4 class="mt-6 text-center">
                                Choose your business number
                              </h4>

                              <p
                                class="mt-6 text-center"
                                v-if="timerCount % 60 != -1"
                              >
                                Time Remaining :
                                {{ Math.floor(timerCount / 60) }} mins
                                {{ timerCount % 60 }} sec
                              </p>
                              <p class="mt-6 text-center" v-else>
                                Timed Out !!!
                              </p>
                              <div class="ml-5 mr-5">
                                <v-progress-linear
                                  color="deep-orange"
                                  height="14"
                                  :value="value"
                                  striped
                                ></v-progress-linear>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="12">
                            <v-card class="ml-8" elevation="0">
                              <v-btn-toggle v-model="toggle_none">
                                <div class="ml-3 mt-5 text-center flex">
                                  <v-btn
                                    v-for="item in V_numbers"
                                    :key="item"
                                    class="ml-1 mr-4 mb-5 primary--text"
                                    outlined
                                    color="white"
                                    width="45%"
                                    >{{ item }}</v-btn
                                  >
                                </div>
                              </v-btn-toggle>
                              <div class="">
                                <v-btn
                                  v-if="toggle_none != null"
                                  class="
                                    mr-4
                                    mb-6
                                    text-capitalize
                                    ma-3
                                    rounded-pill
                                    red_button
                                  "
                                  width="20%"
                                  color="red white--text"
                                  @click.prevent="reserveNumber()"
                                >
                                  Next
                                </v-btn>
                              </div>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-flex>
                    </v-layout>
                    <!-- STEPPER2 -->
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card outlined shaped elevation="8">
          <v-card-text>
            <div class="text-h6 mt-4 primary--text">No numbers Available</div>
            <div class="text-h6 mt-2 primary--text">Try after sometime !!</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="danger" @click="dialog.value = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog v-model="removeNumber" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Remove User</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <p align="center" class="pb-0 mb-0">
            Are you sure want to remove this user Sree [9526287163] ?
          </p>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="removeNumber = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from '@/main.js';
export default {
  components: {},

  data: () => ({
    owneruid: "",
    PhoneNumber: "",
    listingId: "",
    dialog2: false,
    dialog: false,
    removeNumber: false,
    isActive: true,
    toggle_none: null,
    changecolor: false,
    e2: 1,
    repeatCallerSettings: false,
    V_numbers: "",
    timerCount: "",
    overlay: true,
    reserve: false,
    NoNumbers: false,
    value: "",
    payment_info: false,

    options: [
      { title: "Edit", color: "black--text", url: "Edit" },
      { title: "Send Invite", color: "black--text", url: "sendInvite" },
      { title: "Remove Slot", color: "primary--text", url: "removeSlot" },
    ],
    valid: false,
    stepForm: [],
    selected: [2],
    numberList: true,
    Numbers: [
      {
        headline: "+91 919526281234",
      },
      {
        headline: "+91 919526287163",
      },
      {
        headline: "+91 919526287163",
      },
      {
        headline: "+91 919526287163",
      },
      {
        headline: "+91 123459789012",
      },
    ],
    types: [
      {
        text: "Agent",
      },
      {
        text: "Admin",
      },
    ],
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
        color: "Black",
      },
      {
        text: "Add-Ons",
        disabled: false,
        to: { name: "Addons" },
      },
      {
        text: "Buy New Business Number",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 4000);
    },
  },

  methods: {
    showPopup(type) {
      if (type == "Edit") {
        this.dialog2 = true;
      }
      if (type == "removeSlot") {
        this.removeNumber = true;
      }
    },
    CallFlowSettings() {
      this.$router.push("/CallFlowSettings");
    },
    stepComplete(step) {
      return this.curr > step;
    },
    stepStatus(step) {
      return this.curr > step ? "green" : "blue";
    },
    validate(n) {
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v) {
        this.steps[n].valid = true;
        // continue to next
        this.curr = n + 2;
      }
    },
    done() {
      this.curr = 5;
    },

    getNumbersList() {
      var token = localStorage.getItem("token");
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
      const owneruid =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.uid
          : localStorageUserObj.OwnerUid;
      this.PhoneNumber = localStorageUserObj.PhoneNumber;
      this.owneruid = owneruid;
      if (!this.reserve) {
        this.timerCount = 180;
        this.value = 100;
        this.overlay = true;
        const details = {
          // url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/virtualNumber/list",
          url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/virtualNumber/list",
          method: "POST",
          data: {
            uid: this.owneruid,
            phoneNumber: this.PhoneNumber,
          },
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        };
        console.log(details);
        this.$axios(details)
          .then((response) => {
            this.overlay = false;
            this.V_numbers = response.data.numbers;
            this.timerCount = response.data.Seconds;
            this.listingId = response.data.listing_id;
            this.value = 100 - 0.55 * (180 - this.timerCount);
            console.log(this.value);
            console.log(response);
            console.log(response.data.numbers);
            console.log(response.data.Seconds);
            this.progressbarTimer(this.value);
            if (this.V_numbers.length === 0) {
              // alert('Numbers not available , please try later!!')
              this.dialog = true;
              this.overlay = false;
              this.value = 0;
              this.timerCount = 0;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    reserveNumber() {
      var token = localStorage.getItem("token");
      this.reserve = true;
      let virtualNumber = this.V_numbers[this.toggle_none];
      console.log(virtualNumber);
      const reserve = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/reservenumber",
        method: "POST",

        data: {
          uid: this.owneruid,
          updated_by: this.owneruid,
          phoneNumber: this.PhoneNumber,
          virtualNumber: virtualNumber,
          listingId: this.listingId,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(reserve);
      this.$axios(reserve)
        .then((response) => {
          console.log(response);
          if(response.data.status == true){
            this.$router.push("/reserveNumber");
          } 
          // this.$analytics.logEvent("Web Number reserved");
        })
        .catch((error) => {
          console.error(error);
        })
        // .finally(() => {
                 
        // });
    },
    // user stage current page onbording_testing_complete

    progressbarTimer(value) {
      // console.log(value)
      if (value > 0) {
        var myVar = setInterval(() => {
          if (this.value > 1) {
            // console.log('before',this.value)
            this.value = this.value - 0.55;
            // this.value2 = this.value2 - 10
            this.timerCount--;
            // console.log('after',this.timerCount)
          } else {
            if (!this.reserve) {
              this.overlay = true;
              this.$router.go();
            }
          }
        }, 1000);
      } else {
        clearInterval(myVar);
        this.value = 0;
        this.timerCount = 0;
      }
    },
  },
  created() {
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
     this.AccountId=  (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
       db.collection("uservirtualNumber").where("Uid","==",this.owneruid).where("IsPurchased","==",false).get().then(async(snap) =>{
      if(snap.empty){
      this.getNumbersList();
      }else{
            this.$router.push("/reserveNumber");
      }
		}).catch((err)=>{
			console.log(err.message)
		})
  },
};
</script>

