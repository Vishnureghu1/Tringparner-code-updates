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
                  Select your Tringpartner Subscription Plan
                </h2>

                <v-col cols="12" sm="6" class="py-2">
                  <v-btn-toggle
                    rounded
                    elivation="05"
                    class="toggle_IVR"
                    borderless
                    v-if="!checkIvrStatus"
                  >
                    <v-btn
                      width="200"
                      @click="isIvr(2)"
                      :class="{ active: SelectPlan == 2 }"
                    >
                      Direct (No IVR)
                    </v-btn>
                    <v-btn
                      width="200"
                      @click="isIvr(1)"
                      :class="{ active: SelectPlan == 1 }"
                    >
                      IVR
                    </v-btn>
                  </v-btn-toggle>
                  <v-btn-toggle
                    rounded
                    elivation="05"
                    class="toggle_IVR"
                    borderless
                    v-else
                  >
                    <v-btn
                      v-if="checkIvrStatus == true"
                      width="200"
                      @click="isIvr(2)"
                      disabled
                    >
                      Direct (No IVR)
                    </v-btn>
                    <v-btn
                      v-else
                      width="200"
                      @click="isIvr(2)"
                      :class="{ active: checkIvrStatus == false }"
                    >
                      Direct (No IVR)
                    </v-btn>
                    <v-btn
                      v-if="checkIvrStatus == false"
                      width="200"
                      @click="isIvr(1)"
                    >
                      IVR
                    </v-btn>
                    <v-btn
                      v-else
                      width="200"
                      @click="isIvr(1)"
                      :class="{ active: checkIvrStatus == true }"
                    >
                      IVR
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <h2 class="sub_title mt-2 mb-16"><br /></h2>

                <div v-if="SelectPlan == 1 || checkIvrStatus == true">
                  <v-radio-group
                    mandatory
                    v-model="IVRPlanradio"
                    align="center"
                    justify="center"
                    class="justify-center"
                  >
                    <v-row
                      align="center"
                      justify="center"
                      class="justify-center"
                    >
                      <v-col
                        class="col-4"
                        v-for="ivrData in ivrPlanArray"
                        :key="ivrData.Code"
                      >
                        <v-card
                          class="badge-overlay overflow_data"
                          @click="colorChange(ivrData.PlanId)"
                        >
                          <span
                            class="top-right badge red"
                            v-if="ivrData.bestPlanIvr == true"
                            >BEST VALUE IVR</span
                          >
                          <span
                            class="top-right badge red"
                            v-if="ivrData.IsTrial == true"
                            >Trial PLAN</span
                          >
                          <v-radio
                            color="red"
                            :value="ivrData.PlanId"
                            class="pl-4 radio_classs"
                            active-class="planActive"
                          >
                            <span slot="label" class="black--text ml-3">
                              <h2
                                class="page_title mt-3 ml-2 mb-5"
                                v-if="ivrData.Validity > 1"
                              >
                                {{ ivrData.Validity }} months
                              </h2>
                              <h2 class="page_title mt-3 ml-2 mb-5" v-else>
                                <!-- {{ ivrData.Validity }} month -->
                                 Trial Plan
                              </h2>

                              <h2 class="price_title mt-1 ml-2 mb-3">
                                <sup class="rupees" v-if="ivrData.price>0">₹</sup>{{ ivrData.price }}
                                <strike v-if="ivrData.Discount != 0">
                                  <sup class="rupees">₹</sup
                                  >{{ ivrData.ActualPrice }}</strike
                                >
                              </h2>
                              <h2 class="sub_title mt-1 ml-2 mb-3">
                                {{ ivrData.planName }}
                              </h2>
                              <h2
                                class="offer_title ml-2 mb-2"
                                v-if="ivrData.Discount > 0"
                              >
                                {{ ivrData.Discount }}% off
                              </h2>
                              <h2 class="offer_title ml-2 mb-2" v-else>
                                <br />
                              </h2>
                            </span>
                          </v-radio>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <p class="text--red" @click="ivrFeatureBox = true">
                    Plan Details
                  </p>
                </div>

                <div v-else-if="SelectPlan == 2 || checkIvrStatus == true">
                  <v-radio-group
                    mandatory
                    v-model="nonIVRPlanradio"
                    align="center"
                    justify="center"
                    class="justify-center"
                  >
                    <v-row
                      align="center"
                      justify="center"
                      class="justify-center"
                    >
                      <v-col
                        class="col-4"
                        v-for="nonivrData in nonIvrPlanArray"
                        :key="nonivrData.Code"
                        justify="center"
                      >
                        <v-card
                          class="badge-overlay overflow_data"
                          @click="colorChange(nonivrData.PlanId)"
                        >
                          <span
                            class="top-right badge red"
                            v-if="nonivrData.bestPlanNonIvr == true"
                            >BEST VALUE NON IVR</span
                          >
                          <span
                            class="top-right badge red"
                            v-if="nonivrData.IsTrial == true"
                            >Trial PLAN</span
                          >

                          <v-radio
                            color="red"
                            :value="nonivrData.PlanId"
                            class="pl-4 radio_classs"
                            active-class="planActive"
                          >
                            <span slot="label" class="black--text ml-3">
                              <h2
                                class="page_title mt-3 ml-2 mb-5"
                                v-if="nonivrData.Validity > 1"
                              >
                                {{ nonivrData.Validity }} months
                              </h2>
                              <h2 class="page_title mt-3 ml-2 mb-5" v-else>
                                <!-- {{ nonivrData.Validity }} month -->
                                Trial Plan
                              </h2>

                              <h2 class="price_title mt-1 ml-2 mb-3">
                                <sup class="rupees" v-if="nonivrData.price>0">₹</sup
                                >{{ nonivrData.price }}
                                <strike v-if="nonivrData.Discount != 0">
                                  <sup class="rupees">₹</sup
                                  >{{ nonivrData.ActualPrice }}</strike
                                >
                              </h2>
                              <h2 class="sub_title mt-1 ml-2 mb-3">
                                {{ nonivrData.planName }}
                              </h2>
                              <h2
                                class="offer_title ml-2 mb-2"
                                v-if="nonivrData.Discount > 0"
                              >
                                {{ nonivrData.Discount }}% off
                              </h2>
                              <h2 class="offer_title ml-2 mb-2" v-else>
                                <br />
                              </h2>
                            </span>
                          </v-radio>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </div>

                <div v-else>
                  <v-alert type="warning"> No Plan selected </v-alert>
                </div>
