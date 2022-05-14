<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12" align="center">
              <v-overlay :value="overlay">
                <v-progress-circular
                  indeterminate
                  color="red"
                  size="40"
                  :width="3"
                ></v-progress-circular>
              </v-overlay>
              <v-card color="transparent" outlined class="" max-width="500">
                <v-row>
                  <v-col cols="12" sm="12">
                    <h2 class="page_title mt-16 mb-4">
                      Enter your billing details
                    </h2>
                    <v-form
                     
                      class="mt-3 ml-5 mr-4"
                      ref="form"
                      method="post"
                      v-model="valid"
                      lazy-validation
                    >
                      <v-text-field
                        outlined
                        label="Company Name/Your Name"
                        v-model="businessName"
                        :rules="businessNameRules"
                        required
                      ></v-text-field>
                      <v-textarea
                        outlined
                        label="Billing Address"
                        v-model="address"
                        :rules="addressRules"
                        required
                      ></v-textarea>
                      <!-- <v-text-field outlined label="Billing Name" v-model="billingName" :rules="businessNameRules" required></v-text-field> -->

                      <v-text-field
                        outlined
                        label="Pincode"
                        v-model="pincode"
                        :rules="pincodeRules"
                        @change="searchPincode()"
                      ></v-text-field>
                      <v-text-field
                        outlined
                        label="City"
                        v-model="city"
                        readonly
                        disabled
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        label="State"
                        v-model="state"
                        readonly
                        disabled
                        required
                      ></v-text-field>
                      <v-text-field
                        outlined
                        label="GST No(if any)"
                        v-model="gst"
                        :rules="gstRules"
                      ></v-text-field>
                      <v-text-field
                        outlined
                        v-model="email"
                        :rules="emailRules"
                        label="Business Email Address"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-col>
                  <!-- <v-col cols="12" sm="6">
                    <h2 class="page_title mt-16 mb-4">
                      Your number info
                    </h2>
             
                    <p class="font-weight-light">Your Number</p>
                    <p class="left">+91{{ userPhoneNumber }}</p>
                  </v-col> -->
                </v-row>
                <v-btn
                  class="btn_text mt-8 white--text text-capitalize"
                  width="25%"
                  @click.prevent="nextPage()"
                  rounded
                  color="#EE1C25"
                >
                  Next
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
import firebase from "firebase";
import { db } from "@/main.js";
import pincodeDB from "../components/pincodes.json";
export default {
  data: () => ({
    userPhoneNumber: "",
    billingName: "",
    radio1: true,
    radio2: false,
    radio3: false,
    selected: true,
    valid: true,
    gst: "",
    phno: "",
    name: "",
    email: "",
    businessName: "",
    city: "",
    address: "",
    pincode: "",
    state: "",
    virtualnumber: "",
    rzp: "",
    dialog2: false,
    order_id: "",
    getOtp: true,
    otp: "",
    planId: "",
    pincodeDb: pincodeDB,
    pincodeInvalid: true,
    dialog: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Your Name is required",
      (v) => (v && v.length < 50) || "Too many characters.Please try again !!",
      (v) =>
        /^[a-zA-Z][a-zA-Z ]+$/.test(v) ||
        "Name should not contain symbols or digits. Please try again.",
    ],
    gstRules: [
      // (v) => !!v || "GST Number is required",
      (v) => (!v || v.length > 1 && /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[a-zA-Z][0-9a-zA-Z]{1}$/.test(v)) || "GST must contain 15 characters & Valid",
      // (v) => /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[a-zA-Z][0-9a-zA-Z]{1}$/.test(v) || "GST must be valid",
    ],
    businessNameRules: [
      (v) => !!v || "Your Business name is required",
      (v) => (v && v.length < 100) || "Too many characters.Please try again !!",
      (v) =>
        /[a-zA-Z][a-zA-Z ]*/.test(v) ||
        "Business Name should not contain symbols or digits. Please try again.",
    ],
    addressRules: [
      (v) => !!v || "Your Address is required",
      (v) => (v && v.length < 100) || "Too many characters.Please try again !!",
    ],
    pincodeRules: [
      (v) => !!v || "Your Pincode is required",
      (v) =>
        (v && v.length == 6) ||
        "Pincode must contain 6 digits. Invalid Pincode !!",
      (v) => /^[0-9]*$/.test(v) || "Pincode must contain 6 digits",
    ],
    overlay: false,
  }),
  components: {},

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("logged user details", user);
        this.uid = user.uid;
        this.phno = user.phoneNumber.slice(3);
        db.collection("users")
          .where("uid", "==", this.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let user_details = doc.data();
              console.log(user_details);
              this.virtualnumber = user_details.virtualNumber[0];
              this.planId = user_details.PlanId;
              this.userPhoneNumber = user_details.PhoneNumber;
              this.virtualNumber = user_details.virtualNumber[0];
              this.address = user_details.Address;
              this.pincode = user_details.PinCode;
              this.city = user_details.City;
              this.state = user_details.State;
              this.email = user_details.Email;
              this.businessName = user_details.CompanyName;
              this.name = user_details.FirstName;
              this.phno = user_details.PhoneNumber;
              this.gst = user_details.Gstin;
             
              this.orderId = user_details.OrderId;
            });
          });
      }
    });
  },

  methods: {
    searchPincode() {
      console.log(this.pincodeDb);
      console.log(this.pincode);
      // var data = JSON.parse(this.pincodeDb)
      var data = this.pincodeDb;
      console.log("before checking", this.pincodeInvalid);
      var result = data.filter((item) => {
        if (item.id == this.pincode) {
          this.city = item.name.city;
          this.state = item.name.state;
          console.log(item.name.city);
          console.log(item.name.state);
          this.pincodeInvalid = false;
          console.log("false", this.pincodeInvalid);
          console.log(result);
        } else {
          this.pincodeInvalid = true;
          // console.log('true',this.pincodeInvalid)
        }
        // console.log('after',this.pincodeInvalid)
      });
    },
    nextPage() {
     var dd =  this.$refs.form.validate();

      if(dd==true){

        this.overlay = true;
      const details = {
        url: this.$cloudfareApi+"/user/owner",
        method: "POST",

        data: {
          uid: this.uid,
          phoneNumber: this.phno,
          virtual_number: this.virtualnumber,
          FirstName: this.businessName,
          Email: this.email,
          Address: this.address,
          City: this.city,
          State: this.state,
          Gstin: this.gst,
          CompanyName: this.businessName,
          Pincode: this.pincode,
          PlanId: this.planId,
          payment_mode: "WEB",
        },
      };
      console.log(details);
      this.$axios(details)
        .then((response) => {
          console.log("order_id", response);
          const user_stage = {
            url: this.$cloudfareApi+"/user/stage",
            method: "POST",

            data: {
              uid: this.uid,
              phoneNumber: this.phno,
              currentPage: "onboarding_review",
              plan_id: this.planId,
            },
          };
          console.log(user_stage);
          this.$axios(user_stage)
            .then((response) => {
              console.log(response);
              this.$router.push("/Review");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  }
};
</script>

<style scoped>
.page_title {
  font-size: 23px;
  color: #3b3b3b;
}
.price_title {
  font-size: 23px;
  color: #3b3b3b;
}
.sub_title {
  font-size: 12px;
  color: #3b3b3b;
}
.name_heading {
  font-size: 14px;
  color: #3b3b3b;
}
.number_heading {
  font-size: 24px;
  color: #3b3b3b;
}
.offer_title {
  font-size: 14px;
  color: #ee1c25;
}
.link_style {
  color: #ee1c25;
}
.number_heading.v-btn--outlined {
  border: thin solid #ee1c25;
}
.v-btn:before {
  color: #f3f9f3;
}
.btn_text {
  font-family: "Nunito", light;
  font-size: 14px;
}
.v-application .error {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
  transform: rotate(45deg);
}
</style>