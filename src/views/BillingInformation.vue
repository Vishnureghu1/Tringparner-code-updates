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
                         <!-- SwitcherID: {{ SwitcherID }}<br>
                        ivrActive: {{ ivrActive }}
                        <br>
                        Stage: {{ Stage }}
                        <br>
                        PlanId: {{ PlanId }}
                        <br>  -->
                        <div class="center align-center" align="center"
                          v-if="Stage=='TRIAL' ">

                          <v-btn-toggle rounded elivation="05" class="toggle_IVR mb-10" borderless>
                            <v-btn :class="{ active: SwitcherID == 1 }" width="200"
                              @click="planTypeSwitcher(1)">
                              BASE PLAN
                            </v-btn>
                            <!-- Ivr plan trial -->
                            <v-btn width="200" @click="planTypeSwitcher(2)"  :class="{ active: SwitcherID == 2 }">
                              IVR
                            </v-btn>
                          </v-btn-toggle>
                        </div>
                        <div v-else class="center align-center" align="center">

                          <v-btn-toggle rounded elivation="05" class="toggle_IVR mb-10" borderless v-if="ivrActive==false ">
                            <v-btn width="200" 
                              @click="planTypeSwitcher(3)" :class="{ active: SwitcherID == 3 }">
                              Current Plan
                            </v-btn>
                            <!-- actual ivr plan  -->
                            <v-btn width="200" @click="planTypeSwitcher(4)"
                              :class="{ active: upgrade == 1 || SwitcherID == 4 ||ivrActive==true }">
                              Upgrade
                            </v-btn>
                          </v-btn-toggle>
                        </div>

                        <div v-if="SwitcherID == 1 || SwitcherID == 3" class="row">
                          <v-card class="ml-8" min-width="700" min-height="400">
                            <v-card-text class="pb-0">
                              <p class="redtext bold" v-if="Stage != 'TRIAL'">
                                Next Recharge Due on {{ Rechargeday }}
                              </p>
                              <v-row no-gutters>
                                <div class="col-8 membership_heading">
                                  Total Cost (Inclusive of GST)
                                </div>
                                <div class="col-4 membership_heading" align="right" >
                                  ₹ {{ permonth }}/Month
                                </div>
                              </v-row>

                              <div class="membership_price">
                                {{ invoice_amount
                                }}<span class="currency_symbol">INR</span>
                              </div>

                              <div class="membership_details">
                                <v-radio-group mandatory 
                                  v-model="nonivrRadioGroup">

                                  <v-radio color="red darken-3" hide-details v-for="nonivrData in nonIvrPlanArray"
                                    :key="nonivrData.PlanId" :value="nonivrData.PlanId" @click="
                                      getBill(nonivrData.price, nonivrData.PlanId)
                                    ">
                                    <template v-slot:label>
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


                              </div>
                              <v-row no-gutters v-if="Discount > 0">
                                <div class="col-8 membership_heading red--text">
                                  Cost After Discount
                                </div>
                                <div class="col-4 membership_heading" align="right">
                                  ₹ {{ invoice_amount }} for {{ validity }} Months
                                </div>
                              </v-row>
                              <v-row no-gutters v-if="Discount > 0">
                                <div class="col-12  red--text" align="center">
                                  ( Your Total Saving ₹ {{ Discount }})
                                </div>

                              </v-row>
                            </v-card-text>
                            <v-card-actions align="center" class="center">
                              <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px"
                                color="white" outlined @click="recharge()" v-if="Stage != 'TRIAL'">
                                Pay Now
                              </v-btn>
                              <!-- If trial inside non IVR-->
                              <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px"
                                color="white" outlined @click="paynow()" v-else>
                                Pay Now
                              </v-btn>
                              
                              <v-btn color="red" text class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
                                min-width="140px" @click="basicplan_info = true">
                                View Detail
                              </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                              <v-card v-if="basicplan_info" class="transition-fast-in-fast-out v-card--reveal"
                                style="height: 100%">
                                <v-row>
                                  <v-col cols="12" sm="10">
                                    <h6 class="f16 mt-6 ml-5">
                                      <v-icon class="mr-2" color="black" @click="basicplan_info = false">mdi-arrow-left
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
                        <div class="row" v-else-if="SwitcherID == 2 || SwitcherID == 4">
                          <v-card class="ml-8" min-width="700" min-height="400">
                            <v-card-text class="pb-0">
                              <p class="redtext bold"  v-if="Stage != 'TRIAL'">
                                Next Recharge Due on {{ Rechargeday }}
                              </p>
                              <v-row no-gutters>
                                <div class="col-8 membership_heading">
                                  Total Cost (Inclusive of GST)
                                </div>
                                <div class="col-4 membership_heading" align="right" >
                                  ₹ {{ permonth }}/Month
                                </div>
                              </v-row>
                              <v-row no-gutters  v-if="Stage == 'PAID' ">
                                
                                <div class="col-8 membership_heading" >
                                  Cost for Upgradation
                                </div>
                                <div class="col-4 membership_heading" align="right" >
                                  ₹ {{ amountwithoutgst }}
                                </div>
                              </v-row>
      
                              <div class="membership_price">
                                {{ amount
                                }}<span class="currency_symbol">INR</span>
                              </div>

                              <div class="membership_details" v-if="ivrActive==true">

                                <v-radio-group mandatory  v-model="ivrRadioGroup">

                                  <v-radio color="red darken-3"  v-for="ivrData in ivrPlanArray"
                                    :key="ivrData.PlanId" :value="ivrData.PlanId" @click="
                                      getBill(ivrData.price, ivrData.PlanId)
                                    ">
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
                              <v-row no-gutters v-if="Discount > 0">
                                <div class="col-8 membership_heading red--text">
                                  Cost After Discount
                                </div>
                                <div class="col-4 membership_heading" align="right">
                                  ₹ {{ invoice_amount }} for {{}} Months
                                </div>
                              </v-row>
                              <v-row no-gutters v-if="Discount > 0">
                                <div class="col-12  red--text" align="center">
                                  ( Your Total Saving ₹ {{ Discount }})
                                </div>

                              </v-row>
                            </v-card-text>
                            <v-card-actions align="center" class="center">
                              <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px"
                                color="white" outlined @click="paynowUpgrade()" v-if="Stage == 'PAID'">
                                Pay Now
                              </v-btn>
                              <!-- If trial inside IVR-->
                              <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px"
                                color="white" outlined @click="paynow()" v-else>
                                Pay Now
                              </v-btn>
                              <v-btn color="red" text class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
                                min-width="140px" @click="ivrplan_info = true">
                                View Detail
                              </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                              <v-card v-if="ivrplan_info" class="transition-fast-in-fast-out v-card--reveal"
                                style="height: 100%">
                                <v-row>
                                  <v-col cols="12" sm="10">
                                    <h6 class="f16 mt-6 ml-5">
                                      <v-icon class="mr-2" color="black" @click="ivrplan_info = false">mdi-arrow-left
                                      </v-icon>
                                      Details
                                    </h6>
                                  </v-col>
                                </v-row>
    <!-- {{amount}}<br>
           {{amountwithoutdeduction}}<br>
           {{amountwithoutgst}}<br>
           {{defaultafterdiscount}}<br>
           {{defaultamount}}<br>
           {{defaultdiscount}}<br>
           {{planname}}<br>
           {{reminingamt}}<br>
           {{reminingdays}}<br>
           {{reminingmonths}}<br>
           {{status}}<br>
           {{useddays}}<br>
           {{gstAmount}}<br> -->
           
                                <v-card-text class="pb-0">
                                  <v-simple-table dense>
                                    <template v-slot:default>
                                      <tbody class="ma-0 pa-0" border="0">
                                        <!-- <tr v-for="d in sublist" :key="d.name">
                                          <td class="ma-0 pa-0 pr-0 mr-0" :class="d.class">
                                            {{ d.title }}
                                          </td>
                                          <td :class="d.class" align="center">
                                            {{ d.qty }}
                                          </td>
                                          <td :class="d.class" align="right" class="ma-0 pa-0">
                                            ₹ {{ d.amount }}
                                          </td>
                                        </tr> -->
                                        <tr>
                                          <td class="ma-0 pa-0 pr-0 mr-0 bold">Item</td>
                                          <td class="bold" align="center">Quantity</td>
                                          <td class="ma-0 pa-0 bold" align="right">Price</td>
                                          </tr>
                                          <tr>
                                          <td class="ma-0 pa-0 pr-0 mr-0 ">{{planname}}</td>
                                          <td class="ma-0 pa-0 pr-0 mr-0 " align="center">1</td>
                                          <td class="ma-0 pa-0 pr-0 mr-0 " align="right">₹ {{amountwithoutdeduction}}</td>
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
    checkIvrStatus:"",
    amount: "",
    plans: false,
    sublist: [],
    Discount: [],
    SubTotal: "",
    CostAfterDiscount: "",
    amountwithoutgst:"",
    reminingdays:"",
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
    basicplan_info: false,
    ivrplan_info: false,
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
    SwitcherID: 1,
    bussinessNumber: "",
    upgrade: "",
    AccountId: "",
    upgradeInfo:false,
    ivrData:"",
    validity:1,
    Stage:"",
    nonIvrPlanArray:[],
    ivrPlanArray:[],
  }),
  computed: {
    computedPrice() {
      return this.discount ? this.price * this.discountedPrice : this.price;
    },
  },
  async created() {
    this.bussinessNumber = this.$route.query.bn;
    this.upgrade = this.$route.query.upgrade;
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    if(localStorageUserObj.Stage == "INPROGRESS"){
       this.$router.push("login").catch(() => {});
    }
    this.ivrActive = localStorageUserObj.IsIvr == true ? true : false;
 
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
 
// only for recharge and upgrade
  this.PlanId = localStorageUserObj.PlanId?parseInt(localStorageUserObj.PlanId):0;
  this.Stage = localStorageUserObj.Stage?localStorageUserObj.Stage:'notFound';
if(this.Stage=="TRIAL"){
  console.log("vetri test")
  this.PlanId=2;
  this.SwitcherID=1;
  this.nonivrRadioGroup=parseInt(this.PlanId);
this.ivrRadioGroup=parseInt(this.PlanId) +  3;
this.getBill("inital", parseInt(this.PlanId));

}else if(this.Stage=="PAID"){
  this.PlanId = localStorageUserObj.PlanId?parseInt(localStorageUserObj.PlanId):0;
  this.SwitcherID=3;
  this.nonivrRadioGroup=parseInt(this.PlanId);
this.ivrRadioGroup=parseInt(this.PlanId) +  3;
this.getBill("inital", parseInt(this.PlanId));
}else{
    this.SwitcherID=3;
  this.nonivrRadioGroup=2;
this.ivrRadioGroup=parseInt(this.PlanId) +  3;
this.getBill("inital", parseInt(this.PlanId));

}


// alert(this.PlanId);
// alert(this.Stage);
// if(this.planI==)

    this.planDetails = db
      .collection("plan_details")
      // .where("Id", ">=",2)
     .where("IsTrial","==",false)
      .get()
      .then((querySnapshot) => {
        this.ivrPlanArray = [];
        this.nonIvrPlanArray = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            console.log(doc.id, " => ", doc.data());
            let plan = doc.data();
            this.plan = plan;
           

            if (plan.IsIvr == true) {
              this.ivrobject = Object.assign({}, this.ivrobject, {
                planName: plan.Name,
                price: plan.Price,
                Validity: plan.Validity,
                Discount: plan.Discount,
                PlanId: plan.Id,
                ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
              });
              
              this.ivrPlanArray.push(this.ivrobject);
              
            } else {
               console.log(plan.Name+'========='+plan.IsIvr);
              this.nonivrobject = Object.assign({}, this.nonivrobject, {
                planName: plan.Name,
                price: plan.Price,
                Validity: plan.Validity,
                Discount: plan.Discount,
                PlanId: plan.Id,
                ActualPrice: (plan.Price * 100) / (100 - plan.Discount),
              });
          

              this.nonIvrPlanArray.push(this.nonivrobject);
              
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


    

    //  this.getOrderIdforPayment()
  },

  methods: {

planTypeSwitcher(i) {
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
       if(this.ivrActive==true){
    planTypeSwitcher(4);
  }
      this.SwitcherID=i;
console.log('Plan ID '+i)
// SwitcherID ==1 Base plan (If Trial)
// SwitcherID ==2 Ivr plan 
// SwitcherID ==3 plan 2 or 3 IVR (if Trial)
// SwitcherID ==4 plan 5 or 6 IVR
  if(i==1){
  this.PlanId=2; //Trial 
  this.nonivrRadioGroup=this.PlanId;
  this.getBill(this.uid, parseInt(this.PlanId));
  }else if(i==2){ //Trial
  // this.planUpgradeData();
    this.PlanId= 5; //Trial
    this.ivrRadioGroup =this.PlanId; 
    this.getBill(this.uid, parseInt(this.PlanId));
  }else if(i==3){ 
    var v = localStorageUserObj.PlanId?parseInt(localStorageUserObj.PlanId):0;

  if(v<=3 && v!=0){
    this.PlanId = v; 
  }else{
    this.PlanId = 2; 

  }
  this.nonivrRadioGroup=this.PlanId;
  this.getBill(this.uid, parseInt(this.PlanId));
    }else if(i==4){

this.planUpgradeData();
    var v = localStorageUserObj.PlanId?parseInt(localStorageUserObj.PlanId):0;
  if(v>=4 && v!=0){
    
    this.PlanId = v; 
  }else{
    this.PlanId = 5; 
  }
    // this.PlanId = 5;     
    // this.PlanId = localStorageUserObj.PlanId?parseInt(localStorageUserObj.PlanId):0;
    this.ivrRadioGroup =this.PlanId; 
    // this.getBill(this.uid, parseInt(this.PlanId));
  }else{
//  this.SwitcherID=i;
  }
    },
    syncStatus(){
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
  
          
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });

    },

    async checkData() {
      if(this.upgrade==1){
 this.planTypeSwitcher(4);
}
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("logged user details", user);
          this.uid = user.uid;
          this.phno = user.phoneNumber.slice(3);
          let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
          // this.nonIVRPlanradio = localStorageUserObj.getItem("nonIVRPlanradio");
          // this.IVRPlanradio = localStorageUserObj.getItem("IVRPlanradio");
          // this.checkIvrStatus = false;
          
          
          this.ivrActive = localStorageUserObj.IsIvr == true ? true : false;
          this.Stage = localStorageUserObj.Stage;

       
        }
      });
    },
