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
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">Pricing Plan</h3>
									</div>

									<div class="ml-4 mr-4 mt-5 text-center">
										<v-card class="mx-auto" max-width="300" tile flat>

											<h1 class="green--text"><span class="mr-1 green--text">₹</span>500 per month</h1>
											<v-list-item v-for="(item, i) in items" :key="i">
												<v-list-item-content>
													<v-list-item-title v-text="item.text"></v-list-item-title>
												</v-list-item-content>
											</v-list-item>
                    </v-card>
										<div class="text-center">
											<v-btn class="mr-4 mb-6 mt-6 white--text text-center" width="40%" @click.prevent='nextPage()' color='light-green'> Make Payment </v-btn>
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
					console.log("page pricing il user id", this.uid)
					console.log("page pricing il user number", this.phno)
					
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
								this.$router.push("/manageUsers")
							}
							else if (this.currentPage == "onboarding_dashboard") {
								this.$router.push("/manageUsers")
							}


						})
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					})
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							console.log(user_details.role)
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
						console.log(response)
					})
					.catch((error) => {
						console.error(error);
					})
				this.$router.push("/billing")
			}
		}
	}
</script>