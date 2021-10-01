<template>
	<v-app class="grey lighten-3">
	<div class="grey lighten-3" >
		<v-container  fluid>
			<v-row justify="center">
				<v-col sm="12" md="4">
					<v-card class="mx-auto">
						<v-row no-gutters>
							<v-col cols="12">
								<div class="mt-3 ml-3">
									<v-app-bar color="white" flat>
										<img class="mt-2 ml-2" :src="require('../../public/images/tring-logo.png')" height="35"/>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon color='red' >mdi-chat-outline</v-icon>
										</v-btn>
										<label class='red--text'>support</label>
									</v-app-bar>
								</div>
								<div>
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">Billing Address and Payment</h3>
									</div>
									<h4 class="ml-4 mr-4 mt-3">Select Payment Plan</h4>
									<v-radio-group class="ml-1 mr-1" v-model="radio" row >
										<v-radio label="Monthly Plan" value="monthly"></v-radio>
										<v-radio label="Half Yearly Plan" value="halfyearly"></v-radio>
										<v-radio label="Yearly Plan" value="yearly"></v-radio>
									</v-radio-group>

									<v-form @submit.prevent="" class="mt-3 ml-8 mr-4" ref="form" v-model="valid" lazy-validation >
										<v-checkbox v-model="selected" label="Are you registered for GST" >
										</v-checkbox>
										<v-row>
											<v-col>
												<v-text-field v-if='selected' label="GST Number" :rules="gstRules" @keyup="uppercase" v-model="gst"></v-text-field>
												<v-text-field v-if='selected' label="Business Name" v-model="businessName" :rules="businessNameRules" required></v-text-field>
												<v-text-field v-if='selected' v-model="email" :rules="emailRules" label="Business E-mail" required ></v-text-field>
												<v-text-field label="Your Name" v-model="name" :rules="nameRules" required></v-text-field>
												<v-text-field label="Your Number" prefix="+91" v-model="phno" readonly></v-text-field>
												<v-text-field v-if='!selected' v-model="email" :rules="emailRules" label="Your E-mail" required ></v-text-field>
												<v-text-field label="Address" v-model="address" :rules="addressRules" required></v-text-field>
												<v-text-field label="Pincode" v-model="pincode" :rules="pincodeRules" @change="searchPincode()" required></v-text-field>
												<v-text-field label="City" v-model="city" required></v-text-field>
												<v-text-field label="State" v-model="state" required></v-text-field>

												<div class="text-center">
													<v-dialog v-model="dialog" persistent max-width="600px">
														<template v-slot:activator="{ on, attrs }">
															<v-btn color="primary" dark v-bind="attrs" v-on="on" plain > VIEW TAX BRAEKUP </v-btn>
														</template>
														<v-card>
															<v-card-title>
																<h4 class="font-weight-bold">Tax Breakup - Details</h4>
															</v-card-title>
															<v-card-body v-if="radio == 'monthly'">
																<h3 class="mb-3 mt-3 text-center" >Plan - Tringpartner_1M_500</h3>
																<h4 class="font-weight-bold text-center mb-3">Subtotal : 500</h4>
																<div v-if="selected && state == 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">cgst @9% : 45</h5>
																	<h5 class="text-center font-weight-light mb-3">sgst @9% : 45</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 590</h4>
																</div>
																<div v-if="selected && state != 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">igst @18% : 90</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 590</h4>
																</div>
																<div v-if="!selected && state != 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">igst @18% : 90</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 590</h4>
																</div>
																<div v-if="!selected && state == 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">cgst @9% : 45</h5>
																	<h5 class="text-center font-weight-light mb-3">sgst @9% : 45</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 590</h4>
																</div>
															</v-card-body>
															<v-card-body v-else-if="radio == 'halfyearly'">
																<h3 class="mb-3 mt-3 text-center" >Plan - Tringpartner_6M_2700</h3>
																<h4 class="font-weight-bold text-center mb-3">Subtotal : 2700</h4>
																<div v-if="selected && state == 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">cgst @9% : 243</h5>
																	<h5 class="text-center font-weight-light mb-3">sgst @9% : 243</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 3186</h4>
																</div>
																<div v-if="selected && state != 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">igst @18% : 486</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 3186</h4>
																</div>
																<div v-if="!selected && state != 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">igst @18% : 486</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 3186</h4>
																</div>
																<div v-if="!selected && state == 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">cgst @9% : 243</h5>
																	<h5 class="text-center font-weight-light mb-3">sgst @9% : 243</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 3186</h4>
																</div>
															</v-card-body>

															<v-card-body v-else>
																<h3 class="mb-3 mt-3 text-center" >Plan - Tringpartner_1Y_4800</h3>
																<h4 class="font-weight-bold text-center mb-3">Subtotal : 4800</h4>
																<div v-if="selected && state == 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">cgst @9% : 432</h5>
																	<h5 class="text-center font-weight-light mb-3">sgst @9% : 432</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 5664</h4>
																</div>
																<div v-if="selected && state != 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">igst @18% : 664</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 5664</h4>
																</div>
																<div v-if="!selected && state != 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">igst @18% : 664</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 5664</h4>
																</div>
																<div v-if="!selected && state == 'Kerala'">
																	<h5 class="text-center font-weight-light mb-3">cgst @9% : 432</h5>
																	<h5 class="text-center font-weight-light mb-3">sgst @9% : 432</h5>
																	<h4 class="font-weight-bold text-center mb-2">Total Amount Payable : 5664</h4>
																</div>
															</v-card-body>
															<v-card-actions >
																<v-spacer></v-spacer>
																<v-btn color="red" text @click="dialog = false"> CANCEL </v-btn>
															</v-card-actions>
														</v-card>
													</v-dialog>
													<v-btn  type="submit" class="mr-4 mb-6 mt-6 white--text text-center" max-width @click="validate" color='light-blue'> Make Payment </v-btn>
												</div>
											</v-col>
										</v-row>
									</v-form>
								</div>
										<div class="ml-9 mr-4 mb-8">
											<small class="font-weight-light">By proceeding, you agree to our our <a href="
											https://www.tringpartner.com/terms" target="_blank" class="text-blue">Terms &amp; Conditions</a>, <a href="https://www.tringpartner.com/privacy" target="_blank" class="text-blue">Privacy Policy. </a> &amp; <a href="
											https://www.tringpartner.com/terms#fup" target="_blank" class="text-blue"> Fair Usage Policy. </a> </small>
										</div>
							</v-col>	
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</v-app>
</template>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import firebase from 'firebase'
import pincodeDB from "./pincodes.json"
import { db } from '@/main.js';
  export default {
			created() {
				firebase.auth().onAuthStateChanged(user => {
					if (user) {
						console.log("logged user details",user)
						this.uid = user.uid
						this.phno = user.phoneNumber.slice(3)
						console.log("billing il user id", this.uid)
						console.log("billing il user number", this.phno)

					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.Udata = user_details
							this.currentPage = this.Udata.currentPage
							this.virtualnumber = this.Udata.virtualNumber[0]
							console.log(this.virtualnumber)
							if (this.currentPage == "onboarding_listing") {
								this.$router.push("/choose_no")
							}
							else if (this.currentPage == "onboarding_test_completed") {
								this.$router.push("/test_number")
							}
							else if (this.currentPage == "onboarding_plan_details") {
								this.$router.push("/pricing")
							}
							else if (this.currentPage == "onboarding_billing") {
								this.$router.push("/billing")
							}
							else if (this.currentPage == "onboarding_success") {
								this.$router.push("/emailVerification")
							}
							else if (this.currentPage == "onboarding_dashboard") {
								this.$router.push("/downloadApp")
							}


						})
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					})

				}
			})
    },
    data () {
      return {
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
        order_id : '',
        getOtp : true,
        radio: 'monthly',
        planId: 1,
        pincodeDb : pincodeDB,
        otp : '',
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
        }
      },
    methods :{
			searchPincode(){
				console.log(this.pincodeDb)
				console.log(this.pincode)
				// var data = JSON.parse(this.pincodeDb)
				var data = this.pincodeDb
				console.log('before checking',this.pincodeInvalid)
				var result = data.filter((item)=> {
					if (item.id == this.pincode) {
						this.city = item.name.city
						this.state = item.name.state
						console.log(item.name.city)
						console.log(item.name.state)
						this.pincodeInvalid = false
						console.log('false',this.pincodeInvalid)

					}
					else {
						this.pincodeInvalid = true
						// console.log('true',this.pincodeInvalid)
					}
					// console.log('after',this.pincodeInvalid)
				})
			},
			requestOtp(){
				const options = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/email/otp',
					method: 'POST',

					data: {
						uid: this.uid,
						email: this.email
					},
				}
				console.log(options)
        this.$axios(options)
					.then((response) => {
						console.log(response)
						this.getOtp = false
					})
					.catch((error) => {
						console.error(error);
					})
				},

				checkOtp(){
					const options = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/email/verification',
					method: 'POST',

					data: {
						uid: this.uid,
						email: this.email,
						otp : this.otp
					},
				}
				console.log(options)
        this.$axios(options)
					.then((response) => {
						console.log(response)
						this.$router.push("/calllogs")
					})
					.catch((error) => {
						console.error(error);
					})
				},

			uppercase(){
				this.gst = this.gst.toUpperCase();
			},

			validate () {
				this.$refs.form.validate()
				let v = this.$refs.form.validate()
				if (v){
					this.nextPage()
				}
			},

			nextPage(){
				if(this.radio == 'monthly'){
					this.planId = 1
				}else if (this.radio == 'halfyearly') {
					this.planId = 2
				}
				else {
					this.planId = 3
				}
				const details = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/owner',
					method: 'POST',

					data: {
								uid: this.uid,
								phoneNumber: this.phno,
								virtual_number: this.virtualnumber,
								FirstName: this.name,
								Email: this.email,
								Address: this.address,
								City: this.city,
								State: this.state,
								Gstin: this.gst,
								CompanyName: this.businessName,
								Pincode: this.pincode,
								PlanId : this.planId
							},
						}
						console.log(details)
            this.$axios(details)
							.then((response) => {
								console.log('order_id',response)
								console.log(response.data.OrderId)
								this.order_id = response.data.OrderId


				var options = {
					key: "rzp_test_ThdwdEPh3QCHbo",
					
					order_id: this.order_id,
					name: this.name,
					currency: "INR", // Optional. Same as the Order currency
					description: "Purchase Description",

					handler:  (response) =>{
						console.log(response);
						var initial = true
						if(initial) {
							db.collection('users').where("uid" , "==" , this.uid).onSnapshot((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									let testing_status = doc.data()
									if((testing_status.Stage == "PAID") && initial ) {
										initial = false
										this.$router.push("/emailVerification")

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
            color: "#3399cc"
					}
				};
				console.log(options)
				var rzp1 = new Razorpay(options);
				rzp1.open();

							})
							.catch((error) => {
								console.error(error);
					})
		

			}
		

    }
  }

</script>

