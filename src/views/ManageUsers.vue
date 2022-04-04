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
                        Manage Users
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
                        Add, Modify or Remove users
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        :disabled="dialog"
                        :loading="dialog"
                        @click="dialog2 = true"
                        class="ma-0"
                        color="red darken-1"
                        dark
                      >
                        + Add New User
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069" v-for="(user,userIndex) in users" :key="user.id"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-card :elevation="0" class="ml-5">
                              <v-col cols="12" sm="10" align="center">
                                <v-row>
                                  <v-col cols="12" sm="12" align="center">
                                    <v-row justify="space-between">
                                      <v-col cols="6" sm="6" align="left">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="agent_name">{{user.Name}} <v-icon  class="mr-2" color="gray" v-show="user.cron">mdi-chess-queen</v-icon></div>
                                          <div class="agent_role">{{user.role}}</div>
                                          <div class="agent_number">
                                            {{user.PhoneNumber}}
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="2" align="end">
                                        <v-menu offset-y>
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-icon
                                              v-bind="attrs"
                                              v-on="on"
                                              color="black"
                                              >mdi-dots-vertical</v-icon
                                            >
                                          </template>
                                          <v-list>
                                            <v-list-item
                                              v-for="(item, index) in user.option"
                                              :key="index"
                                              active-class="pink--text"
                                            >
                                              <v-list-item-title
                                                :class="item.color"
                                                @change="toggleUserSwitch(userIndex, $event !== null, $event, user)"
                                                >{{
                                                  item.title
                                                }}</v-list-item-title
                                              >
                                            </v-list-item>
                                          </v-list>
                                        </v-menu>
                                      </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                  </v-col>
                                </v-row>
                                <!-- <v-row>
                                  <v-col cols="12" sm="12" align="center">
                                    <v-row justify="space-between">
                                      <v-col cols="6" sm="6" align="left">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="agent_name">Shinu  </div>
                                          <div class="agent_role">Agent</div>
                                          <div class="agent_number">
                                            +91 989999 9900
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="2" align="end">
                                        <v-menu offset-y>
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-icon
                                              v-bind="attrs"
                                              v-on="on"
                                              color="black"
                                              >mdi-dots-vertical</v-icon
                                            >
                                          </template>
                                          <v-list>
                                            <v-list-item
                                              v-for="(item, index) in options"
                                              :key="index"
                                              active-class="pink--text"
                                            >
                                              <v-list-item-title
                                                :class="item.color"
                                                @click="blockCall()"
                                                >{{
                                                  item.title
                                                }}</v-list-item-title
                                              >
                                            </v-list-item>
                                          </v-list>
                                        </v-menu>
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
                                          <div class="agent_name">Shinu</div>
                                          <div class="agent_role">Agent</div>
                                          <div class="agent_number">
                                            +91 989999 9900
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="2" align="end">
                                        <v-menu offset-y>
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-icon
                                              v-bind="attrs"
                                              v-on="on"
                                              color="black"
                                              >mdi-dots-vertical</v-icon
                                            >
                                          </template>
                                          <v-list>
                                            <v-list-item
                                              v-for="(item, index) in options"
                                              :key="index"
                                              active-class="pink--text"
                                            >
                                              <v-list-item-title
                                                :class="item.color"
                                                @click="blockCall()"
                                                >{{
                                                  item.title
                                                }}</v-list-item-title
                                              >
                                            </v-list-item>
                                          </v-list>
                                        </v-menu>
                                      </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                  </v-col>
                                </v-row> -->
                              </v-col>
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
    <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Add New User</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field label="Name" outlined></v-text-field>
          <v-select :items="types" label="Role" outlined></v-select>

          <v-text-field label="Mobile Number*" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="dialog2 = false"
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
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
export default {
  components: {},
  // created() {  
     created() {
        this.$root.vtoast.show({message: 'Hello there!', color: 'red', timer: 5000})
        let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    console.log(owneruid)
		// console.log("vetri",owneruid)
      db.collection("users").where("uid","==",owneruid).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
      this.baseusers = snap.docs[0].data().PlanBaseUsers;
      this.totalusers = snap.docs[0].data().PlanNumberOfUsers;
			snap.docs.forEach((element)=> {
				this.users.push({Name:element.data().FirstName,role:element.data().role,PhoneNumber:element.data().PhoneNumber,cron:true,option:[{"title":"edit title"}]});
			});
      // this.p = [{"title":"p"}];
      // for(let i=0;i<snap.docs[0].data().PlanNumberOfUsers;i++){
      //   if(i < snap.docs[0].data().PlanBaseUsers){
      //   this.users.push({Name:"unassigned",cron:true});
      //   } else {
      //       this.users.push({Name:"unassigned",cron:false});
      //   }
      // }
		}).catch((err)=>{
			console.log(err.message)
		})
    // console.log(this.users);
    db.collection("users").where("OwnerUid","==",owneruid).orderBy("IsAddon","asc").get().then(async(snapshot) =>{
      let assignedprimarycount = 0;
      let assignedaddoncount = 0;
      snapshot.docs.forEach((element)=> {
        // console.log(element.IsAddon);)
        if(element.data().IsAddon == false){
          assignedprimarycount= assignedprimarycount+1;
             }
               if(element.data().IsAddon == true){
          assignedaddoncount= assignedaddoncount+1;
             }
				this.users.push({Name:element.data().Name,role:element.data().role,PhoneNumber:element.data().PhoneNumber,cron:(element.data().IsAddon===false)?true:false,option:[ { title: "Edit Title", color: "black--text", url: "edit" },
      { title: "Send Invite", color: "black--text", url: "send" },
      { title: "Remove User", color: "red--text", url: "remove" },]});
			});

     const reminingprimary = this.baseusers-assignedprimarycount;
     const remingaddon = this.totalusers-this.baseusers-assignedaddoncount;
  //  console.log("-----------------------",reminingprimary,remingaddon,this.baseusers,this.totalusers,assignedprimarycount);
        for(let i=0;i<reminingprimary;i++){ this.users.push({Name:"unassigned",cron:true,option:[{"title":"add user"}]});}
         for(let i=0;i<remingaddon;i++){ this.users.push({Name:"unassigned",cron:false,option:[{"title":"add user"}]});}

			// console.log("test.........",snapshot.docs.length());
      // const addonsLength = snapshot.docs.length;
      // console.log("addonsLength",addonsLength)
      // this.users.forEach((element,index)=>{
      // //   // console.log("velllllllllllll",index)
      //     if(element.Name == "unassigned"){
      //       // console.log("vettttttttt")
      //     let data = snapshot.docs[addonsLength-index].data();
      // //     // console.log(data,index+1);
      //     if(data != undefined){
      //     this.users[index] = Object.assign(element,{Name:data.Name,cron:data.IsAddon?false:true,role:data.role,PhoneNumber:data.PhoneNumber});
      //     }
      //   }
      // })
      this.options = [{"title":"vetri"}]
		}).catch((err)=>{
			console.log(err.message)
		})
    // console.log("eee",this.users);
    // db.collection("uservirtualNumber").where("Uid","==",localStorageUserObj.uid).where("VirtualNumber","==",parseInt(Object.keys(this.$route.query)[0])).get().then(async(snap) =>{
    //   console.log(snap.docs[0].data().VirtualNumber)
    //   const participants = snap.docs[0].data().Participants
		// 	// console.log("test.........",this.response);
    //   this.agents.forEach((element,index) =>{
    //      const value = participants.find(({Number}) =>Number === element.PhoneNumber)
    //      if(value){
    //         console.log("valuew",value,index)
    //         this.agents[index] = Object.assign(element,{active:true});
    //      }else{
    //        this.agents[index] = Object.assign(element,{active:false});
    //      }
    //   })
    //   // console.log(this.agents,"ddd")
    //   // console.log(this.users)
    //   // this.agents.forEach((element))
    //   // form
    // //  const h ="9526287163";
  
    //   // ""
    //   // this.form[] ==
    //   // const vn = snap.docs[0].data();
		// 	// vn.Participants.forEach((element)=> {
		// 	// 	console.log(element.data())
    //   //   element.
    //   //   element.data().pa
		// 	// this.users.push({Name:element.data().Name,role:element.data().role,PhoneNumber:element.data().PhoneNumber});
		// 	// });
		// }).catch((err)=>{
		// 	console.log(err.message)
		// })
    },
  data: () => ({
    users:[],
    baseusers:0,
    totalusers:0,
    dialog2: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,
    p:[],
    options: [
      { title: "Edit Title", color: "black--text", url: "edit" },
      { title: "Send Invite", color: "black--text", url: "send" },
      { title: "Remove User", color: "red--text", url: "remove" },
    ],
    valid: false,
    stepForm: [],
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
        text: "Manage Users",
        disabled: true,
        to: { name: "CallPreference" },
      },
    ],
  }),

  methods: {
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

