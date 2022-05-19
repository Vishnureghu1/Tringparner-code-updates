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
                  <v-row align="center" justify="">
                    <v-col cols="12" sm="9">
                      <h2 class="comment_heading ml-5">
                        Add, Modify or Remove users
                      </h2>
                    </v-col>
                    <v-col v-if="isHide" cols="10" sm="3">
                      <v-btn
                        :disabled="dialog"
                        :loading="dialog"
                        @click="buyuser()"
                        class="ma-0"
                        color="primary"
                        dark
                      >
                        + Buy New User
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069" v-for="(user) in users" :key="user.id"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-card :elevation="0" class="ml-2">
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
                                                @click="option_click(item.function,user.PhoneNumber,user.role,user.Name,user.uid,user.cron)"
                                                >{{
                                                  item.title
                                                }}</v-list-item-title
                                              >
                                              <!-- <v-list-item-title
                                                :class="item.color"
                                                
                                               @change="toggleUserSwitch(userIndex, $event !== null, $event, user)"
                                                >{{
                                                  item.title
                                                }}</v-list-item-title
                                              > -->
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
    <v-dialog v-model="add_dialog" max-width="332px">
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
          <v-select v-show="IsRole" :items="types" label="Role" outlined v-model="selected_role"></v-select>
          <v-text-field v-show="IsNumber" label="Mobile Number*" outlined v-model="selected_number"></v-text-field>
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

    <v-dialog v-model="remove_user_dialog" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Remove User</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <p align="center" class="pb-0 mb-0">
            Are you Sure want to remove this user Sree [9526287163] ?
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
     <v-dialog
      v-model="sendInviteLoader"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="red"
        dark
      >
        <v-card-text>
          Sending invite...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
