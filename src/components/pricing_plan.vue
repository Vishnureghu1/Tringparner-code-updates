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
								<div>
									<div class="text-center">
										<div class="mt-6">Your new Business Number is</div>
										
										<h3 class="mt-2 mb-3 red--text"> {{virtualNumber}} </h3>
										<v-divider></v-divider>
									</div>
									<div >
										<h3 class="mt-5 mb-5 text-center" >Choose Pricing Plan</h3>
									</div>
									<v-divider></v-divider>
									<v-radio-group class="ml-9 mt-5 mr-10" v-model="radio">
										<div class="mb-4">

												<v-radio value="1">>
												<span slot="label" class="black--text ml-3">Try for 1 month @ ₹ 500 
													<h4 class="mt-3 text-center"> ₹ 500 + GST</h4>
												</span>
											</v-radio>
						
										<!-- 	<div class=" mb-2 text-center" >Try for 1 month @ just ₹ 500</div> -->
										</div>
										<v-divider></v-divider>

										<div class="mt-5 mb-5">
										
												<v-radio value="2">>
												<span slot="label" class="black--text ml-3">Pay for 6 months & Save 10%
													<h4 class="text-center green--text mt-3"><span class="text-decoration-line-through text-center black--text"> ₹ 3000</span> ₹2700 + GST</h4>
												</span>
											</v-radio>
								
										</div>
										<v-divider></v-divider>

										<div class="mt-5 mb-5">
											
												<v-radio value="3">>
												<span slot="label" class="black--text ml-3">Pay for 1 year & Save 20%
													<h4 class="text-center green--text mt-3"><span class="text-decoration-line-through text-center black--text"> ₹ 6000</span> ₹4800 + GST</h4>
												</span>
											</v-radio>
											
										</div>
										<v-divider></v-divider>
									</v-radio-group>

								</div>



									<div class="ml-4 mr-4 mt-5 text-center">
										<div class="text-center">
											<v-btn class="mr-4 mb-6 mt-6 white--text text-center" max-width @click.prevent='nextPage()' color='blue'> Make Payment </v-btn>
										</div>
                   </div>  
								</div>

								<div class="ml-9 mr-4 mb-8 mt-6">
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
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.virtualNumber = user_details.virtualNumber[0]
							console.log(user_details.virtualNumber)
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
				}
			})
		},
		
    data() {
      return{
					selectedItem: 1,
					uid : '',
					phno : '',
					virtualNumber : '',
					radio: '2',
					items: [ 
						{ text: '1 Cloud Business Number' },
						{ text: '1 User Login' },
						{ text: 'Unlimited Incoming Calls'},
						{ text: 'Automatic Calls Routing'},
						{ text: 'Unlimited Call Recording'},
						{ text: 'Unlimited Whatsapp Notifications'},
						{ text: 'Phone Email & chat Support'},
					],
			}
		},
		methods: {
			nextPage(){
				const user_stage = {
					url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/stage',
					method: 'POST',

					data: {
								uid: this.uid,
								phoneNumber: this.phno,
								currentPage: 'onboarding_billing'
					},
				}
				console.log(user_stage)
        this.$axios(user_stage)
					.then((response) => {
						localStorage.setItem('planId',this.radio)
						console.log(response)
						this.$analytics.logEvent("Web Billing page");
						this.$router.push("/billing")
					})
					.catch((error) => {
						console.error(error);
					})

			}
		}
	}
</script>

<style scoped>
.black--text /deep/ label {
    color: black;
}
</style>