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
										<label class='primary--text'>support</label>
									</v-app-bar>
								</div>
								<div>
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">Email Verification</h3>
									</div>
									<v-form @submit.prevent="" ref="form" v-model="valid" lazy-validation >
										<v-row class="mt-3 ml-6 mr-4">
											<v-col v-if="getOtp">
												<v-text-field label="Your Name" v-model="name" :rules="nameRules" required></v-text-field>
												<v-text-field v-model="email" :rules="emailRules" label="Business E-mail" required ></v-text-field>
												<v-text-field label="Source Name of your Business Number" append-icon="mdi-pencil" hint="Change source name of your business number. For Example : Facebook, Linkedin etc" v-model="source" persistent-hint></v-text-field>
												<div class="text-center">
													<v-btn type="submit" class="mt-6 mb-4 white--text text-center" max-width @click.prevent='requestOtp()' color='light-green'> Request Otp </v-btn>
												</div>
											</v-col>
											<v-col v-else>
												<v-text-field v-model="email" :rules="emailRules" label="Business E-mail" required ></v-text-field>
												<v-form @submit.prevent="" ref="form" v-model="valid" lazy-validation >
													<v-text-field label="Enter OTP" :rules="[otpConfirmationRule]" v-model="otp" required></v-text-field>
												</v-form>
											</v-col>
										</v-row>
										<div class="text-center" v-if="!getOtp">
											<v-spacer></v-spacer>
											<v-btn type="submit" class="mt-6 mb-4 mr-2 white--text text-center" max-width @click.prevent='requestOtp()' color='primary'> Resend Otp </v-btn>
											<v-btn  type="submit" class="mt-6 mb-4 white--text text-center" max-width @click.prevent='checkOtp()' color='primary'> Confirm Otp </v-btn>
										</div>
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
							this.name = this.Udata.FirstName
							this.email = this.Udata.Email
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
        phno : '',
        name: '',
        email: '',
        virtualnumber : '',
        source : 'General',
        otpCorrect : true ,
        getOtp : true,
        otp : '',
        emailRules: [ 
					v => !!v || 'E-mail is required',
					v => /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v) || 'E-mail must be valid',
				],
				nameRules: [
					v => !!v || 'Your Name is required',
					v => (v && v.length < 50 ||  'Too many characters.Please try again !!'),
					v => /^[a-zA-Z][a-zA-Z ]+$/.test(v) || 'Name should not contain symbols or digits. Please try again.',

					],
					// otpRule : [
					// 	v => (v.length < 5 || 'Too many characters.Please try again !!' ),
					// ]
        }
      },
      computed: {
    otpConfirmationRule() {
      return () => ( this.otpCorrect || 'Invalid OTP' )
    }
},
    methods :{
			requestOtp(){
				const options = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/email/otp',
					method: 'POST',

					data: {
						uid: this.uid,
						email: this.email,
						source: this.source
					},
				}
				console.log(options)
        this.$axios(options)
					.then((response) => {
						console.log(response)
						this.$analytics.logEvent("Web Email Otp send");
						this.getOtp = false
					})
					.catch((error) => {
						console.error(error);
					})
				},
				validate () {
					this.$refs.form.validate()
					let v = this.$refs.form.validate()
				},

				checkOtp(){
					const options = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/email/verification',
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
						console.log(response.data.status)
						if (response.data.status){
							this.otpCorrect = true
							this.validate()
							this.$analytics.logEvent("Web Email verification");
							this.$router.push("/downloadApp")
						}
						else {
							this.otpCorrect = false
							this.validate()
							console.log("invalid otp")
						}
					})
					.catch((error) => {
						console.error(error);
					})
				},
	

    }
  }

</script>

