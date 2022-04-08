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
                     <h2 class="page_title mt-6 ml-5"> <v-icon  class="mr-2" color="black" @click="goBack()">mdi-arrow-left</v-icon>  Call Preference</h2>
                  
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
                          <v-col cols="12">
                            <v-stepper v-model="e2" :elevation="0" vertical>
                              <v-stepper-step
                                color="red darken-3
"
                                :complete="e2 > 1"
                                step="1"
                                :input-value="active"
                              >
                                Manage User
                              </v-stepper-step>

                              <v-stepper-content step="1">
                                <v-card :elevation="0" class="mb-0">
                                  <v-col cols="12" sm="10" align="center">
                                    <v-row justify="space-between">
                                      <v-col cols="6" sm="4" align="left">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="section_title">
                                            Manage Call Agents
                                          </div>
                                          <div class="section_sub_title mt-2">
                                            Select which all Users (Call Agents)
                                            are linked to this number.
                                            Distributions will happen amongst
                                            them.
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="4" align="end">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="add_agent">
                                            + Add New Users (Call Agents)
                                          </div>
                                        </v-card>
                                      </v-col>
                                    </v-row>
                                    <!-- <v-row> -->
                                      <v-card v-for="(agent,agentIndex) in agents" :key="agent.id" elevation="0" class="pl-0">
                                      <v-col cols="12" sm="12" align="center">
                                        <v-row justify="space-between">
                                          <v-col cols="6" sm="6" align="left">
                                            <v-card
                                              outlined
                                              color="transparent"
                                              class="mb-3"
                                            >
                                             <div class="agent_name">{{agent.Name}}</div>
                                          <div class="agent_role">{{agent.role}}</div>
                                          <div class="agent_number">
                                           {{agent.PhoneNumber}}
                                          </div>
                                            </v-card>
                                          </v-col>
                                          <v-col cols="6" sm="2" align="end">
                                           <v-switch
                                          justify-right
                                          :input-value="agent.active"
                                          color="red"
                                          :value="true"
                                          @change="toggleUserSwitch(agentIndex, $event, agent.PhoneNumber)"
                                          >
                                          </v-switch>
                                          </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                      </v-col>
                                      </v-card>
                                    <!-- </v-row> -->
                                    <!-- <v-row>
                                      <v-col cols="12" sm="12" align="center">
                                        <v-row justify="space-between">
                                          <v-col cols="6" sm="6" align="left">
                                            <v-card
                                              outlined
                                              color="transparent"
                                              class="mb-3"
                                            >
                                              <div class="agent_name">
                                                Shinu
                                              </div>
                                              <div class="agent_role">
                                                Agent
                                              </div>
                                              <div class="agent_number">
                                                +91 989999 9900
                                              </div>
                                            </v-card>
                                          </v-col>
                                          <v-col cols="6" sm="2" align="end">
                                            <v-switch
                                              justify-right
                                              v-model="isActive"
                                              color="red"
                                              value="isActive"
                                            ></v-switch>
                                          </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="12" sm="12" align="center">
                                        <v-row justify="space-between">
                                          <v-col cols="6" sm="6" align="left">
                                            <v-card
                                              outlined
                                              color="transparent"
                                              class="mb-3"
                                            >
                                              <div class="agent_name">
                                                Shinu
                                              </div>
                                              <div class="agent_role">
                                                Agent
                                              </div>
                                              <div class="agent_number">
                                                +91 989999 9900
                                              </div>
                                            </v-card>
                                          </v-col>
                                          <v-col cols="6" sm="2" align="end">
                                            <v-switch
                                              justify-right
                                              v-model="isActive"
                                              color="red"
                                              value="isActive"
                                            ></v-switch>
                                          </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                      </v-col>
                                    </v-row> -->
                                  </v-col>
                                </v-card>
                                <v-btn
                                  color="red"
                                  text
                                  class="
                                    ma-2
                                    text-capitalize
                                    rounded-pill
                                    p-3
                                    red_button_outline
                                  "
                                  min-width="140px"
                                  @click="e2 = 2"
                                >
                                  Skip
                                </v-btn>
                                <v-btn
                                  text
                                  class="
                                    text-capitalize
                                    ma-3
                                    rounded-pill
                                    red_button
                                  "
                                  min-width="140px"
                                  @click="e2 = 2"
                                  color="white"
                                  outlined
                                >
                                  Next
                                </v-btn>
                              </v-stepper-content>

                              <v-stepper-step
                                color="red darken-3"
                                :complete="e2 > 2"
                                step="2"
                              >
                              
                                Call Routing 
                                <!-- <small class="pt-2 pb-0"
                                  >Select how incoming calls are distributed
                                  among your users. <br />Distributions rules
                                  will happen based on these settings</small
                                > -->
                              </v-stepper-step>

                              <v-stepper-content step="2" class="font-Nunito">
                                <v-card class="mb-0" :elevation="0">
                                   <div class="subheading">
                                     Call Routing (LinkedIn Number)
                                    </div>
                                    <small class="grey--text light-3">Select how incoming calls are distributed amongst your users. Distributions rules will happen based on these settings</small>
                                  <v-radio-group v-model="callRouting">
                                    <div class="subheading pt-3 pb-2">
                                      New Incoming Call Routing
                                    </div>
                                    <v-radio
                                  value = "SIMULTANEOUS"
                                  name="active"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                  @click="activecall('SIMULTANEOUS')"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Simultaneous<br /><small
                                            class="grey--text light-3"
                                            >Your call will ring Simultaneously
                                            which in fact reduce the chance of
                                            missing calls.</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>

                                    <v-radio
                                       value="ROUNDROBINFLEXIBLE"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                   @click="activecall('ROUNDROBINFLEXIBLE')"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          RoundRobin Flexible<br /><small
                                            class="grey--text light-3"
                                            >The incoming call is assigned to an
                                            agent based on round robin pattern.
                                            If the assigned agent doesn't pick
                                            up, the call will be routed to
                                            another agnets linked to the
                                            business number.</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                    <v-radio
                                      value="ROUNDROBINSTRICT"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                   @click="activecall('ROUNDROBINSTRICT')"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          RoundRobin Strict<br /><small
                                            class="grey--text light-3"
                                            >Th incoming calll is assigned to an
                                            agent based on round robin pattern
                                            and only assigned user will receives
                                            call from the customer. If the
                                            assigned agent doesn't pickup, the
                                            call will get disconnected</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>

                                    <v-radio
                                     value="PRIORITY"
                                  color="red"
                                  class="mb-0 ml-5 pl-3"
                                   @click="activecall('PRIORITY')"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Prioritize<br /><small
                                            class="grey--text light-3"
                                            >Route customer calls to specific
                                            agent based on priority order</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                  </v-radio-group>


                                  <v-divider class="ml-15"></v-divider>
                                  <v-row>
											<v-col cols="10" sm='10'>
                        <div class="mt-5 mb-5 ml-15">
                                  <div class="subheading ">
                                      Prioritize Configuration<br></div>
                                     <p> <small
                                            class="grey--text light-3"
                                            >Select how incoming calls are distributed amongst your users. Distributions rules will happen based on these settings</small
                                          > 
            
                                    </p>
                        </div>
                        </v-col>
                                    <v-col cols="2" sm='2' align="end">
													<v-icon 
                           v-bind="attrs"
                                    v-on="on"
                                    color="#EE1C25"
                                    @click="PrioritizeConfiguration()"
                                    class="pt-10"
                                    >mdi-arrow-right</v-icon>
    
												</v-col>
                                     </v-row>
                                     <v-divider></v-divider>

       <div class="membership_details">
                                <div class="subheading mt-5 mb-5">
                                  Routing Method - Repeated Caller
                                </div>
                                <v-checkbox
                                  v-model="repeatCallerSettings"
                                  class="ml-10"
                                  color="red darken-3"
                                  @click="repeatedcall(repeatCallerSettings)"
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
        
 <div v-if="repeatCallerSettings">
                                  <v-divider class="ml-15"></v-divider>
                                  <div class="subheading mt-5 mb-5 ml-15">
                                    Sticky Agent Type
                                  </div>
                                  <v-radio-group v-model="StickyAgentType" column>
                                    <v-radio
                                      value="FLEXIBLE"
                                      color="red"
                                      class="mb-5 ml-5 pl-15"
                                      @click="repeatedcall(true,'FLEXIBLE')"
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
                                      value="STRICT"
                                      color="red"
                                      class="mb-0 ml-5 pl-15"
                                      @click="repeatedcall(true,'FLEXIBLE')"
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
                                </div>
                        </div>
                                </v-card>
                                <v-btn
                                  color="red"
                                  text
                                  class="
                                    ma-2
                                    text-capitalize
                                    rounded-pill
                                    p-3
                                    red_button_outline
                                  "
                                  min-width="140px"
                                  @click="e2 = 1"
                                >
                                  Go Back
                                </v-btn>
                                <v-btn
                                  text
                                  class="
                                    text-capitalize
                                    ma-3
                                    rounded-pill
                                    red_button
                                  "
                                  min-width="140px"
                                  :to="Dashboard"
                                  color="white"
                                  outlined
                                >
                                  Go to Dashboard
                                </v-btn>
                              </v-stepper-content>
                            </v-stepper>
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
         this.bussinessNumber = this.$route.query.bn;
    this.setBreadcrumbs(this.bussinessNumber);
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)
      this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
      db.collection("users").where("uid","==",owneruid).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
			snap.docs.forEach((element)=> {
				// console.log(element.data())
				this.agents.push({Name:element.data().FirstName,role:element.data().role,PhoneNumber:element.data().PhoneNumber,active:true});
			});
		}).catch((err)=>{
			console.log(err.message)
		})
    db.collection("users").where("OwnerUid","==",owneruid).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
			snap.docs.forEach((element)=> {
				// console.log(element.data())
				this.agents.push({Name:element.data().Name,role:element.data().role,PhoneNumber:element.data().PhoneNumber,active:false});
			});
		}).catch((err)=>{
			console.log(err.message)
		})
    db.collection("uservirtualNumber").where("Uid","==",owneruid).where("VirtualNumber","==",parseInt(this.$route.query.bn)).get().then(async(snap) =>{
      console.log(snap.docs[0].data().VirtualNumber)
      const participants = snap.docs[0].data().Participants
			// console.log("test.........",this.response);
      this.participants = participants
      this.source = snap.docs[0].data().Source
      this.agents.forEach((element,index) =>{
         const value = participants.find(({Number}) =>Number === element.PhoneNumber)
         if(value){
            // console.log("valuew",value,index)
            this.agents[index] = Object.assign(element,{active:true});
         }else{
           this.agents[index] = Object.assign(element,{active:false});
         }
      })
      snap.docs.forEach((element)=> {
				// console.log(element.data())
         this.callRouting=element.data().NewActiveCaller,
         this.repeatCallerSettings=element.data().StickyAgent
         this.StickyAgentType = element.data().Stickiness
			});
      // console.log(this.agents,"ddd")
      // console.log(this.users)
      // this.agents.forEach((element))
      // form
    //  const h ="9526287163";
  
      // ""
      // this.form[] ==
      // const vn = snap.docs[0].data();
			// vn.Participants.forEach((element)=> {
			// 	console.log(element.data())
      //   element.
      //   element.data().
			// this.users.push({Name:element.data().Name,role:element.data().role,PhoneNumber:element.data().PhoneNumber});
			// });
		}).catch((err)=>{
			console.log(err.message)
		})
    },
  data: () => ({
    source:"",
    // bussinessNumber:this.$route.query.bn,
    participants:"",
    owneruid:"",
    uid:"",
    AccountId:"",
     form:{},
    response:{},
    users:[],
    agents:[],
    usermodel:[],
    isActive: true,
    e2: 1,
    active:"",
    Simultaneous:true,
    callRouting:null,
    checkedValue: "",
	repeatCallerSettings:false,
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
        text: "Call Preference",
        disabled: true,
        to: { name: "CallPreference" },
      },
    ],
  }),

  methods: {
    activecall(radiovalue){
      console.log("test..........")
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
            new_active_caller:radiovalue,
            source:this.source,
            participants:this.participants
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
    },
    repeatedcall(StickyAgent){
      console.log("StickAgent..........",StickyAgent)
       const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/callDistribution/repeatedcall',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:parseInt(this.$route.query.bn),
            AccountId:this.AccountId,
            StickyAgent:StickyAgent,
            Stickiness:this.StickyAgentType,
            source:this.source,
            participants:this.participants
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
            this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000})
              this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
    
    },
    toggleUserSwitch(agentIndex, $event, agent){
      console.log(agentIndex, $event, agent,this.participants)
       const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/callDistribution/addparticipant',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:parseInt(this.$route.query.bn),
            AccountId:this.AccountId,
            source:this.source,
            participants:this.participants
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
            this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000})
              this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
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
          to: { name: "CallFlowSettings", query: { ...{bn: bussinessNumber}} },
          href: `CallFlowSettings?bn=`,
          route: { name: 'CallFlowSettings', query: { bn: [bussinessNumber]}  }
        },
         {
          text: "Call Preference",
          disabled: false,
          to: { name: "CallPreference", query: { ...{bn: bussinessNumber}} },
          href: `CallPreference?bn=`,
          route: { name: 'CallPreference', query: { bn: [bussinessNumber]}  }
        },
      ]
    },
    goBack(bussinessNumber) {
      // this.$router.push("/CallFlowSettings?bn=" + bussinessNumber);
      // alert(bussinessNumber);
      let newQuery = {bn: bussinessNumber};
      this.$router.push({ path: '/CallFlowSettings', query: { ...newQuery } });
    },
     PrioritizeConfiguration() {
        // const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/PrioritizeConfiguration?bn="+this.$route.query.bn);
    },
    // goBack(){
    //    const getNumber =  Object.keys(this.$route.query)[0]
		// 		this.$router.push("/CallFlowSettings?bn="+getNumber)
		// 	},
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

