<template>
	<v-app >
		<div>
			<v-container  fluid>
				<v-layout align-center justify-center>
					<v-flex xs12 sm12 md10>
						<v-card class="mx-auto">
							<v-row no-gutters>
								<v-col cols="12">
									<div>
									</div>
									<div class="text-center" v-if="main">
										<div class="ml-4 mr-4">
											<h3 class="mt-6 ml-5 mb-5 text-center">Addons</h3>
										</div>
										<v-btn class="mr-4 white--text mb-3" @click='prorate_U(1)' color='light-blue darken-1'> Add User @ {{user_amount}}</v-btn>
										<v-btn class="mr-4 mb-3 white--text" @click='prorate_BN(1)' color='light-blue darken-1
										' > Add Virtual Number @ {{number_amount}}</v-btn>

										<h4 class="mt-6 ml-3 text-left">Active Addon Plans</h4>
										<p v-if="showAddonDetails" class="text-left mt-2 ml-3"> No Active addons </p>
										<div v-for="details in addon_array" :key="details.text">
											<p class="mt-2 ml-3 text-left"> Plan : {{ details.type }}</p>
											<p class="mt-2 ml-3 text-left" v-if="details.type == 'BUSINESS_NUMBER'"> Virtual Number : {{ details.virtual_number }}</p>
											<p class="mt-1 ml-3 text-left"> Purchase Date : {{  details.date }}</p>
											<v-btn class="mb-2" v-if="details.type == 'BUSINESS_NUMBER'" text @click.prevent='delete_addons(details.type, details.virtual_number)' color='red'> Remove Addon </v-btn>
											<v-btn class="mb-2" v-else text @click.prevent='delete_addons(details.type)' color='red'> Remove Addon </v-btn>
											<v-divider></v-divider>
										</div>
									</div>
									<v-dialog v-model="dialog" persistent max-width="400px">
										<v-card>
											<v-card-title >
												<h4 class="font-weight-bold">Prorate breakdown</h4>
											</v-card-title>
											<v-card-body>
												<h4 class="mb-3 mt-3 text-center" >Remining days to next recharge {{ remaining }} day(s)</h4>
												<h4 class="text-center mb-3">Payable amount Rs {{ amount }}</h4>
											</v-card-body>
											<v-card-actions>
												<v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
												<v-btn v-if="show == 'user'" color="green" text @click="processed_to_buy()"> Processed to Buy </v-btn>
												<v-btn v-if="show == 'number'" color="green" text @click="processed_to_buy()"> Show Numbers </v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
									<div v-if='showNumbers'>
										<h4 class="mt-6 text-center">Choose your business number</h4>
										
										<p class="mt-6 text-center">Time Remaining : {{ Math.floor(timerCount/60) }} mins {{ timerCount%60 }} sec</p>
										<div class="ml-5 mr-5">
											<v-progress-linear  color="deep-orange" height="14" :value= 'value' striped ></v-progress-linear>
										</div>
										<v-btn-toggle v-model="toggle_none" >
											<div class="ml-3 mt-5 text-center">
												<v-btn v-for="item in V_numbers" :key="item" class="ml-1 mr-4 mb-5 primary--text" outlined color='white' width="44%">{{item}}</v-btn>
											</div>
										</v-btn-toggle>
										<div class="text-center">							
											<v-btn v-if="toggle_none != null" class="mr-4 mb-6 white--text text-center" width="40%" @click.prevent='reserveNumber()' color='light-blue darken-1'> Next </v-btn>
										</div>
									</div>
									<div v-if='showReserved'>
										<h4 class="mt-6 text-center">Selected business number</h4>
										<p class="mt-6 text-center"> {{ reservedNumber }}</p>
										<p class="mt-6 text-center">This number is Valid for the next 24 hrs.</p>
										<div class="text-center">							
											<v-btn class="mr-4 mb-6 white--text text-center" width="40%" @click.prevent='makePayment()' color='light-blue darken-1'> Buy </v-btn>
										</div>
									</div>
								</v-col>
							</v-row>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-app>
