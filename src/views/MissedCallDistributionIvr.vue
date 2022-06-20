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
                        <v-icon class="mr-2" color="black" @click="goBack(bussinessNumber)"
                          >mdi-arrow-left</v-icon
                        >
                       Missed Call Distribution
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
 <div class="comment_heading mt-6 ml-5">Select how missed calls are distributed among
                            your users. Distribution rules will be applied base
                            on these settings</div>	
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12" class="pl-5">
                           
                            <v-card class="mb-0 mt-0" :elevation="0">
                             

                              <v-radio-group v-model="MissedCallDistribution">
                                <div class="subheading pt-0 pb-2">
                                  New Caller Routing
                                </div>
                                <v-radio
                                  value="ALL"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                  @click="missedcall('ALL')"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Assigned to All
                                    </div>
                                  </template>
                                </v-radio>

                                <v-radio
                                  value="Round-Robin"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                  @click="missedcall('Round-Robin')"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Assign in RoundRobin
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio
                                  value="Last-Attempted"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                  @click="missedcall('Last-Attempted')"
                                >
                                  <template v-slot:label>
                                   <div class="black--text">
                                      Assign to Last Attempted Agent
                                    </div>
                                  </template>
                                </v-radio>

                                <v-radio
                                  value="Specific-Agents"
                                  color="red"
                                  class="mb-0 ml-5 pl-3"
                                  @click="missedcall('specific_agents')"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Select Specific Agent(s)                                   
                                    </div>
                                  </template>
                                </v-radio>
                              </v-radio-group>

                              <v-divider class="ml-15"></v-divider>
                              <v-row>
                                <v-col cols="10" sm="10">
                                  <div class="mt-5 mb-5 ml-15">
                                    <div class="subheading">
                                      Select Specific Agent(s)<br />
                                    </div>
                                    <p>
                                      <small class="grey--text light-3"
                                        >Missed calll will get assigned only to the specific agents selected here.</small
                                      >
                                    </p>
                                  </div>
                                </v-col>
                                <v-col cols="2" sm="2" align="end">
                                  <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#EE1C25"
                                    @click="SelectSpecificAgent()"
                                    class="pt-10"
                                    >mdi-arrow-right</v-icon
                                  >
                                </v-col>
                              </v-row>
                              <v-divider></v-divider>

                              <div class="membership_details">
                                <div class="subheading mt-5 mb-5">
                                  Repeated Caller Settings
                                </div>
                                <v-checkbox
                                  v-model="repeatCallerSettings"
                                  class="ml-10"
                                  color="red darken-3"
                                  @click="missedcall()"
                                  ><template v-slot:label>
                                    <div class="gray--text">
                                      <div class="subheading">
                                        Sticky Agent<br />
                                      </div>
                                      <small
                                        >How incoming calls are distributed
                                        amongst your users. Distributions rules
                                        will happen based on these
                                        settings</small
                                      >
                                    </div>
                                  </template></v-checkbox
                                >

                                <!-- <div v-if="repeatCallerSettings">
                                  <v-divider class="ml-15"></v-divider>
                                  <div class="subheading mt-5 mb-5 ml-15">
                                    Sticky Agent Type
                                  </div>
                                  <v-radio-group v-model="ex7" column>
                                    <v-radio
                                      value="1"
                                      color="red"
                                      class="mb-5 ml-5 pl-15"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Flexible<br /><small
                                            class="grey--text light-3"
                                            >Your call will ring Simultaneously
                                            which in fact reduce the chance of
                                            missing calls.</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                    <v-radio
                                      value="2"
                                      color="red"
                                      class="mb-0 ml-5 pl-15"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Strict<br /><small
                                            class="grey--text light-3"
                                            >Your call will ring Simultaneously
                                            which in fact reduce the chance of
                                            missing calls.</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                  </v-radio-group>
                                </div> -->
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
		// console.log("vetri",owneruid)
      this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
     this.key = this.$route.query.key;
    this.bussinessNumber = this.$route.query.bn;    
    this.setBreadcrumbs(this.bussinessNumber);

    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
       db.collection("uservirtualNumber").where("Uid","==",localStorageUserObj.uid).where("VirtualNumber","==",parseInt(this.$route.query.bn)).get().then(async(snap) =>{
             const Ivr = snap.docs[0].data().Ivr[this.key.toString()]
          this.source = Ivr.Source,
           this.SpecificAgents = Ivr.SpecificAgents?Ivr.SpecificAgents:[];
			snap.docs.forEach((element)=> {
				// console.log(element.data())
        //  this.callRouting=element.data().NewActiveCaller,
           const IvrSetting = element.data().Ivr[this.key.toString()]
         this.repeatCallerSettings=IvrSetting.RepeatedMissedCaller == "Sticky-Disable" ? false : true
         this.MissedCallDistribution = IvrSetting.NewMissedCaller
			});
		}).catch((err)=>{
			console.log(err.message);
		})
  },
  data: () => ({
    source:"",
    key:"",
    SpecificAgents:"",
    // bussinessNumber:this.$route.query.bn,
    participants:"",
    owneruid:"",
    uid:"",
    AccountId:"",
    isActive: true,
    e2: 1,
    MissedCallDistribution:"",
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
      
    ],
  }),

  methods: {
      missedcall(){
      console.log("test..........")
       let sticky = this.repeatCallerSettings?"Sticky-Enable":"Sticky-Disable"
       const details = {
						url: this.$cloudfareApi + '/callDistribution/ivr/missedcall',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:parseInt(this.$route.query.bn),
            key:this.key,
            AccountId:this.AccountId,
            source:this.source,
            specific_agents:this.SpecificAgents,
            new_missed_caller:this.MissedCallDistribution,
            repeated_missed_caller:sticky
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
          text: "Missed Call Distribution",
          disabled: true,
          route: { name: 'MissedCallDistribution', query: { bn: [bussinessNumber]}  }
        },
      ]
    },
    goBack(bussinessNumber) {
      let newQuery = {bn: bussinessNumber};
      this.$router.push({ path: '/CallFlowSettings', query: { ...newQuery } });
    },
    SelectSpecificAgent() {
      this.$router.push("/SelectSpecificAgent?bn="+parseInt(this.$route.query.bn));
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


