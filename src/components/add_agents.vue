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
											<h3 class="mt-6 ml-5 mb-5 text-center">Add agents</h3>
										</div>
									<div class="ml-4 mr-4">
										<v-select :items="virtual_number_list" label="Virtual number" v-model='selected_virtual_number' v-on:change="changeview(selected_virtual_number)" required ></v-select>
										<h3 class="mt-6 ml-5 mb-5 text-center">Virtual Number : 
										<span class=" red--text text-center"> {{ selected_virtual_number }} </span></h3>
									</div>
									</div>

											<ul>
														<li v-for="details in seleted_users " :key="details.text">
															<ul>
																<li>
																	{{details.Name}}
																</li>
																<li>
																	{{details.Number}}

																	<v-btn text v-if="enable_delete" @click = 'deleteUser(details.Name,details.Number)' color='red'><v-icon right dark > mdi-delete </v-icon></v-btn>
																</li>

																<v-divider></v-divider>
																</ul>
															</li>
											</ul>
										<br>
										<br>

									<v-row justify="center">
									<v-dialog v-model="dialog" persistent max-width="500px">
										<template v-slot:activator="{ on, attrs }">
											<v-btn color="primary" dark v-bind="attrs" v-on="on" > + Add User</v-btn>
										</template>
										<v-card>
											<v-card-title>
												<span>Agent list</span>
											</v-card-title>
											<v-card-text>

												<v-btn v-for="users in user_listing" :key="users" @click.prevent="getUser(users.name,users.phonenumber,users.userUid)" class="black--text mb-3" color='white'>{{users.name}} {{users.phonenumber}}</v-btn>
											
											</v-card-text>
											<v-card-actions>
												<v-btn color="blue darken-1" text @click="dialog = false"> Cancel </v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</v-row>
								<br>
								<br>
									<v-btn class="ml-4" color="primary" @click="updateUser()">update agents</v-btn>
								</v-col>
							</v-row>
							<br>
							<br>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</v-app>
</template>


