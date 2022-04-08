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
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
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
                              <draggable
                                v-model="participant"
                                :list="participant"
                                :disabled="!enabled"
                                class="list-group"
                                ghost-class="ghost"
                                :move="checkMove"
                                @start="dragging = true"
                                @end="dragging = false"
                              >
                                <transition-group>
                                  <v-card
                                    v-for="element in participant"
                                    :key="element.AgentUid"
                                    class="mb-5 row-pointer"
                                    max-width="520"
                                    elevation="1"
                                    tile
                                  >
                                    <v-row
                                      no-gutters
                                      justify="center"
                                      align="center"
                                    >
                                      <v-col cols="12" sm="10">
                                        <v-card-text>
                                          <p class="text-h6  mb-1">
                                            {{ element.Name }}
                                          </p>
                                          <p>{{ element.Number }}</p>
                                        </v-card-text>
                                      </v-col>
                                      <v-col cols="12" align="right" sm="1">
                                        <v-list-item-avatar>
                                          <v-icon
                                            class="mr-2 row-pointer"
                                            color="black"
                                            >mdi-drag-vertical</v-icon
                                          >
                                        </v-list-item-avatar>
                                      </v-col>
                                    </v-row>
                                  </v-card>
                                </transition-group>
                              </draggable>
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
import draggable from "vuedraggable";
import axios from "axios";
import { db } from "@/main.js";
export default {
  components: { draggable },
  created() {
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
     this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    db.collection("uservirtualNumber").where("Uid","==",owneruid).where("VirtualNumber","==",parseInt(this.$route.query.bn)).get().then(async(snap) =>{
      console.log(snap.docs[0].data().VirtualNumber)
      const participants = snap.docs[0].data().Participants;
      this.source = snap.docs[0].data().Source
      console.log(participants)
      participants.forEach(element => {
        this.participant.push({Name:element.Name,Number:element.Number,AgentUid:element.AgentUid})
        // this.participant.push({Name:element.Name,Number:element.Number,AgentUid:element.AgentUid})
      });
      // console.log("............",this.participant)
			// console.log("test.........",this.response);
    //   this.agents.forEach((element,index) =>{
    //      const value = participants.find(({Number}) =>Number === element.PhoneNumber)
    //      if(value){
    //         // console.log("valuew",value,index)
    //         this.agents[index] = Object.assign(element,{active:true});
    //      }else{
    //        this.agents[index] = Object.assign(element,{active:false});
    //      }
    //   })
    })
  },
  data: () => ({
    participant:[],
    source:"",
     owneruid:"",
    uid:"",
    AccountId:"",
    enabled: true,
    dragging: false,
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
    items1: [
      {
        id: 1,
        title: "Sree",
        subtitle: "Admin: +919526287163",
      },
      {
        id: 2,
        title: "Akhil",
        subtitle: "Admin: +919526287163",
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
        text: "Call Routing",
        disabled: false,
        to: { name: "CallRouting" },
      },
      {
        text: "Prioritize Configuration",
        disabled: false,
        to: { name: "PrioritizeConfiguration" },
      },
    ],
  }),
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
      console.log(this.participant)
        // activecall(radiovalue){
      // console.log("test..........")
       const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/callDistribution/activecall',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:parseInt(this.$route.query.bn),
            AccountId:this.AccountId,
            new_active_caller:"PRIORITY",
            source:this.source,
            participants:this.participant
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
              this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
    // },
    },
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    add: function () {},
    replace: function () {},
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
    },
    goBack() {
      const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/CallFlowSettings?"+getNumber);
    },
    CallFlowSettings() {
      const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/CallFlowSettings?"+getNumber);
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

<style scoped>
.ghost {
  opacity: 0.5;
  background: #ffd4d4;
  transition: all 0.5s;
}
.row-pointer {
  transition: all 0.5s;
  cursor: pointer;
 
}
.row-pointer:hover {
  cursor: pointer;
  transition: all 0.5s;
   background: #c62828;
   color: #fff;
}
</style>