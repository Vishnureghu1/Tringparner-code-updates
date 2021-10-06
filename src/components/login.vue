<template>
	<v-app class="grey lighten-3">
	<div class="grey lighten-3" >
		<v-container >
		<!-- 	<v-layout > -->
				<v-row justify="center">
					<v-col sm="12" lg="9"  class="mx-sm-auto my-md-16">
						<v-card>
							<v-row no-gutters >
								<v-col  sm="12" md="6" justify="center">
									<div class="mt-3 ml-3">
										<v-app-bar color="white" flat>
											<img class="mt-2 ml-2" :src="require('../../public/images/tring-logo.png')" height="35"/>
											<v-spacer></v-spacer>
											<v-btn icon>
												<v-icon color='red text-subtitle-2' >mdi-chat-outline</v-icon>
											</v-btn>
											<label class='red--text text-subtitle-2'>CHAT WITH US</label>
										</v-app-bar>
									</div>
									<div class="ml-4">
										<h4 class="mt-6 ml-5">Login or Sign Up</h4>
										<v-container>
											<div class="mt-1 ml-2" v-if="getNumber">
												<v-form @submit.prevent="submit">
													<!-- <p>{{ phno }} </p> -->
													<v-text-field v-model='phNo' prefix="+91" color='grey darken-4' label="Enter your Phone Number" type='text' :rules="numberRules" required ></v-text-field>
													<v-btn class="mr-4 white--text" width="100%" @click.prevent='sendOtp()' color='light-blue darken-1
													'> REQUEST OTP </v-btn>
													<!-- <v-btn class="mr-4 white--text" width="100%" @click.prevent='testing()' color='light-blue darken-1
													'> testing </v-btn> -->
												</v-form>
											</div>
											<!-- <div id="recaptcha-container"></div><br> -->
											<div class="mt-1 ml-2" v-if="getOtp">
												<v-form @submit.prevent="submit">
													<v-text-field v-model='otp' label="Enter OTP" type='text' required ></v-text-field>
													<v-btn class="mr-4" @click.prevent='sendOtp()' color='white lighten-3' width="40%"> RESENT OTP</v-btn>
													<v-btn class="mr-4 white--text" @click.prevent='verifyOtp()' color='light-blue darken-1
													' width="40%"> LOGIN</v-btn>
												</v-form>
											</div>
										</v-container>
										<p class="mt-1 ml-5 font-weight-regular">For verification, an sms will be be sent to your mobile number. By proceeding, you agree to our <a href="https://www.tringpartner.com/terms" target="_blank"  class="text-blue">Terms & Conditions</a> & <a href="https://www.tringpartner.com/privacy" target="_blank" class="text-blue">Privacy Policy. </a>
										</p>
										<div>
											<p class="ml-5 mt-4 grey--text font-weight-medium">Trusted by</p>
											<v-flex class="d-flex justify-space-around mb-5">
												<img class="mt-2 ml-2" :src="require('../../public/images/partner/1_a.png')" height="20"/>
												<img class="mt-2 ml-2" :src="require('../../public/images/partner/2_a.png')" height="20"/>
												<img class="mt-2 ml-2" :src="require('../../public/images/partner/3_a.png')" height="20"/>
												<img class="mt-2 ml-2" :src="require('../../public/images/partner/4_a.png')" height="20"/>
											</v-flex>
										</div>
									</div>
								</v-col>
								<v-col sm="12" md="6">
									<div class="video-wrapper mt-3 ml-10  ml-md-9 ">	
										<video onplay="videoPlayed()" onpause="videoPaused()" width="303" height="448" controls poster="../../public/images/partner/tp_thumbnail.jpg">
										<source src="../../public/images/tp_action.mp4" type="video/mp4">
										</video>
									</div>
								</v-col>
							</v-row>
							<div id="recaptcha-container"></div>
						</v-card>
					</v-col>
				</v-row>
		</v-container>
  </div>
