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
										<h3 class="mt-6 text-center">Analytics</h3>
									</div>
									<div class="ml-4">
										<h3 class="mt-3 text-left">Total : {{ total }} </h3>
										<h3 class="mt-3 text-left">Answered : {{ total_answered }} </h3>
										<h3 class="mt-3 text-left">Missed : {{ total_missed }} </h3>
										<h3 class="mt-3 text-left">Callback Attempted: {{ total_callback }} </h3>
										<h3 class="mt-3 text-left">Missed Open : {{ missed_open }} </h3>
									</div>

									<v-data-table :headers="table_missed_open" :items="total_users" hide-default-footer class="elevation-1">
									</v-data-table>
									<v-divider></v-divider>
									<h3 class="mt-3 text-center">Calls Forwarded Vs Calls Answered</h3>
									<v-data-table :headers="table_forwarded" :items="total_users" hide-default-footer class="elevation-1">
									</v-data-table>
									<v-divider></v-divider>
									<h3 class="mt-3 text-center">Missed Assigned Vs Callback Attempts</h3>
									<v-data-table :headers="table_missed_assigned" :items="total_users" hide-default-footer class="elevation-1">
									</v-data-table>
								</div>
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

  export default {
		created() {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid
					this.phno = user.phoneNumber.slice(3)
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						this.total_users = []
						querySnapshot.forEach(async(doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							console.log(user_details.role)
							if(user_details.role == 'ADMIN') {
								this.uid = user_details.OwnerUid
								this.detail = Object.assign({}, this.detail, { name : 'Owner' , uid : user_details.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 })
								this.total_users.push(this.detail)
								await db.collection('users').where("OwnerUid" , "==" , this.uid).get().then((querySnapshot) => {
									querySnapshot.forEach(async(doc) => {
										console.log(doc.id, " => ", doc.data());
										let agent_details = doc.data()
										this.detail = Object.assign({}, this.detail, { name : agent_details.Name , uid : agent_details.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 })
										this.total_users.push(this.detail)
									})
								})
							}
							else if (user_details.role == 'OWNER') {
								this.detail = { name : 'Owner' , uid : user_details.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 }
								this.total_users.push(this.detail)
								await db.collection('users').where("OwnerUid" , "==" , this.uid).get().then((querySnapshot) => {
									querySnapshot.forEach(async(doc) => {
										// console.log(doc.id, " => ", doc.data());
										let agent_details = doc.data()
										this.detail = { name : agent_details.Name , uid : agent_details.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 }
										this.total_users.push(this.detail)
									})
								})
							}
							console.log('users ' , this.total_users)
							await db.collection('callLogs').where("owneruid" , "==" , this.uid).orderBy('dateTime', "desc").onSnapshot((querySnapshot) => {
								this.realdata = []
								console.log('*************snap called**************', this.total_users)
								// this.total_users.find(v => v.missed_open > 0).missed_open = 0;
								// this.total_users.find(v => v.answered > 0).answered = 0;
								// this.total_users.find(v => v.forwarded > 0).forwarded = 0;
								// this.total_users.find(v => v.missed_assigned > 0).missed_assigned = 0;
								// this.total_users.find(v => v.callback > 0).callback = 0;
								if(!querySnapshot.empty) {
									this.total = 0
									this.total_answered = 0
									this.total_missed = 0
									this.total_callback = 0
									this.missed_open = 0
									console.log()
									this.total_users.filter(v => v.missed_open >= 0).missed_open = 0;
									this.total_users.filter(v => v.answered >= 0).answered = 0;
									this.total_users.filter(v => v.forwarded >= 0).forwarded = 0;
									this.total_users.filter(v => v.missed_assigned >= 0).missed_assigned = 0;
									this.total_users.filter(v => v.callback >= 0).callback = 0;
									querySnapshot.forEach(async (doc) => {
										this.total++
										// console.log(doc.id, " => ", doc.data());
										let user_details = doc.data()
										this.calldetails = user_details
										if(this.calldetails.callstatus == 'Answered') {
											this.total_answered++
											this.analytics(this.calldetails.agentDetails, 'answered')
										}
										else if (this.calldetails.callstatus == 'Missed') {
											this.total_missed++
											this.analytics(this.calldetails.agentDetails, 'missed')
											if(this.calldetails.ClickCount){
												this.total_callback++
												// console.log('callback_uid' , this.calldetails.ClickCount.Uid)
												this.analytics(this.calldetails.ClickCount.Uid, 'callback_attempted')
											}
											else {
												this.missed_open++
												this.analytics(this.calldetails.agentDetails, 'missed_open')
												this.analytics(this.calldetails.agentDetails, 'missed_assigned')

											}
										}
									})
								}
								else {
									alert('no calls')									
								}
							})
							
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
			detail: {},
			calldetails : [],
			realdata : [],
			click_details : {},
			clicked_array : [],
			callback_uid : '',
			total : '',
			total_answered : '',
			total_missed : '',
			total_callback : '',
			missed_open : '',
			total_users : [],
			table_missed_open: [
				{ text: 'Name', align: 'start', value: 'name' },
				{ text: 'Missed Open', value: 'missed_open' },
			],
			table_forwarded: [
				{ text: 'Name', align: 'start', value: 'name' },
				{ text: 'Calls Forwarded', value: 'forwarded' },
				{ text: 'Calls Answered', value: 'answered' },
			],
			table_missed_assigned: [
				{ text: 'Name', align: 'start', value: 'name' },
				{ text: 'Missed Assigned', value: 'missed_assigned' },
				{ text: 'Callback Attempts', value: 'callback' },
			],

    }),
    methods : {
			analytics(users,status){

				if (status == 'missed_open') {
					var counter
					var calllog_users = []
					Object.values(users).map((item) => calllog_users.push({ name : item.Name , uid : item.AgentUid}));
					for( let i of calllog_users){
						console.log('i value ', i)
						counter = this.total_users.some(item => item.uid === i.uid)
						console.log('counter at ', counter)
						if(counter == false){
							this.detail = { name : i.name , uid : i.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 }
							this.total_users.push(this.detail)
						}
						this.total_users.find(v => v.uid === i.uid).missed_open++;
					}
					console.log('after missed_open', this.total_users)
					console.log('counter after', counter)
				}

				else if (status == 'answered'){
					calllog_users = []
					Object.values(users).map((item) => calllog_users.push({ name : item.Name , uid : item.AgentUid}));
					for( let i of calllog_users){
						console.log('i value ', i)
						counter = this.total_users.some(item => item.uid === i.uid)
						console.log('counter at ', counter)
						if(counter == false){
							this.detail = { name : i.name , uid : i.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 }
							this.total_users.push(this.detail)
						}
						this.total_users.find(v => v.uid === i.uid).answered++
						this.total_users.find(v => v.uid === i.uid).forwarded++;
					}
					console.log('after answered', this.total_users)
				}

				else if (status == 'missed'){
					calllog_users = []
					Object.values(users).map((item) => calllog_users.push({ name : item.Name , uid : item.AgentUid}));
					for( let i of calllog_users){
						console.log('i value ', i)
						counter = this.total_users.some(item => item.uid === i.uid)
						console.log('counter at ', counter)
						if(counter == false){
							this.detail = { name : i.name , uid : i.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 }
							this.total_users.push(this.detail)
						}
						this.total_users.find(v => v.uid === i.uid).forwarded++;
					}
					console.log('after missed', this.total_users)
				}

				else if (status == 'missed_assigned'){
					calllog_users = []
					Object.values(users).map((item) => calllog_users.push({ name : item.Name , uid : item.AgentUid}));
					for( let i of calllog_users){
						console.log('i value ', i)
						counter = this.total_users.some(item => item.uid === i.uid)
						console.log('counter at ', counter)
						if(counter == false){
							this.detail = { name : i.name , uid : i.uid , missed_open : 0 ,forwarded : 0 , answered : 0 , missed_assigned : 0 , callback : 0 }
							this.total_users.push(this.detail)
						}
						this.total_users.find(v => v.uid === i.uid).missed_assigned++;
					}
					console.log('after missed assign', this.total_users)
				}

				else if (status == 'callback_attempted'){
						this.total_users.find(v => v.uid === users).callback++;

					console.log('after callback_attempted', this.total_users)
				}	
			},
			value_reset() {
				console.log('before', this.total_users)
				this.total_users.find(v => v.missed_open >= 0).missed_open = 0;
				this.total_users.find(v => v.answered >= 0).answered = 0;
				this.total_users.find(v => v.forwarded >= 0).forwarded = 0;
				this.total_users.find(v => v.missed_assigned >= 0).missed_assigned = 0;
				this.total_users.find(v => v.callback >= 0).callback = 0;
				console.log('after', this.total_users)
			}
			
    }
	}

</script>