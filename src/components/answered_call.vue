<template>
	<v-app >
		<div>
			<v-container  fluid>
					<v-snackbar :timeout="timeout" v-model="notes_added" :bottom="bottom" :right="right" color="green" text>Notes added successfully!</v-snackbar><v-snackbar :timeout="timeout" v-model="notes_removed" :bottom="bottom" :right="right" color="red" text>Notes removed successfully!</v-snackbar>
				<v-layout >
					<v-flex xs12 sm12 md12>

							<v-row no-gutters>
								<v-col cols="12">
									<div class="ml-3">
										<v-row>
											<v-col cols="12" sm="10">
												<h2 class="mt-6 mb-5">Answered Call</h2>
											</v-col>
											<v-col cols="12" sm="2" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-4 " color="black" >mdi-magnify</v-icon> <v-icon  class="mt-6 mb-5 mr-7" color="black" >mdi-filter-variant</v-icon> </span>
											</v-col>
										</v-row>
											<v-expansion-panels accordion flat>
												<v-expansion-panel v-for="(details) in realdata" :key="details.text">
													<v-expansion-panel-header >
														<div>
														<v-row class="calls_list">
															<v-col cols="12" sm="10">
																<h3  class="font-weight-light"> <v-icon  class="mr-3" color="green" >mdi-arrow-bottom-left</v-icon> +91 {{ details.callerNumber }}  </h3>
																<br>
															</v-col>
															<v-spacer></v-spacer>
															<v-col cols="12" sm="2" align="end">
																<v-menu offset-y>
																	<template v-slot:activator="{ on, attrs }">
																		<v-icon v-bind="attrs" v-on="on" color="black" >mdi-dots-vertical</v-icon>
																	</template>
																	<v-list>
																		<v-list-item v-for="(item, index) in items" :key="index">
																			<v-list-item-title :class="item.color">{{ item.title }}</v-list-item-title>
																		</v-list-item>
																	</v-list>
																</v-menu>

															</v-col>
														</v-row>
															<div class="ml-10 font-weight-thin date_time">{{details.dateTime}}, {{details.name}} </div> 
															<div class="ml-10 mt-3 font-weight-thin" v-for="getNotes in details.Note " :key="getNotes.text" >
																<div> <span v-if="getNotes.Note != ''" class="mdi mdi-note grey--text"> </span> {{ getNotes.Note }}</div>
															</div>
															
											
														</div>
													</v-expansion-panel-header>
													<v-expansion-panel-content>
														<div >
														<v-row >
																<v-col cols="12" sm="6">
																	<div class="ml-10">
																		<h6  class="font-weight-thin"> Source </h6>
																		
																		<h5 class="font-weight-light"> {{details.source}} No: (+91 {{ details.virtualnumber }}) </h5>
																		<br>
																		
																		<div v-for="getNotes in details.Note " :key="getNotes.text" >
																			<v-text-field v-model="getNotes.Note" :append-outer-icon="getNotes.Note ? 'mdi-send' : ''" clear-icon="mdi-close-circle" clearable label="Notes" :rules="rules" counter maxlength="75" type="text" @click:append-outer="sendMessage(details.uniqueid,getNotes.Note)" @click:clear="clearMessage(details.uniqueid,getNotes.Note)" class="black--text" ></v-text-field>
																		</div>
																			
																		<br>
																	
																		<div v-for="getNotes in details.Note " :key="getNotes.text" >
																			<v-text-field v-model="Reminder" clear-icon="mdi-close-circle" clearable label="Reminder"  append-icon="mdi-pencil" type="text" @click="dialog=true" ></v-text-field>
																		
																	</div>
																	</div>
																</v-col>
																<v-col cols="12" sm="6">
																	<audio controls >
																		<source :src="details.recordingUrl" type="audio/mpeg">
																		Your browser does not support the audio tag.
																	</audio>
																</v-col>
														</v-row>
														</div>

													</v-expansion-panel-content>
												</v-expansion-panel>
											</v-expansion-panels>
									</div>
								</v-col>
							</v-row>
								<v-dialog
								v-model="dialog"
								max-width="400px"
								persistent
								
							>
							<v-card max-height>
								<v-card-title class="text-h5">
									Reminder
								</v-card-title>

								<v-card-text>
									<v-text-field
										label="Remind About"
										v-model="reminderMessage"
										outlined
									></v-text-field>
									<v-radio-group
										v-model="radio"
										column
									>
										<v-radio
											label="10 minutes"
											value="radio-1"
											color="red"
										></v-radio>
										<v-radio
											label="30 minutes"
											value="radio-2"
											color="red"
										></v-radio>
										<v-radio
											label="1 hour"
											value="radio-3"
											color="red"
										></v-radio>
										<v-radio
											label="Custom"
											value="radio-4"
											color="red"
										></v-radio>
									</v-radio-group>
									<div v-if="radio == 'radio-4'">
										<v-menu
											ref="menu1"
											v-model="menu1"
											:close-on-content-click="false"
											:return-value.sync="date"
											transition="scale-transition"
											offset-y
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="date"
													label="Select Date"
													prepend-icon="mdi-calendar"
													readonly
													v-bind="attrs"
													v-on="on"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="date"
												no-title
												scrollable
											>
											<v-spacer></v-spacer>
											<v-btn
												text
												color="primary"
												@click="menu1 = false"
											>
												Cancel
											</v-btn>
											<v-btn
												text
												color="primary"
												@click="$refs.menu1.save(date)"
											>
												OK
											</v-btn>
										</v-date-picker>
									</v-menu>



										<v-menu
											ref="menu"
											v-model="menu2"
											:close-on-content-click="false"
											:nudge-right="40"
											:return-value.sync="time"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="time"
													label="Select Time"
													prepend-icon="mdi-clock-time-four-outline"
													readonly
													v-bind="attrs"
													v-on="on"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="menu2"
												v-model="time"
												full-width
												color="red"
												@click:minute="$refs.menu.save(time)"
											></v-time-picker>
										</v-menu>
									</div>
								</v-card-text>

									<v-card-actions>
										
									<v-row no-gutters>
										<v-col cols="12" sm="6">
											<v-btn
												rounded
												width="100%"
												color="white"
												dark
												class="red--text	"
												@click="dialog = false"
											>
												Cancel
											</v-btn>
										</v-col>
										<v-col cols="12" sm="6">
											<v-btn
												width="100%"
												rounded
												color="red"
												dark
												@click="sendReminder(date , time)"
											>
												Save
											</v-btn>
										</v-col>
									</v-row>

									</v-card-actions>
							</v-card>
						</v-dialog>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-app>
