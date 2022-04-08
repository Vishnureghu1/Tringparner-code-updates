<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12">
              <div class="ml-8">
                <v-row>
                  <v-col cols="12" sm="10">
                    <h2 class="page_title mt-6 ml-5">
                      <v-icon class="mr-2" color="black" @click="goBack()"
                        >mdi-arrow-left</v-icon
                      >
                      Billing Address
                    </h2>

                    <v-breadcrumbs class="breadcrumbs" :items="items">
                      <template class="breadcrumbs" v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                      </template>
                    </v-breadcrumbs>
                  </v-col>
                </v-row>
                <v-row>
                  <v-flex xs12 sm12 md12>
                    <v-row no-gutters>
                      <v-card class="col-6" elevation="0">
                        <v-card-text>
                          <v-form
                            @submit.prevent=""
                            class="mt-3 ml-8 mr-4"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                          >
                            <v-checkbox
                              v-model="selected"
                              label="Are you registered for GST"
                            >
                            </v-checkbox>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  outlined
                                  v-if="selected"
                                  label="GST Number"
                                  :rules="gstRules"
                                  @keyup="uppercase"
                                  v-model="gst"
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  v-if="selected"
                                  label="Business Name"
                                  :rules="businessNameRules"
                                  v-model="businessName"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  v-if="selected"
                                  v-model="email"
                                  :rules="emailRules"
                                  label="Business E-mail"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  label="Name"
                                  v-model="name"
                                  :rules="nameRules"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  label="Your Number"
                                  prefix="+91"
                                  v-model="phno"
                                  readonly
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  v-if="!selected"
                                  v-model="email"
                                  :rules="emailRules"
                                  label="Your E-mail"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  label="Address"
                                  v-model="address"
                                  :rules="addressRules"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  label="Pincode"
                                  v-model="pincode"
                                  :rules="pincodeRules"
                                  @change="searchPincode()"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  label="City"
                                  v-model="city"
                                  required
                                ></v-text-field>
                                <v-text-field
                                  outlined
                                  label="State"
                                  v-model="state"
                                  required
                                ></v-text-field>
                                <v-btn
                                  type="submit"
                                  text
                                  class="
                                    text-capitalize
                                    ma-3
                                    rounded-pill
                                    red_button
                                  "
                                  min-width="140px"
                                  color="white"
                                  outlined
                                  @click="validate"
                                >
                                  Update
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-row>
                  </v-flex>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import firebase from "firebase";
import { db } from "@/main.js";
import moment from "moment";
import pincodeDB from "../components/pincodes.json";

