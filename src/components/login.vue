<template>
	<div style='background-color:black'>
		<v-container>
			<v-layout row wrap>
				<v-flex class="d-flex justify-center mb-6 pt-6">
					<v-card width="70%" height="100%">
						<v-row no-gutters>
							<v-col cols="lg-6 md-8 sm-12">
								<div class="mt-3 ml-3">
									<v-app-bar color="white" flat>
										<img class="mt-2 ml-2" :src="require('../../public/images/tring-logo.png')" height="35"/>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon color='red' >mdi-chat-outline</v-icon>
										</v-btn>
										<label class='red--text'>CHAT WITH US</label>
									</v-app-bar>
								</div>
								<div class="ml-4">
									<h4 class="mt-6 ml-5">Login or Sign Up</h4>
									<v-container>
										<div class="mt-1 ml-2" v-if="getNumber">
											<form @submit.prevent="submit">
												<v-text-field v-model='phNo' prefix="+91" color='grey darken-4' label="Enter your Phone Number" type='text' required ></v-text-field>
												<v-btn class="mr-4 white--text" width="100%" @click.prevent='sendOtp()' color='light-blue darken-1
												'> REQUEST OTP </v-btn>
												<v-btn class="mr-4 white--text" width="100%" @click.prevent='testing()' color='light-blue darken-1
												'> testing </v-btn>
											</form>
										</div>
										<!-- <div id="recaptcha-container"></div><br> -->
										<div class="mt-1 ml-2" v-if="getOtp">
											<form @submit.prevent="submit">
												<v-text-field v-model='otp' label="Enter OTP" type='text' required ></v-text-field>
												<v-btn class="mr-4" @click.prevent='sendOtp()' color='white lighten-3' width="40%"> RESENT OTP</v-btn>
												<v-btn class="mr-4 white--text" @click.prevent='verifyOtp()' color='light-blue darken-1
												' width="40%"> LOGIN</v-btn>
											</form>
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
							<v-col cols="lg-6 md-8 sm-3">
								<div class="video-wrapper mt-3 ml-15">	
									<video onplay="videoPlayed()" onpause="videoPaused()" width="303" height="448" controls poster="../../public/images/partner/tp_thumbnail.jpg">
									<source src="../../public/images/tp_action.mp4" type="video/mp4">
									</video>
								</div>
							</v-col>
						</v-row>
						<div id="recaptcha-container"></div>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
  </div>
</template>

<script>
	import firebase from 'firebase'
	// import axios from 'axios'
	// import AxiosPlugin from 'vue-axios-cors'

	export default {
    data(){
      return{
				phNo: '',
        name: '',
        appVerifier : '',
        otp : '',
        getNumber : true,
        getOtp : false,
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
        } else {
          let vm = this
          let userid = ''
          console.log(vm)
          let code = this.otp
          window.confirmationResult.confirm(code).then(function (result) {
            // User signed in successfully.
            var user = result.user;
            userid = result.user.uid
            console.log('user details', user)
            console.log('user ID', userid)
          }).catch(function (error) {
            console.log('error details', error)
            // alert('Invalid OTP')
          }).finally(() => {
						this.userId = userid
						console.log('ID', this.userId)
						console.log('phno', this.phNo)
						const options = {
							url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/login',
							method: 'POST',
							data: {
								uid: this.userId,
								phoneNumber: this.phNo
							}
						}
						console.log(options)
            this.$axios(options)
							.then((response) => {
								console.log(response.data)
								console.log(response.data.token)
								localStorage.setItem('token',response.data.token)
								this.$router.push("/choose_no")
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
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          });
          //
          this.appVerifier =  window.recaptchaVerifier
        },1000)
      },
      testing (){
						var user_details = ''
						console.log(this.phNo)
						user_details = { uid: "kugCotqp0JbALG8Xx6BM6pr43R22" , phoneNumber: "8891978085" }
						console.log('U details', user_details)
						console.log('U type',typeof(user_details.phoneNumber))
						const options = {
							url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/login',
							method: 'POST',
							data: {
								uid: "kugCotqp0JbALG8Xx6BM6pr43R22",
								phoneNumber: "8891978085"
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
								this.$router.push("/choose_no")
							})
			}
		},

		created() {
			this.initReCaptcha()
		}
	}
</script>