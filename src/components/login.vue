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
              <v-card color="transparent" outlined class="" max-width="280">
                <h2 class="page_title mt-16 mb-13">Welcome to Tring Partner</h2>
                <h2 class="sub_title mt-8 mb-13">
                  Use your mobile number to get started with Tring Partner
                </h2>
                <div>
                  <div class="mt-1 ml-2" v-if="getNumber">
                    <h4 class="name_heading mt-4 ml-2" align="start">
                      Login or Sign Up
                    </h4>
                    <v-form @submit.prevent="submit">
                      <v-text-field
                        outlined
                        v-model="phNo"
                        prefix="+91"
                        color="grey darken-4"
                        label="Mobile Number"
                        type="text"
                        :rules="numberRules"
                        required
                        @keyup="validatePhone"
                        class="mt-4"
                      ></v-text-field>
                    
                      <v-btn
                        class="btn_text mt-15 white--text text-capitalize" v-if="phoneNumberValid==false" disabled
                        width="70%"
                        rounded
                        @click.prevent="sendOtp()"
                        color="#EE1C25
													"
                      >
                        Next
                      </v-btn>
                      <v-btn
                        class="btn_text mt-15 white--text text-capitalize" v-if="phoneNumberValid==true" 
                        width="70%"
                        rounded
                        @click.prevent="sendOtp()"
                        color="#EE1C25
													"
                      >
                        Next
                      </v-btn>
                    </v-form>
                  </div>
                  <div class="mt-1 ml-2" v-if="getOtp">
                    <h4 class="name_heading mt-4" align="start">Enter OTP</h4>
                    <v-otp-input length="6" v-model="otp"></v-otp-input>
                    <div class="mt-4">
                      <span class=" gray--text"  v-if="countDown>0"
                    > You can resend OTP within  ({{ countDown }}s)</span
                  >
                      <a v-else 
                        class="link_style text-decoration-underline"
                        @click.prevent="sendOtp()"
                      >
                        Resend OTP
                      </a>
                      <br />
                      <br />
                      <a
                        class="link_style text-decoration-underline"
                        @click="changeLoginNumber()"
                      >
                        Change Number
                      </a>
                    </div>
                    <v-btn
                      class="btn_text mt-15 white--text text-capitalize" 
                      width="70%"
                      rounded
                      @click.prevent="verifyOtp()"
                      color="#EE1C25
													"
                    >
                      Submit
                    </v-btn>
                  </div>
                </div>
              </v-card>
              <div id="recaptcha-container"></div>
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
import axios from "axios";
import EventBus from "../event-bus";