planUpgradeData(){ //fetch upgrade plan data
  
      const options = {
          url: this.$cloudfareApi + "/bill/upgrade",
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            owner_uid: this.owneruid
          },
        };

        axios(options)
          .then((response) => {
            this.dialog = false;
          
            console.log(response.data);
            var upgradeData = response.data;
            this.amount = upgradeData.amount.toFixed(2);
            this.amountwithoutdeduction = upgradeData.amountwithoutdeduction.toFixed(2);
            this.amountwithoutgst = upgradeData.amountwithoutgst.toFixed(2);
            this.defaultafterdiscount = upgradeData.defaultafterdiscount;
            this.defaultamount =  upgradeData.defaultamount.toFixed(2);
            this.defaultdiscount = upgradeData.defaultdiscount;
            this.planname = upgradeData.planname;
            this.reminingamt = upgradeData.reminingamt.toFixed(2);
            this.reminingdays = upgradeData.reminingdays;
            this.reminingmonths = upgradeData.reminingmonths;
            this.status = upgradeData.status;
            this.useddays = upgradeData.useddays;
            this.gstAmount =  (upgradeData.amount - upgradeData.amountwithoutgst).toFixed(2);

           
          })
          .catch((error) => {
            console.error(error);
          });
},
    // planTypeSwitcher(i) {
    //   this.basicplan_info=false;
    //   this.upgradeInfo=false;
    //   this.SwitcherID=i;
    //   console.log(i);

    //   alert(i)
        // this.getBill(this.uid, i);
      // if (i == 3) 
      // { 
      // this.getBill(this.uid, 5);
      // }
      //  else if(i == 4) 
      // { 
      // this.getBill(this.uid, 3);
      // }
      
      // else if (i == 1) {
      //   const options = {
      //     url: this.$cloudfareApi + "/bill/upgrade",
      //     method: "POST",
      //     headers: {
      //       token: localStorage.getItem("token"),
      //       "Content-Type": "application/json;charset=UTF-8",
      //     },
      //     data: {
      //       owner_uid: this.owneruid
      //     },
      //   };

      //   axios(options)
      //     .then((response) => {
      //       this.dialog = false;
          
      //       console.log(response.data);
      //       var upgradeData = response.data;
      //       this.amount = upgradeData.amount.toFixed(2);
      //       this.amountwithoutdeduction = upgradeData.amountwithoutdeduction.toFixed(2);
      //       this.amountwithoutgst = upgradeData.amountwithoutgst.toFixed(2);
      //       this.defaultafterdiscount = upgradeData.defaultafterdiscount;
      //       this.defaultamount =  upgradeData.defaultamount.toFixed(2);
      //       this.defaultdiscount = upgradeData.defaultdiscount;
      //       this.planname = upgradeData.planname;
      //       this.reminingamt = upgradeData.reminingamt.toFixed(2);
      //       this.reminingdays = upgradeData.reminingdays;
      //       this.reminingmonths = upgradeData.reminingmonths;
      //       this.status = upgradeData.status;
      //       this.useddays = upgradeData.useddays;
      //       this.gstAmount =  (upgradeData.amount - upgradeData.amountwithoutgst).toFixed(2);

        
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // } else{
          // this.SwitcherID=i;
      // }
    // },

    goBack() {
      this.$router.push("/dashboard");
    },

    getBill(status, planid) {
      console.log(status, planid);
      const token = localStorage.getItem("token");
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
          console.log( response.data);
          this.invoice_amount = response.data.invoice_amount;
          this.invoice_amount = response.data.invoice_amount;
          this.validity =response.data.validity;
          const permonthdivison =  response.data.validity;
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
          type: "BASIC",
        },
      };
      axios(details).then(async (responsevalue) => {
        console.log(responsevalue.data);
        if (responsevalue.data.status == true) {
          var options = {
            key: this.$razorpaykey,
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
                        db.collection("users")
                          .where("uid", "==", this.owneruid)
                          .get()
                          .then((snap) => {
                            this.Rechargeday = snap.docs[0].data().LastDay;
                          })
                          .catch((err) => console.log(err));
                 
                          window.localStorage.removeItem('tpu');  
this.syncStatus();
this.Stage='PAID';
this.SwitcherID=3;
if(this.PlanId>=4){
  this.ivrActive=true;
}
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

recharge() {
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
                                                 window.localStorage.removeItem('tpu');  
this.syncStatus();
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

      paynowUpgrade() {
        // alert(this.PlanId);
      const details = {
        url: this.$cloudfareApi + "/addon/upgrade",
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
              var upgradeData = response.data;
              // console.log(upgradeData);
            
              
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
                                                  window.localStorage.removeItem('tpu');  
this.syncStatus();
 this.ivrActive=true;
 
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
