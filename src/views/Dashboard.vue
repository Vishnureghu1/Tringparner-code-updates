<template>
	<v-app >
		
		<div>
			<v-container  fluid>

				<v-layout >
					<v-flex xs12 sm12 md12>
							<v-row no-gutters>
								<v-col cols="12">
								
									<div class="ml-8">
										<v-row>
											<v-col cols="12" sm="10">
												<h2 class="page_title mt-6 mb-0">Dashboard</h2>
											</v-col>
											<v-col cols="12" sm="2" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="black" >mdi-filter-variant</v-icon> </span>
											</v-col>

											
										</v-row>
										

										<v-row>
											<v-col cols="6">

												<v-row  class="heading mt-0 mb-2 pl-4" 
    align="center"
  
  >
    <Icon class="mr-0" :inline="true" color="red" icon="mdi:call-missed" width="24" height="24">	</Icon>
    <div class="mx-2">Today's Missed Open Calls</div>
												</v-row>
												<h4 class="heading mt-0 mb-2" > 
													
														
												</h4>
<v-row v-if="!missedCallPanel.length">
    <v-col cols="12" align="left" class="pl-15">
		Nothing to show
		
	</v-col>
	</v-row>

												<v-expansion-panels accordion flat  v-model="missedCallPanel">

											<v-expansion-panel v-for="(agentId, index) in missedCalls" :key="index" >
														<v-expansion-panel-header >
															<div>
														
																<v-row no-gutters>
																		
																	<v-col cols="2" flex >
																		<h4 class="name_heading font-weight-light mt-2">{{getAgentName(agentId)}}</h4>
																		<br>
																	</v-col>
																	<v-spacer></v-spacer>
																	<v-col cols="10" flex>
																		<v-divider class="mt-4"></v-divider>
																	</v-col>
																</v-row>
															</div>
														</v-expansion-panel-header>
																<v-expansion-panel-content  v-for="(calls, innerIndex) in getCallDetails(agentId)" :key="innerIndex">
																	<v-row>
																		<v-col cols="12" sm="10">
																			<h3  class="number_heading font-weight-light">{{calls.callerNumber}}</h3>
																			<h6 class="comment_heading font-weight-light">{{calls.ringduration}} , {{calls.callTime}}, {{calls.agentName}}</h6> 
																			<br>
																		</v-col>
																		<v-spacer></v-spacer>
																	
																	</v-row>
																</v-expansion-panel-content>
													</v-expansion-panel>
												</v-expansion-panels>

<h4 class="heading  mb-2 mt-5"> <v-icon color="black" class="mr-2">mdi-call-split</v-icon> Team Skipped Calls</h4>
<v-row v-if="!skippedCallPanel.length">
    <v-col cols="12" align="left" class="pl-15">
		Nothing to show
		
	</v-col>
	</v-row>
											<v-expansion-panels accordion flat  v-model="skippedCallPanel" >

													<v-expansion-panel v-for="(agentId, index) in skippedCalls" :key="index" >
														<v-expansion-panel-header >
															<div>
															
																<v-row no-gutters>
																		
																	<v-col cols="2" flex >
																		<h4 class="name_heading font-weight-light mt-2">{{getAgentName(agentId)}}</h4>
																		<br>
																	</v-col>
																	<v-spacer></v-spacer>
																	<v-col cols="10" flex>
																		<v-divider class="mt-4"></v-divider>
																	</v-col>
																</v-row>
															</div>
														</v-expansion-panel-header>
																<v-expansion-panel-content  v-for="(calls, innerIndex) in getCallDetailsSkipped(agentId)" :key="innerIndex">
																	<v-row>
																		<v-col cols="12" sm="10">
																			<h3  class="number_heading font-weight-light">{{calls.callerNumber}}</h3>
																			<h6 class="comment_heading font-weight-light">{{calls.ringduration}} , {{calls.callTime}}, {{calls.agentName}}</h6> 
																			<br>
																		</v-col>
																		<v-spacer></v-spacer>
																	
																	</v-row>
																</v-expansion-panel-content>
													</v-expansion-panel>
												</v-expansion-panels>
											
											</v-col>

																			<v-col cols="6" align="center">
											
<h4 class="heading"><v-icon class="mt-3 mb-2 mr-3 pl-10" color="black">mdi-alarm</v-icon> Today's Reminders </h4>
<v-row v-if="!remiderCalls.length">
    <v-col cols="12" align="left" class="pl-15">
		<div class="mb-3 mt-0 pl-5 ml-5">Nothing to show</div>
		
	</v-col>
	</v-row>
