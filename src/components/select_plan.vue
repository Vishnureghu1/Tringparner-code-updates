<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12" align="center">
              <v-overlay :value="overlay">
                <v-progress-circular indeterminate color="red" size="40" :width="3"></v-progress-circular>
              </v-overlay>

        

              <v-card v-if="changePlanArea == false" color="transparent" outlined class="" max-width="800">
                <h2 class="page_title lato-font mb-4 mt-10">
                  Review Informations and Pay Now
                </h2>
                <h2 class="sub_title mb-16">
                  Review your business information like business address
                </h2>
                <v-row>

                  <v-col cols="12" sm="6" align="start">
                    <h2 class="name_heading light4 f14">
                      Billing Address
                      <span v-on="on" class="primary--text f14 cursor" @click="changeAddress()" small>
                        Edit</span>
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

                    <h2 class="name_heading light4" v-if="actual_amount!=0">Payment Plan</h2>
                    <h2 class="name_heading light4" v-else>Selected Plan</h2>
                    <v-row class="mb-0">
                      <v-col cols="12" sm="6">
                       
                        <h2 class="content_title medium mb-0 f14" v-if="actual_amount!=0">
                          {{validity}} months - Rs {{actual_amount}}
                        </h2>
                        <h2 class="content_title medium mb-0 f14"  v-else>
                          {{validity}} month trial plan
                        </h2>
                        
                      </v-col>
                      <v-col cols="12" sm="6" align="end"><span v-on="on" class="primary--text f14 cursor"
                          @click="changePlan()" small>
                          Change</span></v-col>


                    </v-row>


          <v-row class="mt-0 pt-0" v-if="actual_amount!=0">
                      <v-col cols="12" sm="6" align="start">
                        <h2 class="name_heading light4 mb-4">Actual Cost</h2>
                        <h2  class="name_heading light4 mb-4" v-if="Discount!=0">
                          Discount
                        </h2>
                        <h2 class="name_heading light4 mb-4">GST(18%)</h2>
                        <h2 class="content_title mb-4 f14">Charges</h2>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <h2  class="content_title medium mb-4 f14">
                          Rs {{actual_amount}}
                        </h2>
                        <h2  class="content_title medium mb-4 f14" v-if="Discount!=0">
                          Rs {{Discount}}
                        </h2>
                         <h2  class="content_title medium mb-4 f14">
                          Rs {{Gst}}
                        </h2>
                          <h2  class="content_title medium mb-4 f14">
                          Rs {{Charges}}
                        </h2>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-btn  @click="Paynow()" class="btn_text mt-15 white--text text-capitalize" v-if="actual_amount!=0"
                  width="20%" rounded color="#EE1C25">
                  Pay Rs {{Charges}}
                </v-btn>
                 <v-btn  @click="Dashbord()" class="btn_text mt-15 white--text text-capitalize" v-else
                  width="30%" rounded color="#EE1C25">
                 Proceed to Dashboard
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
import axios from "axios";
export default {
  data: () => ({
    radio: "",
    radio1: false,
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
    actual_amount:0,
    planIdChoosen:0,
  }),

  components: {
    PlanSelect,
  },

  created() {
   this.planIdSelected = parseInt(localStorage.getItem("planId"));
          let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
      this.planIdChoosen = parseInt(localStorageUserObj.PlanId);
      this.Stage =localStorageUserObj.Stage;
   
     
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
              // planId

              console.log('planIdSelected:'+this.planIdSelected);

              this.virtualNumber = user_details.virtualNumber[0];
              this.address = user_details.Address;
              this.city = user_details.City;
              this.state = user_details.State;
              this.email = user_details.Email;
              this.name = user_details.FirstName;
              this.phno = user_details.PhoneNumber;
              this.planId = user_details.PlanId;
              this.orderId = user_details.OrderId;

    if(this.planIdSelected){
        
         this.getBill(this.uid, this.planIdSelected); // a plan selected
      }else{
         this.getBill(this.uid, this.planId);
      }
             
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
  
        
      }
          
    });
  },
  methods: {
        getBill(userid, planid) {
      // console.log(status, planid);
      const token = localStorage.getItem("token");
      // this.PlanId = (radio == "inital")?this.PlanId:planid;
      this.PlanId = planid;
      this.sublist = [];
      const details = {
        // https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
        url: this.$cloudfareApi + "/bill/",
        method: "POST",
        data: {
          uid: userid,
          PlanId: planid,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };

      axios(details)
        .then((response) => {
          console.log( response.data);
          this.invoice_amount = response.data.invoice_amount;
          this.actual_amount = response.data.actual_amount;
          this.total_amount = response.data.total_amount;
          this.validity = response.data.validity;
          const permonthdivison = this.PlanId == 1 ? 1 : this.PlanId == 5 ? 6 : 12;
          this.permonth = parseInt(
            response.data.invoice_amount / permonthdivison
          );
          this.SubTotal =
            response.data.actual_amount +
            response.data.actual_vn_amount +
            response.data.actual_user_amount;
          this.Discount = this.SubTotal - response.data.total_amount;
          this.CostAfterDiscount = response.data.total_amount;
          this.Gst = (response.data.invoice_amount - response.data.total_amount).toFixed(2);
          this.GstNoRound = (response.data.invoice_amount - response.data.total_amount);
          this.Charges = (this.actual_amount -  this.Discount ) + this.GstNoRound;
          this.sublist.push(
            { title: "Item", qty: "Quantity", amount: "Price", class: "bold" },
            {
              title: response.data.code,
              qty: 1,
              amount: response.data.actual_amount,
              class: "light3",
            },
            {
              title: "Business Numbers",
              qty: response.data.number,
              amount: response.data.actual_vn_amount,
              class: "light3",
            },
            {
              title: "Users",
              qty: response.data.user,
              amount: response.data.actual_user_amount,
              class: "light3",
            }
          );


          
          // console.log(response.data.invoice_amount);
        })
        .catch((error) => {
          console.error(error);
        });
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
          this.$emit('planvalue',1);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changePlan() {
      // this.changePlanArea = true;
    
        this.$router.push("/SelectPlan?editplan=true");
    },
    changeAddress() {
      this.$router.push("/Billing");
    },
       Dashbord() {
      this.$router.push("/dashboard").catch(() => {});
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
          PlanId: this.planIdSelected,
          payment_mode: "WEB",
          type: "BASIC",
          // amount: this.Charges,
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