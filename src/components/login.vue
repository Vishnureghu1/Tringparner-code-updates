<template>
	<v-app >
			<v-container  fluid>
				<v-layout >
					<v-flex xs12 sm12 md12>
							<v-row no-gutters>
								<v-col cols="12" align="center">
									<v-overlay :value="overlay">
										<v-progress-circular indeterminate color="red" size="40" :width="3"></v-progress-circular>
									</v-overlay>
									<v-card color="transparent" outlined class="" max-width="280">
										<h2 class="page_title mt-16 mb-13">Welcome to Tring Partner</h2>
										<h2 class="sub_title mt-8 mb-13">Use your mobile number to get started with Tring Partner</h2>
										<div>
											<div class="mt-1 ml-2" v-if='getNumber'>
												<h4 class="name_heading mt-4 ml-2" align="start">Login or Sign Up</h4>
												<v-form @submit.prevent="submit">
													<v-text-field outlined v-model='phNo' prefix="+91" color='grey darken-4' label="Mobile Number" type='text' :rules="numberRules" required class="mt-4" ></v-text-field>
													<v-btn class="btn_text mt-15 white--text text-capitalize" width="70%" rounded @click.prevent='sendOtp()' color='#EE1C25
													'> Next </v-btn>
												</v-form>
											</div>	
											<div class="mt-1 ml-2" v-if="getOtp">
												<h4 class="name_heading mt-4" align="start">Enter OTP</h4>
												<v-otp-input length="6" v-model="otp"></v-otp-input>
												<div class="mt-4"> 
													<a class="link_style text-decoration-underline" @click.prevent='sendOtp()'>
														Resend OTP
													</a> 
													<br>
													<br> 
													<a class="link_style text-decoration-underline" @click="changeLoginNumber()">
														Change Number
													</a>
												</div>
												<v-btn class="btn_text mt-15 white--text text-capitalize" width="70%" rounded @click.prevent='verifyOtp()' color='#EE1C25
													'> Submit </v-btn>
											</div>
										</div>
									</v-card>
									<div id="recaptcha-container"></div>
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
			otp: 'XXXXXX',
			getNumber : true,
			getOtp : false,
			numberRules: [ 
				v => /^[0-9]*$/.test(v) || 'No characters Allowed',
				],
			phNo: '',
			uid : '',
			currentPage: '',
			dialog : false,
			errorMessage: '',
			role : '',
			overlay : false
    }),
		components: {
		},

		created() {
			this.initReCaptcha()
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					this.uid = user.uid
					this.phno = user.phoneNumber.slice(3)
					db.collection('users').where("uid", "==", this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							console.log('<-------------------LOGGING USER DETAILS----------------------->');
							localStorage.setItem('tpu', JSON.stringify(doc.data()));
							let user_details = doc.data()
							this.Udata = user_details
							this.currentPage = this.Udata.currentPage
							this.role = this.Udata.role
							if (this.role == 'ADMIN' || this.role == 'AGENT') {
								this.$router.push("/dashboard")
							} else {
								if (this.currentPage == "onboarding_listing") {
									this.$router.push("/ChooseNumbers")
								} else if (this.currentPage == "onboarding_plan_details") {
									this.$router.push("/SelectPlan")
								} else if (this.currentPage == "onboarding_billing") {
									this.$router.push("/Billing")
								} else if (this.currentPage == "onboarding_review") {
									this.$router.push("/Review")
								} else if (this.currentPage == "onboarding_dashboard" || this.currentPage == "onboarding_success") {
									this.$router.push("/dashboard")
								}
							}
						})
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					})
				}
			})
		},
		methods: {
			sendOtp() {
				this.otp = 'XXXXXX'
				if (this.phNo.length != 10) {
					alert('Invalid Phone Number Format !');
				} else {
					this.getNumber = false
					this.getOtp = true
					let countryCode = '+91'
					let phoneNumber = countryCode + this.phNo
					let appVerifier = this.appVerifier
					firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
						.then((confirmationResult) => {
							window.confirmationResult = confirmationResult;
						})
						.catch((error) => {
							this.errorMessage = error.message
							console.log(this.errorMessage)
						})
				}
			},
		changeLoginNumber() {
			this.phNo = ''
			this.getNumber = true
			this.getOtp = false
		},
		verifyOtp() {
			if (this.otp.length != 6) {
				alert('Invalid OTP Format !');
			} else {
				this.overlay = true
				let userid = ''
				let code = this.otp
				window.confirmationResult.confirm(code).then(function(result) {
						userid = result.user.uid;
					})
					.catch(function(error) {
						console.log('error details', error)
					})
					.finally(() => {
						this.uid = userid
						console.log('ID', this.uid)
						console.log('phno', this.phNo)
						const options = {
							url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/login',
							method: 'POST',
							data: {
								uid: this.uid,
								phoneNumber: this.phNo
							}
						}
						console.log(options)
						this.$axios(options)
							.then((response) => {
								console.log(response.data)
								console.log(this.uid)
								localStorage.setItem('token', response.data.token)
								db.collection('users').where("uid", "==", this.uid).get().then((querySnapshot) => {
										querySnapshot.forEach((doc) => {
											console.log(doc.id, " => ", doc.data());
											console.log('<-------------------VERIFY OTP LOGGING USER DETAILS----------------------->');
											localStorage.setItem('tpu', JSON.stringify(doc.data()));
											let user_details = doc.data()
											this.Udata = user_details
											this.currentPage = this.Udata.currentPage
											this.role = this.Udata.role
											console.log(this.currentPage)
											console.log(this.role)
											if (this.role == 'ADMIN' || this.role == 'AGENT') {
												this.overlay = false
												this.$router.push("/dashboard").catch(() => {});
											} else {
												if (this.currentPage == "onboarding_listing") {
													this.overlay = false
													this.$router.push("/ChooseNumbers").catch((err) => {console.log(err)});
												} else if (this.currentPage == "onboarding_plan_details") {
													this.overlay = false
													this.$router.push("/SelectPlan").catch(() => {});
												} else if (this.currentPage == "onboarding_billing") {
													this.overlay = false
													this.$router.push("/Billing").catch(() => {});
												} else if (this.currentPage == "onboarding_review") {
													this.overlay = false
													this.$router.push("/Review").catch(() => {});
												} else if (this.currentPage == 'onboarding_dashboard' || this.currentPage == 'onboarding_success') {
													this.overlay = false
													this.$router.push("/dashboard").catch(() => {});
												} else {
													const user_stage = {
														url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/user/stage',
														method: 'POST',
														data: {
															uid: this.uid,
															phoneNumber: this.phno,
															currentPage: 'onboarding_listing'
														},
													}
													console.log(user_stage)
													this.$axios(user_stage)
														.then((response) => {
															console.log(response)
															this.overlay = false
															this.$router.push("/ChooseNumbers").catch(() => {});
														})
														.catch((error) => {
															console.error(error);
														})
												}
											}
										})
									})
									.catch((error) => {
										console.log("Error getting documents: ", error);
									})
							})
							.catch((error) => {
								console.error(error);
							})
					});
			}
		},
		initReCaptcha() {
			setTimeout(() => {
				let vm = this
				console.log('render on create', vm)
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
					'size': 'invisible',
					'callback': function(response) {
						console.log('reCAPTCHA', response)
					},
					'expired-callback': function() {}
				});
				this.appVerifier = window.recaptchaVerifier
			}, 1000)
		},
	}
  }
</script>

<style scoped>
.page_title {
	font-family: 'Lato', Bold, !important;
  font-size: 23px 
}
.sub_title {
	font-family: 'Nunito', light, !important;
  font-size: 16px;
  color: #3B3B3B;
}
.name_heading {
	font-family: 'Nunito', light, !important;
  font-size: 14px;
  color: #3B3B3B;	
}
.number_heading {
	font-family: 'Nunito', light, !important;
  font-size: 37px; 	
  color: #3B3B3B;
}
.comment_heading {
	font-family: 'Nunito', Regular, !important;
  font-size: 10px;
  color: #808080;
}
.link_style{
	color: #EE1C25;
}
.btn_text{
	font-family: 'Nunito', light, !important;
  font-size: 14px;
}
</style>
