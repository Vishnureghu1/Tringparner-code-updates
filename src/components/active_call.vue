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
										<div class="ml-4 mr-4">
											<h3 class="mt-6 ml-5 mb-5 text-center">Active calls</h3>
										</div>
										<v-select :items="virtual_number_list" label="Virtual number" v-model='selected_virtual_number' v-on:change="changeview(selected_virtual_number)" required ></v-select>
										<h3 class="mt-2 ml-3">Routing method - New caller</h3>
											<v-radio-group v-model="radios1" mandatory  class="ml-3">
												<v-radio label="Simultaneous" value="Simultaneous"></v-radio>
												<v-radio label="Round Robin - flexible" value="Round_Robin_Flexible" ></v-radio>
												<v-radio label="Round Robin - Strict" value="Round_Robin_Strict"></v-radio>
												<v-radio label="Priority" value="Priority" ></v-radio>
												<div no-action v-if="radios1 == 'Priority'">

												<div>
													<draggable v-model="seleted_users" ghost-class="ghost" @end="onEnd">
														<transition-group type="transition" name="flip-list">
															<div class="sortable" :id="element.Name" v-for="element in seleted_users" :key="element.Name">
																<strong>
																	{{element.Name}}
																</strong>
																<span>
																	{{element.Number}}
																</span>
																<v-divider></v-divider>
															</div>
														</transition-group>
													</draggable>
												</div>
															
												</div>
											</v-radio-group>


										<h3 class="mt-2 ml-3">Routing method - Repeated caller</h3>
										<v-checkbox v-model="selected" label="Sticky Agent" ></v-checkbox>
											<v-radio-group v-if="selected" v-model="radios2" mandatory  class="ml-3">
												<v-radio label="Sticky - flexible" value="Sticky-Enable-Flexible" ></v-radio>
												<v-radio label="Sticky - Strict" value="Sticky-Enable-Strict"></v-radio>
											</v-radio-group>
									</div>
									<v-btn class="ml-4" color="primary" @click="applyRouting()">Apply Routing</v-btn>
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
import draggable from 'vuedraggable';
import firebase from 'firebase'
import { db } from '@/main.js';
  export default {
		components : {
			draggable
		},

    data: () => ({
			uid : '',
			phno : '',
			name: '',
			virtual_number : '',
			virtual_number_list : [],
			selected_virtual_number : '',
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
			toggle_none : null,
			userUid : '',
			ownerid : '',
			radios1: null,
			radios2: null,
			selected : false,
			oldIndex : '',
			newIndex: ''
    }),
     methods: {
			onEnd(evt) {
				console.log(evt)
				this.oldIndex = evt.oldIndex
				this.newIndex = evt.newIndex
				console.log(this.radios2)

			},
			changeview(virtualnumber) {
				this.seleted_users = []
				db.collection('uservirtualNumber').where("VirtualNumber" , "==" , virtualnumber).get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data());
						let user_details = doc.data()
						this.Udata = user_details
						this.radios1 = this.Udata.NewActiveCaller
						this.radios2 = this.Udata.RepeatedActiveCaller
						console.log('radio ',this.radios1)
						if (this.radios2) {
							this.selected = true
						}
						if(this.radios1 == null) {
							this.radios1 = 'Round_Robin_Flexible'
						}
						if(this.radios2 == null) {
							this.seleted = false
						}
						var trying = this.Udata.Participants
						trying.forEach((items) => {
							console.log("loop items",items)
							this.added_list_json = Object.assign({}, this.added_list_json, { Number: items.Number , Name: items.Name , AgentUid : items.AgentUid})
							this.added_list.push(this.added_list_json)
							this.seleted_users.push(this.added_list_json)
						})
						console.log('im getting',this.added_list)
						
						console.log('before data ', this.seleted_users)

							
						})
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					})
			},
			applyRouting() {
				if (!this.selected) {
					this.radios2 = null
				}
				const user_data = {
				url: this.$cloudfareApi + '/callDistribution/activecall',
				method: 'POST',
				data: {
					owner_uid: this.uid,
					updated_by: this.uid,
					virtual_number : this.selected_virtual_number,
					source : 'general',
					participants: this.seleted_users,
					new_active_caller : this.radios1,
					repeated_active_caller : this.radios2
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
			}

  },
		created() {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid
					// this.phno = user.phoneNumber.slice(3)
					// console.log("page Managers il user id", this.uid)
					// console.log("page Managers il user number", this.phno)
					await db.collection('uservirtualNumber').where("Uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach(async (doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.uid = user_details.Uid
							this.virtual_number = user_details.VirtualNumber
							this.virtual_number_list.push(this.virtual_number)
							console.log(user_details.role)
							console.log(this.uid)
						})
					})
					console.log('type of ',typeof(this.virtual_number_list))
					this.selected_virtual_number = this.virtual_number_list[0]
					console.log(this.virtual_number_list[0])

						await	db.collection('uservirtualNumber').where("VirtualNumber" , "==" , this.selected_virtual_number).get().then((querySnapshot) => {
								querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									let user_details = doc.data()
									this.Udata = user_details
									this.radios1 = this.Udata.NewActiveCaller
									this.radios2 = this.Udata.RepeatedActiveCaller
									if (this.radios2) {
										this.selected = true
									}
									console.log('radio ',this.radios1)
									if (this.radios2) {
										this.selected = true
									}
									if(this.radios1 == null) {
										this.radios1 = 'Round_Robin_Flexible'
									}
									if(this.radios2 == null) {
										this.seleted = false
									}
									var trying = this.Udata.Participants
									trying.forEach((items) => {
										console.log("loop items",items)
										this.added_list_json = Object.assign({}, this.added_list_json, { Number: items.Number , Name: items.Name , AgentUid : items.AgentUid})
										this.added_list.push(this.added_list_json)
										this.seleted_users.push(this.added_list_json)
									})
									console.log('im getting',this.added_list)
									
									console.log('before data ', this.seleted_users)

										
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
									})
								})
								.catch((error) => {
									console.log("Error getting documents: ", error);
								})
				}
			})
		}




  }

</script>