<v-row class="">
    <!-- {{remiderCalls}} -->
    <v-col cols="12" align="left" class="pl-15">
        <div v-for="(reminder, index) in remiderCalls" :key="index" class="mb-3 mt-5 pl-5 ml-5">

            <h4 class="number_heading font-weight-light mr-15">{{reminder.AgentName}}</h4>
            <div class="mr-16">
                <h5 class="comment_heading font-weight-light mr-16 mt-1" >{{reminder.callerNumber}} at {{reminder.ReminderAt}} </h5>
            </div>
        </div>
    </v-col>
</v-row>
</v-col>	
										
										</v-row>
									
									</div>
								</v-col>
							</v-row>

					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-app>
</template>

<script>
import firebase from 'firebase'
	import { Icon } from '@iconify/vue2';
	import { db } from '@/main.js';
	import moment from 'moment'
	
	export default {

		components: {
			Icon,
		},
		data: () => ({

			agentPanel: [],
			nextTodoId: 1,
			userEmail: '',
			userRole: '',
			agentName: '',
			missedCallPanel: [],
			skippedCallPanel: [],
			remiderCalls: [],
			agentNames: {}

		}),

		async created() {
			this.GetMissedCall()
			this.GetSkippedCall()
			this.GetRemiders()
		},
		computed: {
			missedCalls() {
				const missedCalls = new Set();
				this.missedCallPanel.forEach(missed => missedCalls.add(missed.agentId));
				return Array.from(missedCalls);
			},

			skippedCalls() {
				const skippedCalls = new Set();
				this.skippedCallPanel.forEach(skipped => skippedCalls.add(skipped.agentId));
				return Array.from(skippedCalls);
			}
		},
		methods: {
			isToday(timestampInMilliseconds) {
				const today = new Date()
				return new Date(timestampInMilliseconds).getDate() == today.getDate() &&
					new Date(timestampInMilliseconds).getMonth() == today.getMonth() &&
					new Date(timestampInMilliseconds).getFullYear() == today.getFullYear()
			},
			getCallDetails(agentId) {
				return this.missedCallPanel
					.filter(missed => missed.agentId === agentId);
			},

			// skipped
			getCallDetailsSkipped(agentId) {
				return this.skippedCallPanel
					.filter(skipped => skipped.agentId === agentId);
			},
			//get agent name
			getAgentName(agentId) {
				var valObj = this.agentNames[agentId];
				return valObj;

			},

			async GetMissedCall() {

				let localStorageUserObj = localStorage.getItem('tpu');

				if (localStorageUserObj) {
					let parsedUser = JSON.parse(localStorageUserObj);
					this.userEmail = parsedUser.Email;

					this.userRole = parsedUser.role;

					firebase.auth().onAuthStateChanged(user => {
						if (user) {

							this.uid = user.uid;
							db.collection('callLogs')
								.where("callstatus", "==", "Missed")
								.where("owneruid", "==", this.uid)
								.orderBy('dateTime', "asc")
								.get()
								.then((querySnapshot) => {
									querySnapshot.forEach((logs) => {
										var agentData = logs.data().agentDetails;
										agentData.forEach((agentData) => {
											var agentID = agentData.AgentUid;
											var agentName = agentData.Name;
											var callerNumber = '+91 ' + logs.data().callerNumber.slice(0, 5) + ' ' + logs.data().callerNumber.slice(5, 7) + ' ' + logs.data().callerNumber.slice(7, 11);
											// console.log(callerNumber);

											var timestamp = logs.data().dateTime
											var date = new Date(timestamp);
											var call_time = moment(date).format('hh:mm a')
											call_time = moment(date).fromNow();
											// 
											if (agentName != '') {



												// this.agentPanel.push(agentID)
												this.agentPanel.indexOf(agentID) === -1 ? this.agentPanel.push(agentID) : this.missedCallPanel.push({
													id: this.nextTodoId++,
													callTime: call_time,
													callerNumber: callerNumber,
													ringduration: '00:' + logs.data().ringduration,
													agentId: agentID,
													agentName: agentName,
												});
											}
											this.$set(this.agentNames, agentID, agentName)
										});
									})
								}).catch((error) => {
									console.log("Error getting logs: ", error);
								})

						}
					})
				}
			},

			async GetSkippedCall() {

				let localStorageUserObj = localStorage.getItem('tpu');

				if (localStorageUserObj) {
					let parsedUser = JSON.parse(localStorageUserObj);
					this.userEmail = parsedUser.Email;

					this.userRole = parsedUser.role;

					firebase.auth().onAuthStateChanged(user => {
						if (user) {

							this.uid = user.uid;
							db.collection('callLogs')
								.where("callstatus", "==", "Answered")
								.where("owneruid", "==", this.uid)
								// .where("date", "==", new Date().getTime() )
								.orderBy('dateTime', "asc")
								.get()
								.then((querySnapshot) => {
									querySnapshot.forEach((logs) => {

										var agentData = logs.data().agentDetails;
										agentData.forEach((agentData) => {


											var agentID = agentData.AgentUid;
											var agentName = agentData.Name;
											var callerNumber = '+91 ' + logs.data().callerNumber.slice(0, 5) + ' ' + logs.data().callerNumber.slice(5, 7) + ' ' + logs.data().callerNumber.slice(7, 11);
											// console.log(callerNumber);
											// var virtualnumber = this.calldetails.virtualnumber.slice(0, 5) + ' ' + this.calldetails.virtualnumber.slice(5, 7) + ' ' + this.calldetails.virtualnumber.slice(7, 11)
											var timestamp = logs.data().dateTime
											var date = new Date(timestamp);
											var call_time = moment(date).format('hh:mm a')
											call_time = moment(date).fromNow();

											this.skippedCallPanel.push({

												callTime: call_time,
												callerNumber: callerNumber,
												ringduration: '00:' + logs.data().ringduration,
												agentId: agentID,
												agentName: agentName,
											});
										});
									})
								}).catch((error) => {
									console.log("Error getting logs: ", error);
								})
						}
					})
				}
			},

			async GetRemiders() {

				let localStorageUserObj = localStorage.getItem('tpu');

				if (localStorageUserObj) {
					let parsedUser = JSON.parse(localStorageUserObj);
					this.userEmail = parsedUser.Email;

					this.userRole = parsedUser.role;

					firebase.auth().onAuthStateChanged(user => {
						if (user && this.userRole != 'AGENT') {

							this.uid = user.uid;
							db.collection('Reminders')
								.where('OwnerUid', '==', this.uid)
								// .where('ReminderAt',"==", new Date().getTime())
								.get()
								.then((querySnapshot) => {
									querySnapshot.forEach((logs) => {
										// console.log(logs.data());
										// console.log(logs.data());

										var callerNumber = '+91 ' + logs.data().Number.slice(0, 5) + ' ' + logs.data().Number.slice(5, 7) + ' ' + logs.data().Number.slice(7, 11);
										var timestamp = logs.data().ReminderAt
										var date = new Date(timestamp);
										var call_time = moment(date).format('DD-MM-YYYY hh:mm a')
											// call_time = moment(date).fromNow();

										const now = Date.now(); // Unix timestamp in milliseconds
										console.log('now', now);
										console.log('isToday', this.isToday(logs.data().ReminderAt));

										if(this.isToday(logs.data().ReminderAt)) {

											this.remiderCalls.push({

												ReminderAt: call_time,
												callerNumber: callerNumber,
												AgentName: logs.data().Name,

											});
										}
									})
								}).catch((error) => {
									console.log("Error getting logs: ", error);
								})
						} else {


							this.uid = user.uid;
							db.collection('Reminders')
								.where('AgentUid', '==', this.uid)
								// .where('ReminderAt',"==", new Date().getTime())
								.get()
								.then((querySnapshot) => {
									querySnapshot.forEach((logs) => {
										// console.log(logs.data());


										var callerNumber = '+91 ' + logs.data().Number.slice(0, 5) + ' ' + logs.data().Number.slice(5, 7) + ' ' + logs.data().Number.slice(7, 11);
										var timestamp = logs.data().ReminderAt
										var date = new Date(timestamp);
										var call_time = moment(date).format('hh:mm a')
										call_time = moment(date).fromNow();

										if(this.isToday(logs.data().ReminderAt)) {
											this.remiderCalls.push({

												ReminderAt: call_time,
												callerNumber: callerNumber,
												AgentName: logs.data().Name,


											});
										}
									})
								}).catch((error) => {
									console.log("Error getting logs: ", error);
								})



						}



					})
				}
			}
		}
	}
  </script>

