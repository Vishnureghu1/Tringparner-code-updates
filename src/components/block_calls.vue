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
									<div>
										<div class="ml-4 mr-4">
											<h3 class="mt-6 ml-5 mb-5 text-center">Blocked list</h3>
										</div>
									</div>
									<v-tabs background-color="white" color="black"  fixed-tabs>
										<v-tab>Recent unique Call list</v-tab>
										<v-tab>Blocked List</v-tab>
										<v-tab-item v-for="n in 2" :key="n">
											<v-container fluid>
												<v-card-text v-if="n==1">
													<v-expansion-panels>
															<v-expansion-panel v-for="(details) in realdata" :key="details.text">
																<v-expansion-panel-header v-if="details.isBlocked == false">
																	<div> {{ details.callerNumber }} 
																		<v-btn color="red" text @click="block_user(details.callerNumber,details.virtual_number)"> block </v-btn>
																		<br> 
																		<span class="mt-1">Last call : {{details.dateTime}}</span> 
																	</div>
																</v-expansion-panel-header>
															<v-expansion-panel-content v-if="details.isBlocked == false">
															</v-expansion-panel-content>
														</v-expansion-panel>
													</v-expansion-panels>
												</v-card-text>
												<v-card-text v-if="n==2">
													<v-expansion-panels>
															<v-expansion-panel v-for="(details) in realdata" :key="details.text">
																<v-expansion-panel-header v-if="details.isBlocked">
																	<div> {{ details.callerNumber }} 
																		<v-btn color="red" text @click="unblock_user(details.callerNumber,details.virtual_number)"> unblock </v-btn>
																		<br> 
																		<span class="mt-1">Last call : {{details.dateTime}}</span> 
																	</div>
																</v-expansion-panel-header>
															<v-expansion-panel-content v-if="details.isBlocked">
															</v-expansion-panel-content>
														</v-expansion-panel>
													</v-expansion-panels>
												</v-card-text>
											</v-container>
										</v-tab-item>
									</v-tabs>
								</v-col>
							</v-row>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-app>
</template>


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
					console.log("page call logs il user id", this.uid)
					console.log("page call logs il user number", this.phno)
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							console.log(user_details.role)
							if (user_details.role == 'OWNER' || user_details.role == 'ADMIN' ) {
								if(user_details.role == 'ADMIN') {
									this.uid = user_details.OwnerUid
								}

								db.collection('blockCalls').where("Uid" , "==" , this.uid).onSnapshot((querySnapshot) => {
									this.realdata = []
									if(!querySnapshot.empty) {
										querySnapshot.forEach((doc) => {
											console.log(doc.id, " => ", doc.data());
											let user_details = doc.data()
											this.calldetails = user_details
											var timestamp = this.calldetails.lastCall
											var date = new Date(timestamp);
											console.log("full time",date)
											var call_time = moment(date).format('hh:mm a')
											call_time = moment(date).fromNow();
											console.log("converted time",call_time)
											this.detail = Object.assign({}, this.detail, { callstatus : this.calldetails.callstatus , dateTime : call_time , callerNumber : this.calldetails.Number, virtual_number : this.calldetails.VirtualNumber ,isBlocked : this.calldetails.isBlocked})
											this.realdata.push(this.detail)
											console.log('snap calllog ', this.realdata)
										})
									}
									else {
										alert('no calls')									
									}
								})
							}
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
				}
			})
		},

		data: () => ({
			uid : '',
			phno : '',
			detail: {},
			blocked_detail: {},
			blocked_list: [],
			realdata : [],
			calldetails : [],
			call_list : [],
			virtual_number : '',
			dialog: false,
    }),
    methods :{
			block_user(number,virtual_number){
				const blocked_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/blockcall',
					method: 'POST',
					data: {
						owner_uid: this.uid,
						status: true,
						virtual_number : virtual_number,
						number: number
					},
				}
				console.log(blocked_data)
				this.$axios(blocked_data)
					.then((response) => {
						console.log(response)
						alert("Successfully Blocked")
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
			},

			unblock_user(number,virtual_number){
				const blocked_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/blockcall',
					method: 'POST',
					data: {
						owner_uid: this.uid,
						status: false,
						virtual_number : virtual_number,
						number: number
					},
				}
				console.log(blocked_data)
				this.$axios(blocked_data)
					.then((response) => {
						console.log(response)
						alert('Successfully Unblocked')
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
			}
    }
	}
	</script>