</v-app>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js';

	export default {

	data(){
		return{
		appVerifier : '',
		otp : '',
		getNumber : true,
		getOtp : false,
		phNo : '',
		uid : '',
		currentPage: '',
		role : '',
		numberRules: [ 
			// v => (v && v.length == 10 ||  'Number must contain 10 digits. Invalid Number !!'),
			v => /^[0-9]*$/.test(v) || 'No characters Allowed',
			],
		}
	},

	methods: {

			sendOtp(){
				if(this.phNo.length != 10){
					alert('Invalid Phone Number Format !');
				} else {
					this.getNumber = false
					this.getOtp = true
					let countryCode = '+91'
					let phoneNumber = countryCode + this.phNo
					let appVerifier = this.appVerifier
					firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
						.then(function (confirmationResult) {
							window.confirmationResult = confirmationResult;
						}).catch(function (error) {
							console.log('sms not sent', error)
							alert('Error ! SMS not sent')
						});
				}
			},

			verifyOtp(){
		if(this.otp.length != 6){
			alert('Invalid OTP Format !');
		}	else {
			let vm = this
			let userid = ''
			console.log(vm)
			let code = this.otp
			window.confirmationResult.confirm(code).then(function (result) {
			var user = result.user;
			userid = result.user.uid;
			console.log('user details', user)
			console.log('user details', userid)
			// this.uid = this.userid
			console.log('chumma data',this.uid)
			}).catch(function (error) {
			console.log('error details', error)
			// alert('Invalid OTP')
			}).finally(() => {
						this.uid = userid
						console.log('ID', this.uid)
						console.log('phno', this.phNo)
						const options = {
							url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/login',
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
								console.log(response.data.token)
								localStorage.setItem('token',response.data.token)
								db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
										console.log(doc.id, " => ", doc.data());
										let user_details = doc.data()
										this.Udata = user_details
										this.currentPage = this.Udata.currentPage
										this.role = this.Udata.role
										console.log(this.currentPage)
										console.log(this.role)
										if(this.role == 'ADMIN' || this.role == 'AGENT') {
											this.$router.push("/calllogs")
										}
										else {

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
											else {
												const user_stage = {
												url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/stage',
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
													this.$router.push("/choose_no")
												})
												.catch((error) => {
													console.error(error);
												})
											}
										}

										})
										}).catch((error) => {
											console.log("Error getting documents: ", error);
										})



								

							})
							.catch((error) => {
								console.error(error);
							})
						// this.writeDb() 
			});
				}
		},

			initReCaptcha(){
		setTimeout(()=>{
			let vm = this
			console.log('render on create',vm)
			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
			'size': 'invisible',
			'callback': function(response) {
				console.log('reCAPTCHA', response)
			},
			'expired-callback': function() {
			}
			});

			this.appVerifier =  window.recaptchaVerifier
		},1000)
		},
		testing (){
						// let phoneNumber = this.phNo
						this.$store.commit('chumma', {phoneNumber : this.phNo})

						var user_details = ''
						console.log(this.phNo)
						user_details = { uid: "kugCotqp0JbALG8Xx6BM6pr43R22" , phoneNumber: "8891978085" }
						console.log('U details', user_details)
						console.log('U type',typeof(user_details.phoneNumber))
						const options = {
							url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/login',
							method: 'POST',
							data: {
								uid: 'v1otGb9OZnTXbgsekcB7mVfpzgI3',
								phoneNumber: '8428258159'
							}
						}
			this.$axios(options)
							.then((response) => {
								console.log(response.data)
								console.log(response.data.token)
								localStorage.setItem('token',response.data.token)
							})
							.catch((error) => {
								console.error(error);
							}).finally(() => {
								// this.$root.$emit('Token', response.data.token);
								console.log(this.mynumber)
								console.log(this.myuid)
								// eventBus.$emit('phno', this.mynumber);
								// eventBus.$emit('uid', this.myuid);
								this.$router.push("/choose_no")
							})
			}
		},

		created() {
			this.initReCaptcha()	
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid
					this.phno = user.phoneNumber.slice(3)
					console.log("user id", this.uid)
					console.log("user number", this.phno)

					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.Udata = user_details
							this.currentPage = this.Udata.currentPage
							console.log(this.currentPage)
							this.role = this.Udata.role
							console.log(this.currentPage)
							console.log(this.role)
							if(this.role == 'ADMIN' || this.role == 'AGENT') {
								this.$router.push("/calllogs")
							}
							else {
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
							}


						})
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					})
				}
			})
			let url = new URL(location.href).searchParams.get('number')
			this.phNo = url
		}
	}
	

</script>