export default {
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("logged user details", user);
        this.uid = user.uid;
        this.phno = user.phoneNumber.slice(3);
        await db
          .collection("users")
          .where("uid", "==", this.uid)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              let user_details = doc.data();
              this.Udata = user_details;
              this.name = this.Udata.FirstName;
              this.businessName = this.Udata.CompanyName;
              this.number = this.Udata.phoneNumber;
              this.email = this.Udata.Email;
              this.city = this.Udata.City;
              this.state = this.Udata.State;
              this.pincode = this.Udata.PinCode;
              this.address = this.Udata.Address;
              this.gst = this.Udata.Gstin;
              this.lastRecharge = this.Udata.LastRecharge;
              this.renewalDay = this.Udata.RenewalDay;
              this.lastDay = this.Udata.LastDay;
              this.PlanId = this.Udata.PlanId;
              if (this.PlanId == 2) {
                this.radio = "yearly";
              }
              var GstAvailable = this.Udata.GSTAvailable;
              if (GstAvailable == "N") {
                this.selected = false;
              }
              console.log(
                moment(this.lastRecharge).format("dddd MMMM Do YYYY")
              );
              this.lastRecharge = moment(this.lastRecharge).format(
                "dddd MMMM Do YYYY"
              );
              this.renewalDay = moment(this.renewalDay).format(
                "dddd MMMM Do YYYY"
              );
              this.lastDay = moment(this.lastDay).format("dddd MMMM Do YYYY");
              console.log(this.lastDay);
            });
            this.getRechargeAmount(this.radio);
          });

        db.collection("UserAddonDetails")
          .where("Uid", "==", this.uid)
          .orderBy("PurchaseDate", "desc")
          .onSnapshot((querySnapshot) => {
            this.addon_array = [];
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                let addonDetails = doc.data();
                var purchase_date = moment
                  .unix(addonDetails.PurchaseDate)
                  .format("DD/MM hh:mm a");
                var details = Object.assign({}, this.details, {
                  date: purchase_date,
                  uid: addonDetails.Uid,
                  type: addonDetails.Type,
                  virtual_number: addonDetails.VirtualNumber,
                });
                this.showAddonDetails = false;
                this.addon_array.push(details);
              });
            } else {
              this.showAddonDetails = true;
            }
          });

        db.collection("paymentTransaction")
          .where("Uid", "==", this.uid)
          .where("Status", "==", true)
          .onSnapshot((querySnapshot) => {
            this.payment_history = [];
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                let payment_details = doc.data();
                var purchase_date = moment
                  .unix(payment_details.Date)
                  .format("DD/MM");
                var details = Object.assign({}, this.details, {
                  date: purchase_date,
                  amount: payment_details.InvoiceAmount,
                  type: payment_details.Type,
                });
                this.payment_history.push(details);
              });
            }
          });
      }
    });
  },
  data() {
    return {
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
      rzp: "",
      items: [
        {
          text: "More",
          disabled: false,
          href: "Dashbaord",
        },
			{
          text: " Billing Information",
          disabled: false,
          to: { name: "BillingInformation" },
        },
        {
          text: "Billing Address",
          disabled: true,
          to: { name: "BillingAddress" },
        },
	
      ],
      detail: {},
      Udata: [],
      realdata: [],
      addon_array: [],
      payment_history: [],
      order_id: "",
      razorpay_order_id: "",
      razorpay_payment_id: "",
      razorpay_signature: "",
      virtual_number_amount: "",
      user_amount: "",
      without_gst: "",
      lastRecharge: "",
      lastDay: "",
      renewalDay: "",
      pincodeDb: pincodeDB,
      showAddonDetails: false,
      virtual_number_count: "",
      users_count: "",
      total_pay: "",
      PlanId: "",
      radio: "monthly",
      payment_data: [
        { text: "Date", align: "start", value: "date" },
        { text: "Type", value: "type" },
        { text: "Amount", value: "amount" },
        { text: "Invoice", value: "" },
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v) || "E-mail must be valid",
      ],
      nameRules: [
        (v) => !!v || "Your Name is required",
        (v) =>
          (v && v.length < 50) || "Too many characters.Please try again !!",
        (v) =>
          /^[a-zA-Z][a-zA-Z ]+$/.test(v) ||
          "Name should not contain symbols or digits. Please try again.",
      ],
      gstRules: [
        (v) => !!v || "GST Number is required",
        (v) => (v && v.length == 15) || "GST must contain 15 characters",
        (v) =>
          /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[a-zA-Z][0-9a-zA-Z]{1}$/.test(
            v
          ) || "GST must be valid",
      ],
      businessNameRules: [
        (v) => !!v || "Your Business name is required",
        (v) =>
          (v && v.length < 100) || "Too many characters.Please try again !!",
        (v) =>
          /[a-zA-Z][a-zA-Z ]*/.test(v) ||
          "Business Name should not contain symbols or digits. Please try again.",
      ],
      addressRules: [
        (v) => !!v || "Your Address is required",
        (v) =>
          (v && v.length < 100) || "Too many characters.Please try again !!",
      ],
      pincodeRules: [
        (v) => !!v || "Your Pincode is required",
        (v) =>
          (v && v.length == 6) ||
          "Pincode must contain 6 digits. Invalid Pincode !!",
        (v) => /^[0-9]*$/.test(v) || "Pincode must contain 6 digits",
      ],
    };
  },
  methods: {
    getRechargeAmount(radio) {
      console.log(radio);
      var PlanId = "";
      if (radio == "yearly") {
        PlanId = 2;
      } else {
        PlanId = 1;
      }
      const bill = {
        //    https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/bill",
        method: "POST",

        data: {
          uid: this.uid,
          PlanId: PlanId,
        },
      };
      console.log(bill);
      this.$axios(bill)
        .then((response) => {
          console.log(response);
          this.virtual_number_count = response.data.number;
          this.virtual_number_amount = response.data.number_amount;
          this.users_count = response.data.user;
          this.users_amount = response.data.user_amount;
          this.total_pay = response.data.invoice_amount;
          this.without_gst = response.data.total_amount;
        })
        .catch((error) => {
          console.error(error);
        });
    },

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
        } else {
          this.pincodeInvalid = true;
          // console.log('true',this.pincodeInvalid)
        }
        // console.log('after',this.pincodeInvalid)
      });
    },
    uppercase() {
      this.gst = this.gst.toUpperCase();
    },

    validate() {
      this.$refs.form.validate();
      let v = this.$refs.form.validate();
      if (v) {
        this.updateData();
      }
    },
    updateData() {
      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/update",
        method: "POST",
        data: {
          uid: this.uid,
          phoneNumber: this.phno,
          FirstName: this.name,
          Email: this.email,
          Address: this.address,
          City: this.city,
          State: this.state,
          Gstin: this.gst,
          CompanyName: this.businessName,
          Pincode: this.pincode,
        },
      };
      console.log(user_data);
      this.$axios(user_data)
        .then((response) => {
          console.log(response);
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    recharge() {
      var token = localStorage.getItem("token");
      const user_details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/payment",
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        data: {
          owner_uid: this.uid,
          type: "RECHARGE",
          PlanId: this.PlanId,
        },
      };
      // console.log(user_details);
      this.$axios(user_details)
        .then((response) => {
          console.log(response);
          console.log("order_id", response);
          console.log(response.data.order_id);
          this.order_id = response.data.order_id;
          var options = {
            key: "rzp_test_ThdwdEPh3QCHbo",
            order_id: this.order_id,
            name: this.name,
            currency: "INR", // Optional. Same as the Order currency
            description: "Purchase Description",

            handler: (response) => {
              console.log(response);
              alert("Recharge successfull");
            },
            modal: {
              ondismiss: () => {
                alert("payment cancelled");
                console.log("Checkout form closed");
              },
            },
            prefill: {
              name: this.name,
              email: this.email,
              contact: this.phno,
            },
            notes: {
              address: this.address,
            },
            theme: {
              color: "#3399cc",
            },
          };
          console.log(options);
          var rzp1 = new Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            alert("payment failed");
          });
          rzp1.open();
        })

        .catch((error) => {
          user_details;
          console.error(error);
        });
    },
  },
};
</script>