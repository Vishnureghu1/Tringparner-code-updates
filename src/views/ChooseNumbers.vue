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
								<v-card color="transparent" outlined class="" max-width="600">
									<h2 class="page_title mt-16 mb-13">Select your Virtual Number</h2>
									<h2 class="sub_title mt-8 mb-13">Select any one Virtual Number you want to use or tap refresh to get another <br> list of numbers.</h2>
									<div>
										<v-radio-group  v-model="radio" v-if="V_numbers[0]">
											<v-row>
													<v-col cols="12" sm='6'>																		
														<v-card class=""  @click="colorChange(radio,V_numbers[0])" :style="radio1 ? 'border: 1px solid #EE1C25;border-radius: 10px;' : 'border: 1px solid #B4B4B4;border-radius: 10px;'" >
															<v-radio color='red' value="1" class="ml-4">
																<span slot="label" class="black--text ml-3">
																	<h2 v-if="V_numbers[0]" class="page_title mt-3 ml-2 mb-5">+91 {{V_numbers[0]}}</h2> 
																</span>
															</v-radio>
														</v-card>	
													</v-col>
													<v-col cols="12" sm='6'>
														<v-card class="" @click="colorChange(radio,V_numbers[1])" :style="radio2 ? 'border:1px solid #EE1C25;border-radius: 10px;' : 'border: 1px solid #B4B4B4;border-radius: 10px;'" >
															<v-radio color='red' value="2" class="ml-4">
																<span slot="label" class="black--text ml-3">
																	<h2 v-if="V_numbers[0]" class="page_title mt-3 ml-2 mb-5">+91 {{V_numbers[1]}}</h2> 
																</span>
															</v-radio>
														</v-card>	
													
													</v-col>
													<v-col cols="12" sm='6'>
														<v-card class="" @click="colorChange(radio,V_numbers[2])" :style="radio3 ? 'border: 1px solid #EE1C25;border-radius: 10px;' : 'border: 1px solid #B4B4B4;border-radius: 10px;'">
															<v-radio color='red' value="3" class="ml-4">
																<span slot="label" class="black--text ml-3">
																	<h2 v-if="V_numbers[0]" class="page_title mt-3 ml-2 mb-5">+91 {{V_numbers[2]}}</h2> 
																</span>
															</v-radio>
														</v-card>														
													</v-col>	
													<v-col cols="12" sm='6'>
														<v-card class="" @click="colorChange(radio,V_numbers[3])" :style="radio4 ? 'border: 1px solid #EE1C25;border-radius: 10px;' : 'border: 1px solid #B4B4B4;border-radius: 10px;'">
															<v-radio color='red' value="4" class="ml-4">
																<span slot="label" class="black--text ml-3">
																	<h2 v-if="V_numbers[0]" class="page_title mt-3 ml-2 mb-5">+91 {{V_numbers[3]}}</h2> 
																</span>
															</v-radio>
														</v-card>														
													</v-col>
													<v-col cols="12" sm='6'>
														<v-card class="" @click="colorChange(radio,V_numbers[4])" :style="radio5 ? 'border: 1px solid #EE1C25;border-radius: 10px;' : 'border: 1px solid #B4B4B4;border-radius: 10px;'">
															<v-radio color='red' value="5" class="ml-4">
																<span slot="label" class="black--text ml-3">
																	<h2 v-if="V_numbers[0]" class="page_title mt-3 ml-2 mb-5">+91 {{V_numbers[4]}}</h2> 
																</span>
															</v-radio>
														</v-card>														
													</v-col>
													<v-col cols="12" sm='6'>
														<v-card class="" @click="colorChange(radio,V_numbers[5])" :style="radio6 ? 'border: 1px solid #EE1C25;border-radius: 10px;' : 'border: 1px solid #B4B4B4;border-radius: 10px;'">
															<v-radio color='red' value="6" class="ml-4">
																<span slot="label" class="black--text ml-3">
																	<h2 v-if="V_numbers[0]" class="page_title mt-3 ml-2 mb-5">+91 {{V_numbers[5]}}</h2> 
																</span>
															</v-radio>
														</v-card>														
													</v-col>										
											</v-row>
										</v-radio-group>
									</div>
									<div class="mt-4"> 
										<a class="link_style text-decoration-underline">
											Refresh list({{ timerCount }}s)
										</a> 
									</div>
									<v-btn v-if="radio != null" class="btn_text mt-10 white--text text-capitalize" width="19%" rounded  color='#EE1C25' @click.prevent='reserveNumber()'> Next </v-btn>
								</v-card>
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
			radio : '',
			radio1 : false,
			radio2 : false,
			radio3 : false,
			radio4 : false,
			radio5 : false,
			radio6 : false,
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
			virtualnumber : '',
    }),
		components: {
		},

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
									// this.$router.push("/ChooseNumbers") deleted
									this.getNumbersList()
								}
								else if (this.currentPage == "onboarding_plan_details") {
									this.$router.push("/SelectPlan")
								}
								else if (this.currentPage == "onboarding_billing" || this.currentPage == "onboarding_revisiting") {
									this.$router.push("/Billing")
								}
								else if (this.currentPage == "onboarding_success"||this.currentPage == "onboarding_dashboard") {
									this.$router.push("/Dashboard")
								}
								// else if (this.currentPage == "onboarding_dashboard") {
								// 	this.$router.push("/downloadApp")
								// }
							})
						}).catch((error) => {
							console.log("Error getting documents: ", error);
						})
						// this.getNumbersList()
				}
			})

		},
		methods: {
			colorChange(i){
				if(i == 1){
					this.radio1 = true
					this.radio2 = this.radio3 = this.radio4 = this.radio5 = this.radio6 = false
					this.virtualnumber = this.V_numbers[0]
					console.log(this.virtualnumber)
				}
				else if (i == 2){
					this.radio2 = true
					this.radio1 = this.radio3 = this.radio4 = this.radio5 = this.radio6 = false	
					this.virtualnumber = this.V_numbers[1]
					console.log(this.virtualNumber)			
				}
				else if (i == 3){
					this.radio3 = true
					this.radio1 = this.radio2 = this.radio4 = this.radio5 = this.radio6 = false		
					this.virtualnumber = this.V_numbers[2]		
				}
				else if (i == 4){
					this.radio4 = true
					this.radio1 = this.radio2 = this.radio3 = this.radio5 = this.radio6 = false		
					this.virtualnumber = this.V_numbers[3]			
				}
				else if (i == 5){
					this.radio5 = true
					this.radio1 = this.radio2 = this.radio3 = this.radio4 = this.radio6 = false		
					this.virtualnumber = this.V_numbers[4]		
				}
				else if (i == 6){
					this.radio6 = true
					this.radio1 = this.radio2 = this.radio4 = this.radio5 = this.radio3 = false		
					this.virtualnumber = this.V_numbers[5]			
				}
			},
			getNumbersList(){
				if(!this.reserve) {
					this.timerCount = 180
					this.value = 100
					this.overlay = true
					const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/virtualNumber/list',
						method: 'POST',
						data: {
							uid: this.uid,
							phoneNumber: this.phno
						},
					}
					// console.log(details)
					this.$axios(details)
					.then((response) => {
						this.listingId = response.data.listing_id
						if(this.listingId){
							// console.log("1")
							this.overlay = false
							this.V_numbers = response.data.numbers
							this.timerCount = response.data.Seconds
							this.value = 100 - (0.55*(180-this.timerCount))
							console.log("888",this.value,this.timerCount)
							// console.log(response)
							// console.log(response.data.numbers)
							// console.log(response.data.Seconds)
							this.progressbarTimer(this.value)
							if(this.V_numbers.length === 0){
								console.log("2")
								this.dialog = true
								this.overlay = false
								this.value = 0
								this.timerCount = 0

							}
						}
						else {
							this.overlay = true
						}
					})
					.catch((error) => {
						console.error(error);
					})
				}
			},
			reserveNumber() {			
				if(this.virtualnumber == ""){
					console.log("select number")
					this.$root.vtoast.show({
          message: "Please select the number!",
          color: "red",
          timer: 2000,
        });
					return 
				}
				this.overlay = true
				this.reserve = true
				const reserve = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/virtualNumber/reserve',
					method: 'POST',

					data: {
						uid: this.uid,
						phoneNumber: this.phno,
						virtualNumber: this.virtualnumber,
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
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/stage',
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
						this.$router.push("/SelectPlan")
					})
					.catch((error) => {
						console.error(error);
					})
				})
			},
		progressbarTimer(value) {
					console.log("111",value)
					if (value > 0) {
						var myVar = setInterval(() => {
							if (this.value > 1) {
								// console.log('before',this.value)
								this.value = this.value - 0.55
								// this.value2 = this.value2 - 10
								this.timerCount--;
								console.log("999",this.timerCount,this.value)
								// console.log('after',this.timerCount)
							} 
							else {
								if(!this.reserve){
									this.overlay = true
									clearInterval(myVar);
									this.getNumbersList()
									//this.$router.go()
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

<style scoped>
.page_title {
	font-family: 'Lato', Bold;
  font-size: 23px 
}
.sub_title {
	font-family: 'Nunito', Regular;
  font-size: 12px;
  color: #808080;
}
.name_heading {
	font-family: 'Nunito', light;
  font-size: 14px;
  color: #3B3B3B;	
}
.number_heading {
	font-family: 'Nunito', Regular;
  font-size: 24px; 	
  color: #3B3B3B;
}
.comment_heading {
	font-family: 'Nunito', Regular;
  font-size: 10px;
  color: #808080;
}
.link_style{
	color: #EE1C25;
}
.number_heading.v-btn--outlined {
    border: thin solid #EE1C25;
  }
.v-btn:before {
	color: #f3f9f3;

}
</style>