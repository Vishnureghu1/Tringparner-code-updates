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
                        Prioritize Configuration
                      </h2>
                     <v-breadcrumbs divider=">" class="breadcrumbs" :items="items">

                        <template v-slot:item="{ item }">
                          <router-link style="text-decoration: none;" v-if="!item.disabled" :to="item.route">
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
                  <div class="comment_heading mt-6 ml-5">
                    Select how incoming calls are distributed among your users.
                    Distribution rules will be applied base on these settings
                  </div>
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12" sm="12" class="pl-5">
                            <v-card class="mb-0 mt-0" :elevation="0">
                              <div
                                class="drag-el"
                                v-for="item1 in participants"
                                :key="item1.title"
                              >
                                              <v-checkbox
              v-model="item1.status"
              color="red darken-3"
              :value="item1.status"
              hide-details
              @click="missedcall()"
            > 
            <template v-slot:label>
                                <div class="black--text">
                                  <strong class="black--text darken-4">
                                    {{item1.Name}}</strong
                                  >
                                  <br /><span class="grey--text light-3"
                                        >{{item1.Number}}</span
                                      >
                                </div>
                              </template>
            </v-checkbox>
                              </div>
               
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
import axios from "axios";
export default {
  components: {},
  created() {
    this.initial_data()
  },
  data: () => ({
    bussinessNumber:"",
    repeated_missed_caller:"",
    source:"",
    specific_agents:"",
    owneruid:"",
    uid:"",
    AccountId:"",
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
    participants: [
      {
        id: 1,
        title: "Sree",
        subtitle: "+919526287163",
        status:false
      },
      {
        id: 2,
        title: "Akhil",
        subtitle: "+91992",
        status:true
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
        text: "Missed Call Distribution",
        disabled: false,
        to: { name: "MissedCallDistribution" },
      },
      {
        text: "Select Specific Agent(s)",
        disabled: true,
        to: { name: "selectSpecificAgent" },
      },
    ],
  }),

  methods: {   
     missedcall(){
       const filter_agents = this.participants.filter((el)=> { return el.status == true})
       if(filter_agents.length == 0){
          this.initial_data()
          // this.participants[0] = Object.assign( this.participants[0],{status:true});
          return
       }
       const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/callDistribution/missedcall',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:parseInt(this.$route.query.bn),
            AccountId:this.AccountId,
            source:this.source,
            specific_agents:filter_agents,
            new_missed_caller:"Specific-Agents",
            repeated_missed_caller:this.repeated_missed_caller
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
            this.initial_data()
            //  this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 000})
						})
						.catch((error) => {
							console.error(error);
						})
    },
    initial_data(){
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.bussinessNumber = this.$route.query.bn;
    console.log(this.bussinessNumber);
        this.setBreadcrumbs(this.bussinessNumber);
    // this.setBreadcrumbs(this.bussinessNumber);
    const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)
      this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    this.participants=[];
    db.collection("uservirtualNumber").where("Uid","==",owneruid).where("VirtualNumber","==",parseInt(this.$route.query.bn)).get().then(async(snap) =>{
      // console.log(snap.docs[0].data().VirtualNumber)
      const participants = snap.docs[0].data().Participants;
      this.specific_agents = snap.docs[0].data().SpecificAgents?snap.docs[0].data().SpecificAgents:[];
			this.source = snap.docs[0].data().Source,
      this.participants = participants,
      this.repeated_missed_caller = snap.docs[0].data()?.RepeatedMissedCaller,
      this.participants.forEach((element,index) =>{
         const value = this.specific_agents.find(({Number}) =>Number === element.Number)
         if(value){
            this.participants[index] = Object.assign(element,{status:true});
         }else{
           this.participants[index] = Object.assign(element,{status:false});
         }
      })
      const empty = this.participants.find(({status}) => status=== true)
      if(!empty){
        this.participants[0] = Object.assign( this.participants[0],{status:true});
        // this.missedcall()
      }
    // console.log(this.participants)
		}).catch((err)=>{
			console.log(err.message)
		})
    },
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
          to: { name: "CallFlowSettings", query: { ...{bn: 1111111}} },
          href: `CallFlowSettings?bn=`,
          route: { name: 'CallFlowSettings', query: { bn: [bussinessNumber]}  }
        },
        {
          text: "Missed Call Distribution",
          disabled: false,
          to: { name: "MissedCallDistribution" },
          href: `MissedCallDistribution?bn=`,
          route: { name: 'MissedCallDistribution', query: { bn: [bussinessNumber]}  }
        },
         {
          text: "Specific Agents",
          disabled: true,
          to: { name: "MissedCallDistribution" },
          href: `MissedCallDistribution?bn=`,
          route: { name: 'MissedCallDistribution', query: { bn: [bussinessNumber]}  }
        },
      ]
    },
    done() {
      this.curr = 5;
    },
   
  },
};
</script>

