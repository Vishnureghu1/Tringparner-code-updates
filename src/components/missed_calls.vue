<template>
	<v-app >
		<div>
			<v-container  fluid>
				<v-layout >
					<v-flex xs12 sm12 md12>
							<v-row no-gutters>
								<v-col cols="12">
									<div class="ml-3">
										<v-row>
											<v-col cols="12" sm="10">
												<h2 class="mt-6 mb-5">Missed Call</h2>
											</v-col>
											<v-col cols="12" sm="2" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-4 " color="black" >mdi-magnify</v-icon> <v-icon  class="mt-6 mb-5 mr-7" color="black" >mdi-filter-variant</v-icon> </span>
											</v-col>
										</v-row>
											<v-expansion-panels accordion flat >
												<v-expansion-panel v-for="(details) in realdata" :key="details.text">
													<v-expansion-panel-header expand-icon="">
														<div>
														<v-row>
															<v-col cols="12" sm="10">
														
																<h3  class="font-weight-light"> <v-icon  class="mr-3" color="red" >mdi-arrow-bottom-right</v-icon> +91 {{ details.callerNumber }}    </h3>
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
															<div class="ml-10 font-weight-thin">{{details.dateTime}}, {{details.name}} </div> 
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
																			<v-text-field v-model="getNotes.Note" :append-outer-icon="getNotes.Note ? 'mdi-send' : ''" clear-icon="mdi-close-circle" clearable label="Notes" :rules="rules" counter maxlength="75" type="text" @click:append-outer="sendMessage(details.uniqueid,getNotes.Note)" @click:clear="clearMessage(details.uniqueid,getNotes.Note)" ></v-text-field>
																		</div>
																		<br>
																		<div v-for="getNotes in details.Note " :key="getNotes.text" >
																			<v-text-field v-model="Reminder" :append-outer-icon="getNotes.Note ? 'mdi-send' : ''" clear-icon="mdi-close-circle" clearable label="Reminder" @click="dialog = true" ></v-text-field>
																		</div>
																	</div>
																</v-col>
																<v-col cols="12" sm="6">
																	<audio controls>
																		<source src="details.recordingUrl" type="audio/mpeg">
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
								max-width="300px"
							>
							<v-card>
								<v-card-title class="text-h5">
									Use Google's location service?
								</v-card-title>

								<v-card-text>
									Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
								</v-card-text>

									<v-card-actions>
										<v-spacer></v-spacer>

											<v-btn
												color="green darken-1"
												text
												@click="dialog = false"
											>
												Disagree
											</v-btn>

											<v-btn
												color="green darken-1"
												text
												@click="dialog = false"
											>
													Agree
												</v-btn>
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
        { title: 'Add Note' ,color: 'black--text'},
        { title: 'Add Reminder',color: 'black--text' },
        { title: 'Call This Number',color: 'black--text' },
        { title: 'Block This Number',color: 'red--text' },
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
			add_note : true,
			callback_uid : '',
			rules: [v => v.length <= 75 || 'Max 75 characters'],
			password: 'Password',
      show: false,
      marker: true,

    }),
		methods: {
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
							
				db.collection('callLogs').where("owneruid" , "==" , this.uid).where("callstatus" , "==" , "Missed").orderBy('dateTime', "desc").onSnapshot((querySnapshot) => {
					
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
								
								uid = this.calldetails.ClickCount.Uid
								user_name = this.calldetails.name
								owneruid = this.calldetails.owneruid
								// console.log('user id ', this.click_details.user_name)
									if(uid == owneruid && this.calldetails.callstatus == 'Missed' ) {
										this.called_name = 'You'
									}
									else if(uid == owneruid && this.calldetails.callstatus == 'Answered') {
										this.called_name = user_name
									}
								} 
								else {
									console.log('no callback')
									
									uid = ''
									user_name = ''
									owneruid = ''
									this.called_name = ''
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