<!-- {{planId}}
{{Stage}} -->
                <div v-if="editplan == 'true'">
                  <v-btn
                    v-if="
                      Stage == 'TRIAL' 
                    "
                    class="btn_text mt-15 white--text text-capitalize"
                    width="12%"
                    rounded
                    @click.prevent="nextPage('review')"
                    color="#EE1C25"
                  >
                    Next
                  </v-btn>
                    <v-btn
                    v-else-if="
                       planId == 1 ||
                      planId == 4
                    "
                    class="btn_text mt-15 white--text text-capitalize"
                    width="12%"
                    rounded
                    @click.prevent="nextPage('dashboard')"
                    color="#EE1C25"
                  >
                    Next
                  </v-btn>
                  <v-btn
                    v-else
                    class="btn_text mt-15 white--text text-capitalize"
                    width="12%"
                    rounded
                    @click.prevent="nextPage('review')"
                    color="#EE1C25"
                  >
                    Next
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    v-if="
                      Stage == 'TRIAL' 
                    "
                    class="btn_text mt-15 white--text text-capitalize"
                    width="12%"
                    rounded
                    @click.prevent="nextPage('dashboard')"
                    color="#EE1C25"
                  >
                    Next
                  </v-btn>
                    <v-btn
                    v-else-if="
                       planId == 1 ||
                      planId == 4
                    "
                    class="btn_text mt-15 white--text text-capitalize"
                    width="12%"
                    rounded
                    @click.prevent="nextPage('dashboard')"
                    color="#EE1C25"
                  >
                    Next
                  </v-btn>
                  <v-btn
                    v-else
                    class="btn_text mt-15 white--text text-capitalize"
                    width="12%"
                    rounded
                    @click.prevent="nextPage('review')"
                    color="#EE1C25"
                  >
                    Next
                  </v-btn>
                  
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Plan Details  -->
    <v-dialog v-model="ivrFeatureBox" max-width="400px">
      <v-card v-model="ivrFeatureBox" class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Plan Details</h3>
        </v-card-title>
        <v-list>
          <v-list-item class="pt-0 mb-0 pb-0 mt-0">
            <v-list-item-content>
              <v-list-item-title
                class="gray--text bulletpoints"
                color="primary"
              >
                <v-icon color="red"> mdi-check-circle </v-icon>
                <strong>1 </strong>Cloud Business Number
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pt-0 mb-0 pb-0 mt-0">
            <v-list-item-content>
              <v-list-item-title class="gray--text bulletpoints">
                <v-icon color="red"> mdi-check-circle </v-icon>
                <strong>3</strong> Users
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pt-0 mb-0 pb-0 mt-0">
            <v-list-item-content>
              <v-list-item-title class="gray--text bulletpoints">
                <v-icon color="red"> mdi-check-circle </v-icon>
                <strong>Advanced</strong> Call Distribution
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pt-0 mb-0 pb-0 mt-0">
            <v-list-item-content>
              <v-list-item-title class="gray--text bulletpoints">
                <v-icon color="red"> mdi-check-circle </v-icon>
                <strong>Missed Call</strong> Management
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pt-0 mb-0 pb-0 mt-0">
            <v-list-item-content>
              <v-list-item-title class="gray--text bulletpoints">
                <v-icon color="red"> mdi-check-circle </v-icon>
                <strong>Admin</strong> App
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="pt-0 mb-0 pb-0 mt-0">
            <v-list-item-content>
              <v-list-item-title class="gray--text bulletpoints">
                <v-icon color="red"> mdi-check-circle </v-icon>
                <strong>Agent</strong> App
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list-item class="pt-0 mb-0 pb-0 mt-0">
          <v-list-item-content>
            <v-list-item-title class="gray--text bulletpoints">
              <v-icon color="red"> mdi-check-circle </v-icon>
              <strong>Productivity</strong> Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions class="center justify-center">
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="150px"
            color="white"
            outlined
            @click="ivrFeatureBox = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- RENAME MEDIA SECTION -->
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  data: () => ({
    Planradio: 1,
    overlay: false,
    planId: 0,
    SelectPlan: 0, // to set value on click based on plan type
    ivrFeatureBox: false,
    planDetails: "",
    bestPlanIvr: false,
    bestPlanNonIvr: false,
    isActive: false,
    ivrPlanArray: [],
    nonIvrPlanArray: [],
    IVRPlanradio: 0,
    nonIVRPlanradio: 0,
    radio: 0,
    editplan: "false",
    Stage: "",
    checkIvrStatus: false,
    IvrPlan: false,
    NoOfTrial: 0,
    NoOfTrail: 0,
  }),
  components: {},

  created() {
    this.editplan = this.$route.query.editplan;
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.planId =
      localStorage.getItem("planId") == null
        ? 0
        : parseInt(localStorage.getItem("planId"));
    this.planIdSelected =
      localStorageUserObj.PlanId == ""
        ? 0
        : parseInt(localStorageUserObj.PlanId);
    this.NoOfTrail =
      localStorageUserObj.NoOfTrail == ""
        ? 0
        : parseInt(localStorageUserObj.NoOfTrail);
    // this.Stage = localStorageUserObj.Stage;

    if (this.planIdSelected) {
      this.colorChange(this.planIdSelected);
      
    } else {
      this.initial_value();
    }
    this.planDetails = db
      .collection("plan_details")
      // where('Id', '>=', 2)
      // .collection
      .orderBy("Id", "asc")
      .get()
      .then((querySnapshot) => {
        this.ivrPlanArray = [];
        this.nonIvrPlanArray = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            console.log(doc.id, " => ", doc.data());
            console.log("Plan Data");
            let plan = doc.data();
            this.plan = plan;
            console.log("plan here" + plan.Id);

            // alert(this.NoOfTrail);
            if (plan.IsIvr == true) {
              // alert(this.planIdSelected)
              if (
                (this.nonIVRPlanradio == 1 || this.IVRPlanradio == 4) &&
                this.NoOfTrail == 1
              ) {
                if (plan.Id != 4) {
                  this.ivrobject = Object.assign({}, this.ivrobject, {
                    planName: plan.Name,
                    price: plan.Price==0?plan.Description:plan.Price,
                    Validity: plan.Validity,
                    Discount: plan.Discount,
                    PlanId: plan.Id,
                    bestPlanIvr: plan.IsRecommanded,
                    ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
                    IsTrial: plan.IsTrial,
                  });
                  this.ivrPlanArray.push(this.ivrobject);
                }
              } else {
                this.ivrobject = Object.assign({}, this.ivrobject, {
                  planName: plan.Name,
                  price: plan.Price==0?plan.Description:plan.Price,
                  Validity: plan.Validity,
                  Discount: plan.Discount,
                  PlanId: plan.Id,
                  bestPlanIvr: plan.IsRecommanded,
                  ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
                  IsTrial: plan.IsTrial,
                });
                this.ivrPlanArray.push(this.ivrobject);
              }
            } else {
              // alert (this.planIdSelected)
              //  if(this.nonIVRPlanradio ==1 || this.IVRPlanradio ==4){
              if (
                (this.nonIVRPlanradio == 1 || this.IVRPlanradio == 4) &&
                this.NoOfTrail == 1
              ) {
                if (plan.Id != 1) {
                  this.nonivrobject = Object.assign({}, this.nonivrobject, {
                    planName: plan.Name,
                    price: plan.Price==0?plan.Description:plan.Price,
                    Validity: plan.Validity,
                    Discount: plan.Discount,
                    PlanId: plan.Id,
                    bestPlanNonIvr: plan.IsRecommanded,
                    ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
                    IsTrial: plan.IsTrial,
                  });

                  this.nonIvrPlanArray.push(this.nonivrobject);
                }
              } else {
                this.nonivrobject = Object.assign({}, this.nonivrobject, {
                  planName: plan.Name,
                  price: plan.Price==0?plan.Description:plan.Price,
                  Validity: plan.Validity,
                  Discount: plan.Discount,
                  PlanId: plan.Id,
                  bestPlanNonIvr: plan.IsRecommanded,
                  ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
                  IsTrial: plan.IsTrial,
                });

                this.nonIvrPlanArray.push(this.nonivrobject);
              }
            }
          });

          window.localStorage.removeItem("tpu");
          this.checkData();
          // this.checkData();
        }
      });
    // planDetails.docs.forEach((element) => {
    //   console.log(element.data());
    // });

    window.scrollTo(0, 0); //scroll to top
  },
  mounted() {
    this.SelectPlan = 2;
    this.IVRPlanradio = parseInt(localStorage.getItem("IVRPlanradio"));
    this.nonIVRPlanradio = parseInt(localStorage.getItem("nonIVRPlanradio"));
    this.planId =
      localStorage.getItem("planId") == null
        ? 0
        : parseInt(localStorage.getItem("planId"));
  },
  methods: {
    async checkData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
          this.phno = user.phoneNumber.slice(3);
          db.collection("users")
            .where("uid", "==", this.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                console.log(
                  "<-------------------LOGGING USER DETAILS----------------------->"
                );
                localStorage.setItem("tpu", JSON.stringify(doc.data()));
                let user_details = doc.data();
                this.Udata = user_details;
                this.currentPage = this.Udata.currentPage;
                this.role = this.Udata.role;
                this.firstName = this.Udata.FirstName;
                this.Email = this.Udata.Email;
                this.PhoneNumber = this.Udata.PhoneNumber;
                this.$emit("userFirstNameEmitted", this.Udata.FirstName);

                this.onSignIn();
                if (this.role == "ADMIN" || this.role == "AGENT") {
                  this.$router.push("/all_calls");
                } else {
                  if (this.currentPage == "onboarding_listing") {
                    this.$router.push("/ChooseNumbers");
                  } else if (this.currentPage == "onboarding_plan_details") {
                    this.$router.push("/SelectPlan");
                  } else if (this.currentPage == "onboarding_billing") {
                    this.$router.push("/Billing");
                  } else if (this.currentPage == "onboarding_review") {
                    this.$router.push("/Review");
                  } else if (
                    this.currentPage == "onboarding_dashboard" ||
                    this.currentPage == "onboarding_success"
                  ) {
                    this.$router.push("/all_calls");
                  }
                }
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      });
    },
    initial_value() {
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
      this.checkIvrStatus = localStorageUserObj.IsIvr ? true : false;
      this.ivrActive = localStorageUserObj.IsIvr == true ? true : false;
      this.directActive = localStorageUserObj.IsIvr == true ? false : true;
      this.IvrPlan = localStorageUserObj.IsIvr == false ? 2 : 1;
      this.Stage = localStorageUserObj.Stage;
      if (this.checkIvrStatus == true) {
        this.colorChange(2);
      } else {
        this.colorChange(1);
      }
    },
    isIvr(i) {
      this.SelectPlan = i;
      console.log(i);
    },
    colorChange(i) {
      this.radio = i;
      localStorage.setItem("planId", i);
      this.planId = i;
      
    },
    nextPage(review) {
      this.overlay = true;
      // alert(review);
      if (review == "trial") {
      
            this.$router.push("/Billing?plan=trial");
      } else {
        
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
        this.$axios(user_stage)
          .then((response) => {
            if (this.SelectPlan == 1) {
              this.colorChange(this.IVRPlanradio);
              localStorage.setItem("IVRPlanradio", parseInt(this.IVRPlanradio));
              localStorage.setItem("planId", parseInt(this.IVRPlanradio));
            } else {
              this.colorChange(this.nonIVRPlanradio);

              localStorage.setItem(
                "nonIVRPlanradio",
                parseInt(this.nonIVRPlanradio)
              );
              localStorage.setItem("planId", parseInt(this.nonIVRPlanradio));
            }
            console.log(response);

if(review == "review"){
  // this.$router.push("/Review");
  this.$router.push("/Billing?plan=review");

}else if(review == "dashboard"){
  this.$router.push("/Billing?plan=dashboard");
}else{
  this.$router.push("/all_calls");

}
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
