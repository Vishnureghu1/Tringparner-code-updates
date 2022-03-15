<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12 class="billing_information">
          <v-row no-gutters>
            <v-col cols="12">
              <!-- <v-overlay :value="overlay">
									<v-progress-circular indeterminate color="red" size="40" :width="3"></v-progress-circular>
								</v-overlay> -->
              <div class="ml-8">
                <v-row>
                  <v-col cols="12" sm="10">
                    <h2 class="page_title mt-6 mb-5">Billing Informations</h2>
                  </v-col>
                  <v-col cols="12" sm="2" align="end">
                    <span
                      ><v-icon class="mt-6 mb-5 mr-7" color="black"
                        >mdi-filter-variant</v-icon
                      >
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5" sm="5">
                    <v-card class="mx-auto">
                      <v-card-text class="pb-0">
                        <div class="mb-2"><div class="membership_heading pb-2">Facebook Number</div>
						<div class="membership_subheading">Current Bill (Inclusive of GST)</div></div>
                        <div class="membership_price">500.00<span class="currency_symbol">INR</span></div>
						<p class="redtext">Due on 01 June 2021</p>
                      
                        <div class="membership_details">
							<v-checkbox
              v-model="paymentOptions"
              label="red darken-3"
              color="red darken-3"
            
              hide-details 
            >  
<template v-slot:label>
				
        <div class="black--text">Upgrade plan for<strong class="black--text darken-4"> 20% Discount</strong></div>
        </template></v-checkbox>
			<div v-if="paymentOptions">
                         <v-radio-group
              v-model="ex7"
              column
            >
			<v-radio value="1"  color="red" class="mb-5 ml-5 pl-3">
        <template v-slot:label>
          <div class="black--text">Pay for 6 Months and<strong class="black--text darken-4"> Save 10%</strong><br><span class="grey--text light-3 ">Rs 450/month. Save Rs 300</span></div>
        </template>
      </v-radio>
	<v-radio value="2"  color="red"  class="mb-0 ml-5 pl-3">
        <template v-slot:label>
        <div class="black--text">Pay for 6 Months and<strong class="black--text darken-4"> Save 10%</strong><br><span class="grey--text light-3 ">Rs 450/month. Save Rs 300</span></div>
        </template>
      </v-radio>
     
						</v-radio-group>
			</div>
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          class="text-capitalize  ma-3 rounded-pill red_button"  min-width="140px"
                          color="white"  outlined
                        >
                          Pay Now
                        </v-btn>
                        <v-btn color="red"
                          text
                          class=" ma-2 text-capitalize   rounded-pill p-3 red_button_outline" min-width="140px"
                           
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
                            <p class="text-h4 text--primary">Origin</p>
                            <p>
                              late 16th century (as a noun denoting a place
                              where alms were distributed): from medieval Latin
                              eleemosynarius, from late Latin eleemosyna ‘alms’,
                              from Greek eleēmosunē ‘compassion’
                            </p>
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
                  </v-col>
                  <v-col cols="5" sm="5">
                    


					<v-card class="mx-auto">
                      <v-card-text class="pb-0">
                        <div class="mb-2"><div class="membership_heading pb-2">Instagram Number</div>
						<div class="membership_subheading">Current Bill (Inclusive of GST)</div></div>
                        <div class="membership_price">500.00<span class="currency_symbol">INR</span></div>
						<p class="redtext">Due on 01 June 2021</p>
                      
                        <div class="membership_details">
							<v-checkbox
              v-model="paymentOptionsInsta"
              label="red darken-3"
              color="red darken-3"
            
               
            ><template v-slot:label>
        <div class="black--text">Upgrade plan for<strong class="black--text darken-4"> 20% Discount</strong></div>
        </template></v-checkbox>
			<div v-if="paymentOptionsInsta">
                         <v-radio-group
              v-model="ex7"
              column
            >
			<v-radio value="1"  color="red" class="mb-5 ml-5 pl-3">
        <template v-slot:label>
          <div class="black--text">Pay for 6 Months and<strong class="black--text darken-4"> Save 10%</strong><br><span class="grey--text light-3 ">Rs 450/month. Save Rs 300</span></div>
        </template>
      </v-radio>
	<v-radio value="2"  color="red"  class="mb-0 ml-5 pl-3">
        <template v-slot:label>
        <div class="black--text">Pay for 6 Months and<strong class="black--text darken-4"> Save 10%</strong><br><span class="grey--text light-3 ">Rs 450/month. Save Rs 300</span></div>
        </template>
      </v-radio>
     
						</v-radio-group>
			</div>
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          class="text-capitalize  ma-3 rounded-pill red_button"  min-width="140px"
                          color="white"  outlined
                        >
                          Pay Now
                        </v-btn>
                        <v-btn color="red"
                          text
                          class=" ma-2 text-capitalize   rounded-pill p-3 red_button_outline" min-width="140px"
                           
                         @click="instagram_info = true"
                        >
                          View Detail
                        </v-btn>
                      </v-card-actions>

                      <v-expand-transition>
                        <v-card
                          v-if="instagram_info"
                          class="transition-fast-in-fast-out v-card--reveal"
                          style="height: 100%"
                        >
                          <v-card-text class="pb-0">
                            <p class="text-h4 text--primary">Origin</p>
                            <p>
                              late 16th century (as a noun denoting a place
                              where alms were distributed): from medieval Latin
                              eleemosynarius, from late Latin eleemosyna ‘alms’,
                              from Greek eleēmosunē ‘compassion’
                            </p>
                          </v-card-text>
                          <v-card-actions class="pt-0">
                            <v-btn
                              class=""
                              text
                              color="red accent-4"
                              @click="instagram_info = false"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-expand-transition>
                    </v-card>
                  </v-col>
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
    facebook_info: false,
	instagram_info: false,
	paymentOptions:false,
	paymentOptionsInsta:false,
    userEmail: "",
    userRole: "",
    agentName: "",
  }),
computed:{
   computedPrice() { 
     return this.discount ? this.price * this.discountedPrice : this.price
   }
 },
  async created() {
    await this.getBill()
    //  this.getOrderIdforPayment()
  },

 methods:{
			getBill(){
			var token = localStorage.getItem("token");
        var tpu = localStorage.getItem("tpu");
        var Id = JSON.parse(tpu);

        console.log(Id.uid+'-----------'+Id.PlanId);
        console.log(Id);
					const details = {
                  // https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/bill/',
						method: 'POST',
						data: {
							uid: Id.uid,
              PlanId:Id.PlanId
				
						},
            headers: {
          token: token,
          'Content-Type': 'application/json'
        },
					}
					
					this.$axios(details)
						.then((response) => {
							console.log(response)
						
							
							
						})
						.catch((error) => {
							console.error(error);
						})
					
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
