<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12">
              <v-overlay :value="overlay">
                <v-progress-circular indeterminate color="red" size="40" :width="3"></v-progress-circular>
              </v-overlay>
              <div class="ml-8">
                <v-row>
                  <v-col cols="12" sm="10">
                    <h2 class="page_title mt-6 ml-5">
                      <v-icon class="mr-2" color="black" @click="goBack()">mdi-arrow-left</v-icon>
                      Billing Information
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
                      <div class="col-12">
                       
                        <div class="center align-center" align="center" v-if="IvrPlan == 2">

                         <v-btn-toggle rounded elivation="05" class="toggle_IVR mb-10" borderless>
                              

                            
                                <v-btn  width="200" @click="isIvr(2)"
                                  :class="{ active: checkIvrStatus == false }">
                                  Current Plan
                                </v-btn>
                                  <v-btn  width="200" @click="MovetoBilling(1)">
                                  Upgrade
                                </v-btn>
                               
                              </v-btn-toggle>
                    
                        </div>
                        <div class="center align-center" align="center" v-else>
                                 <v-btn-toggle rounded elivation="05" class="toggle_IVR mb-10" borderless>
                              

                                <v-btn  width="200" @click="isIvr(2)" disabled>
                                  Basic Plan
                                </v-btn>
                         
                            
                                <v-btn width="200" @click="isIvr(1)" :class="{ active: checkIvrStatus == true }">
                                  IVR Plan
                                </v-btn>
                              </v-btn-toggle>
                        </div>
                        <div v-if="IvrPlan == 1" class="row">
                          <v-card class="ml-8" min-width="700" min-height="400">
                            <v-card-text class="pb-0">
                              <p class="redtext bold">
                                Next Recharge Due on {{ Rechargeday }}
                              </p>
                              <v-row no-gutters>
                                <div class="col-8 membership_heading">
                                  Total Cost (Inclusive of GST)
                                </div>
                                <div class="col-4 membership_heading">
                                  ₹ {{ permonth }}/Month
                                </div>
                              </v-row>

                              <div class="membership_price">
                                {{ invoice_amount
                                }}<span class="currency_symbol">INR</span>
                              </div>

                              <div class="membership_details">




                                <v-radio-group mandatory v-model="nonIVRPlanradio">
                                  <v-radio color="red darken-3" hide-details v-for="nonivrData in nonIvrPlanArray"
                                    :key="nonivrData.PlanId" :value="nonivrData.PlanId" @click="
                                      getBill(
                                        nonivrData.price,
                                        nonivrData.PlanId
                                      )
                                    " @change="check($event)" >
                                    <template v-slot:label >
                                      <div class="black--text">
                                        Pay for
                                        <strong class="black--text darken-4">
                                          {{ nonivrData.Validity }} months
                                          <span v-if="nonivrData.Discount > 0">and save
                                            {{ nonivrData.Discount }}%</span></strong>
                                      </div>
                                    </template>
                                  </v-radio>
                                </v-radio-group>


                                <div v-if="false">
                                  <v-radio-group v-model="plans" column>
                                    <v-radio value="2" color="red" class="mb-5 ml-5 pl-3" @click="getBill('radio', 2)">
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Pay for 6 Months and<strong class="black--text darken-4">
                                            Save 10%</strong><br /><span class="grey--text light-3">Rs 450/month. Save
                                            Rs 300</span>
                                        </div>
                                      </template>
                                    </v-radio>
                                    <v-radio value="3" color="red" class="mb-0 ml-5 pl-3" @click="getBill('radio', 3)">
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Pay for 12 Months and<strong class="black--text darken-4">
                                            Save 10%</strong><br /><span class="grey--text light-3">Rs {{ 450 }}/month.
                                            Save Rs
                                            300</span>
                                        </div>
                                      </template>
                                    </v-radio>
                                  </v-radio-group>
                                  <v-row no-gutters>
                                    <div class="col-8 membership_heading">
                                      Cost After Discount
                                    </div>
                                    <div class="col-4 membership_heading">
                                      ₹ 9558.0 for 6 Months
                                    </div>
                                  </v-row>
                                  <p class="redtext center f16 bold" align="center">
                                    (Your Total Saving ₹900.0)
                                  </p>
                                </div>
                              </div>
                            </v-card-text>
                            <v-card-actions align="center" class="center">
                              <v-btn text class="
                                  text-capitalize
                                  ma-3
                                  rounded-pill
                                  red_button
                                " min-width="140px" color="white" outlined @click="paynow()">
                                Pay Now
                              </v-btn>
                              <v-btn color="red" text class="
                                  ma-2
                                  text-capitalize
                                  rounded-pill
                                  p-3
                                  red_button_outline
                                " min-width="140px" @click="facebook_info = true">
                                View Detail
                              </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                              <v-card v-if="facebook_info" class="
                                  transition-fast-in-fast-out
                                  v-card--reveal
                                " style="height: 100%">
                                <v-row>
                                  <v-col cols="12" sm="10">
                                    <h6 class="f16 mt-6 ml-5">
                                      <v-icon class="mr-2" color="black" @click="facebook_info = false">mdi-arrow-left
                                      </v-icon>
                                      Details
                                    </h6>
                                  </v-col>
                                </v-row>
                                <v-card-text class="pb-0">
                                  <v-simple-table dense>
                                    <template v-slot:default>
                                      <tbody class="ma-0 pa-0" border="0">
                                        <tr v-for="d in sublist" :key="d.name">
                                          <td class="ma-0 pa-0 pr-0 mr-0" :class="d.class">
                                            {{ d.title }}
                                          </td>
                                          <td :class="d.class" align="center">
                                            {{ d.qty }}
                                          </td>
                                          <td :class="d.class" align="right" class="ma-0 pa-0">
                                            ₹ {{ d.amount }}
                                          </td>
                                        </tr>

                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            Sub Total
                                          </td>

                                          <td class="ma-0 pa-0" colspan="2" align="right">
                                            ₹ {{ SubTotal }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            Discount
                                          </td>

                                          <td class="ma-0 pa-0" colspan="2" align="right">
                                            {{ Discount }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0 bold primary--text" colspan="1" color="red">
                                            Cost after Discount
                                          </td>

                                          <td class="ma-0 pa-0 bold primary--text" colspan="2" align="right">
                                            {{ CostAfterDiscount }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            GST
                                          </td>

                                          <td class="ma-0 pa-0" colspan="2" align="right">
                                            {{ Gst.toFixed(2) }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0 bold" colspan="1">
                                            Total
                                          </td>

                                          <td class="ma-0 pa-0 bold" colspan="2" align="right">
                                            ₹ {{ invoice_amount }}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </template>
                                  </v-simple-table>
                                </v-card-text>
                              </v-card>
                            </v-expand-transition>
                          </v-card>
                        </div>

                        <div v-else-if="IvrPlan == 2" class="row">
                          <v-card class="ml-8" min-width="700" min-height="400">
                            <v-card-text class="pb-0">
                              <p class="redtext bold">
                                This is Ivr plan
                                {{ Rechargeday }}
                              </p>
                              <v-row no-gutters>
                                <div class="col-8 membership_heading">
                                  Total Cost (Inclusive of GST)
                                </div>
                                <div class="col-4 membership_heading">
                                  ₹ {{ permonth }}/Month
                                </div>
                              </v-row>

                              <div class="membership_price">
                                {{ invoice_amount
                                }}<span class="currency_symbol">INR</span>
                              </div>

                              <div class="membership_details">
                                <v-radio-group mandatory v-model="IVRPlanradio">
                                  <v-radio color="red darken-3" hide-details v-for="ivrData in ivrPlanArray"
                                    :key="ivrData.PlanId" :value="ivrData.PlanId" @click="
                                      getBill(
                                        ivrData.price,
                                        ivrData.PlanId
                                      )
                                    " @change="check($event)">
                                    <template v-slot:label>
                                      <div class="black--text">
                                        Pay for
                                        <strong class="black--text darken-4">
                                          {{ ivrData.Validity }} months
                                          <span v-if="ivrData.Discount > 0">and save
                                            {{ ivrData.Discount }}%</span></strong>
                                      </div>
                                    </template>
                                  </v-radio>
                                </v-radio-group>
                              </div>
                            </v-card-text>
                            <v-card-actions align="center" class="center">
                              <v-btn text class="
                                  text-capitalize
                                  ma-3
                                  rounded-pill
                                  red_button
                                " min-width="140px" color="white" outlined @click="paynow()">
                                Pay Now
                              </v-btn>
                              <v-btn color="red" text class="
                                  ma-2
                                  text-capitalize
                                  rounded-pill
                                  p-3
                                  red_button_outline
                                " min-width="140px" @click="facebook_info = true">
                                View Detail
                              </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                              <v-card v-if="facebook_info" class="
                                  transition-fast-in-fast-out
                                  v-card--reveal
                                " style="height: 100%">
                                <v-row>
                                  <v-col cols="12" sm="10">
                                    <h6 class="f16 mt-6 ml-5">
                                      <v-icon class="mr-2" color="black" @click="facebook_info = false">mdi-arrow-left
                                      </v-icon>
                                      Details
                                    </h6>
                                  </v-col>
                                </v-row>
                                <v-card-text class="pb-0">
                                  <v-simple-table dense>
                                    <template v-slot:default>
                                      <tbody class="ma-0 pa-0" border="0">
                                        <tr v-for="d in sublist" :key="d.name">
                                          <td class="ma-0 pa-0 pr-0 mr-0" :class="d.class">
                                            {{ d.title }}
                                          </td>
                                          <td :class="d.class" align="center">
                                            {{ d.qty }}
                                          </td>
                                          <td :class="d.class" align="right" class="ma-0 pa-0">
                                            ₹ {{ d.amount }}
                                          </td>
                                        </tr>

                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            Sub Total
                                          </td>

                                          <td class="ma-0 pa-0" colspan="2" align="right">
                                            ₹ {{ SubTotal }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            Discount
                                          </td>

                                          <td class="ma-0 pa-0" colspan="2" align="right">
                                            {{ Discount }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0 bold primary--text" colspan="1" color="red">
                                            Cost after Discount
                                          </td>

                                          <td class="ma-0 pa-0 bold primary--text" colspan="2" align="right">
                                            {{ CostAfterDiscount }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0" colspan="1">
                                            GST
                                          </td>

                                          <td class="ma-0 pa-0" colspan="2" align="right">
                                            {{ Gst.toFixed(2) }}
                                          </td>
                                        </tr>
                                        <tr colspan="3">
                                          <td class="ma-0 pa-0 bold" colspan="1">
                                            Total
                                          </td>

                                          <td class="ma-0 pa-0 bold" colspan="2" align="right">
                                            ₹ {{ invoice_amount }}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </template>
                                  </v-simple-table>
                                </v-card-text>
                              </v-card>
                            </v-expand-transition>
                          </v-card>
                        </div>
                      </div>
                    </v-row>
                  </v-flex>

                  <v-flex xs12 sm12 md12 class="mt-15 ml-7">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="6">
                            <h2 class="name_heading mr-7">Billing Address</h2>
                            <h2 class="comment_heading mt-1 mb-5 mr-7">
                              Review or change current billing Address
                            </h2>
                          </v-col>
                          <v-col cols="6" align="end">
                            <router-link :to="{ name: 'BillingAddress' }" class="">
                              <span>
                                <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25">mdi-arrow-right</v-icon>
                              </span>
                            </router-link>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                          <v-col cols="6">
                            <h2 class="name_heading mt-4 mr-7">
                              Payment History
                            </h2>
                            <h2 class="comment_heading mt-1 mb-5 mr-7">
                              Review or download previous invoices
                            </h2>
                          </v-col>
                          <v-col cols="6" align="end">
                            <router-link :to="{ name: 'PaymentHistory' }">
                              <span>
                                <v-icon class="mt-6 mb-5 mr-7" color="#EE1C25">mdi-arrow-right</v-icon>
                              </span>
                            </router-link>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-flex>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
      <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Are you Sure!</h3>
        </v-card-title>
        <v-card-body>
          <h4 class="mb-3 mt-3 text-center">
            Do you want to Upgrade the plan?
          </h4>
        </v-card-body>
        <v-card-actions>
          <v-btn color="red" text class="ma-2 text-capitalize rounded-pill p-3 red_button_outline" min-width="140px"
            @click="proccedToIVR(2)">
            Cancel
          </v-btn>
          <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px" color="white" outlined
            @click="proccedToIVR(1)">
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<style scoped>
table.v-table tbody td {
  height: 40px;
  border: none;
}

.theme--light.v-table tbody tr:not(:last-child) {
  border-bottom: none;
}
</style>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
         <script>
import firebase from "firebase";
import { db } from "@/main.js";
import axios from "axios";
export default {
  components: {},
  data: () => ({
    ivrActive: false,
    directActive: false,
    sixmonths: false,
    twelvemonths: false,
    invoice_amount: "",
    amount: "",
    plans: false,
    sublist: [],
    Discount: [],
    SubTotal: "",
    CostAfterDiscount: "",
    Gst: "",
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashbaord",
      },
      {
        text: "Billing Information",
        disabled: true,
        to: { name: "BillingInformation" },
      },
    ],
    facebook_info: false,
    instagram_info: false,
    paymentOptions: true,
    paymentOptionsInsta: false,
    userEmail: "",
    userRole: "",
    agentName: "",
    owneruid: "",
    PlanId: "",
    permonth: "",
    Name: "",
    overlay: false,
    Rechargeday: "",
    nonIVRPlanradio: 1,
    IvrPlan: "",
    dialog:false,
    bussinessNumber: "",
    AccountId: "",
  }),
  computed: {
    computedPrice() {
      return this.discount ? this.price * this.discountedPrice : this.price;
    },
  },
  async created() {
       this.bussinessNumber = this.$route.query.bn;
  
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    //  this.bussinessNumber = this.$route.query.bn;
    // this.setBreadcrumbs(this.bussinessNumber);
    const owneruid =
      localStorageUserObj.role == "OWNER"
        ? localStorageUserObj.uid
        : localStorageUserObj.OwnerUid;
    // console.log("vetri",owneruid)
    this.Rechargeday = localStorageUserObj.LastDay;
    this.Name = localStorageUserObj.FirstName;
    this.owneruid = owneruid;
    this.PlanId = localStorageUserObj.PlanId;

    this.planDetails = db
      .collection("plan_details")
      .get()
      .then((querySnapshot) => {
        this.ivrPlanArray = [];
        this.nonIvrPlanArray = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            console.log(doc.id, " => ", doc.data());
            let plan = doc.data();
            this.plan = plan;
            console.log(plan.Name);

            if (plan.IsIvr == true) {
              this.ivrobject = Object.assign({}, this.ivrobject, {
                planName: plan.Name,
                price: plan.Price,
                Validity: plan.Validity,
                Discount: plan.Discount,
                PlanId: plan.Id,
                ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
              });
              if( plan.Validity>1){
              this.ivrPlanArray.push(this.ivrobject);
              }
            } else {
              this.nonivrobject = Object.assign({}, this.nonivrobject, {
                planName: plan.Name,
                price: plan.Price,
                Validity: plan.Validity,
                Discount: plan.Discount,
                PlanId: plan.Id,
                ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
              });
              if( plan.Validity>1){

                this.nonIvrPlanArray.push(this.nonivrobject);
              }
            }
            // var timestamp = this.calldetails.dateTime
          });
          this.checkData();
        }
      });
    // planDetails.docs.forEach((element) => {
    //   console.log(element.data());
    // });

    window.scrollTo(0, 0); //scroll to top
    this.getBill("inital", this.PlanId);

    //  this.getOrderIdforPayment()
  },

  methods: {
    async checkData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("logged user details", user);
          this.uid = user.uid;
          this.phno = user.phoneNumber.slice(3);
                let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
          this.nonIVRPlanradio = localStorage.getItem("nonIVRPlanradio");
          this.IVRPlanradio = localStorage.getItem("IVRPlanradio");
        // this.checkIvrStatus = false;
        this.checkIvrStatus = localStorageUserObj.IsIvr;
              this.ivrActive = localStorageUserObj.IsIvr == true ? true : false;
          this.directActive = localStorageUserObj.IsIvr == true ? false : true;
          this.IvrPlan = localStorageUserObj.IsIvr == false ? 2 : 1;
        }
      });
    },
    isIvr(i) {
      this.IvrPlan =i;
    },
    proccedToIVR(i) {
         if (i == 1) {
        const options = {
          url: this.$cloudfareApi + "/callDistribution/ivr/status",
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            owner_uid: this.owneruid,
            updated_by: this.uid,
            virtual_number: this.bussinessNumber,
            AccountId: this.AccountId,
            IsIvr: i == 1 ? true : false,
          },
        };

        axios(options)
          .then((response) => {
            this.dialog = false;
            console.log(response.data);
            this.$root.vtoast.show({
              message: "Updated Successfully!",
              color: "#07C421",
              timer: 2000,
            });

            this.$router.push(
              "/BillingInformation?upgrade=" +
              i +
              "&bn=" +
              this.bussinessNumber
            );
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.dialog = false;
        this.IvrPlan = i;
        this.ivrActive = false;
        this.directActive = true;
      }
    },

    goBack() {
      this.$router.push("/dashboard");
    },
        MovetoBilling(i) {
      if (i == 1) {
        this.dialog = true;
      }
    },
    getBill(status, planid) {
      console.log(status, planid);
      const token = localStorage.getItem("token");

      let plan =
        this.twelvemonths == false && this.sixmonths == false
          ? 1
          : this.twelvemonths == true && this.sixmonths == false
          ? 3
          : 2;
      // this.PlanId = (radio == "inital")?this.PlanId:planid;
      this.PlanId = planid;
      this.sublist = [];
      const details = {
        // https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
        url: this.$cloudfareApi + "/bill/",
        method: "POST",
        data: {
          uid: this.owneruid,
          PlanId: planid,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };

      axios(details)
        .then((response) => {
          this.invoice_amount = response.data.invoice_amount;
          const permonthdivison = plan == 1 ? 1 : plan == 2 ? 6 : 12;
          this.permonth = parseInt(
            response.data.invoice_amount / permonthdivison
          );
          this.SubTotal =
            response.data.actual_amount +
            response.data.actual_vn_amount +
            response.data.actual_user_amount;
          this.Discount = this.SubTotal - response.data.total_amount;
          this.CostAfterDiscount = response.data.total_amount;
          this.Gst = response.data.invoice_amount - response.data.total_amount;
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
    paynow() {
      const details = {
        url: this.$cloudfareApi + "/addon/payment",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          uid: this.owneruid,
          owner_uid: this.owneruid,
          PlanId: parseInt(this.PlanId),
          payment_mode: "WEB",
          type: "RECHARGE",
        },
      };
      axios(details).then(async (responsevalue) => {
        console.log(responsevalue);
        if (responsevalue.data.status == true) {
          var options = {
            key: this.$razorpaykey,
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
                        db.collection("users")
                          .where("uid", "==", this.owneruid)
                          .get()
                          .then((snap) => {
                            this.Rechargeday = snap.docs[0].data().LastDay;
                          })
                          .catch((err) => console.log(err));
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
  },
};
</script>
