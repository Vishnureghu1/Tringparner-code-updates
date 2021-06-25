<template>
<v-app class="grey lighten-3">
	<div class="grey lighten-3" >
		<v-container  fluid height="100%">
			<v-row justify="center">
				<v-col sm="12" md="4">
					<v-card class="mx-auto" height="100%">
						<v-overlay :value="overlay"></v-overlay>
						<v-row no-gutters>
							<v-col cols="12">
								<div class="mt-2">
									<v-app-bar color="white" flat>
										<img class="mt-2 ml-1" :src="require('../../public/images/tring-logo.png')" height="35"/>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon color='red' >mdi-chat-outline</v-icon>
										</v-btn>
										<label class='red--text'>support</label>
									</v-app-bar>
								</div>
								<div v-if='numberList'>
									<h4 class="mt-6 text-center">Choose your business number</h4>
									
									<p class="mt-6 text-center">Time Remaining : {{ Math.floor(timerCount/60) }} mins {{ timerCount%60 }} sec</p>
									<div class="ml-5 mr-5">
										<v-progress-linear  color="deep-orange" height="14" :value= 'value' striped ></v-progress-linear>
									</div>
									<v-btn-toggle v-model="toggle_none" >
										<div class="ml-3 mt-5 text-center">
											<v-btn v-for="item in V_numbers" :key="item" class="ml-1 mr-4 mb-5 red--text" outlined color='white' width="44%">{{item}}</v-btn>
										</div>
									</v-btn-toggle>
									<div class="text-center">							
										<v-btn v-if="toggle_none != null" class="mr-4 mb-6 white--text text-center" width="40%" @click.prevent='reserveNumber()' color='light-blue darken-1'> Next </v-btn>
									</div>
								</div>
								<div v-if='confirmNumber'>
									<div class="ml-4 mr-4">
									<h4 class="mt-6 ml-5 text-center">Testing your business number</h4>
									
									<h3 class="mt-6 ml-5 mb-3 text-center red--text"> {{ V_numbers[toggle_none] }}</h3>
									<v-divider></v-divider>
									</div>
									<div class="ml-4 mr-4 mt-5 text-center">
										<h4 class="mb-0 text-center mt-3">You'll soon receive a test call from</h4>
										<h3 class="mb-6 text-center mt-3 blue--text">080-4547-5053</h3>
									</div>
									<div class="ml-4 mr-4 mb-6">
										<v-progress-linear  color="blue" height="18" :value= 'value2' striped ></v-progress-linear>
									</div>
									<div>
										<h4 class="mb-0 text-center mt-3">Initiating test call </h4>
									</div>
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

<script>
import firebase from 'firebase'
import { db } from '@/main.js';
		export default {
			created() {
				firebase.auth().onAuthStateChanged(user => {
					if (user) {
						console.log("logged user details",user)
						this.uid = user.uid
						this.phno = user.phoneNumber.slice(3)
						console.log("logger id", this.uid)
						console.log("logger number", this.phno)

						db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
							querySnapshot.forEach((doc) => {
								console.log(doc.id, " => ", doc.data());
								let user_details = doc.data()
								this.Udata = user_details
								this.currentPage = this.Udata.currentPage
								console.log(this.currentPage)
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
									this.$router.push("/calllogs")
								}
								else if (this.currentPage == "onboarding_dashboard") {
									this.$router.push("/calllogs")
								}


							})
						}).catch((error) => {
							console.log("Error getting documents: ", error);
						})
						const details = {
						url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/list',
						method: 'POST',
						data: {
							uid: this.uid,
							phoneNumber: this.phno
						},
					}
					console.log(details)
					this.$axios(details)
						.then((response) => {
							this.overlay = false
							this.V_numbers = response.data.numbers
							this.timerCount = response.data.Seconds
							this.listingId = response.data.listingId
							this.value = 100 - (0.55*(180-this.timerCount))
							console.log(this.value)
							console.log(response)
							console.log(response.data.numbers)
							console.log(response.data.Seconds)
							this.progressbarTimer(this.value)
							if(this.V_numbers.length === 0){
								alert('Numbers not available , please try later!!')
								this.overlay = true
								this.value = 0
								this.timerCount = 0

							}
							
						})
						.catch((error) => {
							console.error(error);
						})
				}
			})
    },
    data(){
      return{
				timerCount : 180,
				value : 100,
				numberList: true,
				confirmNumber: false,
				value2 : 100,
				V_numbers : [],
				listingId: '',
				phno:'',
				uid:'',
				toggle_none : null,
				changecolor : false,
				overlay: true,

      }
    },
    methods:{
			reserveNumber() {
				let virtualNumber = this.V_numbers[this.toggle_none]
				console.log(virtualNumber)
				const reserve = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/reserve',
					method: 'POST',

					data: {
						uid: this.uid,
						phoneNumber: this.phno,
						virtualNumber: virtualNumber,
						listingId: this.listingId
					},
				}
				console.log(reserve)
        this.$axios(reserve)
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
							uid: this.uid,
							phoneNumber: this.phno,
							currentPage: 'onboarding_testing_completed'
						},
					}
						console.log(user_stage)
						this.$axios(user_stage)
							.then((response) => {
								console.log(response)
							})
							.catch((error) => {
								console.error(error);
							}).finally(() => {
									this.numberList = false
									this.confirmNumber = true
									var initial = true
									if(initial) {
										db.collection('users').where("uid" , "==" , this.uid).onSnapshot((querySnapshot) => {
											querySnapshot.forEach((doc) => {
												console.log(doc.id, " => ", doc.data());
												let testing_status = doc.data()
												console.log("before",initial)
												if((testing_status.testcallType == "Answered" || testing_status.testcallType == "Missed") && initial ) {
													initial = false
													console.log("after",initial)
													console.log("you again")
													this.$router.push("/test_number")
												}
											})
										})
									}
								})
						})
					},
// user stage current page onbording_testing_complete

		progressbarTimer(value) {
					// console.log(value)
					if (value > 0) {
						var myVar = setInterval(() => {
							if (this.value > 0) {
							// console.log('before',this.value)
							this.value = this.value - 0.55
							// console.log('after',this.value)
							// this.value2 = this.value2 - 10
							this.timerCount--;
							// console.log('after',this.timerCount)
						} else {
						this.value = 0
						this.timerCount = 0
					}
						}, 1000);

					}
					else {
						clearInterval(myVar);
						this.value = 0
						this.timerCount = 0
					}
				}
			}
				

  }
</script>
