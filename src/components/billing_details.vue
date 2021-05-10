<template>
	<div>
		<v-container  fluid>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md8>
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
								<div v-if="showBilling">
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">Billing Address and Payment</h3>
									</div>
									<v-form @submit.prevent="" class="mt-3 ml-8 mr-4" ref="form" v-model="valid" lazy-validation >
										<v-checkbox v-model="selected" label="Are you registered for GST" >
										</v-checkbox>
										<v-row>
											<v-col>
												<v-text-field v-if='selected' label="GST Number" :rules="gstRules" @keyup="uppercase" v-model="gst"></v-text-field>
												<v-text-field label="Business Name" v-model="businessName" :rules="nameRules" required></v-text-field>
												<v-text-field label="Your Name" v-model="name" :rules="nameRules" required></v-text-field>
												<v-text-field label="Your Number" prefix="+91" v-model="phno" readonly></v-text-field>
												<v-text-field v-model="email" :rules="emailRules" label="Business E-mail" required ></v-text-field>
												<v-text-field label="Address" v-model="address" :rules="nameRules" required></v-text-field>
												<v-text-field label="Pincode" v-model="pincode" :rules="nameRules" required></v-text-field>
												<v-text-field label="City" v-model="city" :rules="nameRules" required></v-text-field>
												<v-text-field label="State" v-model="state" :rules="nameRules" required></v-text-field>

												<div class="text-center">
													<v-btn  type="submit" class="mr-4 mb-6 mt-6 white--text text-center" width="40%" @click.prevent='nextPage()' color='light-green'> Make Payment </v-btn>
												</div>
											</v-col>
										</v-row>
									</v-form>
								</div>
								<div v-else>
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">Email Verification</h3>
									</div>
									<v-form @submit.prevent="" class="mt-3 ml-8 mr-4" ref="form" v-model="valid" lazy-validation >
										<v-row>
											<v-col v-if="getOtp">
												<v-text-field label="Your Name" v-model="name" :rules="nameRules" required></v-text-field>
												<v-text-field v-model="email" :rules="emailRules" label="Business E-mail" required ></v-text-field>
												<div class="text-center">
													<v-btn type="submit" class="mr-4 mb-6 mt-6 white--text text-center" width="40%" @click.prevent='requestOtp()' color='light-green'> Request Otp </v-btn>
												</div>
											</v-col>
											<v-col v-else>
												<v-text-field label="Enter otp" v-model="otp" required></v-text-field>
												<div class="text-center">
													<v-btn  type="submit" class="mr-4 mb-6 mt-6 white--text text-center" width="40%" @click.prevent='checkOtp()' color='light-green'> Confirm Otp </v-btn>
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
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import firebase from 'firebase'
  export default {
			created() {
								firebase.auth().onAuthStateChanged(user => {
							if (user) {
								console.log("logged user details",user)
								this.uid = user.uid
								this.phno = user.phoneNumber.slice(3)
								console.log("billing il user id", this.uid)
								console.log("billing il user number", this.phno)

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
        rzp: '',
        order_id : '',
        getOtp : true,
        otp : '',
        showBilling : true,
        emailRules: [ 
					v => !!v || 'E-mail is required',
					v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        nameRules: [
					v => !!v || 'Your name is required',
					],
				gstRules: [
					v => !!v || 'GST Number is required',
					v => (v && v.length == 15 ||  'GST must be valid')
					]
        }
      },
    methods :{

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
					})
					.catch((error) => {
						console.error(error);
					}).finally(() => {
							const user_stage = {
							url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/stage',
							method: 'POST',

							data: {
								phoneNumber: this.phno,
								uid: this.uid,
								currentPage: 'onboarding_dashboard'
							},
						}
						console.log(user_stage)
						this.$axios(user_stage)
							.then((response) => {
								console.log(response)
							})
							.catch((error) => {
								console.error(error);
							})
						this.$router.push("/dashboard")
					})

				},

			uppercase(){
				this.gst = this.gst.toUpperCase();
			},

			validate () {
				this.$refs.form.validate()
			},

			nextPage(){
				
				const details = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/owner',
					method: 'POST',

					data: {
								uid: this.uid,
								phoneNumber: this.phno,
								virtual_number: '',
								FirstName: this.name,
								Email: this.email,
								Address: this.address,
								City: this.city,
								State: this.state,
								Gstin: this.gst,
								CompanyName: this.businessName,
								Pincode: this.pincode,
							},
						}
						console.log(details)
            this.$axios(details)
							.then((response) => {
								console.log(response)
								console.log(response.data.OrderId)
								this.order_id = response.data.OrderId


							})
							.catch((error) => {
								console.error(error);
					})
		
				var options = {
					key: "rzp_test_ThdwdEPh3QCHbo",
					key_secret:"YxVNgj57LbcETtXFvrHiQdLd",
					order_id: this.order_id,
					amount: "1000", /// The amount is shown in currency subunits. Actual amount is ₹599.
					name: this.name,
					currency: "INR", // Optional. Same as the Order currency
					description: "Purchase Description",
					image: "https://jolly-volhard-bc2f0b.netlify.com/favicon.ico",
					handler:  (response) =>{
						console.log(response);
						this.showBilling = false
					},
					prefill: {
            name: this.name,
            email: this.email
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
			}

    }
  }

</script>