<script>
// import Vue from 'vue'
// import axios from 'axios'
import firebase from 'firebase'
import { db } from '@/main.js';
  export default {
		data: () => ({
			uid : '',
			phno : '',
			name: '',
			virtual_number : '',
			selected_virtual_number : '',
			virtual_number_list : [],
      role :'',
      detail: {},
      participants: {},
      added_list_json : {},
			Udata : [],
			realdata : [],
			all_participants : [],
			user_listing : [],
			added_list: [],
			seleted_users : [],
			userUid : '',
			ownerid : '',
			dialog : false,
			toggle_none : null,
			enable_delete : true
    }),

		created() {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid

					await db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach(async (doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							console.log(user_details.role)
							if (user_details.role == 'OWNER' || user_details.role == 'ADMIN' ) {
								if(user_details.role == 'ADMIN') {
									this.uid = user_details.OwnerUid
									console.log(this.uid)
								}
							}
					await db.collection('uservirtualNumber').where("Uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach(async(doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.uid = user_details.Uid
							this.virtual_number = user_details.VirtualNumber
							this.virtual_number_list.push(this.virtual_number)
						})
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					})
					console.log('type of ',typeof(this.virtual_number_list))
					this.selected_virtual_number = this.virtual_number_list[0]
					console.log(this.virtual_number_list[0])
						await	db.collection('uservirtualNumber').where("VirtualNumber" , "==" , this.selected_virtual_number).get().then((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									let user_details = doc.data()
									this.Udata = user_details
									var trying = this.Udata.Participants
									const getLength = trying.reduce((a, obj) => a + Object.keys(obj).length, 0);
									console.log(getLength);
									if (getLength == 3){
										this.enable_delete = false
									}
									trying.forEach((items) => {
										console.log("loop items",items)
										this.added_list_json = Object.assign({}, this.added_list_json, { Number: items.Number , Name: items.Name , AgentUid : items.AgentUid})
										this.added_list.push(this.added_list_json)
										this.seleted_users.push(this.added_list_json)
									})
									console.log('im getting',this.added_list)
									
									console.log('before data ', this.seleted_users)



										this.detail = Object.assign({}, this.detail, { participants: this.Udata.Participants , phonenumber: this.Udata.PhoneNumber , userUid : this.Udata.Uid})
										this.realdata.push(this.detail)
										this.userUid = this.Udata.uid
										console.log(typeof(this.detail))
										console.log(this.realdata)
										
									})
								})
								.catch((error) => {
									console.log("Error getting documents: ", error);
								})

							db.collection('users').where("OwnerUid" , "==" , this.uid).get().then((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									let user_details = doc.data()
									this.Udata = user_details
									this.Udata = user_details
									if(this.Udata.virtualNumber) {
										this.virtual_number_list.push(this.Udata.virtualNumber)
										console.log('listing virtualNumber',this.virtual_number_list)
									}
										this.detail = Object.assign({}, this.detail, { phonenumber: this.Udata.PhoneNumber , name: this.Udata.Name , userUid : this.Udata.uid})
										this.user_listing.push(this.detail)
										this.userUid = this.Udata.uid
										console.log(typeof(this.detail))
										console.log(this.user_listing)
									})
								})
								.catch((error) => {
									console.log("Error getting documents: ", error);
								})



						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})


				}
			})
		},

  methods : {
			getUser(name,phonenumber,useruid) {
				console.log("name",name)
				console.log("phno",phonenumber)
				console.log('before pushed data ', this.seleted_users)
				// phonenumber = parseInt(phonenumber)
				console.log(typeof(phonenumber))
				this.participants = { AgentUid: useruid ,'Name' : name , 'Number' :  parseInt(phonenumber)} 
				let obj = this.seleted_users.find(o => o.Number == phonenumber)
				console.log(obj)
				console.log(this.realdata)
				let obj2 = this.realdata.find(o => o.phonenumber == "123456")
				console.log(obj2)
				if(obj || obj2){
					alert("user already added")
				}else {
					this.seleted_users.push(this.participants)
					const getLength = this.seleted_users.reduce((a, obj) => a + Object.keys(obj).length, 0);
					console.log(getLength);
					if (getLength == 3){
						this.enable_delete = false
					}
					else {
						this.enable_delete = true
					}
					console.log('pushed data ', this.seleted_users)
					this.dialog = false
				}
			},
			updateUser() {
					const user_data = {
						url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/callDistribution/addparticipant',
						method: 'POST',
						data: {
							owner_uid: this.uid,
							updated_by: this.uid,
							virtual_number : this.selected_virtual_number,
							source : 'general',
							participants: this.seleted_users
						},
					}
					console.log(user_data)
					this.$axios(user_data)
						.then((response) => {
							console.log(response)
							alert(response.data.message)
						})
						.catch((error) => {
							console.error(error);
						})
			},
			deleteUser(name,number){
				const ToRemove = number;
				this.seleted_users = this.seleted_users.filter((item) => item.Number !== ToRemove);
				console.log('after delete data ', this.seleted_users)
				const getLength = this.seleted_users.reduce((a, obj) => a + Object.keys(obj).length, 0);
				console.log(getLength);
				if (getLength == 3){
					this.enable_delete = false
				}
				else {
					this.enable_delete = true
				}

			},
			changeview(virtualnumber) {
				this.seleted_users = []
				db.collection('uservirtualNumber').where("VirtualNumber" , "==" , virtualnumber).get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data());
						let user_details = doc.data()
						this.Udata = user_details
						var trying = this.Udata.Participants
						const getLength = trying.reduce((a, obj) => a + Object.keys(obj).length, 0);
						console.log(getLength);
						if (getLength == 3){
							this.enable_delete = false
						}
						trying.forEach((items) => {
							console.log("loop items",items)
							this.added_list_json = Object.assign({}, this.added_list_json, { Number: items.Number , Name: items.Name , AgentUid : items.AgentUid})
							this.added_list.push(this.added_list_json)
							this.seleted_users.push(this.added_list_json)
						})
						console.log('im getting',this.added_list)
						
						console.log('before data ', this.seleted_users)



							this.detail = Object.assign({}, this.detail, { participants: this.Udata.Participants , phonenumber: this.Udata.PhoneNumber , userUid : this.Udata.Uid})
							this.realdata.push(this.detail)
							this.userUid = this.Udata.uid
							console.log(typeof(this.detail))
							console.log(this.realdata)
							
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})
			}
		}
	}
</script>