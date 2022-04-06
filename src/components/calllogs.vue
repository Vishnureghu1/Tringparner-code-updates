<template>
	<div>
		<v-container  fluid>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md8>
					<v-card class="mx-auto">
						<v-row no-gutters>
							<v-col cols="12">
								<div>
									<div class="mr-4">
										<h3 class="mt-6 text-center">Call Logs</h3>
									</div>
								</div>
								<v-tabs>
										<v-tab href="#one">
											ALL
										</v-tab>
										<v-tab-item key="one" id="one">
											<v-card class="mx-auto">
												<v-row no-gutters>
													<v-col cols="lg-12">
														<v-expansion-panels>
																<v-expansion-panel v-for="(details) in realdata" :key="details.text">
																	<v-expansion-panel-header>
																		<div> {{ details.callerNumber }} 
																			<span v-if="details.callstatus == 'Answered'" class="mdi mdi-phone-incoming ml-2 green--text"></span>
																			<span v-else class="mdi mdi-phone-missed ml-2 red--text"></span>
																			<span v-for="getNotes in details.Note " :key="getNotes.text" >
																				<span v-if="getNotes.Note != ''" class="mdi mdi-note ml-2 blue--text"></span>
																			</span>
																			<br> 
																			<span class="mt-1">{{details.dateTime}}</span> 
																		</div>
																	</v-expansion-panel-header>
																<v-expansion-panel-content>
																	<div v-if="details.count > 0">
																		<h5 class="font-weight-regular" > callback attempted : {{ details.count }} time(s)</h5>
																		<h5 class="font-weight-regular mb-3"> Callback attempted by  : {{ details.called_name }} </h5>
																	</div>
																	<h5 class="font-weight-regular mb-3" v-else> No callback attempted</h5>
																
																	<div v-for="getNotes in details.Note " :key="getNotes.text" >
																		<v-text-field v-model="getNotes.Note" :append-outer-icon="getNotes.Note ? 'mdi-send' : ''" clear-icon="mdi-close-circle" clearable label="Add notes" :rules="rules" counter maxlength="120" type="text" @click:append-outer="sendMessage(details.uniqueid,getNotes.Note)" @click:clear="clearMessage(details.uniqueid,getNotes.Note)" ></v-text-field>
																	</div>

																</v-expansion-panel-content>
															</v-expansion-panel>
														</v-expansion-panels>
													</v-col>
												</v-row>
											</v-card>
										</v-tab-item>
										<v-tab href="#two" >
											MISSED
										</v-tab>
										<v-tab-item key="two" id="two">
											<v-card class="mx-auto">
												<v-row no-gutters>
													<v-col cols="lg-12">
														<v-expansion-panels>
																<v-expansion-panel v-for="(details) in realdata" :key="details.text">
																	<div v-if="details.callstatus == 'Missed'">
																		<v-expansion-panel-header>
																			<div class="red--text"> {{ details.callerNumber }} 
																				<span class="mdi mdi-phone-missed ml-2"></span> 
																				<span v-for="getNotes in details.Note " :key="getNotes.text" >
																					<span v-if="getNotes.Note != ''" class="mdi mdi-note ml-2 blue--text"></span>
																				</span>
																				<br> 
																				<span class="mt-2 black--text">{{details.dateTime}}</span> 
																			</div>
																		</v-expansion-panel-header>
																	<v-expansion-panel-content>
																	<div v-if="details.count > 0">
																		<h5 class="font-weight-regular" > callback attempted : {{ details.count }} time(s)</h5>
																		<h5 class="font-weight-regular mb-3"> Callback attempted by  : {{ details.called_name }} </h5>
																	</div>
																	<h5 class="font-weight-regular mb-3" v-else> No callback attempted</h5>
																		<div v-for="getNotes in details.Note " :key="getNotes.text" >
																			<v-text-field v-model="getNotes.Note" :append-outer-icon="getNotes.Note ? 'mdi-send' : ''" clear-icon="mdi-close-circle" clearable label="Add notes" :rules="rules" counter maxlength="120" type="text" @click:append-outer="sendMessage(details.uniqueid,getNotes.Note)" @click:clear="clearMessage(details.uniqueid,getNotes.Note)" ></v-text-field>
																		</div>
																	</v-expansion-panel-content>
																</div>
															</v-expansion-panel>
														</v-expansion-panels>
													</v-col>
												</v-row>
											</v-card>
										</v-tab-item>
										<v-tab href="#three">
											FILTERS
										</v-tab>
										<v-tab-item key="three" id="three">
										</v-tab-item>
							</v-tabs>
							</v-col>
						</v-row>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
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

								db.collection('callLogs').where("owneruid" , "==" , this.uid).orderBy('dateTime', "desc").onSnapshot((querySnapshot) => {
									this.realdata = []
									if(!querySnapshot.empty) {
										querySnapshot.forEach(async (doc) => {
											console.log(doc.id, " => ", doc.data());
											let user_details = doc.data()
											this.calldetails = user_details
											var timestamp = this.calldetails.dateTime
											var date = new Date(timestamp);
											console.log("full time",date)
											var call_time = moment(date).format('hh:mm a')
											call_time = moment(date).fromNow();
											console.log("converted time",call_time)
											var note = ''
											var count = ''
											var uid = ''
											var user_name = ''
											var owneruid = ''
											if(this.calldetails.Notes) {
												note = this.calldetails.Notes
											}
											else {
												console.log('no note')
												note = [{ Note :  ''}]
											}
											if(this.calldetails.ClickCount) {
												count = this.calldetails.ClickCount.Count
												uid = this.calldetails.ClickCount.Uid
												user_name = this.calldetails.name
												owneruid = this.calldetails.owneruid
												console.log('user id ', this.click_details.user_name)
													if(uid == owneruid && this.calldetails.callstatus == 'Missed' ) {
														this.called_name = 'You'
													}
													else if(uid == owneruid && this.calldetails.callstatus == 'Answered') {
														this.called_name = user_name
													}
													else {
													await	db.collection('users').where("uid" , "==" , uid).get().then((querySnapshot) => { querySnapshot.forEach((doc) => {
																console.log(doc.id, " => ", doc.data());
																let user_details = doc.data()
																console.log(user_details.Name)
																this.called_name = user_details.Name							
															})
														})
													}
												} 
												else {
													console.log('no callback')
													count = 0
													uid = ''
													user_name = ''
													owneruid = ''
													this.called_name = ''
												}
											this.detail = Object.assign({}, this.detail, { callstatus : this.calldetails.callstatus , name: this.calldetails.name ,dateTime : call_time , conversationduration : this.calldetails.conversationduration ,callerNumber : this.calldetails.callerNumber, uniqueid : this.calldetails.uniqueid , Note : note , count : count , called_name : this.called_name })
											this.realdata.push(this.detail)
											console.log('snap calllog ', this.realdata)
											})
									}
									else {
										alert('no calls')									
									}
								})
							}
							else if (user_details.role == 'AGENT') {
								console.log('its agent')
								db.collection('callLogs').where("userid" ,'array-contains', this.uid).onSnapshot((querySnapshot) => {
									this.realdata = []
									if(!querySnapshot.empty) {
										querySnapshot.forEach((doc) => {
											console.log(doc.id, " => ", doc.data());
											let user_details = doc.data()
											this.calldetails = user_details
											var timestamp = this.calldetails.dateTime
											var date = new Date(timestamp);
											console.log("full time",date)
											var call_time = moment(date).format('hh:mm a')
											call_time = moment(date).fromNow();
											console.log("converted time",call_time)
											var note = ''
											if(this.calldetails.Notes) {
												note = this.calldetails.Notes
											}
											else {
												console.log('no note')
												note = [{ Note :  ''}]
											}
											this.detail = Object.assign({}, this.detail, { callstatus : this.calldetails.callstatus , name: this.calldetails.name ,dateTime : call_time , conversationduration : this.calldetails.conversationduration ,callerNumber : this.calldetails.callerNumber, uniqueid : this.calldetails.uniqueid , Note : note})
											this.realdata.push(this.detail)
											console.log('snap calllog ', this.realdata)
										
										if(this.calldetails.ClickCount) {
											this.click_details = Object.assign({}, this.click_details, { count : this.calldetails.ClickCount.Count , uid: this.calldetails.ClickCount.Uid , user_name : this.calldetails.name , owneruid : this.calldetails.owneruid})
											this.clicked_array.push(this.click_details)

											console.log('clicked',this.click_details)
											console.log('user id ', this.click_details.user_name)
											if(this.click_details.uid == this.click_details.owneruid) {
												this.called_name = this.click_details.user_name
												}
												else {
													db.collection('users').where("uid" , "==" , this.click_details.uid).get().then((querySnapshot) => {
														querySnapshot.forEach((doc) => {
															console.log(doc.id, " => ", doc.data());
															let user_details = doc.data()
															// this.calldetails = user_details
															console.log(user_details.Name)
															this.called_name = user_details.Name							

																})
													})
												}
											}
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
			called_name : '',
			role : '',
      headings: ['ALL', 'MISSED' , 'FILTERS'],
			detail: {},
			calldetails : [],
			realdata : [],
			click_details : {},
			clicked_array : [],
			selected :  false,
			note : [],
			show_notes : false,
			dialog : false,
			dialog2 : false,
			add_note : true,
			callback_uid : '',
			rules: [v => v.length <= 120 || 'Max 120 characters'],
			password: 'Password',
      show: false,
      marker: true,

    }),
    methods: {

			clickCount(unique_id) {
				this.clicked_array = []
				db.collection('callLogs').where("uniqueid" , "==" , unique_id).get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data());
						let user_details = doc.data()
						this.calldetails = user_details
						console.log(this.callback_uid)					
						if(this.calldetails.ClickCount) {
						this.click_details = Object.assign({}, this.click_details, { count : this.calldetails.ClickCount.Count , uid: this.calldetails.ClickCount.Uid , user_name : this.calldetails.name , userid : this.calldetails.userid})
								this.clicked_array.push(this.click_details)

						console.log('clicked',this.click_details)
							this.dialog2 = true
							console.log('user id ', this.click_details.user_name)
							if(this.click_details.uid == this.click_details.userid) {
								this.called_name = this.click_details.user_name
							}
							else {
								db.collection('users').where("uid" , "==" , this.click_details.uid).get().then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
										console.log(doc.id, " => ", doc.data());
										let user_details = doc.data()
										// this.calldetails = user_details
										console.log(user_details.Name)
										this.called_name = user_details.Name							

											})
								})
							}
						}
						else {
							this.dialog2 = false
							this.callBack(unique_id)
						}
					})
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
				})				
			},

      sendMessage (unique_id, message) {
				const user_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note',
					method: 'POST',
					data: {
						uid: this.uid,
						unique_id: unique_id,
						note : message
					},
				}
				console.log(user_data)
				this.$axios(user_data)
					.then((response) => {
						console.log(response)
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})

      },
      clearMessage (unique_id, message) {
        message = ''
        const user_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note',
					method: 'POST',
					data: {
						uid: this.uid,
						unique_id: unique_id,
						note : message
					},
				}
				console.log(user_data)
				this.$axios(user_data)
					.then((response) => {
						console.log(response)
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})
      },

    }
	}
	</script>