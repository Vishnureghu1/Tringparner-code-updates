<template>
	<div>
		<v-container  fluid>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md8>
					<v-card class="mx-auto">
						<v-row no-gutters>
							<v-col cols="12">
								<div>
									<div class="ml-4 mr-4">
										<h3 class="mt-6 ml-5 text-center">My Info</h3>
									</div>
								</div>
								<v-card class="ml-4 mr-4 mt-4 mb-5">
									<div class="ml-4 mr-4 mt-4 pt-4">
										
										<v-card-text>
											<h3 class="font-weight-regular mt-2 mb-2 text-center"> TringPartner Number(s)</h3>
											<div v-for="(details) in virtual_number_list" :key="details.text">
												<h4 class="font-weight-bold mb-3 text-center"> {{ details }} </h4>
											</div>
											<v-divider></v-divider>
											<h4 class="font-weight-regular mt-2 mb-2 text-center"> Display Caller Id</h4>
											<h4 class="font-weight-bold primary--text mb-3 text-center">  8045475053 </h4>
											<v-divider></v-divider>
											<h4 class="font-weight-regular mt-2 mb-2 text-center" >Your Number  </h4>
											<h4 class="font-weight-bold mb-3 text-center">{{ phno }} </h4>
										</v-card-text>
									</div>
								</v-card>
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
								querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									let user_details = doc.data()
									this.Udata = user_details
									this.name = this.Udata.FirstName
									this.phno = this.Udata.PhoneNumber
									db.collection('uservirtualNumber').where("Uid" , "==" , this.uid).get().then((querySnapshot) => {
										querySnapshot.forEach((doc) => {
											console.log(doc.id, " => ", doc.data());
											let user_details = doc.data()
											this.uid = user_details.Uid
											this.virtual_number = user_details.VirtualNumber
											this.virtual_number_list.push(this.virtual_number)
											console.log(this.virtual_number_list)
										})
									}).catch((error) => {
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
	data () {
		return {
		name: '',
		phno : '',
		Udata : [],
		virtual_number : '',
		virtual_number_list : [],
		}
	},
	}

</script>