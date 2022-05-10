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
                        Notification Settings
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>

                  <v-layout>
                    <v-flex xs12 sm12 md12>
                      <v-col cols="12" sm="12">
                        <v-card :elevation="0" class="mb-0">
                          <v-col cols="12" sm="10">
                           <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-0 mr-7">
                                  Answered Calls
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Notify user(s) when call is answered
                                </h2>
                              </v-col>
                              <v-col cols="6" sm="2" align="end">
                                <v-switch
                                  justify-right                                
                                  v-model="Answered"
                                  color="red"
                                  @change="NotificationSettings(Answered,'ReceivedCallNotification')"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                 Missed Calls
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                   Notify user(s) when a call got missed
                                </h2>
                              </v-col>
                              <v-col cols="6" sm="2" align="end">
                                <v-switch
                                  justify-right
                                  v-model="Missed"
                                  color="red"
                                  @change="NotificationSettings(Missed,'MissedCallNotification')"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                         <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                Todays's Summary
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                    Notify user(s) when daily summary report
                                        is ready
                                </h2>
                              </v-col>
                              <v-col cols="6" sm="2" align="end">
                                <v-switch
                                  justify-right
                                  v-model="TodaySummery"
                                  color="red"
                                   @change="NotificationSettings(TodaySummery,'TodaysActivityNotification')"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                   <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                Payment
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                    Notify when payment is due
                                </h2>
                              </v-col>
                              <v-col cols="6" sm="2" align="end">
                                <v-switch
                                  justify-right
                                  v-model="Payment"
                                  color="red"
                                  @change="NotificationSettings(Payment,'PaymentNotification')"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
             
       
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-flex>
                  </v-layout>
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
import axios from "axios";
export default {
  components: {},
  created() {
    // this.Active=false
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
        this.bussinessNumber = this.$route.query.bn;
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    this.setBreadcrumbs(this.bussinessNumber);
      // db.collection("UserAudio").where("Uid","==",localStorageUserObj.uid).get().then(async(snap) =>{
      db.collection("users").where("uid","==",localStorageUserObj.uid).get().then(async(snap) =>{
			console.log("test.........",snap.docs[0].data());
			snap.docs.forEach((element)=> {
				// console.log(element.data())
         this.Payment=element.data().PaymentNotification,
         this.TodaySummery=element.data().TodaysActivityNotification,
         this.Missed=element.data().MissedCallNotification,
         this.Answered=element.data().ReceivedCallNotification
				// this.Active = MissedCallNotification,PaymentNotification,ReceivedCallNotification,TodaysActivityNotification
			});
		}).catch((err)=>{
			console.log(err.message)
		})
     
		// const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
  },
  // watch(){
  //      Active=true
  // },
  data: () => ({
    owneruid:"",
    uid:"",
    AccountId:"",
    bussinessNumber:"",
    Payment:true,
    TodaySummery:true,
    Missed: true,
    Answered:true,
    e2: 1,
    repeatCallerSettings: false,
    curr: 1,
    lastStep: 4,
    steps: [
      { name: "Manage User", rules: [(v) => !!v || "Required."], valid: true },
      {
        name: "Call Routing Setting",
        rules: [(v) => !!v || "Required."],
        valid: true,
      },
      // {name: "Step 3", rules: [v => (v && v.length >= 4) || "Enter at least 4 characters."], valid: true},
      // {name: "Complete"},
    ],
    valid: false,
    stepForm: [],

    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
        color: "Black",
      },
      {
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "CallFlow Settings",
        disabled: false,
        to: { name: "CallFlowSettings" },
      },

      {
        text: "Notification Settings",
        disabled: false,
        to: { name: "Notification Settings" },
      },
    ],
  }),
// mounted(){
//  this.Active=true
// },
  methods: {
     NotificationSettings(status,value){
      console.log("test..........")
       const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/notification/settings',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            uid:this.uid,
            AccountId:this.AccountId,
            notification_type:value,
            status:status
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
             this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000})
              // this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
    },
    // changeState(id){console.log(id)},
     setBreadcrumbs(bussinessNumber) {
      this.items = [
        {
          text: "Business Numbers",
          disabled: false,
          to: { name: "BusinessNumber" },
          href: `BusinessNumber?bn=`,
          route: { name: 'BusinessNumber', query: { }  }
        },
        {
          text: "Call Flow Settings",
          disabled: false,
          to: { name: "CallFlowSettings", query: { ...{bn: bussinessNumber}} },
          href: `CallFlowSettings?bn=`,
          route: { name: 'CallFlowSettings', query: { bn: [bussinessNumber]}  }
        },
         {
          text: "Notification Settings",
          disabled: false,
          to: { name: "NotificationSettings", query: { ...{bn: bussinessNumber}} },
          href: `NotificationSettings?bn=`,
          route: { name: 'NotificationSettings', query: { bn: [bussinessNumber]}  }
        },
      ]
    },
    goBack(bussinessNumber) {
      // this.$router.push("/CallFlowSettings?bn=" + bussinessNumber);
      // alert(bussinessNumber);
      let newQuery = {bn: bussinessNumber};
      this.$router.push({ path: '/CallFlowSettings', query: { ...newQuery } });
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
  },
};
</script>

