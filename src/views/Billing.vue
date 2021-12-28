<template>
	<v-app >
			<v-container  fluid>
				<v-layout >
					<v-flex xs12 sm12 md12>						
							<v-row no-gutters>
								<v-col cols="12" align="center" >
									<v-card color="transparent" outlined class="" max-width="800">
										<v-row>
											<v-col cols="12" sm='6'>	
												<h2 class="page_title mt-16 mb-4">Enter your billing details</h2>	
												<v-form @submit.prevent="" class="mt-3 ml-5 mr-4" ref="form" v-model="valid" lazy-validation >
													<v-text-field outlined label="Business Name" v-model="businessName" :rules="businessNameRules" required></v-text-field>
													<v-text-field outlined label="Billing Name" v-model="billingName" :rules="businessNameRules" required></v-text-field>
													<v-text-field outlined label="Address" v-model="address" :rules="addressRules" required></v-text-field>
													<v-text-field outlined label="City" v-model="city"  required></v-text-field>
													<v-text-field outlined label="State" v-model="state"  required></v-text-field>
												
													<v-text-field outlined label="Pincode" v-model="pincode" ></v-text-field>
													<v-text-field outlined label="GST No(if any)" v-model="gst" :rules="gstRules" ></v-text-field>

												</v-form>
											</v-col>
											<v-col cols="12" sm='6'>
												<h2 class="page_title mt-16 mb-4">Enter your number info</h2>		
													<v-text-field outlined label="Business Name" v-model="businessName" :rules="businessNameRules" required></v-text-field>								
											</v-col>
										</v-row>
									<v-btn class="btn_text mt-8 white--text text-capitalize" width="12%" @click.prevent='nextPage()' rounded  color='#EE1C25'> Next </v-btn>
									</v-card>
								</v-col>
							</v-row>
					</v-flex>
				</v-layout>
			</v-container>
	</v-app>
</template>


<script>
import firebase from 'firebase'
import { db } from '@/main.js';
  export default {
    data: () => ({
			radio1 : true,
			radio2 : false,
			radio3 : false,
      selected: true,
      valid: true,
      gst: '',
      phno : '',
      name: '',
      email: '',
      businessName: '',
      city: '',
      address: '',
      pincode : '',
      state: '',
      virtualnumber : '',
      rzp: '',
      dialog2 : false,
      order_id : '',
      getOtp : true,
      otp : '',
      planId : '',
      pincodeInvalid : true,
			dialog: false,
      emailRules: [ 
				v => !!v || 'E-mail is required',
				v => /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v) || 'E-mail must be valid',
			],
			nameRules: [
				v => !!v || 'Your Name is required',
				v => (v && v.length < 50 ||  'Too many characters.Please try again !!'),
				v => /^[a-zA-Z][a-zA-Z ]+$/.test(v) || 'Name should not contain symbols or digits. Please try again.',

				],
			gstRules: [
				v => !!v || 'GST Number is required',
				v => (v && v.length == 15 ||  'GST must contain 15 characters'),
				v => /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[a-zA-Z][0-9a-zA-Z]{1}$/.test(v) || 'GST must be valid',
				],
			businessNameRules : [
				v => !!v || 'Your Business name is required',
				v => (v && v.length < 100 ||  'Too many characters.Please try again !!'),
				v => /[a-zA-Z][a-zA-Z ]*/.test(v) || 'Business Name should not contain symbols or digits. Please try again.',

				],					
			addressRules : [
				v => !!v || 'Your Address is required',
				v => (v && v.length < 100 ||  'Too many characters.Please try again !!'),

				],
			pincodeRules : [
				v => !!v || 'Your Pincode is required',
				v => (v && v.length == 6 ||  'Pincode must contain 6 digits. Invalid Pincode !!'),
				v => /^[0-9]*$/.test(v) || 'Pincode must contain 6 digits',
				],
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
							let user_details = doc.data()
							this.virtualnumber = user_details.virtualNumber[0]
							this.planId = user_details.PlanId
						})
					})
				}
			})
		},
		methods: {
			nextPage(){
				this.overlay = true
				const details = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/owner',
					method: 'POST',

					data: {
								uid: this.uid,
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
							},
						}
						console.log(details)
            this.$axios(details)
							.then((response) => {
								console.log('order_id',response)
								const user_stage = {
									url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/stage',
									method: 'POST',

									data: {
												uid: this.uid,
												phoneNumber: this.phno,
												currentPage: 'onboarding_review',
												plan_id : this.planId
									},
								}
								console.log(user_stage)
								this.$axios(user_stage)
									.then((response) => {
										console.log(response)
										this.$router.push("/Review")
									})
									.catch((error) => {
										console.error(error);
									})
								
							})
							.catch((error) => {
								console.error(error);
					})
			}
		}
  }
</script>

<style scoped>
.page_title {
	font-family: 'Nunito', Regular;
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
  font-size: 14px;
  color: #3B3B3B;	
}
.number_heading {
	font-family: 'Nunito', Regular;
  font-size: 24px; 	
  color: #3B3B3B;
}
.offer_title {
	font-family: 'Nunito', Bold;
  font-size: 14px;
  color: #EE1C25;
}
.link_style{
	color: #EE1C25;
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
.v-application .error {
    background-color: #ff5252 !important;
    border-color: #ff5252 !important;
    transform: rotate(
45deg
);
}
</style>