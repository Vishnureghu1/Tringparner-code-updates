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

              <v-card
                color="transparent"
                v-if="changePlanArea == true"
                outlined
                class=""
                max-width="1200"
              >
                <h2 class="lato-font f23 mt-16 mb-4">
                  {{ rerenderKey }}
                  Select your Tring Partner Payments Plan (Components)
                </h2>
                <h2 class="sub_title mt-2 mb-16">
                  Please select from below plan<br />
                </h2>
                <div>
                  <v-radio-group mandatory v-model="radio">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-card
                          class=""
                          @click="colorChange(radio)"
                          :style="
                            radio1
                              ? 'border: 1px solid #EE1C25;border-radius: 10px;'
                              : 'border: 1px solid #B4B4B4;border-radius: 10px;'
                          "
                        >
                          <v-radio color="red" value="1" class="ml-4">
                            <span slot="label" class="black--text ml-3">
                              <h2 class="page_title mt-3 ml-2 mb-5">1 month</h2>
                              <h2 class="price_title mt-1 ml-2 mb-3">
                                <sup class="rupees">₹</sup>500
                              </h2>
                              <h2 class="sub_title mt-1 ml-2">
                                Monthly Small Bussiness(Truly Unlimited)
                              </h2>
                              <br /><br />
                            </span>
                          </v-radio>
                        </v-card>
                      </v-col>

                      <v-col cols="12" sm="4" class="">
                        <v-card
                          class="badge-overlay overflow_data"
                          @click="colorChange(radio)"
                          :style="
                            radio2
                              ? 'border:1px solid #EE1C25;border-radius: 10px;'
                              : 'border: 1px solid #B4B4B4;border-radius: 10px;'
                          "
                        >
                          <span class="top-right badge red">BEST VALUE</span>
                          <v-radio color="red" value="2" class="ml-4">
                            <span slot="label" class="black--text ml-3">
                              <h2 class="page_title mt-3 ml-2 mb-5">
                                6 months
                              </h2>
                              <h2 class="price_title mt-1 ml-2 mb-3">
                                <sup class="rupees">₹</sup>2700
                                <strike>
                                  <sup class="rupees">₹</sup>3000</strike
                                >
                              </h2>
                              <h2 class="sub_title mt-1 ml-2 mb-3">
                                HalfYearly Small Bussiness(Truly Unlimited)
                              </h2>
                              <h2 class="offer_title ml-2 mb-2">10% off</h2>
                            </span>
                          </v-radio>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-card
                          class=""
                          @click="colorChange(radio)"
                          :style="
                            radio3
                              ? 'border: 1px solid #EE1C25;border-radius: 10px;'
                              : 'border: 1px solid #B4B4B4;border-radius: 10px;'
                          "
                        >
                          <v-radio color="red" value="3" class="ml-4">
                            <span slot="label" class="black--text ml-3">
                              <h2 class="page_title mt-3 ml-2 mb-5">
                                12 months
                              </h2>
                              <h2 class="price_title mt-1 ml-2 mb-3">
                                <sup class="rupees">₹</sup>4800
                                <strike>
                                  <sup class="rupees">₹</sup>6000</strike
                                >
                              </h2>
                              <h2 class="sub_title mt-1 ml-2 mb-3">
                                Yearly Small Bussiness(Truly Unlimited)
                              </h2>
                              <h2 class="offer_title ml-2 mb-2">20% off</h2>
                            </span>
                          </v-radio>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </div>
                <v-btn
                  class="btn_text mt-15 white--text text-capitalize"
                  width="12%"
                  rounded
                  @click.prevent="updatePlan()"
                  color="#EE1C25"
                >
                  Update Plan
                </v-btn>
              </v-card>

              <v-card
                v-if="changePlanArea == false"
                color="transparent"
                outlined
                class=""
                max-width="800"
              >
                <h2 class="page_title lato-font mb-4 mt-10">
                  Review Informations and Pay Now (components)
                </h2>
                <h2 class="sub_title mb-16">
                  Review your business information like business address
                </h2>
                <v-row>
                  <v-col cols="12" sm="6" align="start">
                    <h2 class="name_heading light4 f14">
                      Billing Address
                      <v-icon
                        v-on="on"
                        color="gray"
                        small
                        @click="changeAddress()"
                        >mdi-pencil</v-icon
                      >
                    </h2>
                    <h2 class="name_heading light4">Business Name</h2>
                    <h2 class="content_title medium mb-4 f14">{{ name }}</h2>
                    <h2 class="name_heading light4">Owner Name</h2>
                    <h2 class="content_title medium mb-4 f14">{{ name }}</h2>
                    <h2 class="name_heading light4">Business Address</h2>
                    <h2 class="content_title medium mb-4 f14">{{ address }}</h2>
                    <h2 class="name_heading light4">Business Phone number</h2>
                    <h2 class="content_title medium mb-4 f14">
                      +91 {{ phno }}
                    </h2>
                    <h2 class="name_heading light4">Business Email</h2>
                    <h2 class="content_title medium mb-4 f14">{{ email }}</h2>
                  </v-col>
                  <v-col cols="12" sm="6" align="start">
                    <h2 class="name_heading light4">Payment Plan</h2>
                    <span
                      v-on="on"
                      class="text--red"
                      @click="changePlan()"
                      small
                    >
                      Change</span
                    >
                    <h2
                      v-if="planId == '1'"
                      class="content_title medium mb-4 f14"
                    >
                      1 month - Rs 500
                    </h2>
                    <h2
                      v-else-if="planId == '2'"
                      class="content_title medium mb-4 f14"
                    >
                      6 months - Rs 2700
                    </h2>
                    <h2
                      v-else-if="planId == '3'"
                      class="content_title medium mb-4 f14"
                    >
                      12 months - Rs 4800
                    </h2>
                    <v-row>
                      <v-col cols="12" sm="6" align="start">
                        <h2 class="name_heading light4 mb-4">Actual Cost</h2>
                        <h2
                          v-if="planId != '1'"
                          class="name_heading light4 mb-4"
                        >
                          Discount
                        </h2>
                        <h2 class="name_heading light4 mb-4">GST(18%)</h2>
                        <h2 class="content_title mb-4 f14">Charges</h2>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <h2
                          v-if="planId == '1'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 500.00
                        </h2>
                        <h2
                          v-else-if="planId == '2'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 3000.00
                        </h2>
                        <h2
                          v-else-if="planId == '3'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 6000.00
                        </h2>
                        <h2
                          v-if="planId == '2'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 300.00
                        </h2>
                        <h2
                          v-else-if="planId == '3'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 1200.00
                        </h2>
                        <h2
                          v-if="planId == '1'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 90.00
                        </h2>
                        <h2
                          v-else-if="planId == '2'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 486.00
                        </h2>
                        <h2
                          v-else-if="planId == '3'"
                          class="content_title medium mb-4 f14"
                        >
                          Rs 864.00
                        </h2>
                        <h2
                          v-if="planId == '1'"
                          class="content_title bold mb-4 f14"
                        >
                          Rs 590.00
                        </h2>
                        <h2
                          v-else-if="planId == '2'"
                          class="content_title bold mb-4 f14"
                        >
                          Rs 3186.00
                        </h2>
                        <h2
                          v-else-if="planId == '3'"
                          class="content_title bold mb-4 f14"
                        >
                          Rs 5664.00
                        </h2>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-btn
                  v-if="planId == '1'"
                  @click="Paynow()"
                  class="btn_text mt-15 white--text text-capitalize"
                  width="20%"
                  rounded
                  color="#EE1C25"
                >
                  Pay Rs 590
                </v-btn>
                <v-btn
                  v-if="planId == '2'"
                  @click="Paynow()"
                  class="btn_text mt-15 white--text text-capitalize"
                  width="20%"
                  rounded
                  color="#EE1C25"
                >
                  Pay Rs 3186
                </v-btn>
                <v-btn
                  v-if="planId == '3'"
                  @click="Paynow()"
                  class="btn_text mt-15 white--text text-capitalize"
                  width="20%"
                  rounded
                  color="#EE1C25"
                >
                  Pay Rs 5664
                </v-btn>
              </v-card>
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
import PlanSelect from "@/components/select_plan.vue";