export default {
  data: () => ({
    otp: "XXXXXX",
    getNumber: true,
    phoneNumberValid:false,
    getOtp: false,
    numberRules: [(v) => /^[0-9]*$/.test(v) || "No characters Allowed"],
    phNo: "",
    uid: "",
    currentPage: "",
    dialog: false,
    errorMessage: "",
    role: "",
    overlay: false,
    firstName: "",
    Email: "",
    PhoneNumber: "",
    countDown: 10,
    props: ["userFirstNameEmitted"],
    emits: ["userFirstNameEmitted"],
  }),
  components: {},

  created() {
    this.initReCaptcha();
    localStorage.removeItem("tpu");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("planId");
      localStorage.removeItem("PlanId");
      localStorage.removeItem("ActiveTab");
      localStorage.removeItem("IVRPlanradio");
      localStorage.removeItem("nonIVRPlanradio");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.overlay = true;
        this.uid = user.uid;
        this.phNo = user.phoneNumber.slice(3);
        this.phno = user.phoneNumber.slice(3);
        const options = {
              url: this.$cloudfareApi + "/login",
              method: "POST",
              data: {
                uid: this.uid,
                phoneNumber: this.phNo,
                webtoken: localStorage.getItem('webtoken')
              },
            };
            console.log(options);
            axios(options)
              .then((response) => {
                localStorage.setItem("token",response.data.token);
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

           });
      }
      
      
    });
  },
  methods: {
     countDownTimer () {
       
                if (this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }else{
                  this.countDown=0
                }
            },
    onSignIn() {
      localStorage.setItem("loggedIn", true);
      EventBus.$emit("OnLogin", true);
    },
    sendOtp() {
      this.otp = "XXXXXX";
      if (this.phNo.length != 10) {
        alert("Invalid Phone Number Format !");
        this.phoneNumberValid =false;
      } else {
        this.getNumber = false;
        this.phoneNumberValid =true;
        this.getOtp = true;
        let countryCode = "+91";
        let phoneNumber = countryCode + this.phNo;
        let appVerifier = this.appVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            this.errorMessage = error.message;
            console.log(this.errorMessage);
          });
        this.$root.vtoast.show({
          message: "otp send successfully",
          color: "green",
          timer: 5000,
        });
        this.countDown=60
        this.countDownTimer();
      }
    },
    validatePhone(){
 if (this.phNo.length < 10) {
    this.phoneNumberValid =false;
 }else{
 this.phoneNumberValid =true;
 }
    },
    changeLoginNumber() {
      // this.phNo = ''
      this.getNumber = true;
      this.getOtp = false;
    },
    verifyOtp() {
      if (this.otp.length != 6) {
        alert("Invalid OTP Format !");
      } else {
        // this.overlay = true
        // let userid = "";
        let code = this.otp;
        window.confirmationResult
          .confirm(code)
          .then(function (result) {
            console.log(result);
            // userid = result.user.uid;
          })
          .then(() => {
            // this.uid = userid;
            // this.overlay = true;
            // console.log("ID", this.uid);
            // console.log("phno", this.phNo);
            // const options = {
            //   url: this.$cloudfareApi + "/login",
            //   method: "POST",
            //   data: {
            //     uid: this.uid,
            //     phoneNumber: this.phNo,
            //     webtoken: localStorage.getItem('webtoken')
            //   },
            // };
          //   console.log(options);
          //   this.$axios(options)
          //     .then((response) => {
          //       console.log(response.data);
          //       console.log(this.uid);
          //       localStorage.setItem("token", response.data.token);
          //       db.collection("users")
          //         .where("uid", "==", this.uid)
          //         .get()
          //         .then((querySnapshot) => {
          //           querySnapshot.forEach((doc) => {
          //             console.log(doc.id, " => ", doc.data());
          //             console.log(
          //               "<-------------------VERIFY OTP LOGGING USER DETAILS----------------------->"
          //             );
          //             localStorage.setItem("tpu", JSON.stringify(doc.data()));
          //             let user_details = doc.data();
          //             this.Udata = user_details;
          //             this.currentPage = this.Udata.currentPage;
          //             this.role = this.Udata.role;
          //             this.firstName = this.Udata.FirstName;
          //             this.Email = this.Udata.Email;
          //             this.PhoneNumber = this.Udata.PhoneNumber;
          //             this.$emit("userFirstNameEmitted", this.Udata.FirstName);
          //             console.log(this.currentPage);
          //             console.log(this.role);
          //             this.onSignIn();
          //             if (this.role == "ADMIN" || this.role == "AGENT") {
          //               this.overlay = false;
          //               this.$router.push("/all_calls").catch(() => {});
          //             } else {
          //               if (this.currentPage == "onboarding_listing") {
                          
          //                 this.overlay = false;
          //                 this.$router.push("/ChooseNumbers").catch((err) => {
          //                   console.log(err);
          //                 });
          //               } else if (
          //                 this.currentPage == "onboarding_plan_details"
          //               ) {
          //                 this.overlay = false;
          //                 this.$router.push("/SelectPlan").catch(() => {});
          //               } else if (this.currentPage == "onboarding_billing") {
          //                 this.overlay = false;
          //                 this.$router.push("/Billing").catch(() => {});
          //               } else if (this.currentPage == "onboarding_review") {
          //                 this.overlay = false;
          //                 this.$router.push("/Review").catch(() => {});
          //               } else if (
          //                 this.currentPage == "onboarding_dashboard" ||
          //                 this.currentPage == "onboarding_success"
          //               ) {
          //                 this.overlay = false;
          //                 this.$router.push("/all_calls").catch(() => {});
          //               } else {
          //                 const user_stage = {
          //                   url: this.$cloudfareApi + "/user/stage",
          //                   method: "POST",
          //                   headers: { 
					// 'token': localStorage.getItem("token"),
					// 	'Content-Type': 'application/json'
					// },
          //                   data: {
          //                     uid: this.uid,
          //                     phoneNumber: this.phno,
          //                     currentPage: "onboarding_listing",
          //                   },
          //                 };
          //                 console.log(user_stage);
          //                 this.$axios(user_stage)
          //                   .then((response) => {
          //                     console.log(response);
          //                     this.overlay = false;
          //                     this.$router
          //                       .push("/ChooseNumbers")
          //                       .catch(() => {});
          //                   })
          //                   .catch((error) => {
          //                     console.error(error);
          //                   });
          //               }
          //             }
          //           });
          //         })
          //         .catch((error) => {
          //           console.log("Error getting documents: ", error);
          //         });
          //     })
          //     .catch((error) => {
          //       console.error(error);
          //     });
          })
          .catch((error) => {
            console.log("error details", error);
            this.$root.vtoast.show({
              message: "invalid otp",
              color: "red",
              timer: 5000,
            });
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        let vm = this;
        console.log("render on create", vm);
        console.log("Role", vm.role);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {
              console.log("reCAPTCHA", response);
            },
            "expired-callback": function () {},
          }
        );
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.page_title {
  font-family: "Lato", Bold !important;
  font-size: 23px;
}
.sub_title {
  font-family: "Nunito", light !important;
  font-size: 16px;
  color: #3b3b3b;
}
.name_heading {
  font-family: "Nunito", light !important;
  font-size: 14px;
  color: #3b3b3b;
}
.number_heading {
  font-family: "Nunito", light !important;
  font-size: 37px;
  color: #3b3b3b;
}
.comment_heading {
  font-family: "Nunito", Regular !important;
  font-size: 10px;
  color: #808080;
}
.link_style {
  color: #ee1c25;
}
.btn_text {
  font-family: "Nunito", light !important;
  font-size: 14px;
}
</style>
