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
                        Blocked Numbers
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
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12" sm="12">
                            <v-card class="mb-0 mt-0" :elevation="0">
                             <div class="comment_heading mt-6 ml-5">
                    No Blocked Numbers
                  </div>

           

                              <v-list-item
        v-for="bnumber in blockedNumbers"
        :key="bnumber.title"
      >
        <v-list-item-avatar>
        
          <v-icon color="graylighten-1" class="mr-0"
                                  >mdi-shield-lock-outline</v-icon
                                >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="bnumber.Number"></v-list-item-title>

         
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>
                            </v-card>
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
// import axios from "axios";
export default {
  components: {},
  created() {
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
     db.collection("blockCalls").where("Uid","==",owneruid).get().then(async(snap) =>{
       if(snap){
         snap.docs.forEach(element => {
           this.blockedNumbers.push({id: 1,title:element.data().Number,Number:element.data().Number,
      },)
         });
       }
      // console.log(snap.docs[0].data().VirtualNumber)
      // this.switch1 = snap.docs[0].data().WorkingHoursStatus;
      // this.time = snap.docs[0].data().StartTime?snap.docs[0].data().StartTime.substring(0, 2) + ":" + snap.docs[0].data().StartTime.substring(1, 3):"10:00";
      // this.time2 = snap.docs[0].data().EndTime?snap.docs[0].data().EndTime.substring(0, 2) + ":" + snap.docs[0].data().EndTime.substring(1, 3):"10:00";
      // console.log(moment().add(1, 'day').format('YYYY-MM-DD'))
      // this.pauseupto = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      // this.pauseupto = snap.docs[0].data().WorkingHoursStatus?new Date(snap.docs[0].data().PauseUpto).toISOString() : new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime() - 1000*60).toISOString();
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
    isActive: true,
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
    blockedNumbers: [
      {
        id: 1,
        title: "Sree",
        Number: "+919526287163",
      },
      {
        id: 2,
        title: "Akhil",
        Number: "+919526287163",
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
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "Call Flow Settings",
        disabled: false,
        to: { name: "CallFlowSettings" },
      },


      {
        text: "Blocked Numbers",
        disabled: true,
        to: { name: "selectSpecificAgent" },
      },
    ],
  }),

  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
    },
    goBack() {
      this.$router.push("/CallFlowSettings");
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