export default {
  data: () => ({
    radio: "",
    radio1: true,
    radio2: false,
    radio3: false,
    address: "",
    state: "",
    city: "",
    phno: "",
    email: "",
    planId: "",
    name: "",
    orderId: "",
    overlay: false,
    changePlanArea: false,
    rerenderKey: 0,
  }),

  components: {
    PlanSelect,
  },

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
              console.log(doc.id, " => ", doc.data());
              let user_details = doc.data();
              this.Udata = user_details;
              this.currentPage = this.Udata.currentPage;
              console.log(this.currentPage);
              if (this.currentPage == "onboarding_listing") {
                this.$router.push("/ChooseNumbers");
              } else if (this.currentPage == "onboarding_plan_details") {
                this.$router.push("/SelectPlan");
              } else if (
                this.currentPage == "onboarding_billing" ||
                this.currentPage == "onboarding_revisiting"
              ) {
                // this.$router.push("/Billing");
              } else if (this.currentPage == "onboarding_review") {
                // this.$router.push("/Review")
              } else if (this.currentPage == "onboarding_dashboard") {
                this.$router.push("/Dashboard");
              }
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        db.collection("users")
          .where("uid", "==", this.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              let user_details = doc.data();
              this.virtualNumber = user_details.virtualNumber[0];
              this.address = user_details.Address;
              this.city = user_details.City;
              this.state = user_details.State;
              this.email = user_details.Email;
              this.name = user_details.FirstName;
              this.phno = user_details.PhoneNumber;
              this.planId = user_details.PlanId;
              this.orderId = user_details.OrderId;

              console.log(user_details.virtualNumber);
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });
  },
  methods: {
    colorChange(i) {
      console.log(i);
      if (i == 1) {
        this.radio1 = true;
        this.radio2 = this.radio3 = false;
      } else if (i == 2) {
        this.radio2 = true;
        this.radio1 = this.radio3 = false;
      } else if (i == 3) {
        this.radio3 = true;
        this.radio1 = this.radio2 = false;
      }
    },
    forceRerenderKey: function () {
      this.rerenderKey += 1;
    },
    updatePlan() {
      this.overlay = true;
      const user_stage = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/stage",
        method: "POST",

        data: {
          uid: this.uid,
          phoneNumber: this.phno,
          currentPage: "onboarding_billing",
          plan_id: this.radio,
        },
      };
      console.log(user_stage);
      this.$axios(user_stage)
        .then((response) => {
          localStorage.setItem("planId", this.radio);
          console.log(response);
          this.changePlanArea = false;
          this.overlay = false;
          this.forceRerenderKey();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changePlan() {
      this.changePlanArea = true;

      //  this.$router.push("/SelectPlan");
    },
    changeAddress() {
      this.$router.push("/Billing");
    },
    Paynow() {
      const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/payment",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          uid: this.uid,
          owner_uid: this.uid,
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
          type: "BASIC",
        },
      };
      this.$axios(details).then(async (responsevalue) => {
        console.log(responsevalue);
        if (responsevalue.data.status == true) {
          var options = {
            key: "rzp_test_ThdwdEPh3QCHbo",
            order_id: responsevalue.data.OrderId,
            name: this.name,
            currency: "INR", // Optional. Same as the Order currency
            description: "Purchase Description",
            handler: (response) => {
              console.log(response);
              this.overlay = true;
              var initial = true;
              if (initial) {
                db.collection("users")
                  .where("uid", "==", this.uid)
                  .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      console.log(doc.id, " => ", doc.data());
                      let testing_status = doc.data();
                      if (testing_status.Stage == "PAID" && initial) {
                        initial = false;
                        this.overlay = false;
                        this.$router.push("/Dashboard");
                      }
                    });
                  });
              }
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
  },
};
</script>

<style scoped>
.page_title {
  font-size: 23px;
  font-weight: 400;
  color: #3b3b3b;
}
.price_title .rupees {
  font-size: 14px;
}
.price_title strike {
  color: #b4b4b4;
  font-family: "Nunito", sans-serif;
}
.price_title {
  font-size: 23px;
  color: #3b3b3b;
}
.sub_title {
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  color: #3b3b3b;
  font-weight: 400;
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

.number_heading.v-btn--outlined {
  border: thin solid #ee1c25;
}
.v-btn:before {
  color: #f3f9f3;
}
.btn_text {
  font-family: "Nunito", sans-serif;
  font-size: 14px;
}
.v-application .error {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
  transform: rotate(45deg);
}
.overflow_data {
  overflow: hidden;
}
.badge {
  margin: 0;
  padding: 0;
  color: white;
  padding: 5px 10px;
  font-size: 11px;
  text-align: center;
  line-height: normal;
  text-transform: uppercase;
  background: #ee1c25;
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
}

.badge::before,
.badge::after {
  content: "";
  position: absolute;
  top: 0;
  margin: 0 -1px;
  width: 100%;
  height: 100%;
  background: inherit;
  min-width: 55px;
}

.badge::before {
  right: 100%;
}

.badge::after {
  left: 100%;
}
.top-right {
  position: absolute;
  top: 0;
  right: 0;
  -ms-transform: translateX(30%) translateY(0%) rotate(45deg);
  -webkit-transform: translateX(30%) translateY(0%) rotate(45deg);
  transform: translateX(30%) translateY(0%) rotate(45deg);
  -ms-transform-origin: top left;
  -webkit-transform-origin: top left;
  transform-origin: top left;
}
</style>