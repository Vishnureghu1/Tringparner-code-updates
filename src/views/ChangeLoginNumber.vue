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
                        Change Login Number
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
                                Current Login Number
                              </div>

                              <v-card class="mb-0 mt-0 pl-5" :elevation="0">
                                <p>+91 {{current_number}}</p>
                                <v-checkbox
                                  v-model="ex4"
                                  label="I agree that I will not be able to access TringPartner from my current login number after changing it."
                                  color="red"
                                  value="agreeNumebrChange"
                                  change-number
                                ></v-checkbox>
                              </v-card>
                              <v-card-actions>
                                <v-btn    @click="popup()"
                                  class="text-capitalize ma-3 rounded-pill"
                                  min-width="140px"
                                  :class="{ selected: isDisabled }"
                                  :disabled="!isDisabled"
                                  color="red"
                                  dark
                                  rounded-pill
                                >
                                  Change login Number
                                </v-btn>
                              </v-card-actions>
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
            <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          
          <h3 class="center">Change Login Number</h3>
        </v-card-title>
        <v-card-text class="pt-5">
        
          <v-text-field label="New Number" outlined v-model="new_number" value="">

          </v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="cancel()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="sendotp()"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="enterOtpModel" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Enter the OTP</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <!-- <v-form @submit.prevent="" ref="form" v-model="otp" lazy-validation> -->
            <v-text-field label="Enter OTP" v-model="otp" value="" required></v-text-field>
          <!-- </v-form> -->
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="cancel()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="verifyOTP()"
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
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    // console.log(owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
      db.collection("users").where("uid","==",owneruid).get().then(async(snap) =>{
       this.current_number = snap.docs[0].data().PhoneNumber

    
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
    otp:"",
    owneruid:"",
    new_number:"",
    current_number:"",
    enterOtpModel:false,
    dialog2: false,
    ex4: false,
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

    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
        color: "Black",
      },
      {
        text: "Account Information",
        disabled: false,
        to: { name: "AccountInformation" },
      },
      {
        text: "Change Login Number",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),
  computed: {
    isDisabled: function () {
      return this.ex4;
    },
  },
  methods: {
    sendotp(){
       const details = {
        url: this.$cloudfareApi+"/user/otp",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          new_number: this.new_number,
          uid: this.owneruid,
          updated_by:this.owneruid
        },
      };

      axios(details).then(async (response) => { 
         if(response.data.status == false){
  console.log(response.data.status)   
     this.$root.vtoast.show({message: response.data.message, color: 'red', timer: 2000});
         }else{
  console.log(response.data.status)   
  this.dialog2 = false,
  this.enterOtpModel=true
         }
        //  this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000});
      
      })
    },
verifyOTP(){
  const details = {
        url: this.$cloudfareApi+"/user/otp/verify",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          new_number: this.new_number,
          uid: this.owneruid,
          otp: parseInt(this.otp),
          updated_by:this.owneruid
        },
      };

      axios(details).then(async (response) => { 
         if(response.data.status == false){
  console.log(response.data.status)   
     this.$root.vtoast.show({message: response.data.message, color: 'red', timer: 2000});
         }else{
  console.log(response.data.status)   
  this.dialog2 = false,
  this.enterOtpModel=false
  this.otp = "",
  this.current_number = this.new_number,
   this.$root.vtoast.show({message: response.data.message, color: 'green', timer: 2000});
         }
        //  this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000});
      
      })
},
        popup() {
      
        this.dialog2 = true;
   
      
    },
    cancel(){
       this.dialog2 = false;
       this.enterOtpModel = false;
       this.otp = "",
       this.new_number=""
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

