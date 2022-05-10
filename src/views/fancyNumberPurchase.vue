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
                        Fancy Number Purchase
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
                          <v-col cols="12">
                            <v-card :elevation="0" class="ml-5">
                              <v-col cols="12" sm="10" align="center">
                                <v-row>
                                  <v-col cols="12" sm="12">
                                    <v-row>
                                      <v-card
                                        :loading="loading"
                                        class="
                                          mx-auto
                                          my-12
                                          rounded-b-lg
                                          transition-fast-in-fast-out
                                        "
                                        min-width="520"
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
                                                    mb-5
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
                                                  >
                                                  <span
                                                    class="
                                                      currency_symbol
                                                      light1
                                                    "
                                                    >per number</span
                                                  >
                                                </p>
                                              </v-row
                                              >
                                            </v-card>
                                          </v-col>
                                        </v-row>
                                        <v-card>
                                          <v-col class="text-left">
                                           
                                            <p class="f12 mb-1">
                                              Business Name: Test Business Name
                                            </p>
                                            <p class="f12 mb-1">
                                              Business Address: Name, Street,
                                              Pin: 136666
                                            </p>
                                            <p class="f12 mb-3">
                                              Business Email Address:
                                              test@test.com
                                            </p>
                                          
                                            <p>
                                              <span class="regular primary--text pb-0"
                                                >Please contact our support team and select your fancy number before makinf the payment</span
                                              >
                                            </p>

                                            <v-simple-table dense>
                                              <template v-slot:default>
                                                <tbody class="ma-0 pa-0">
                                                  <tr
                                                    v-for="d in sublist"
                                                    :key="d.name"
                                                  >
                                                    <td
                                                      class="ma-0 pa-0"
                                                      :class="d.class"
                                                    >
                                                      {{ d.name }}
                                                    </td>
                                                    <td :class="d.class">
                                                     ₹ {{ d.amount }}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </template></v-simple-table
                                            >
                                          </v-col>
                                          <v-card-actions
                                            class="pt-0 center d-flex"
                                            align="center"
                                          >
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
                                              Pay Now
                                            </v-btn>
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
                                             @click="goBack()"
                                            >
                                              Cancel
                                            </v-btn>
                                          </v-card-actions>
                                        </v-card>
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
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
        //  this.bussinessNumber = this.$route.query.bn;
    // this.setBreadcrumbs(this.bussinessNumber);
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)
      this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
     db.collection("Addons").where("Id","==",3).get().then(async(snap) =>{
			console.log("test.........",snap.docs[0].data());
      this.Amount = snap.docs[0].data().Amount;
      this.sublist = [
      {
        name: "Charges",
        amount: 1000.00,
        class: "light5",
      },
      {
        name: "GST(18%)",
        amount: (snap.docs[0].data().Amount/100)*18,
        class: "light5",
      },
     {
        name: "Total Amount",
        amount: ((snap.docs[0].data().Amount/100)*18)+snap.docs[0].data().Amount,
        class: "light5",
      },
    ]
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
    owneruid:"",
    uid:"",
    AccountId:"",
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

    sublist: [
      {
        name: "Charges",
        amount: 1000.00,
        class: "light5",
      },
      {
        name: "GST(18%)",
        amount: 262,
        class: "light5",
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
        text: "Fancy Number Purchase",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),

  methods: {
     paynow() {
      const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/addon/payment",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          uid: this.owneruid,
          owner_uid: this.owneruid,
          qty:this.usersCount,
          // PlanId: parseInt(this.PlanId),
          payment_mode: "WEB",
          type: "FANCY_NUMBER",
          AccountId:this.AccountId
        },
      };
      axios(details).then(async (responsevalue) => {
        console.log(responsevalue);
        if (responsevalue.data.status == true) {
          var options = {
            key: "rzp_test_ThdwdEPh3QCHbo",
            order_id: responsevalue.data.OrderId,
            name: this.Name,
            currency: "INR", // Optional. Same as the Order currency
            description: "Purchase Description",
            handler: (response) => {
              console.log(response);
              this.overlay = true;
              var initial = true;
              if (initial) {
                db.collection("paymentTransaction")
                  .where("OrderId", "==", responsevalue.data.OrderId)
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
        goBack() {
      this.$router.push("/Addons");
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

