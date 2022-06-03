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
              <v-card color="transparent" outlined class="" max-width="1200">
                <h2 class="lato-font f23 mt-16 mb-4">
                  Select your Tring Partner Subscription Plan
                </h2>

                <v-col cols="12" sm="6" class="py-2">
                  <p>Please choose your plan</p>

                  <v-btn-toggle 
                    v-model="toggle_IVR"
                    rounded
                    elivation="5"
                    class="toggle_IVR"
                    borderless 
                  >
                     <v-btn
                      width="200"
                      @click="isIvr(2)"
                      v-class="{ active: isActive }"
                    >
                     Basic (No IVR)
                    </v-btn>
                    <v-btn
                      width="200"
                      @click="isIvr(1)"
                      v-class="{ active: isActive }"
                    >
                      IVR
                    </v-btn>

                 
                  </v-btn-toggle>
                </v-col>
                <h2 class="sub_title mt-2 mb-16"><br /></h2>
                                <div v-if="IvrPlan==1">
                                IVR plans
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
                          <span class="top-right badge red">BEST VALUE IVR</span>
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
                </div><div v-else-if="IvrPlan==2">
                NO IVR plans
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
                          <span class="top-right badge red">BEST VALUE (No IVR)</span>
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
                </div><div v-else>   <v-alert type="warning">
     No Plan selected
    </v-alert></div>
                <v-btn v-if="IvrPlan!=0"
                  class="btn_text mt-15 white--text text-capitalize"
                  width="12%"
                  rounded
                  @click.prevent="nextPage()"
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
import { db } from '@/main.js';
export default {
  data: () => ({
    radio: "",
    radio1: false,
    radio2: false,
    radio3: false,
    overlay: false,
    planId: 0,
    IvrPlan: 0,
  }),
  components: {},

  async mounted() {

       let planDetails = await db.collection("plan_details").get();
           planDetails.docs.forEach(element => {
               console.log(element.data());
             });     

    window.scrollTo(0, 0); //scroll to top
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("logged user details", user);
        this.uid = user.uid;
        this.phno = user.phoneNumber.slice(3);
        this.planId = localStorage.getItem("planId");
        console.log(this.planId);
        if (this.planId != "") {
          this.colorChange(this.planId);
          setTimeout(() => {
            this.colorChange(this.planId);
            this.radio = this.planId;
          }, 1000);
        }
      }
    });
  },
  methods: {
    isIvr(i) {
     this.IvrPlan=i;
     console.log(i);
    },
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
    nextPage() {
      this.overlay = true;
      const user_stage = {
        url: this.$cloudfareApi + "/user/stage",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
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
          //this.$analytics.logEvent("Web Billing page");
          this.$router.push("/Billing");
        })
        .catch((error) => {
          console.error(error);
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