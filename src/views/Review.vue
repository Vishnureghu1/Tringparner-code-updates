<template>
	<v-app >
			<v-container  fluid>
				<v-layout >
					<v-flex xs12 sm12 md12>						
							<v-row no-gutters>
								<v-col cols="12" align="center" >
								<v-overlay :value="overlay">
									<v-progress-circular indeterminate color="red" size="40" :width="3"></v-progress-circular>
								</v-overlay>
									<v-card color="transparent" outlined class="" max-width="800">
										<h2 class="page_title  mb-4 mt-10">Review Informations and Pay Now</h2>
										<h2 class="sub_title mb-16">Review your business information like business address</h2>
										<v-row>
											<v-col cols="12" sm='6' align="start">	
												<h2 class="name_heading ">Business Name</h2>
												<h2 class="content_title mb-4"> {{name}}</h2>
												<h2 class="name_heading ">Owner Name</h2>
												<h2 class="content_title mb-4">{{name}}</h2>
												<h2 class="name_heading ">Business Address</h2>
												<h2 class="content_title mb-4"> {{address}}</h2>
												<h2 class="name_heading ">Business Phone number</h2>
												<h2 class="content_title mb-4"> +91 {{phno}} </h2>
												<h2 class="name_heading ">Business Email</h2>
												<h2 class="content_title mb-4"> {{email}}</h2>
											</v-col>
											<v-col cols="12" sm='6' align="start">
												<h2 class="name_heading ">Payment Plan</h2>
												<h2 v-if="planId == '1'" class="content_title mb-4"> 1 month - Rs 500</h2>	
												<h2 v-else-if="planId == '2'" class="content_title mb-4"> 6 months - Rs 2700</h2>	
												<h2 v-else-if="planId == '3'" class="content_title mb-4"> 12 months - Rs 4800</h2>	
												<v-row>
													<v-col cols="12" sm='6' align="start">
														<h2 class="name_heading mb-6 ">Actual Cost</h2>
														<h2 v-if="planId != '1'" class="name_heading mb-6 ">Discount</h2>
														<h2 class="name_heading mb-6 ">GST(18%)</h2>
														<h2 class="content_title mb-4 ">Charges</h2>
													</v-col>	
													<v-col cols="12" sm='6' align="end">
														<h2 v-if="planId == '1'" class="content_title mb-4">Rs 500.00</h2>	
														<h2 v-else-if="planId == '2'" class="content_title mb-4">Rs 3000.00</h2>	
														<h2 v-else-if="planId == '3'" class="content_title mb-4">Rs 6000.00</h2>
														<h2 v-if="planId == '2'" class="content_title mb-4">Rs 300.00</h2>	
														<h2 v-else-if="planId == '3'" class="content_title mb-4">Rs 1200.00</h2>	
														<h2 v-if="planId == '1'" class="content_title mb-4">Rs 90.00</h2>	
														<h2 v-else-if="planId == '2'" class="content_title mb-4">Rs 486.00</h2>	
														<h2 v-else-if="planId == '3'" class="content_title mb-4">Rs 864.00</h2>	
														<h2 v-if="planId == '1'" class="content_title mb-4 ">Rs 590.00</h2>
														<h2 v-else-if="planId == '2'" class="content_title mb-4 ">Rs 3186.00</h2>
														<h2 v-else-if="planId == '3'" class="content_title mb-4 ">Rs 5664.00</h2>
													</v-col>
												</v-row>	
											</v-col>
										</v-row>
									<v-btn v-if="planId == '1'" @click = "Paynow()" class="btn_text mt-15 white--text text-capitalize" width="20%" rounded  color='#EE1C25'> Pay Rs 590 </v-btn>
									<v-btn v-if="planId == '2'" @click = "Paynow()" class="btn_text mt-15 white--text text-capitalize" width="20%" rounded  color='#EE1C25'> Pay Rs 3186 </v-btn>
									<v-btn v-if="planId == '3'" @click = "Paynow()" class="btn_text mt-15 white--text text-capitalize" width="20%" rounded  color='#EE1C25'> Pay Rs 5664 </v-btn>
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
import firebase from 'firebase'
import { db } from '@/main.js';
  export default {
    data: () => ({
			radio1 : true,
			radio2 : false,
			radio3 : false,
			address : '',
			state : '',
			city : '',
			phno : '',
			email : '',
			planId : '',
			name : '',
			orderId : '',
			overlay : false,

    }),

		components: {
		},

		created() {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid
					this.phno = user.phoneNumber.slice(3)
					
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.Udata = user_details
							this.currentPage = this.Udata.currentPage
							console.log(this.currentPage)
							if (this.currentPage == "onboarding_listing") {
								this.$router.push("/ChooseNumbers")
							}
							else if (this.currentPage == "onboarding_plan_details") {
								this.$router.push("/SelectPlan")
							}
							else if (this.currentPage == "onboarding_billing" || this.currentPage == "onboarding_revisiting") {
								this.$router.push("/Billing")
							}
							else if (this.currentPage == "onboarding_review") {
								// this.$router.push("/Review")
							}
							else if (this.currentPage == "onboarding_dashboard") {
								this.$router.push("/Dashboard")
							}


						})
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					})
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.virtualNumber = user_details.virtualNumber[0]
							this.address = user_details.Address
							this.city = user_details.City
							this.state = user_details.State
							this.email = user_details.Email
							this.name = user_details.FirstName
							this.phno = user_details.PhoneNumber
							this.planId = user_details.PlanId
							this.orderId = user_details.OrderId

							console.log(user_details.virtualNumber)
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
				}
			})
		},
		methods: {
			Paynow(){
					const details = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/payment',
					method: 'POST',
					headers: {"token":localStorage.getItem("token")},
					data: {
								uid: this.uid,
								owner_uid:this.uid,
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
								PlanId : this.planId,
								payment_mode : 'WEB',
								type:"BASIC"
							},
						};
             this.$axios(details).then(async(responsevalue) => {	
			console.log(responsevalue)
 if(responsevalue.data.status == true){
				var options = {
					key: "rzp_test_ThdwdEPh3QCHbo",					
					order_id: responsevalue.data.OrderId,
					name: this.name,
					currency: "INR", // Optional. Same as the Order currency
					description: "Purchase Description",
					handler:  (response) =>{
						console.log(response);
						this.overlay = true
						var initial = true
						if(initial) {
							db.collection('users').where("uid" , "==" , this.uid).onSnapshot((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									let testing_status = doc.data()
									if((testing_status.Stage == "PAID") && initial ) {
										initial = false
										this.overlay = false
										this.$router.push("/Dashboard")

									}
								})
							})
						}

					},
					prefill: {
            name: this.name,
            email: this.email,
            contact: this.phno
					},
					notes: {
            address: this.address
					},
					theme: {
            color: "#D32F2F"
					},
					modal: {
						ondismiss: () => {
							this.dialog2 = true
						}
					},
				};
				// console.log(options)
				const rzp1 = new Razorpay(options);
				this.overlay = false
				rzp1.open();
		}else{
			console.log("wrong value")
		}
});
				}
               
		}
  }
</script>

<style scoped>
.page_title {
	font-family: 'lato', bold;
  font-size: 23px ;
  color: #3B3B3B;
}
.price_title {
	font-family: 'Nunito', Bold;
  font-size: 23px;
  color: #3B3B3B;
}
.sub_title {
	font-family: 'Nunito', Light;
  font-size: 12px;
  color: #3B3B3B;
}
.name_heading {
	font-family: 'Nunito', light;
  font-size: 10px;
  color: #808080;	
}
.number_heading {
	font-family: 'Nunito', Regular;
  font-size: 24px; 	
  color: #3B3B3B;
}
.content_title {
	font-family: 'Nunito', Regular;
  font-size: 14px;
  color: #3B3B3B;
}

.number_heading.v-btn--outlined {
    border: thin solid #EE1C25;
  }
.v-btn:before {
	color: #f3f9f3;

}
.btn_text{
	font-family: 'Nunito', light;
  font-size: 14px;
}

</style>