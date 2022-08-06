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

           
              <div :key="rerenderKey">
              <template v-if="changePlanArea == false" >
                <PlanSelect  @planvalue='handlePlanValue'/>
              </template>
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

       // db.collection("users")
        //  .where("uid", "==", this.uid)
        //  .get()
         // .then((querySnapshot) => {
           // querySnapshot.forEach((doc) => {
          //    console.log(doc.id, " => ", doc.data());
            //  let user_details = doc.data();
            /// this.Udata = user_details;
              // this.currentPage = this.Udata.currentPage;
              // console.log(this.currentPage);
              // if (this.currentPage == "onboarding_listing") {
              //   this.$router.push("/ChooseNumbers");
              // } else if (this.currentPage == "onboarding_plan_details") {
              //   this.$router.push("/SelectPlan");
              // } else if (
              //   this.currentPage == "onboarding_billing" ||
              //   this.currentPage == "onboarding_revisiting"
              // ) {
               
              // } else if (this.currentPage == "onboarding_review") {
                
              // } else if (this.currentPage == "onboarding_dashboard") {
              //   this.$router.push("/Dashboard");
              // }
            //});
          //})
          //.catch((error) => {
            //console.log("Error getting documents: ", error);
          //});
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
    handlePlanValue(data){
console.log('Event');
console.log(data);
this.forceRerenderKey();
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
    forceRerenderKey: function () {
      this.rerenderKey += 1;
    },
    updatePlan() {
      this.overlay = true;
      const user_stage = {
        url: this.$cloudfareApi+"/user/stage",
        method: "POST",
        headers: { 
						'token': localStorage.getItem("token"),
						'Content-Type': 'application/json'
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
      this.$router.push("/Billing?plan=review");
    },
    Paynow() {
      const details = {
        url: this.$cloudfareApi+"/addon/payment",
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
            key: this.$razorpaykey,
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
                        this.$router.push("/all_calls");
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