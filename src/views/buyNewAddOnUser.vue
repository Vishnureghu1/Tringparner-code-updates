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
                        Buy New Users
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="12">
                      <h2 class="comment_heading ml-5 text-left">
                        Deactivate or modify source of your Business Number
                      </h2>
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
                            <v-card :elevation="0" class="ml-5">
                              <v-col cols="12" sm="10" align="center">
                                <v-row>
                                  <v-col cols="12" sm="12">
                                    <v-row>
                                      <v-card
                                        :loading="loading"
                                        class="
                                         ml-0
                                          my-12
                                          rounded-b-lg
                                          transition-fast-in-fast-out
                                        "
                                        min-width="700"
                                      >
                                        <v-row justify="center" class="d-block">
                                          <v-col cols="auto">
                                            <v-card
                                              width="100%"
                                              color="primary rounded-t-lg"
                                            >
                                              <v-row
                                                class="fill-height"
                                                align="center"
                                                justify="center"
                                                ><p
                                                  class="
                                                    membership_price
                                                    white--text
                                                    d-print-inline-flex
                                                    mb-0
                                                  "
                                                >
                                                  <span
                                                    class="nunito-font light2"
                                                    >₹</span
                                                  ><span
                                                    class="nunito-font light2"
                                                    >{{Amount}}<span
                                                      class="
                                                        nunito-font
                                                        light2
                                                        f16
                                                      "
                                                      >.00</span
                                                    ></span
                                                  ><span
                                                    class="
                                                      currency_symbol
                                                      light1
                                                    "
                                                    >per user</span
                                                  >
                                                </p>
                                                <p
                                                  class="
                                                    mt-0
                                                    white--text
                                                    d-print-inline-flex
                                                    nunito-font
                                                    light2
                                                    f14
                                                  "
                                                >
                                                  Per Month
                                                </p></v-row
                                              >
                                            </v-card>
                                          </v-col>
                                        </v-row>

                                        <v-list class="nunito-font">
                                          <v-list-item-group
                                            v-model="settings"
                                            multiple
                                          >
                                            <v-list>
                                              <v-list-item
                                                justify="center"
                                                align="center"
                                                v-for="item in properties"
                                                :key="item"
                                              >
                                                <v-list-item-icon
                                                  class="p-0 m-0"
                                                >
                                                  <v-icon color="red">
                                                    mdi-check
                                                  </v-icon>
                                                </v-list-item-icon>

                                                <v-list-item-content
                                                  align="left"
                                                >
                                                  <v-list-item-title
                                                    class="f14 light5"
                                                    v-text="item.headline"
                                                  ></v-list-item-title>
                                                </v-list-item-content>
                                              </v-list-item>
                                            </v-list>
                                          </v-list-item-group>
                                          Users
                                          <span class="dark bold nunito-font"
                                            >x{{usersCount}}</span
                                          >
                                          <div class="text-center">
                                            <v-btn elevation="0" icon v-on:click="RemoveUserCount(1)"
                                              ><v-icon color="red"
                                                >mdi-minus-circle-outline</v-icon
                                              ></v-btn
                                            >
                                            <v-btn elevation="0" icon
                                              ><span class="p15">{{usersCount}}</span></v-btn
                                            >
                                            <v-btn elevation="0" icon v-on:click="AddUserCount(1)">
                                              <v-icon color="red"
                                                >mdi-plus-circle-outline</v-icon
                                              ></v-btn
                                            >
                                          </div>
                                        </v-list>

                                        <v-card-actions>
                                          <v-col cols="12" sm="12">
                                            <v-btn
                                              text
                                              class="
                                                text-sentence
                                                ma-3
                                                rounded-pill
                                                red_button
                                                light3
                                                normal
                                              "
                                              min-width="140px"
                                              color="white"
                                              outlined
                                              @click="prorate()"
                                            >
                                              Next
                                            </v-btn>
                                          </v-col>
                                        </v-card-actions>

                                        <v-expand-transition>
                                          <v-card
                                            v-if="reveal"
                                            class="
                                              transition-fast-in-fast-out
                                              text-left
                                              v-card--reveal
                                            "
                                            style="height: 100%"
                                          >
                                            <v-card-text class="pb-0">
                                              <p class="text-h6 text--primary">
                                                Billing Information
                                              </p>
                                              <p class="f12 mb-1">
                                                Business Number: +91 9995233009
                                              </p>
                                              <p class="f12 mb-1">
                                                Business Address: Name, Street,
                                                Pin: 136666
                                              </p>
                                              <p class="f12 mb-3">
                                                Business Email Address:
                                                test@test.com
                                              </p>
                                              <p class="bold black--text">
                                                Number of Users: {{usersCount}}
                                              </p>
                                              <p>
                                                <span
                                                  class="bold primary--text pb-0"
                                                  >Due On: {{DueOn}}</span
                                                ><br /><span class="f14 light5"
                                                  >Billable Duration  {{ReminingDays}} 
                                                </span
                                                >
                                              </p>

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
                                            </v-card-text>
                                            <v-card-actions
                                              class="pt-0 center d-flex"
                                              align="center"
                                            >
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
                                                @click="reveal = false"
                                              >
                                                Cancel
                                              </v-btn>

                                              <v-btn
                                                text
                                                class="
                                                  text-sentence
                                                  ma-3
                                                  rounded-pill
                                                  red_button
                                                  light3
                                                  normal
                                                "
                                                min-width="140px"
                                                color="white"
                                                outlined
                                                @click="paynow()"
                                              >
                                                Pay Rs {{ PayAmount }} Now
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-expand-transition>
                                      </v-card>
                                    </v-row>
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
  </v-app>
