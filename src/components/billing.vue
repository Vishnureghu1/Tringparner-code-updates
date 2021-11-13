<template>
	<v-app class="grey lighten-3">
	<div class="grey lighten-3" >
		<v-container  fluid>
			<v-row justify="center">
				<v-col sm="6" md="4">
					<v-card class="mx-auto">
						<v-overlay :value="overlay">
							<v-progress-circular indeterminate color="red" size="60" :width="6"></v-progress-circular>
						</v-overlay>
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
								<v-dialog v-model="dialog2" transition="dialog-bottom-transition" max-width="300">
									<template v-slot:default="dialog2">
										<v-card outlined shaped elevation="8">
											<v-card-text>
												<div class="text-h6 mt-4 red--text">Payment Closed</div>
											</v-card-text>
											<v-card-actions class="justify-end">
												<v-btn text color="danger" @click="dialog2.value = false" >Close </v-btn>
											</v-card-actions>
										</v-card>
									</template>
								</v-dialog>
								<div>
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">Billing Address and Payment</h3>
									</div>
									<v-form @submit.prevent="" class="mt-3 ml-5 mr-4" ref="form" v-model="valid" lazy-validation >
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
												<v-text-field label="City" v-model="city" readonly required></v-text-field>
												<v-text-field label="State" v-model="state" readonly required></v-text-field>
												
												<h3 v-if="radio == 1" class=" font-weight-regular"> Total Amount Payable : ₹ 590/- </h3>
												<h3 v-else-if="radio == 2" class=" font-weight-regular"> Total Amount Payable : ₹ 3186/-</h3>
												<h3 v-else-if="radio == 3" class=" font-weight-regular"> Total Amount Payable : ₹ 5664/- </h3>
												<div class="text-center">
													<v-dialog v-model="dialog" persistent max-width="500px">
<!-- 														<template v-slot:activator="{ on, attrs }">
															<v-btn color="primary" dark v-bind="attrs" v-on="on" plain > PRICE BREAKUP </v-btn>
														</template> -->
														<v-card>
															<v-card-title>
																<h4 class="font-weight-bold">PRICE BREAKUP</h4>
															</v-card-title>



									<v-radio-group class="ml-5 mt-5 mr-2" v-model="radio">
										<div class="mb-4">

												<v-radio value="1">
												<span slot="label" class="black--text ml-3">Try for 1 month @ just ₹ 500 
													<h3 class="mt-3 text-center"> ₹ 500 + GST</h3>
													<div v-if="radio == 1">
														<h4 class="text-right font-weight-bold mt-3 mb-2">Subtotal : ₹ 500</h4>
														<h4 class="text-right font-weight-regular mb-2">cgst @9% : ₹ 45</h4>
														<h4 class="text-right font-weight-regular mb-2">sgst @9% : ₹ 45</h4>
														<h4 class="font-weight-bold mb-2">Total Amount Payable :₹ 590/-</h4>
													</div>
												</span>
											</v-radio>
						
										<!-- 	<div class=" mb-2 text-center" >Try for 1 month @ just ₹ 500</div> -->
										</div>
										<v-divider></v-divider>

										<div class="mt-5 mb-5">
										
												<v-radio value="2">
												<span slot="label" class="black--text ml-3">Pay for 6 months & Save 10%
													<h3 class="text-center green--text mt-3"><span class="text-decoration-line-through text-center black--text"> ₹ 3000</span> ₹ 2700 + GST</h3>
													<div v-if="radio == 2">
														<h4 class="text-right font-weight-bold mt-3 mb-3">Subtotal : ₹ 2700</h4>
														<h4 class="text-right font-weight-regular mb-3">cgst @9% : ₹ 243</h4>
														<h4 class="text-right font-weight-regular mb-3">sgst @9% : ₹ 243</h4>
														<h4 class="font-weight-bold mb-2">Total Amount Payable :₹ 3186/-</h4>
													</div>
												</span>
											</v-radio>
								
										</div>
										<v-divider></v-divider>

										<div class="mt-5 mb-5">
											
												<v-radio value="3">
												<span slot="label" class="black--text ml-3">Pay for 1 year & Save 20%
													<h3 class="text-center green--text mt-3"><span class="text-decoration-line-through text-center black--text"> ₹ 6000</span> ₹ 4800 + GST</h3>
													<div v-if="radio == 3">
														<h4 class="text-right font-weight-bold mt-3 mb-3">Subtotal : ₹ 4800</h4>
														<h4 class="text-right font-weight-regular mb-3">cgst @9% : ₹ 432</h4>
														<h4 class="text-right font-weight-regular mb-3">sgst @9% : ₹ 432</h4>
														<h4 class="font-weight-bold mb-2">Total Amount Payable :₹ 5664/-</h4>
													</div>
												</span>
											</v-radio>
										</div>
									</v-radio-group>
															<v-card-actions>
																<v-spacer></v-spacer>
																<v-btn color="blue" class="mb-4" text @click="dialog = false"> CANCEL </v-btn>
																<v-btn color="red" class="white--text mb-4" rounded @click="validate"> PROCEED TO PAY </v-btn>
															</v-card-actions>
														</v-card>
													</v-dialog>
													<v-row no-gutters class="mb-4 mt-3">

														<v-col cols="6" sm="6" md="6" lg="6" xl="6" xs="3">
															<v-btn  @click="dialog=true" width="115px" class="blue--text caption font-weight-bold" color='white'> Price Breakup </v-btn>
														</v-col>
														<v-col cols="6" sm="6" md="6" lg="6" xl="6" xs="3">
															<v-btn  type="submit" class="white--text caption font-weight-bold" width="115px" @click="validate" color='light-blue'> Make Payment </v-btn>
														</v-col>
													</v-row>
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
								this.radio = localStorage.getItem('planId')
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
        dialog2 : false,
        order_id : '',
        getOtp : true,
        radio: 'monthly',
        planId: 1,
        pincodeDb : pincodeDB,
        radio: '',
        overlay : false,
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

			uppercase(){
				this.gst = this.gst.toUpperCase();
			},

			validate () {
				this.$refs.form.validate()
				let v = this.$refs.form.validate()
				this.dialog = false
				if (v){
					this.nextPage()
				}
			},

			nextPage(){
				this.overlay = true
				const details = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/owner',
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
								PlanId : this.radio,
								payment_mode : 'web',
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
            color: "#D32F2F"
					},
					modal: {
						ondismiss: () => {
							this.dialog2 = true
						}
					},
				};
				console.log(options)
				var rzp1 = new Razorpay(options);
				this.overlay = false
				rzp1.open();

							})
							.catch((error) => {
								console.error(error);
					})
		

			}
		

    }
  }

</script>