</template>


<script>
import firebase from 'firebase';
import { db } from '@/main.js';
import moment from 'moment'

  export default {

    data: () => ({
			items: [
  { title: 'Add Note' ,color: 'black--text', url: 'add_note'},
        { title: 'Add Reminder',color: 'black--text' , url: 'add_number'},
        // { title: 'Call This Number',color: 'black--text' , url: 'call_this_number'},
        { title: 'Block This Number',color: 'red--text' , url: 'block_number'},
      ],
      uid : '',
			phno : '',
			called_name : '',
			role : '',
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
			rules: [v => v.length <= 75 || 'Max 75 characters'],
			password: 'Password',
      show: false,
    marker: true,
    column: null,
	menu2: false,
	menu1: false,
	radio : 'radio-1', 
	Reminder:'',
	reminderMessage : '',
	date : '',
	time : '',
// success snackbar
notes_added: false,
	notes_removed:false,
    timeout: 2500,
    bottom: true,
    right: false
    }),
	methods: {
		blockCall(type,number)
		{
		// var token = localStorage.getItem('token');
		
		// console.log(type,number);
		// add_note
		// add_number
		// block_number
		if(type=='block_number'){
			var token = localStorage.getItem('token');
				const blockNumber = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/blockcall',
					method: 'POST',
					data: {
						number: number,
						owner_uid: this.uid,
						status: true,
						UpdatedBy:'',
						AccountId:'',


					},
						headers: { 
							'token': token,
							'Content-Type': 'application/json'
						},
				}
				console.log(blockNumber)
				this.$axios(blockNumber)
					.then((response) => {
						console.log(response)

					})
					.catch((error) => {
						console.log("Error getting: ", error);
					})

		}else if(type=='add_note'){
		this.show_notes=true;
		}else{
			this.show_remind=true;
		}
		} ,   sendMessage (unique_id,message) {
		var token = localStorage.getItem('token');
	
				const user_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note',
					method: 'POST',
					data: {
						uid: this.uid,
						// uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',
						unique_id: unique_id,
						note : message
					},
						headers: { 
							'token': token,
							'Content-Type': 'application/json'
						},
				}
				console.log(user_data)
				this.$axios(user_data)
					.then((response) => {
						// console.log(response.data.status)
						if(response.data.status==true){

							this.notes_added=true;
						}
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})},
	sendReminder(date , time , unique_id, message) {
		var token = localStorage.getItem('token');
				console.log(date)
				console.log(time)
				
				const user_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/reminder',
					method: 'POST',
					data: {
						// owner_uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',
						owner_uid: this.uid,
						call_id: unique_id,
						message : message,
						updated_by: '',
						Accountid : '',
						agent_uid : '',
						name : '',
						reminder_at : '',

					},
						headers: { 
							'token': token,
							'Content-Type': 'application/json'
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
		var token = localStorage.getItem('token');
        message = ''
        const user_data = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note',
					method: 'POST',
					data: {
						uid: this.uid,
						unique_id: unique_id,
						note : message
					},	headers: { 
							'token': token,
							'Content-Type': 'application/json'
						},
				}
				console.log(user_data)
				this.$axios(user_data)
					.then((response) => {
						console.log(response)
						if(response.data.status==true){

							this.notes_removed=true;
						}
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})
      },

  },
		created() {
				let localStorageUserObj = localStorage.getItem('tpu');

			if (localStorageUserObj) {
				let parsedUser = JSON.parse(localStorageUserObj);
				this.userEmail = parsedUser.Email;

				this.userRole = parsedUser.role;
					firebase.auth().onAuthStateChanged(user => {
					if (user) {

							this.uid = user.uid;
							console.log('User Id : '+this.uid);
				db.collection('callLogs').where("owneruid" , "==" , this.uid).where("callstatus" , "==" , "Answered").orderBy('dateTime', "desc").onSnapshot((querySnapshot) => {
					this.realdata = []
					if(!querySnapshot.empty) {
						querySnapshot.forEach(async (doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.calldetails = user_details
							var timestamp = this.calldetails.dateTime
							var date = new Date(timestamp);
							// console.log("full time",date)
							// var call_time = moment(date).format('hh:mm a')
							// call_time = moment(date).fromNow();
							// console.log("converted time",call_time)

							var myCurrentDate=new Date();
							var missedTresholdDate=new Date(myCurrentDate);
							missedTresholdDate.setDate(missedTresholdDate.getDate()- 2	);//2 days before
							console.log(missedTresholdDate);

							console.log(timestamp); //missed call date
							console.log(missedTresholdDate.getTime()); //addon date
							console.log(myCurrentDate.getTime()); //today's date

							if(timestamp <= missedTresholdDate.getTime()){
							call_time = moment(date).format('D MMM Y hh:mm a')
							
							}else{
							
							var call_time = moment(date).format('hh:mm a')
							call_time = moment(date).fromNow();

							}
							var note = ''
							if(this.calldetails.Notes) {
								note = this.calldetails.Notes
							}
							else {
								console.log('no note')
								note = [{ Note :  ''}]
							}
							var calledNumber = this.calldetails.callerNumber.slice(0, 5) + ' ' + this.calldetails.callerNumber.slice(5, 7) + ' ' + this.calldetails.callerNumber.slice(7, 11)
							var virtualnumber = this.calldetails.virtualnumber.slice(0, 5) + ' ' + this.calldetails.virtualnumber.slice(5, 7) + ' ' + this.calldetails.virtualnumber.slice(7, 11)
							this.detail = Object.assign({}, this.detail, { callstatus : this.calldetails.callstatus , name: this.calldetails.name[0] ,dateTime : call_time , conversationduration : this.calldetails.conversationduration ,callerNumber : calledNumber, uniqueid : this.calldetails.uniqueid , Note : note , source : this.calldetails.source , virtualnumber : virtualnumber, called_name : this.called_name , recordingUrl : this.calldetails.recordingurl })
							this.realdata.push(this.detail)
							console.log('snap calllog ', this.realdata)
							})
					}
					else {
						//alert('no calls')									
					}
				})



					}
				
		})

  }

			
		}
	
  }
</script>


<style scoped>
.test {
       border-color: grey !important;
       height: 100%;
}
.v-expansion-panel {
	border-bottom: 1px solid #ddd;
	border-bottom-spacing : 15px;
	: 100px;
}
.v-expansion-panel-header {
	line-height: 0.5 !important;
}
.application {
   font-family: adobe-clean, sans-serif !important;
 }
</style>