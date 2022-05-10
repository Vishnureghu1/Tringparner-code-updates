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
                        Manage Add-On Numbers
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
                        Deactivate or modify source of your Business Number
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        :disabled="false"
                        class="ma-0"
                        color="primary"
                        dark
                        @click="buy()"
                      >
                        + Buy New Number
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                    v-for="(addonNumber) in addonNumbers" :key="addonNumber.id"
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
                                          <div class="agent_name">{{addonNumber.Source}}<v-icon  class="mr-2" color="gray" v-show="addonNumber.cron">mdi-chess-queen</v-icon></div>
                                          <div class="agent_number">{{ addonNumber.VirtualNumber}}
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
                                              v-for="(item, index) in addonNumber.Options"
                                              :key="index"
                                              active-class="pink--text"
                                            >
                                              <v-list-item-title
                                                :class="item.color"
                                                @click="option_click(item.function,addonNumber.VirtualNumber,addonNumber.Source)"
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
                                          <div class="agent_name">General  </div>
                                    
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
                                </v-row>                 -->
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
          <h4 class="center">{{selectedNumber}}</h4>
          <!-- <h2 class="center">edit source</h3> -->
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field label="Edit Source" outlined v-model="source"></v-text-field>
          <!-- <v-select :items="types" label="Role" outlined></v-select>
          <v-text-field label="Mobile Number*" outlined></v-text-field> -->
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
            @click="submit()"
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
import axios from "axios";
export default {
  components: {},
  created() {
     this.initial_value()
  },
  data: () => ({
    dialog:"",
    AccountId:"",
    owneruid:"",
    uid:"",
    source:"",
    selectedNumber:"",
    addonNumbers:[],
    dialog2: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,

    options: [
      { title: "Edit Title", color: "black--text", url: "changeTitle" },
      { title: "Remove Number", color: "primary--text", url: "removeNumber" },
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
        text: "Add-Ons",
        disabled: false,
        to: { name: "Addons" },
      },
      {
        text: "Manage Add-On Number",
        disabled: true,
        to: { name: "CallPreference" },
      },
    ],
  }),

  methods: {
    option_click(clicked,VirtualNumber,source){
      this[clicked](VirtualNumber,source)
       console.log("block clicked");
    },
    edit_source(VirtualNumber,source){
     console.log("clicked")
     this.dialog2 = true;
     this.selectedNumber = VirtualNumber;
     this.source = source;
    },
  
    submit(){
      console.log(this.selectedNumber,this.source)
      const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/virtualNumber/rename",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          owner_uid: this.owneruid,
          virtual_number: parseInt(this.selectedNumber),
          source: this.source,
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
         this.initial_value();
         this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000});
        //  await this.initial_data();
         this.dialog2 = false         
      })
    },
    delete_number(VirtualNumber){
      console.log("delete_number");
       console.log(this.selectedNumber,this.source)
      const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/addon/delete",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          updated_by: this.uid,
          owner_uid: this.owneruid,
          type:"BUSINESS_NUMBER",
          virtual_number: parseInt(VirtualNumber),
        },
      };
      axios(details).then(async (response) => {
        console.log(response)
         this.initial_value();
         this.$root.vtoast.show({message: 'Deleted successfully', color: 'green', timer: 5000});
        //  await this.initial_data();
         this.dialog2 = false         
      })
    },
    CallFlowSettings(){
      this.$router.push("/CallFlowSettings");
    },
    buy(){
    this.$router.push("/buyNewNumber");
    },
     goBack() {
      this.$router.push("/Addons");
    },
    stepComplete(step) {
      return this.curr > step;
    },
    stepStatus(step) {
      return this.curr > step ? "green" : "blue";
    },
     initial_value(){
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    console.log("ndzzb")
	const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)
     this.owneruid = owneruid;
      this.AccountId=  (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    this.uid = localStorageUserObj.uid;
    this.addonNumbers=[]
      db.collection("uservirtualNumber").where("Uid","==",owneruid).where("IsPrimary","==",false).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
			snap.docs.reverse().forEach((element)=> {
        this.addonNumbers.push({VirtualNumber:element.data().VirtualNumber,Source:element.data().Source,cron:element.data().IsPrimary,Options:(element.data().IsPrimary == true)?[{ title:"Change Title", type:"Edit", headline:"Edit User", color: "black--text",function:"edit_source"}]:[{ title:"Edit Source", type:"Edit", headline:"Edit User", color: "black--text",function:"edit_source"},{ title:"Delete", type:"Edit", headline:"Delete Number", color: "black--text",function:"delete_number"}]       
        })
			});
      // console.log(this.addonNumbers)
		}).catch((err)=>{
			console.log(err.message)
		});
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

