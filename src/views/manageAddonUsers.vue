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
                        Manage Add-On Users
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
                        Add, Modify or Remove Add-On Users
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        :disabled="dialog"
                        @click="buy()"
                        class="ma-0"
                        color="primary"
                        dark
                      >
                        + Buy New User
                         <!-- :loading="dialog"
                        @click="dialog2 = true" -->
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                      v-for="(user) in users" :key="user.id"
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
                                          <div class="agent_name">{{user.Name}}</div>
                                          <div class="agent_role">{{user.Role}}</div>
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
                                              v-for="(item, index) in user.options"
                                              :key="index"
                                              active-class="pink--text"
                                            >
                                              <v-list-item-title
                                                :class="item.color"
                                                @click="option_click(item.function,user.PhoneNumber,user.Role,user.Name,user.Uid)"
                                                :id="item.url"
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
          <h3 class="center">{{title}}</h3>
        </v-card-title>
        <v-card-text class="pt-0">
           <v-text-field label="Name" outlined v-model="selected_name"></v-text-field>
          <v-select :items="types" label="Role" outlined v-model="selected_role"></v-select>
          <v-text-field label="Mobile Number*" outlined v-model="selected_number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="add_user1()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="edit_dialog" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">{{title}}</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field label="Name" outlined v-model="selected_name"></v-text-field>
          <v-select :items="types" label="Role" outlined v-model="selected_role"></v-select>
          <v-text-field label="Mobile Number*" outlined v-model="selected_number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="edit_user1()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
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
            @click="close()"
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
import { db } from "@/main.js";
import axios from "axios";
export default {
  
 components: {},
 created() {
  this.inital_data()
  },
  data: () => ({
    selected_name:"",
    selected_role:"",
    selected_number:"",
    selected_uid:"",
    title:"",
    users:[],
    uid:"",
    owneruid:"",
    AccountId:"",
    dialog2: false,
    dialog: false,
    edit_dialog:false,
    removeNumber: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,

    options: [
      { title: "Edit", color: "black--text", url: "Edit" },
      { title: "Send Invite", color: "black--text", url: "sendInvite" },
      { title: "Remove Slot", color: "primary--text", url: "removeSlot" },
    ],
    valid: false,
    stepForm: [],
    types: [
      {
        text: "ADMIN",
      },
      {
        text: "AGENT",
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
        text: "Manage Add-On Users",
        disabled: true,
        to: { name: "CallPreference" },
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
    option_click(clicked,PhoneNumber,Role,Name,Uid){
      this[clicked](PhoneNumber,Role,Name,Uid)
      // this.dialog2=true;
    },
    add_user(){
     this.title = "Add User"
     this.dialog2=true;
     this.selected_name = "",
    this.selected_role="",
    this.selected_number="",
    this.selected_uid=""
    },
    edit_user(PhoneNumber,Role,Name,Uid){
      this.title = "Edit User"
      this.edit_dialog=true;
      this.selected_name = Name,
    this.selected_role=Role,
    this.selected_number=PhoneNumber,
    this.selected_uid=Uid
    },
    // submit_click(clicked){
    //  this[clicked]()
    // },
    add_user1(){
       console.log(this.selected_name,this.selected_role,this.selected_number,this.selected_uid)
      console.log("nsfjk")
      const details = {
        url: this.$cloudfareApi+"/addon/user",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          created_by: this.uid,
          owner_uid: this.owneruid,
          IsAddon:true,
          AccountId:this.AccountId,
          user_number: parseInt(this.selected_number),
          role: this.selected_role,
          user_name:this.selected_name
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
        this.dialog2 = false;
         this.$root.vtoast.show({message: 'added successfully', color: 'green', timer: 5000});
         this.inital_data();
            
      })
    },
    edit_user1(){
    console.log(this.selected_name,this.selected_role,this.selected_number,this.selected_uid)
      console.log(this.selected_name,this.selected_role,this.selected_number,this.selected_uid)
      console.log("nsfjk")
      const details = {
        url: this.$cloudfareApi+"/addon/user",
        method: "PUT",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          created_by: this.uid,
          owner_uid: this.owneruid,
          IsAddon:true,
          AccountId:this.AccountId,
          user_number: parseInt(this.selected_number),
          role: this.selected_role,
          user_name:this.selected_name,
          user_uid:this.selected_uid
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
        this.edit_dialog = false;
         this.$root.vtoast.show({message: 'added successfully', color: 'green', timer: 5000});
         this.inital_data();
            
      })
    },
    delete_slot(){
     const details = {
        url: this.$cloudfareApi+"/addon/delete",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          owner_uid: this.owneruid,
          type:"USER",
        },
      };
      axios(details).then(async () => {
        // console.log(response)
         this.initial_data();
         this.$root.vtoast.show({message: 'slot deleted successfully', color: 'green', timer: 5000});
        //  await this.initial_data();
        //  this.dialog2 = false         
      })
    },
    delete_user(PhoneNumber){
     const details = {
        url: this.$cloudfareApi+"/addon/user",
        method: "DELETE",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          created_by: this.uid,
          owner_uid: this.owneruid,
          // IsAddon:true,
          AccountId:this.AccountId,
          user_number: parseInt(PhoneNumber)
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
        // this.edit_dialog = false;
        if(response.data.status == true){
         this.$root.vtoast.show({message: 'deleted successfully', color: 'green', timer: 5000});
          this.inital_data();
        }
         if(response.data.status == false){
         this.$root.vtoast.show({message: response.data.message, color: 'red', timer: 5000});
        }        
      })
    },
    close(){
      this.dialog2 = false;
       this.edit_dialog=false;
       this.selected_name="";
    this.selected_role="";
    this.selected_number="";
    this.selected_uid="";
    },
    // showPopup(type) {
    //   if (type == "Edit") {
    //     this.dialog2 = true;
    //   }
    //   if (type == "removeSlot") {
    //     this.removeNumber = true;
    //   }
    // },
    buy(){
       this.$router.push("/buyNewAddOnUser");
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
    inital_data(){
        let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    // console.log(owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
		// console.log("vetri",owneruid)
      this.users=[];
      db.collection("users").where("OwnerUid","==",owneruid).where("IsAddon","==",true).get().then(async(snap) =>{
		
      // snap.docs.forEach(async(element,index) => {
        for(let [index,element] of snap.docs.entries()){
               this.users.push({Name:element.data().Name,Role:element.data().role,PhoneNumber:element.data().PhoneNumber,Uid:element.data().uid,options:[{title:"Edit User",type:"Edit",headline:"Edit User",function:"edit_user"},{title:"Delete User",type:"Edit",headline:"Edit User",function:"delete_user"}]});
               console.log(this.users[index])
        }
      // this.baseusers = snap.docs[0].data().PlanBaseUsers;
      // const totalusers = snap.docs[0].data().PlanNumberOfUsers-snap.docs[0].data().PlanBaseUsers;
      //  for(let i=0;i<totalusers;i++){ this.users.push({Name:"unassigned",cron:true,options:[{title:"Add User",type:"Edit",headline:"Edit User"},{title:"Delete User",type:"Edit",headline:"Edit User"}]});}
		// console.log(this.users[1])
		}).catch((err)=>{
			console.log(err.message)
		})
      db.collection("users").where("uid","==",owneruid).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
      // this.baseusers = snap.docs[0].data().PlanBaseUsers;
      const assignedusers = this.users.length;
      const totalusers = snap.docs[0].data().PlanNumberOfUsers-snap.docs[0].data().PlanBaseUsers;
      const toassign = totalusers - assignedusers
       for(let i=0;i<toassign;i++){ 
        //  console.log("1")
         this.users.push({Name:"unassigned",options:[{title:"Add User",type:"Edit",headline:"Edit User",function:"add_user"},{title:"Delete Slot",type:"Edit",headline:"Edit User",function:"delete_slot"}]});
         }
		
		}).catch((err)=>{
			console.log(err.message)
		})
    }
  },
};
</script>