import axios from "axios";
// import func from 'vue-editor-bridge';
export default {
  components: {},
  // created() {  
     created() {
        // this.$root.vtoast.show({message: 'Hello there!', color: 'red', timer: 5000})
        this.inital_data()
    },
  data: () => ({
    isHide:false,
    cron:"",
    IsRole:true,
    IsNumber:true,
    s:false,
    uid:"",
    owneruid:"",
    AccountId:"",
    title:"",
    selected_name:"",
    selected_role:"",
    selected_number:"",
    selected_uid:"",
    users:[],
    headlinePopup:'Add New User',
    baseusers:0,
    totalusers:0,
    sendInviteLoader:false,
    dialog2: false,
    dialog: false,
    edit_dialog:false,
    add_dialog:false,
    removeNumber: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,
    p:[],

    valid: false,
    stepForm: [],
    types: [
      {
        text: "AGENT",
      },
      {
        text: "ADMIN",
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
      option_click(clicked,PhoneNumber,Role,Name,Uid,cron){
      this[clicked](PhoneNumber,Role,Name,Uid,cron)
      // this.dialog2=true;
    },
    edit_user(PhoneNumber,Role,Name,Uid,cron){
      // console.log("kkdfksd",PhoneNumber,Role,Name,Uid)
      this.cron=cron;
       this.title = "Edit User"
       this.IsRole = (Role == "OWNER")?false:true;
       this.IsNumber = (Role == "OWNER")?false:true;
      this.edit_dialog=true;
      this.selected_name = Name,
    this.selected_role=Role,
    this.selected_number=PhoneNumber,
    this.selected_uid=Uid
    },
    // remove_user(){
  
    // },
    add_user(PhoneNumber,Role,Name,Uid,cron){
      console.log(PhoneNumber,Role,Name,Uid,cron);
      this.cron= cron;
      this.title = "Add User"
       this.IsRole = true;
       this.IsNumber = true;
      this.add_dialog=true;
      this.selected_name = "",
    this.selected_role="",
    this.selected_number="",
    this.selected_uid="Uid"
    },
    // remove_slot(){

    // },
    send_invite(){
       this.sendInviteLoader=true
    },
    close(){
      this.edit_dialog = false
      this.add_dialog = false
        this.selected_name="";
    this.selected_role="";
    this.selected_number="";
    this.selected_uid="";
    this.cron=""
    },
    add_user1(){
       console.log(this.selected_name,this.selected_role,this.selected_number,this.selected_uid)
      console.log("nsfjk")
      let cronvalue = (this.cron == true)?false:true;
      const details = {
        url: this.$cloudfareApi+"/addon/user",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          created_by: this.uid,
          owner_uid: this.owneruid,
          IsAddon:cronvalue,
          AccountId:this.AccountId,
          user_number: parseInt(this.selected_number),
          role: this.selected_role,
          user_name:this.selected_name
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
        this.dialog2 = false;
        this.add_dialog=false;
           if(response.data.status == true){
         this.$root.vtoast.show({message: 'Added Successfully', color: 'green', timer: 5000});
         this.inital_data();
        }
        if(response.data.status == false){
           this.$root.vtoast.show({message: response.data.message, color: 'red', timer: 5000});
        }
        close()
            
      })
    },
    edit_user1(){
    console.log(this.selected_name,this.selected_role,this.selected_number,this.selected_uid)
      console.log(this.selected_name,this.selected_role,this.selected_number,this.selected_uid)
      // console.log("nsfjk")
      let cronvalue = (this.cron == true)?false:true;
      const details = {
        url: this.$cloudfareApi+"/addon/user",
        method: "PUT",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          created_by: this.uid,
          owner_uid: this.owneruid,
          IsAddon:cronvalue,
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
        if(response.data.status == true){
         this.$root.vtoast.show({message: 'Added Successfully', color: 'green', timer: 5000});
         this.inital_data();
        }
        if(response.data.status == false){
           this.$root.vtoast.show({message: response.data.message, color: 'red', timer: 5000});
        }
      })
    },
    remove_slot(){
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
         this.$root.vtoast.show({message: 'Slot Deleted Successfully', color: 'green', timer: 5000});
        //  await this.initial_data();
        //  this.dialog2 = false         
      })
    },
    remove_user(PhoneNumber){
     const details = {
        url: this.$cloudfareApi+"/addon/user",
        method: "DELETE",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          created_by: this.uid,
          owner_uid: this.owneruid,
          IsAddon:true,
          AccountId:this.AccountId,
          user_number: parseInt(PhoneNumber)
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
        // this.edit_dialog = false;
        if(response.data.status == true){
         this.$root.vtoast.show({message: 'Deleted Successfully', color: 'green', timer: 5000});
          this.inital_data();
        }
         if(response.data.status == false){
         this.$root.vtoast.show({message: response.data.message, color: 'red', timer: 5000});
        }        
      })
    },
       showPopup(type) {
      if (type == "Edit") {
        this.dialog2 = true;
        this.headlinePopup="Edit User";
      }
      if (type == "Send") {
    this.sendInviteLoader=true,
        this.removeNumber = true;
      }
        if (type == "Remove") {
    this.sendInviteLoader=true,
        this.removeNumber = true;
      }
    },
    inital_data(){
      this.users = [];
       let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
          this.isHide = (localStorageUserObj.role == "OWNER")?true:false;
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    // console.log(owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
      db.collection("users").where("uid","==",owneruid).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
      this.baseusers = snap.docs[0].data().PlanBaseUsers;
      this.totalusers = snap.docs[0].data().PlanNumberOfUsers;
			snap.docs.forEach((element)=> {
				this.users.push({Name:element.data().FirstName,role:element.data().role,PhoneNumber:element.data().PhoneNumber,cron:true,uid:element.data().uid,option:[{title:"Edit",type:"Edit",headline:"Edit User",function:"edit_user"}]});
			});
    
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
				this.users.push({Name:element.data().Name,role:element.data().role,PhoneNumber:element.data().PhoneNumber,uid:element.data().uid,cron:(element.data().IsAddon===false)?true:false,option:[ 
        { title:"Edit", type:"Edit", headline:"Edit User", color: "black--text", url: "edit",function:"edit_user"},
      { title: "Send Invite", type:"Send", headline:"Send Invite", color: "black--text", url: "send", function:"send_invite"},
      { title: "Remove User",  type:"Edit", headline:"Remove User", color: "primary--text", url: "remove",function:"remove_user"},]});
			});

     const reminingprimary = this.baseusers-assignedprimarycount;
     const remingaddon = this.totalusers-this.baseusers-assignedaddoncount;
  //  console.log("-----------------------",reminingprimary,remingaddon,this.baseusers,this.totalusers,assignedprimarycount);
        for(let i=0;i<reminingprimary;i++){ this.users.push({Name:"Unassigned",cron:true,option:[{"title":"Add User",function:"add_user"}]});}
         for(let i=0;i<remingaddon;i++){ this.users.push({Name:"Unassigned",cron:false,option:[{"title":"Add User",function:"add_user"},{ title: "Remove Slot",function:"remove_slot"}]});}

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
    },
    buyuser(){
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
  },
     watch: {
      sendInviteLoader (val) {
        if (!val) return

        setTimeout(() => (this.sendInviteLoader = false), 4000)
      },
    },
};
</script>

