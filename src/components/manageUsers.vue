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
										<h3 class="mt-6 ml-5 mb-5 text-center">Managers users</h3>
									</div>
								</div>
								<v-form @submit.prevent class="ml-4 mr-4" v-for="details in realdata" :key="details.text">
									<v-text-field v-model='details.name' type='text' label='Name' :readonly="isReadOnly == 1"></v-text-field>
									<v-text-field v-model='details.number' type='text' label='Number' :readonly="isReadOnly == 1"></v-text-field>
									<v-row align="center">
										<v-col class="d-flex" cols="12" sm="6">
											<v-select  :items="['ADMIN', 'AGENT']" v-model="details.role" :readonly="isReadOnly == 1" label="Role" dense outlined ></v-select>
										</v-col>
										<v-col class="d-flex" cols="12" sm="3">
											<v-btn class="ml-4 mr-4" type='submit' color='primary' v-if='editing' @click.prevent='editData()'>Edit User</v-btn>
											<v-btn class="ml-4 mr-4" type='submit' color='green' v-else @click.prevent='updateUser(details.userUid,details.number,details.name,details.role)'>Update</v-btn>

											<v-btn class="ml-4 mr-4 white--text" @click = 'deleteUser(details.userUid,details.number)' color='red'>Delete <v-icon right dark > mdi-delete </v-icon></v-btn><br><br>
										</v-col>
									</v-row>
									<br>
								</v-form>
								
								<v-row justify="center" v-if="showAdd">
									<v-dialog v-model="dialog" persistent max-width="500px">
										<template v-slot:activator="{ on, attrs }">
											<v-btn color="primary" dark v-bind="attrs" v-on="on" > + Add User</v-btn>
										</template>
										<v-card>
											<v-card-title>
												<span>User Details</span>
											</v-card-title>
											<v-card-text>
												<v-text-field v-model='name' type='text' label='Name' ></v-text-field>
												<v-text-field v-model='phno' type='text' :rules="numberRules" label='Phone Number' ></v-text-field>
												<v-row>
													<v-col cols="12" sm="6" > 
														<v-select :items="['ADMIN', 'AGENT']" label="Role" v-model='role' required ></v-select>
													</v-col>
												</v-row>
											</v-card-text>
											<v-card-actions>
												<v-btn color="blue darken-1" text @click="dialog = false"> Cancel </v-btn>
												<v-btn color="red" text @click="addUser()"> save </v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</v-row>

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
		created() {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid
					// this.phno = user.PhoneNumber.slice(3)
					console.log("page Managers il user id", this.uid)
					// console.log("page Managers il user number", this.phno)
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.ownerid = user_details.OwnerUid
							this.uid = user_details.uid
							this.max_user = user_details.PlanNumberOfUsers
							console.log(user_details.role)

							if (user_details.role == 'ADMIN'){

								this.ownerid = user_details.OwnerUid
								console.log('admins owner',this.ownerid)
								var counter = 0
								db.collection('users').where("OwnerUid" , "==" , this.ownerid).get().then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
										console.log(doc.id, " => ", doc.data());
										let user_details = doc.data()
										this.Udata = user_details
										if (this.Udata.UserStatus) {
											counter ++
											if (counter == this.max_user) {
												console.log(counter)
												this.showAdd = false

											}
											else {
												this.showAdd = true
											}
											this.detail = Object.assign({}, this.detail, { name: this.Udata.Name , number: this.Udata.PhoneNumber ,role : this.Udata.role , userUid : this.Udata.uid})
											this.realdata.push(this.detail)
											this.userUid = this.Udata.uid
											// Vue.set(this.detail, 'name',this.Udata.Name )
											// Vue.set(this.detail, 'number',this.Udata.PhoneNumber )
											console.log(typeof(this.detail))
											console.log(this.realdata)
										}
									})
								})
								.catch((error) => {
									console.log("Error getting documents: ", error);
								})
							}
							else if (user_details.role == 'OWNER') {

								this.ownerid = user_details.uid
								counter = 0
								console.log('owner annu',this.ownerid)
								db.collection('users').where("OwnerUid" , "==" , this.ownerid).get().then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
										console.log(doc.id, " => ", doc.data());
										let user_details = doc.data()
										this.Udata = user_details
										if (this.Udata.UserStatus) {
											counter ++
											if (counter == this.max_user) {
												console.log(counter)
												this.showAdd = false

											}
											else {
												this.showAdd = true
											}
											this.detail = Object.assign({}, this.detail, { name: this.Udata.Name , number: this.Udata.PhoneNumber ,role : this.Udata.role , userUid : this.Udata.uid})
											this.realdata.push(this.detail)
											this.userUid = this.Udata.uid
											// Vue.set(this.detail, 'name',this.Udata.Name )
											// Vue.set(this.detail, 'number',this.Udata.PhoneNumber )
											console.log(typeof(this.detail))
											console.log(this.realdata)
										}
										
									})
								})
								.catch((error) => {
									console.log("Error getting documents: ", error);
								})
							}
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})

				}
			})
		},

    data: () => ({
			uid : '',
			phno : '',
			name: '',
      role :'',
      detail: {},
			Udata : [],
			realdata : [],
			userUid : '',
			dialog: false,
			showAdd : true,
			isReadOnly: 1,
			editing : true,
			ownerid : '',
			max_user : '',
			numberRules: [ 
			// v => (v && v.length == 10 ||  'Number must contain 10 digits. Invalid Number !!'),
			v => /^[0-9]*$/.test(v) || 'No characters Allowed',
			],
    }),

    methods : {
			editData() {
				this.isReadOnly = 0;
				this.editing = false
			},
			addUser() {
				if(this.phno.length != 10){
					alert('Invalid Phone Number Format !');
				} 
				else if (this.name == ''){
					alert('name required!!')
				}
				else if (this.role == '') {
					alert('Role required')
				}else {
				var token = localStorage.getItem('token');
				console.log(token)
				const updata = {
					url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/user',
					method: 'POST',
					headers : {
						'token': token
					},
					data: {
								user_name: this.name,
								user_number: this.phno,
								role: this.role,
								created_by: this.uid,
								owner_uid: this.ownerid
					},
				}
				console.log(updata)
        this.$axios(updata)
					.then((response) => {
						console.log(response)
					})
					.catch((error) => {
						console.error(error);
					}).finally(() => {
						this.dialog = false
					alert('User added successfully')
					var counter = 0
					this.realdata = [];
					db.collection('users').where("OwnerUid" , "==" , this.ownerid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.Udata = user_details
							if (this.Udata.UserStatus) {
								counter ++
								if (counter == this.max_user) {
									console.log('add',counter)
									this.showAdd = false

								}
								else {
									this.showAdd = true
								}
								this.detail = Object.assign({}, this.detail, { name: this.Udata.Name , number: this.Udata.PhoneNumber ,role : this.Udata.role , userUid : this.Udata.uid})
								this.realdata.push(this.detail)
								this.userUid = this.Udata.uid
								this.name = ''
								this.phno = ''
								this.role = ''
								// Vue.set(this.detail, 'name',this.Udata.Name )
								// Vue.set(this.detail, 'number',this.Udata.PhoneNumber )
								console.log(typeof(this.detail))
								console.log(this.realdata)
							}
							
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})
					})
				}

			},
			updateUser(id,number,name,role) {
				var token = localStorage.getItem('token');
				console.log(token)
				var axios = require('axios');
var data = JSON.stringify({
								"user_name": name,
								"user_number": number,
								"role": role,
								"user_uid" : id,
								"updated_by": this.uid,
					});

var config = {
  method: 'PUT',
  url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/user',
  headers: { 
    'token': token,
    'Content-Type': 'application/json'
  },
  data : data
};
console.log(config);
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
}).finally(() =>{
	alert('successfully updated')
	this.isReadOnly = 1;
	this.editing = true
						var counter = 0
					this.realdata = [];
					db.collection('users').where("OwnerUid" , "==" , this.ownerid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.Udata = user_details
							if (this.Udata.UserStatus) {
								counter ++
								if (counter == this.max_user) {
									console.log('delete',counter)
									this.showAdd = false

								}
								else {
									this.showAdd = true
								}
								this.detail = Object.assign({}, this.detail, { name: this.Udata.Name , number: this.Udata.PhoneNumber ,role : this.Udata.role , userUid : this.Udata.uid})
								this.realdata.push(this.detail)
								this.userUid = this.Udata.uid
								// Vue.set(this.detail, 'name',this.Udata.Name )
								// Vue.set(this.detail, 'number',this.Udata.PhoneNumber )
								console.log(typeof(this.detail))
								console.log(this.realdata)
							}
							
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})
})

			},
			deleteUser(id,number) {
				if (confirm("This user will be deleted permanently.Press Ok to confirm")) {
					var token = localStorage.getItem('token');
					console.log(token)
					const userDelete = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/user',
						method: 'DELETE',
						headers : {
							'token': token
						},
						data: {
									user_uid: id,
									user_number: number,
									updated_by: this.uid,
						},
					}
					console.log(userDelete)
					this.$axios(userDelete)
						.then((response) => {
							console.log(response)
							if(response.data.status){
								alert('successfully Deleted')
							}
							else {
								alert(response.data.message)
							}
						})
						.catch((error) => {
							console.error(error);
						}).finally(() => {
						var counter = 0
						this.realdata = [];
						db.collection('users').where("OwnerUid" , "==" , this.ownerid).get().then((querySnapshot) => {
							querySnapshot.forEach((doc) => {
								console.log(doc.id, " => ", doc.data());
								let user_details = doc.data()
								this.Udata = user_details
								if (this.Udata.UserStatus) {
									counter ++
									if (counter == this.max_user) {
										console.log('delete',counter)
										this.showAdd = false

									}
									else {
										this.showAdd = true
									}
									this.detail = Object.assign({}, this.detail, { name: this.Udata.Name , number: this.Udata.PhoneNumber ,role : this.Udata.role , userUid : this.Udata.uid})
									this.realdata.push(this.detail)
									this.userUid = this.Udata.uid
									// Vue.set(this.detail, 'name',this.Udata.Name )
									// Vue.set(this.detail, 'number',this.Udata.PhoneNumber )
									console.log(typeof(this.detail))
									console.log(this.realdata)
								}
								
							})
						})
						.catch((error) => {
							console.log("Error getting documents: ", error);
						})
					})
				}



// 				axios.delete('https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/addon/user', {
//   headers: {
//     "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6ODg5MTk3ODA4NSwiaWF0IjoxNjIwNzU4MDYxfQ.RkXw6KLgBwNscIwXV8KClSfBN7ZO0lxfsNwYgibny0Y'
//   },
// 					data: {
// 								user_uid: this.userUid,
// 								user_number: 9400982686,
// 								updated_by: this.uid,
// 					},
// })
			}

    }
  }
</script>