</template>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import { db } from "@/main.js";
import axios from "axios";
export default {
  components: {},
  created() {
     db.collection("Addons").where("Id","==",1).get().then(async(snap) =>{
			console.log("test.........",snap.docs[0].data());
      this.Amount = snap.docs[0].data().Amount;
			// snap.docs.forEach((element)=> {
			// 	// console.log(element.data())
			// 	// this.agents.push({Name:element.data().FirstName,role:element.data().role,PhoneNumber:element.data().PhoneNumber,active:true});
			// });
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
    PayAmount:"",
    DueOn:"",
    ReminingDays:"",
    owneruid:"",
    AccountId:"",
    uid:"",
    Amount:"",
    reveal: false,
    settings: false,
    loading: false,
    dialog2: false,
    dialog: false,
    isActive: true,
    e2: 1,
        usersCount: 1,

    repeatCallerSettings: false,

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
    properties: [
      {
        headline: "Access to individual call Log",
      },
      {
        headline: "Notes/reminders",
      },
      {
        headline: "Missed Call Management",
      },
      {
        headline: "Call Management Dashnoard",
      },
    ],
    sublist: [
      {
        name: "Charges",
        amount: 159,
        class: "light5",
      },
      {
        name: "Discount",
        amount: 237,
        class: "light5",
      },
      {
        name: "GST(18%)",
        amount: 262,
        class: "light5",
      },
      {
        name: "Total Charges",
        amount: 305,
        class: "regular",
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
        text: "Buy New Users",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),

  methods: {
    AddUserCount: function(incre) {
      this.usersCount += incre;
    },
     RemoveUserCount: function(incre) {
       if(this.usersCount>1){
         this.usersCount -= incre;
       }
    },
    prorate(){
       let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
        //  this.bussinessNumber = this.$route.query.bn;
    // this.setBreadcrumbs(this.bussinessNumber);
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)
      this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.DueOn = localStorageUserObj.LastDay;
    this.reveal= true,
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
        const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/addon/prorate',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            type:"USER"
						},
					}          
					axios(details)
						.then((response) => {
						console.log(response)
            this.ReminingDays = response.data.reminingmonths;
           this.sublist = [
      {
        name: "Charges",
        amount: response.data.amountwithoutgst * this.usersCount,
        class: "light5",
      },
      {
        name: "Discount",
        amount: response.data.discountamount * this.usersCount,
        class: "light5",
      },
      {
        name: "GST(18%)",
        amount: (response.data.amount - response.data.amountwithoutgst) * this.usersCount,
        class: "light5",
      },
      {
        name: "Total Charges",
        amount: (response.data.amount * this.usersCount).toFixed(2),
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
        url: this.$cloudfareApi+"/addon/payment",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          uid: this.owneruid,
          owner_uid: this.owneruid,
          qty:this.usersCount,
          // PlanId: parseInt(this.PlanId),
          payment_mode: "WEB",
          type: "USER",
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

