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
									<div >
										<h2 class="mt-6 text-center blue--text">Yaaay!!</h2>
										<h3 class="mt-4 text-center">Successfully Signed up</h3>
									</div>
									<div class="text-center mt-4">
										<v-icon x-large color="green darken-2" >mdi-checkbox-marked-circle </v-icon>
									</div>
									<div>
										<h3 class="mt-6 text-center blue--text"><a class="text-decoration-none" href="https://tringpartner.page.link/signupapp">Click to Open in Mobile app</a></h3>
										<h3 class="mt-6 text-center black--text">OR</h3>
										<h3 class="mt-6 text-center blue--text">Download The Mobile App</h3>
									</div>
									<div class="text-center">
										<img class="mt-2 " :src="require('../../public/images/Google_Play-Badge-Logo.wine.svg')" @click="playStore()" height="100"/>
										<img class="mt-2 " :src="require('../../public/images/App_Store_(iOS)-Badge-Logo.wine.svg')" @click="appStore()" height="100"/>
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

        }
      },
    methods :{
			playStore(){
				window.open(`https://play.google.com`)
			},
			appStore(){
				window.open(`https://www.apple.com/in/app-store/`)
			}
  }
}

</script>

