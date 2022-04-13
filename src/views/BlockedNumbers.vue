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
                        <v-icon class="mr-2" color="black" @click="goBack(bussinessNumber)"
                          >mdi-arrow-left</v-icon
                        >
                        Blocked Numbers
                      </h2>
                      <!-- BREADCRUMBS SECTION -->
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
                      <!-- BREADCRUMBS SECTION -->
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
                   {{noblock}}
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
            <v-icon color="grey lighten-1" @click="unblock(bnumber.Number)">mdi-information</v-icon>
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
import axios from "axios";
export default {
  components: {},
  created() {
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.owneruid = owneruid;

    this.bussinessNumber = this.$route.query.bn;    
    this.setBreadcrumbs(this.bussinessNumber);

    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
     db.collection("blockCalls").where("Uid","==",owneruid).get().then(async(snap) =>{
       if(snap){
         snap.docs.forEach(element => {this.blockedNumbers.push({id: 1,title:element.data().Number,Number:element.data().Number})});
         }else{
             this.noblock ="No Blocked Numbers"
         }
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
    owneruid:"",
    uid:"",
    AccountId:"",
    noblock:"",
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
    blockedNumbers: [],
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
    unblock(number){
      console.log("sfvs",number)
       const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/blockcall',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {	
        number:number,
        status:false,
        owner_uid:this.owneruid,
        UpdatedBy:this.uid,
        AccountId:this.AccountId
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
              // this.dialog2 = false
               this.$root.vtoast.show({message: 'unblocked successfully', color: 'green', timer: 5000})
              this.getblocknumbers()
						})
						.catch((error) => {
							console.error(error);
						})
    },
    getblocknumbers(){
    db.collection("blockCalls").where("Uid","==",this.owneruid).get().then(async(snap) =>{
      this.blockedNumbers=[];
       if(snap){
         snap.docs.forEach(element => {this.blockedNumbers.push({id: 1,title:element.data().Number,Number:element.data().Number})});
         }else{
             this.noblock ="No Blocked Numbers"
         }
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
    setBreadcrumbs(bussinessNumber) {
      this.items = [
        {
          text: "More",
          disabled: false,
          route: { name: 'BusinessNumber', query: { }  }
        },
        {
          text: "Business Numbers",
          disabled: false,
          route: { name: 'BusinessNumber', query: { }  }
        },
        {
          text: "Call Flow Settings",
          disabled: false,
          route: { name: 'CallFlowSettings', query: { bn: [bussinessNumber]}  }
        },
         {
          text: "Blocked Numbers",
          disabled: true,
          route: { name: 'selectSpecificAgent', query: { }  }
        },
      ]
    },
    goBack(bussinessNumber) {
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