<style type="text/css">
.page-title {
  text-align: left;
  /*font: normal normal bold 23px/28px Lato;*/
  /*font-weight: bold;*/
  font-size: 23px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #3b3b3b;
  opacity: 1;
}
.breadcrumbs {
  /*font: normal normal bold 10px/12px Lato;*/
  /*font-weight: bold;*/
  font-size: 10px;
  line-height: 12px;
  text-align: left;
  letter-spacing: 0px;
  color: #3b3b3b;
  opacity: 1;
}

.heading {
  /*font-family: 'lato', Bold;*/
  text-align: left;
  /*font: normal normal bold 24px/29px Lato;*/
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
  font-family: Lato !important;
  letter-spacing: 0px;
  color: #3b3b3b;
  opacity: 1;
}
.sub_heading {
  /*font-family: 'lato', Regular;*/
  font-size: 16px;
  line-height: 22px;
  font-family: Nunito !important;
  letter-spacing: 0px;
  color: #3b3b3b;
  opacity: 1;
}
.stepper_active {
  text-align: left;
  /* font: normal normal medium 14px/16px Ubuntu; */
  font-weight: medium;
  font-size: 14px;
  line-height: 16px;
  font-family: Ubuntu !important;
  letter-spacing: 0px;
  color: #ee1c25;
  opacity: 1;
}
.stepper_inactive {
  text-align: left;
  /* font: normal normal normal 14px/16px Ubuntu; */
  font-family: Ubuntu !important;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #808080;
  opacity: 1;
}
.dashed_border {
  border: 1px dashed #ee1c25;
  opacity: 1;
}
.section_title {
  text-align: left;
  /* font: normal normal bold 16px/19px Lato; */
  font-family: Lato !important;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0px;
  color: #3b3b3b;
  opacity: 1;
}
.section_sub_title {
  text-align: left;
  font-family: Nunito !important;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #808080;
  opacity: 1;
}
.add_agent {
  /* text-align: left; */
  text-decoration: underline;
  font-family: Nunito !important;
  font-weight: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #ee1c25;
  opacity: 1;
}
.agent_name {
  text-align: left;
  font-family: Nunito !important;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #3b3b3b;
}
.agent_role {
  text-align: left;
  font-family: Nunito !important;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #3b3b3b;
}
.agent_number {
  text-align: left;
  font-family: Nunito !important;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #3b3b3b;
}
.skip_button {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ee1c25;
  border-radius: 34px;
  opacity: 1;
}
.next_button {
  background: #ee1c25 0% 0% no-repeat padding-box;
  border-radius: 34px;
  opacity: 1;
}
.number_heading {
  /*font-family: 'Nunito', bold;*/
  font-weight: bold;
  font-size: 16px;
  color: #3b3b3b;
}
.comment_heading {
  /*font-family: 'lato', Regular;*/
  font-size: 12px;
  color: #808080;
}
.link_style {
  /*font-family: 'lato', Regular;*/
  font-size: 16px;
  color: #ee1c25;
}
.nunito-title {
  text-align: left;
  /*font: normal normal bold 16px/22px Nunito;*/
  /*font-weight: bold;*/
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #3b3b3b;
  opacity: 1;
}

/*red letter square button*/
.red_letter_rnd_button {
  width: 140px;
  height: 39px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ee1c25;
  border-radius: 34px;
  opacity: 1;
  margin-left: 20px;
  margin-top: 20px;
  text-align: center;
  font-family: Nunito !important;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0px;
  color: #ee1c25;
  opacity: 1;
}

/*white letter square button*/
.white_letter_rnd_button {
  width: 140px;
  height: 39px;
  background: #ee1c25 0% 0% no-repeat padding-box;
  border-radius: 34px;
  opacity: 1;
}

/*red letter round button*/
.wlr_button {
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 34px;
  color: #ffffff !important;
  background-color: #ee1c25 !important;
  opacity: 1;
  width: 140px;
  height: 39px;
}

/*red letter round button*/
.rlr_button {
  background: #ee1c25 0% 0% no-repeat padding-box;
  border-radius: 34px;
  color: #ee1c25 !important;
  background-color: #ffffff !important;
  opacity: 1;
  width: 140px;
  height: 39px;
}
</style>
