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
                        Details
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
                        Summary of the payment
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      
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
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="12">
                            <v-card class="ml-0" elevation="0">
                              <v-card
                                :elevation="0"
                                class="
                                  transition-fast-in-fast-out
                                  v-card--reveal
                                "
                                style="height: 100%"
                              >
                                <v-card-text class="pb-0">
                                  <v-simple-table dense>
                                    <template v-slot:default>
                                      <tbody class="ma-0 pa-0" border="0">
                                        <tr colspan="2">
                                          <td class="ma-0 pa-0" colspan="2">
                                            <p class="light3 mt-5 mb-0">
                                              Business Name
                                            </p>
                                            <p class="bold">Lek</p>

                                            <p class="light3 mt-5 mb-0">
                                              Business Address
                                            </p>
                                            <p class="bold">
                                              Waybeo, Kollam, Kerala, 691306
                                            </p>

                                            <p class="light3 mt-5 mb-0">
                                              Business Email Address
                                            </p>
                                            <p class="bold">
                                              lekshmi@gmail.com
                                            </p>

                                            <p class="bold mt-5">
                                              Selected Number: {{VirtualNumber}}
                                            </p>

                                            <p class="bold red--text mb-0 mt-5">
                                              Due On: 06-Jun-2022
                                            </p>
                                            <p class="light4">
                                              (Billable Duration {{ReminingDays}}
                                            </p>
                                          </td>
                                        </tr>
                                         <v-simple-table dense >
                                                <template v-slot:default>
                                                  <tbody class="ma-0 pa-0">
                                                    <tr
                                                      v-for="d in sublist"
                                                      :key="d.name"
                                                    >
                                                      <td  class="ma-0 pa-0" :class="d.class">{{ d.name }}</td>
                                                      <td :class="d.class">{{ d.amount }}</td>
                                                    </tr>
                                                  </tbody>
                                                </template></v-simple-table
                                              >
                                        <!-- <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            Charges
                                          </td>

                                          <td
                                            class="ma-0 pa-0"
                                            colspan="2"
                                            align="right"
                                          >
                                            ₹ 525.0
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td
                                            class="ma-0 pa-0 bold red--text"
                                            colspan="1"
                                            color="red"
                                          >
                                            Discount
                                          </td>

                                          <td
                                            class="ma-0 pa-0 bold red--text"
                                            colspan="2"
                                            align="right"
                                          >
                                            ₹ 52.5
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            GST(18%)
                                          </td>

                                          <td
                                            class="ma-0 pa-0"
                                            colspan="2"
                                            align="right"
                                          >
                                            ₹ 85.05
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td
                                            class="ma-0 pa-0 bold"
                                            colspan="1"
                                          >
                                            Total Charges
                                          </td>

                                          <td
                                            class="ma-0 pa-0 bold"
                                            colspan="2"
                                            align="right"
                                          >
                                            ₹ 557.55
                                          </td>
                                        </tr> -->
                                      </tbody>
                                    </template></v-simple-table
                                  >
                                </v-card-text>
                                <v-card-actions align="center" class="center">
                                  <v-btn
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
                                    @click="paynow()"
                                  >
                                    Pay Now
                                  </v-btn>
                                </v-card-actions>
                              </v-card>

                              <div class="text-center">
                                <v-btn
                                  v-if="toggle_none != null"
                                  class="
                                    mr-4
                                    mb-6
                                    text-capitalize
                                    ma-3
                                    rounded-pill
                                    red_button
                                  "
                                  width="20%"
                                  color="red white--text"
                                >
                                  Pay Now
                                </v-btn>
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

    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="400"
    >
      <template v-slot:default="dialog">
        <v-card outlined shaped elevation="8">
          <v-card-text>
            <div class="text-h6 mt-4 red--text">No numbers Available</div>
            <div class="text-h6 mt-2 red--text">Try after sometime !!</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="danger" @click="dialog.value = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
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
            @click="removeNumber = false"
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
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
// import firebase from 'firebase'
import { db } from '@/main.js';
import axios from "axios";
export default {
  components: {},
  data: () => ({
    ReminingDays:"",
    sublist:[],
    owneruid: "",
    AccountId:"",
    VirtualNumber:"",
    PhoneNumber: "",
    listingId: "",
    dialog2: false,
    dialog: false,
    removeNumber: false,
    isActive: true,
    toggle_none: null,
    changecolor: false,
    e2: 1,
    repeatCallerSettings: false,
    V_numbers: "",
    timerCount: "",
    overlay: true,
    reserve: false,
    NoNumbers: false,
    value: "",
    payment_info: false,

    options: [
      { title: "Edit", color: "black--text", url: "Edit" },
      { title: "Send Invite", color: "black--text", url: "sendInvite" },
      { title: "Remove Slot", color: "red--text", url: "removeSlot" },
    ],
    valid: false,
    stepForm: [],
    selected: [2],
    numberList: true,
    Numbers: [
      {
        headline: "+91 919526281234",
      },
      {
        headline: "+91 919526287163",
      },
      {
        headline: "+91 919526287163",
      },
      {
        headline: "+91 919526287163",
      },
      {
        headline: "+91 123459789012",
      },
    ],
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
        text: "Buy New Business Number",
        disabled: false,
        to: { name: "buyNewNumber" },
      },
      {
        text: "Summary",
        disabled: true,
        to: { name: "buyNewNumber" },
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
    prorate(){
           const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/prorate',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.owneruid,
            type:"BUSINESS_NUMBER"
						},
					}          
					axios(details)
						.then((response) => {
						console.log(response)
             this.ReminingDays = response.data.reminingmonths;
           this.sublist = [
      {
        name: "Charges",
        amount: response.data.amountwithoutgst,
        class: "light5",
      },
      {
        name: "Discount",
        amount: response.data.discountamount.toFixed(2),
        class: "light5",
      },
      {
        name: "GST(18%)",
        amount: (response.data.amount - response.data.amountwithoutgst).toFixed(2),
        class: "light5",
      },
      {
        name: "Total Charges",
        amount: (response.data.amount).toFixed(2),
        class: "regular",
      },
    ];
    this.PayAmount = (response.data.amount * this.usersCount).toFixed(2);
            // this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000})
              // this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
    },
     paynow() {
      const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/payment",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          uid: this.owneruid,
          owner_uid: this.owneruid,
          qty:1,
          // PlanId: parseInt(this.PlanId),
          payment_mode: "WEB",
          type: "BUSINESS_NUMBER",
          AccountId:this.AccountId
        },
      };
      axios(details).then(async (responsevalue) => {
        console.log(responsevalue);
        if (responsevalue.data.status == true) {
          var options = {
            key: "rzp_test_ThdwdEPh3QCHbo",
            order_id: responsevalue.data.order_id,
            name: this.Name,
            currency: "INR", // Optional. Same as the Order currency
            description: "Purchase Description",
            handler: (response) => {
              console.log(response);
              this.overlay = true;
              var initial = true;
              if (initial) {
                db.collection("paymentTransaction")
                  .where("OrderId", "==", responsevalue.data.order_id)
                  .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      console.log(doc.id, " => ", doc.data());
                      let testing_status = doc.data();
                      if (testing_status.Status == true && initial) {
                        initial = false;
                        this.overlay = false;
                         this.reveal= true,
                         this.usersCount = 1;
                          this.$root.vtoast.show({message: 'Paid Successfully', color: 'green', timer: 3000})
                        // db.collection("users")
                        //   .where("uid", "==", this.owneruid)
                        //   .get()
                        //   .then((snap) => {
                        //     // this.Rechargeday = snap.docs[0].data().LastDay;
                        //   })
                        //   .catch((err) => console.log(err));
                        initial = false;
                        this.overlay = false;
                        this.$router.push("/Addons");
                        // this.$router.push("/Dashboard")
                      }
                       if (testing_status.Status == false && initial) {
                        initial = false;
                        this.overlay = false;
                        //  this.reveal= true,
                         this.usersCount = 1;
                          this.$root.vtoast.show({message: 'Payment failed', color: 'red', timer: 3000})
                        // db.collection("users")
                        //   .where("uid", "==", this.owneruid)
                        //   .get()
                        //   .then((snap) => {
                        //     // this.Rechargeday = snap.docs[0].data().LastDay;
                        //   })
                        //   .catch((err) => console.log(err));
                        initial = false;
                        this.overlay = false;
                        // this.$router.push("/Dashboard")
                      }
                    });
                  });
              }
            },
            prefill: {
              name: this.Name,
              email: this.email,
              contact: this.phno,
            },
            notes: {
              address: this.address,
            },
            theme: {
              color: "#D32F2F",
            },
            modal: {
              ondismiss: () => {
                this.dialog2 = true;
              },
            },
          };
          // console.log(options)
          const rzp1 = new Razorpay(options);
          this.overlay = false;
          rzp1.open();
        } else {
          console.log("wrong value");
        }
      });
    },
    showPopup(type) {
      if (type == "Edit") {
        this.dialog2 = true;
      }
      if (type == "removeSlot") {
        this.removeNumber = true;
      }
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
    // user stage current page onbording_testing_complete

    progressbarTimer(value) {
      // console.log(value)
      if (value > 0) {
        var myVar = setInterval(() => {
          if (this.value > 1) {
            // console.log('before',this.value)
            this.value = this.value - 0.55;
            // this.value2 = this.value2 - 10
            this.timerCount--;
            // console.log('after',this.timerCount)
          } else {
            if (!this.reserve) {
              this.overlay = true;
              this.$router.go();
            }
          }
        }, 1000);
      } else {
        clearInterval(myVar);
        this.value = 0;
        this.timerCount = 0;
      }
    },
  },
  created() {
    // this.getNumbersList();
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
      this.AccountId=  (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
       db.collection("uservirtualNumber").where("Uid","==",this.owneruid).where("IsPurchased","==",false).get().then(async(snap) =>{
      if(snap.empty){
          this.$router.push("/buyNewNumber");
      }else{
          this.VirtualNumber = snap.docs[0].data().VirtualNumber;
          this.prorate()
      }
		}).catch((err)=>{
			console.log(err.message)
		})
    // this.uid = localStorageUserObj.uid;

  },
};
</script>

