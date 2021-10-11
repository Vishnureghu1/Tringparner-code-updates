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
									
									<p class="mt-6 text-center" v-if="(timerCount%60) != -1" >Time Remaining : {{ Math.floor(timerCount/60) }} mins {{ timerCount%60 }} sec</p>
									<p class="mt-6 text-center" v-else > Timed Out !!! </p>
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
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="400"
      >
        <template v-slot:default="dialog">
          <v-card outlined shaped elevation="8">
            <v-card-text>
              <div class="text-h6 mt-4 red--text">No numbers Available </div>
              <div class="text-h6 mt-2 red--text">Try after sometime !! </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                color="danger"
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
						this.getNumbersList()
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
				reserve: false,
				NoNumbers: false,
				dialog: false,
      }
    },
    methods:{
			getNumbersList(){
				if(!this.reserve) {
					this.timerCount = 180
					this.value = 100
					this.overlay = true
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
								// alert('Numbers not available , please try later!!')
								this.dialog = true
								this.overlay = false
								this.value = 0
								this.timerCount = 0

							}
							
						})
						.catch((error) => {
							console.error(error);
						})
					}
				},
			reserveNumber() {
				this.reserve = true
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
						this.$analytics.logEvent("Web Number reserved");
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
							currentPage: 'onboarding_plan_details'
						},
					}
						console.log(user_stage)
						this.$axios(user_stage)
							.then((response) => {
								console.log(response)
								this.$analytics.logEvent("Web Pricing plan");
								this.$router.push("/pricing")
							})
							.catch((error) => {
								console.error(error);
							})
						})
					},
// user stage current page onbording_testing_complete

		progressbarTimer(value) {
					// console.log(value)
					if (value > 0) {
						var myVar = setInterval(() => {
							if (this.value > 1) {
								// console.log('before',this.value)
								this.value = this.value - 0.55
								// this.value2 = this.value2 - 10
								this.timerCount--;
								// console.log('after',this.timerCount)
							} 
							else {
								if(!this.reserve){
									this.overlay = true
									this.$router.go()
								}
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