</template>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import firebase from 'firebase'
import { db } from '@/main.js';
import moment from 'moment'
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
							this.virtual_number = user_details.virtualNumber
							this.name = user_details.FirstName
							this.state = user_details.State
							this.gst = user_details.Gstin
							this.email = user_details.Email
							this.planId = user_details.PlanId
							this.lastRecharge = user_details.LastRecharge
							this.renewalDay = user_details.RenewalDay
							console.log(user_details.role)
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})

					db.collection('UserAddonDetails').where("Uid" , "==" , this.uid).orderBy('PurchaseDate', "desc").onSnapshot((querySnapshot) => {
						this.addon_array = []
						if(!querySnapshot.empty) {
							querySnapshot.forEach((doc) => {
								console.log(doc.id, " => ", doc.data());
								let addonDetails = doc.data()
								var purchase_date = moment.unix(addonDetails.PurchaseDate).format('DD/MM hh:mm a')
								var details = Object.assign({}, this.details, { date : purchase_date , uid: addonDetails.Uid , type : addonDetails.Type , virtual_number : addonDetails.VirtualNumber})
								this.showAddonDetails = false
								this.addon_array.push(details)

							})
						}
						else {
							this.showAddonDetails = true
						}
					})
					this.prorate_U(0)
					this.prorate_BN(0)
				}
			})
		},

		data: () => ({
			uid : '',
			phno : '',
      email: '',
      gstin: '',
      state: '',
      main : true,
      addon_array : [],
      showNumbers: false,
			timerCount : 180,
			value : 100,
			V_numbers : [],
			listingId: '',
			toggle_none : null,
			overlay: true,
			remaining : '',
			amount : '',
			dialog : false,
			bm : false,
			u : false,
			listingId: '',
			showReserved : false,
			show : '',
			reservedNumber : '',
			showAddonDetails : false,
			number_amount : '',
			user_amount : '',
			planId : '',
			lastRecharge : '',
			renewalDay : '',
    }),
    methods :{
			delete_addons(type, virtual_number){
				if (confirm("Do you want to delete this addon. Click Ok to confirm")) {
					console.log("type ", type)
					console.log("virtual_number" ,virtual_number)
					if(type == 'USER') {
						var token = localStorage.getItem('token');
						const details = {
						url: this.$cloudfareApi + '/addon/delete',
						method: 'POST',
						data: {
							owner_uid: this.uid,
							update_by : this.uid,
							type: type
						},
						headers: { 
							'token': token,
							'Content-Type': 'application/json'
						},
					}
					console.log(details)
					this.$axios(details)
						.then((response) => {
							console.log(response)
							alert(response.data.message)
						})
						.catch((error) => {
							console.error(error);
						})
					}
					else if (type == 'BUSINESS_NUMBER') {
						var token = localStorage.getItem('token');
						const details = {
						url: this.$cloudfareApi + '/addon/delete',
						method: 'POST',
						data: {
							owner_uid: this.uid,
							update_by : this.uid,
							type: type,
							virtual_number : virtual_number
						},
						headers: { 
							'token': token,
							'Content-Type': 'application/json'
						},
					}
					console.log(details)
					this.$axios(details)
						.then((response) => {
							console.log(response)
							alert(response.data.message)
						})
						.catch((error) => {
							console.error(error);
						})
					}
				}
			},

			prorate_U(status){
				this.u = true
				this.bm = false
				var token = localStorage.getItem('token');
					const details = {
						url: this.$cloudfareApi + '/addon/prorate',
						method: 'POST',
						data: {
							owner_uid: this.uid,
							type: 'USER'
						},
						headers: { 
							'token': token,
							'Content-Type': 'application/json'
						},
					}
					console.log(details)
					this.$axios(details)
						.then((response) => {
							console.log(response)
							if(status) {
								this.show = 'user'
								this.dialog = true
								this.remaining = response.data.reminingdays
							}
							if(this.planId == 2) {
								this.amount = (response.data.amount * 0.8)
								this.user_amount = this.amount
							}
							else{
								this.amount = (response.data.amount)
								this.user_amount = this.amount								
							}
						})
						.catch((error) => {
							console.error(error);
						})
			},
			prorate_BN(status){
				this.u = false
				this.bm = true
				var token = localStorage.getItem('token');
				const details = {
					url: this.$cloudfareApi + '/addon/prorate',
					method: 'POST',
					headers: { 
						'token': token,
						'Content-Type': 'application/json'
					},
					data: {
						owner_uid: this.uid,
						type: 'BUSINESS_NUMBER'
					},
				}
				console.log(details)
				this.$axios(details)
					.then((response) => {
						console.log(response)
						if(status) {
							this.show = 'number'
							this.dialog = true
							this.remaining = response.data.reminingdays
						}
						if(this.planId == 2) {
							this.amount = (response.data.amount * 0.8)
							this.number_amount = this.amount
						}
						else{
							this.amount = (response.data.amount)
							this.number_amount = this.amount								
						}
					})
					.catch((error) => {
						console.error(error);
				})
			},

			processed_to_buy() {
				if(this.u){
					this.dialog = false
					this.add_user()
				}
				else if (this.bm) {
					db.collection('uservirtualNumber').where("Uid" , "==" , this.uid).where("IsPurchased" , "==" , false).get().then((querySnapshot) => {
						if(!querySnapshot.empty) {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.reservedNumber = user_details.VirtualNumber
							this.dialog = false
							this.main = false
							this.showNumbers = false
							this.showReserved = true
						})
					}
					else {
						console.log('empty')
						this.dialog = false
						this.add_virtual()
					}
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
					
					

				}

			},
			add_user() {
				var token = localStorage.getItem('token');
				const user_details = {
					url: this.$cloudfareApi + '/addon/payment',
					method: 'POST',
					headers: { 
						'token': token,
						'Content-Type': 'application/json'
					},
					data: {
						owner_uid: this.uid,
						type: 'USER',
					},
				}
				console.log(user_details)
				this.$axios(user_details)
					.then((response) => {
						console.log(response)
						console.log('order_id',response)
						console.log(response.data.order_id)
						this.order_id = response.data.order_id
				var options = {
					key: this.$razorpaykey,
					
					order_id: this.order_id,
					name: this.name,
					currency: "INR", // Optional. Same as the Order currency
					description: "Purchase Description",

					handler:  (response) =>{
						console.log(response)
						alert('User add successfully. You can configure new user in manage users.')
					},
					modal: {
						ondismiss: () => {
							this.showNumbers = false
							this.showReserved = false
							this.main = true
							alert('payment cancelled')
							console.log('Checkout form closed')

						}
					},
					prefill: {
            name: this.name,
            email: this.email,
            contact: this.phno
					},
					notes: {
            address: this.address
					},
					theme: {
            color: "#3399cc"
					}
				};
				console.log(options)
				var rzp1 = new Razorpay(options);
				rzp1.on('payment.failed', function (response){
					alert('payment failed');
					this.showNumbers = false
					this.showReserved = false
					this.main = true
				});
				rzp1.open();

					})

					.catch((error) => {user_details
						console.error(error);
					})
			},

			add_virtual() {
				// var token = localStorage.getItem('token');
				this.showNumbers = true
				this.main = false
				const details = {
						url: this.$cloudfareApi + '/virtualNumber/list',
						method: 'POST',
							headers: { 
						'token': localStorage.getItem("token"),
						'Content-Type': 'application/json'
					},
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
							this.listingId = response.data.listing_id
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
								this.showNumbers = false
								this.showReserved = false
								this.main = true

							}
						})
						.catch((error) => {
							console.error(error);
						})

				},
			makePayment() {
				var token = localStorage.getItem('token');
				const user_details = {
					url: this.$cloudfareApi + '/addon/payment',
					method: 'POST',
					headers: { 
						'token': token,
						'Content-Type': 'application/json'
					},
					data: {
						owner_uid: this.uid,
						type: 'BUSINESS_NUMBER',
					},
				}
				console.log(user_details)
				this.$axios(user_details)
					.then((response) => {
						console.log(response)
						console.log('order_id',response)
						console.log(response.data.order_id)
						this.order_id = response.data.order_id
				var options = {
					key: this.$razorpaykey,
					
					order_id: this.order_id,
					name: this.name,
					currency: "INR", // Optional. Same as the Order currency
					description: "Purchase Description",

					handler:  (response) =>{
						console.log(response);
						this.showNumbers = false
						this.showReserved = false
						this.main = true
						alert('Virtual Number Added. You can configure routing for this number in Call Distribution')
					},
					modal: {
						ondismiss: () => {
							this.showNumbers = false
							this.showReserved = false
							this.main = true
							alert('payment cancelled')
							console.log('Checkout form closed')
						}
					},
					prefill: {
            name: this.name,
            email: this.email,
            contact: this.phno
					},
					notes: {
            address: this.address
					},
					theme: {
            color: "#3399cc"
					},

				};
				console.log(options)
				var rzp1 = new Razorpay(options);
				rzp1.on('payment.failed', function (response){
					alert('payment failed');
					this.showNumbers = false
					this.showReserved = false
					this.main = true
				});
				rzp1.open();

					})

					.catch((error) => {user_details
						console.error(error);
					})
			},
			reserveNumber() {
				var token = localStorage.getItem('token');
				let virtualNumber = this.V_numbers[this.toggle_none]
				console.log(virtualNumber)
				const details = {
						url: this.$cloudfareApi + '/addon/reservenumber',
						method: 'POST',
						data: {
							uid: this.uid,
							phoneNumber: this.phno,
							virtualNumber: virtualNumber,
							listingId : this.listingId,
						},
											headers: { 
						'token': token,
						'Content-Type': 'application/json'
					},
					}
					console.log(details)
					this.$axios(details)
						.then((response) => {
							console.log(response)
						})
						.catch((error) => {
							console.error(error);
						})
				var token = localStorage.getItem('token');
				const user_details = {
					url: this.$cloudfareApi + '/addon/payment',
					method: 'POST',
					headers: { 
						'token': token,
						'Content-Type': 'application/json'
					},
					data: {
						owner_uid: this.uid,
						type: 'BUSINESS_NUMBER',
					},
				}
				console.log(user_details)
				this.$axios(user_details)
					.then((response) => {
						console.log(response)
						console.log('order_id',response)
						console.log(response.data.order_id)
						this.order_id = response.data.order_id
				var options = {
					key: this.$razorpaykey,
					
					order_id: this.order_id,
					name: this.name,
					currency: "INR", // Optional. Same as the Order currency
					description: "Purchase Description",

					handler:  (response) =>{
						console.log(response);
						this.showNumbers = false
						this.main = true
						alert('Virtual Number Added. You can configure routing for this number in Call Distribution')
					},
					modal: {
						ondismiss: () => {
							this.showNumbers = false
							this.showReserved = false
							this.main = true
							alert('payment cancelled')
							console.log('Checkout form closed')
						}
					},
					prefill: {
            name: this.name,
            email: this.email,
            contact: this.phno
					},
					notes: {
            address: this.address
					},
					theme: {
            color: "#3399cc"
					}
				};
				console.log(options)
				var rzp1 = new Razorpay(options);
				rzp1.on('payment.failed', function (response){
					alert('payment failed');
					this.showNumbers = false
					this.showReserved = false
					this.main = true
				});
				rzp1.open();

					})

					.catch((error) => {user_details
						console.error(error);
					})


			},
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