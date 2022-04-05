<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12">
              <div class="ml-8">
                <v-row>
                  <v-col cols="12" sm="10">
                    <h2 class="page_title mt-6 ml-5">
                      <v-icon class="mr-2" color="black" @click="goBack()"
                        >mdi-arrow-left</v-icon
                      >
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
                    <v-row no-gutters >
                      <v-card class="mx-auto" min-width="700">
                        <v-card-text class="pb-0">
                          <p class="redtext bold">
                            Next Recharge Due on 05-Jun-2022
                          </p>
                          <v-row no-gutters>
                            <div class="col-8 membership_heading">
                              Total Cost (Inclusive of GST)
                            </div>
                            <div class="col-4 membership_heading">
                              ₹ 1593.0/Month
                            </div>
                          </v-row>

                          <div class="membership_price">
                            500.00<span class="currency_symbol">INR</span>
                          </div>

                          <div class="membership_details">
                            <v-checkbox
                              v-model="paymentOptions"
                              label="red darken-3"
                              color="red darken-3"
                              hide-details
                            >
                              <template v-slot:label>
                                <div class="black--text">
                                  Upgrade plan for<strong
                                    class="black--text darken-4"
                                  >
                                    20% Discount</strong
                                  >
                                </div>
                              </template></v-checkbox
                            >
                            <div v-if="paymentOptions">
                              <v-radio-group v-model="ex7" column>
                                <v-radio
                                  value="1"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Pay for 6 Months and<strong
                                        class="black--text darken-4"
                                      >
                                        Save 10%</strong
                                      ><br /><span class="grey--text light-3"
                                        >Rs 450/month. Save Rs 300</span
                                      >
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio
                                  value="2"
                                  color="red"
                                  class="mb-0 ml-5 pl-3"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Pay for 6 Months and<strong
                                        class="black--text darken-4"
                                      >
                                        Save 10%</strong
                                      ><br /><span class="grey--text light-3"
                                        >Rs 450/month. Save Rs 300</span
                                      >
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
                          <v-btn
                            text
                            class="text-capitalize ma-3 rounded-pill red_button"
                            min-width="140px"
                            color="white"
                            outlined
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
                            @click="facebook_info = true"
                          >
                            View Detail
                          </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                          <v-card
                            v-if="facebook_info"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%"
                          >
                            <v-card-text class="pb-0">
                              <v-simple-table dense >
                                                <template v-slot:default>
                                                  <tbody class="ma-0 pa-0">
                                                    <tr
                                                      v-for="d in sublist"
                                                      :key="d.name"
                                                    >
                                                      <td  class="ma-0 pa-0" :class="d.class">{{ d.title }}</td>
                                                      <td :class="d.class">{{ d.qty }}</td>
                                                      <td :class="d.class">₹ {{ d.amount }}</td>
                                                    </tr>
                                                  </tbody>
                                                </template></v-simple-table
                                              >
                            </v-card-text>
                            <v-card-actions class="pt-0">
                              <v-btn
                                class=""
                                text
                                color="red accent-4"
                                @click="facebook_info = false"
                              >
                                Close
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-expand-transition>
                      </v-card>
                    </v-row>
                  </v-flex>

                  <v-flex xs12 sm12 md12 class="mt-15  ml-7">
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
                            <router-link :to="{ name: 'BillingAddress' }">
                              <span
                                ><v-icon class="mt-6 mb-5 mr-7" color="#EE1C25"
                                  >mdi-arrow-right</v-icon
                                >
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
                              <span
                                ><v-icon class="mt-6 mb-5 mr-7" color="#EE1C25"
                                  >mdi-arrow-right</v-icon
                                >
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
         <script>
export default {
  components: {},
  data: () => ({
        sublist: [
      {
        title: "Charges",
        qty: "Quantity",
        amount: "Price",
        class: "bold",
      },
    
      {
        title: "Tringpartner_6M_3000",
        qty: 1,
        amount: 3000.00,
        class: "light3",
      },  
      {
        title: "Business Numbers",
        qty:2,
        amount: 3600.00,
        class: "light3",
      },  
      {
        title: "Users",
        qty: 4,
        amount: 2400.00,
        class: "light3",
      },
    ],
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
    paymentOptions: false,
    paymentOptionsInsta: false,
    userEmail: "",
    userRole: "",
    agentName: "",
  }),
  computed: {
    computedPrice() {
      return this.discount ? this.price * this.discountedPrice : this.price;
    },
  },
  async created() {
    await this.getBill();
    //  this.getOrderIdforPayment()
  },

  methods: {
    getBill() {
      var token = localStorage.getItem("token");
      var tpu = localStorage.getItem("tpu");
      var Id = JSON.parse(tpu);

      console.log(Id.uid + "-----------" + Id.PlanId);
      console.log(Id);
      const details = {
        // https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/bill/",
        method: "POST",
        data: {
          uid: Id.uid,
          PlanId: Id.PlanId,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };

      this.$axios(details)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // getOrderIdforPayment(){
    // var token = localStorage.getItem("token");
    //   var tpu = localStorage.getItem("tpu");
    //   var Id = JSON.parse(tpu);
    //   console.log(Id);
    // 		const details = {
    // 			url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/bill',
    // 			method: 'POST',
    // 			data: {
    // 				uid: this.uid,
    //         PlanId:Id.PlanId

    // 			},
    //       headers: {
    //     token: token,
    //     "Content-Type": "application/json",
    //   },
    // 		}

    // 		this.$axios(details)
    // 			.then((response) => {
    // 				console.log(response)

    // 			})
    // 			.catch((error) => {
    // 				console.error(error);
    // 			})

    // 	},
  },
};
</script>
