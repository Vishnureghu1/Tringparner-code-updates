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
										<h2 class="mt-6 ml-5 text-center blue--text">Yaaay!!</h2>
										<h4 class="mb-0 text-center mt-3" >Your new Business Number is</h4>
										<h2 class="mb-0 text-center mt-3 primary--text" > 8891978085 </h2>
										<v-divider></v-divider>

										<h4 class="mb-0 text-center mt-3" >Testing Successful</h4>
										<div class="text-center">
										<v-icon x-large color="green darken-2" >mdi-checkbox-marked-circle </v-icon>
										</div>
										<h4 class="mb-6 mt-6 text-center blue--text" >Your Tringpartner Business Number is now ready for use</h4>
										<div class="text-center">
											<v-btn class="mr-4 mb-6 mt-2 white--text text-center"  width="40%" @click='nextPage()' color='blue'> PROCCED TO BUY </v-btn>
										</div>
										<div>
											<v-expansion-panels flat>
												<v-expansion-panel >
													<v-expansion-panel-header>
														<h5>How can I test  Tringpartner again?</h5>
													</v-expansion-panel-header>
												<v-expansion-panel-content>
													<h5 class="font-weight-regular">Please call your business number from a different phone other than yours. Calls to Tringpartner number will be forwarded to your number. </h5>
												</v-expansion-panel-content>
											</v-expansion-panel>
										</v-expansion-panels>
										
										<v-expansion-panels flat>
												<v-expansion-panel >
													<v-expansion-panel-header>
														<h5>Can I add more people to Tringpartner?</h5>
													</v-expansion-panel-header>
												<v-expansion-panel-content>
													<h5 class="font-weight-regular">Yes, you can add upto 3 people to route calls from Tringpartner. </h5>
												</v-expansion-panel-content>
											</v-expansion-panel>
										</v-expansion-panels>
										
										<v-expansion-panels flat>
												<v-expansion-panel >
													<v-expansion-panel-header>
														<h5>Will I get missed call alerts over WhatsApp? </h5>
													</v-expansion-panel-header>
												<v-expansion-panel-content>
													<h5 class="font-weight-regular">Yes, you'll get call alerts over WhatsApp for both answered and missed calls. </h5>
												</v-expansion-panel-content>
											</v-expansion-panel>
										</v-expansion-panels>	

										<v-expansion-panels flat>
												<v-expansion-panel >
													<v-expansion-panel-header>
														<h5>Can I listen to call recording? </h5>
													</v-expansion-panel-header>
												<v-expansion-panel-content>
													<h5 class="font-weight-regular">Yes, you can listen to call recording by logging into your Tringpartner account. </h5>
												</v-expansion-panel-content>
											</v-expansion-panel>
										</v-expansion-panels>

										<v-expansion-panels flat>
												<v-expansion-panel >
													<v-expansion-panel-header>
														<h5>How can I view customer's phone number?</h5>
													</v-expansion-panel-header>
												<v-expansion-panel-content>
													<h5 class="font-weight-regular">You can view customer's phone number either through WhatsApp notifications or by logging into your Tringpartner account. </h5>
												</v-expansion-panel-content>
											</v-expansion-panel>
										</v-expansion-panels>
										</div>

									</div>

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
				}
			})
    },
    data(){
      return{	
      virtual_number : ''
      }
    },
    methods: {
			nextPage(){
				const user_stage = {
					url: this.$cloudfareApi + '/user/stage',
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
						this.$router.push("/pricing")
					})
					.catch((error) => {
						console.error(error);
					})
				
			}
		}
  }


</script>
