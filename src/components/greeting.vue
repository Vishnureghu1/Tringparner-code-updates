<template>
	<v-app >
		
		<div>
			<v-container  fluid>
				<v-layout align-center justify-center>
					<v-flex xs12 sm12 md10>
						<v-card class="mx-auto">
							<v-row no-gutters>
								<v-col cols="12">
									<div class="ml-4 mr-4">
										<div class="ml-4 mr-4">
											<h3 class="mt-6 ml-5 mb-5 text-center">Greeting Message</h3>
										</div>
										<div>
											<p>Upload Greeting message</p>
											<v-select :items="virtual_number_list" label="Virtual number" v-model='virtual_number' required ></v-select>
											<v-file-input v-if="showFileInput" type="file" @change="getAudio" accept="audio/wav" ref="fileInput"></v-file-input>
										</div>
										<p v-if="showProgress">Uploading : {{uploadValue.toFixed()+"%"}}
										<v-progress-linear  color="deep-orange" height="14" max="100" v-model= 'progressValue' striped ></v-progress-linear></p>
										<v-btn v-if="showFileInput" color="primary" @click="onUpload()"> save </v-btn>
									</div>
									<vuetify-audio :file="file" color="primary" v-if="successfully_uploaded"></vuetify-audio>
									<v-row justify="center" class="mt-3">
									<v-btn class="mt-3" v-if="successfully_uploaded" color="red" @click="deleteAudio()"> delete </v-btn>
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
import 'firebase/storage'

  export default {
		components: {
        VuetifyAudio: () => import('vuetify-audio'),
    },
		created() {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log("logged user details",user)
					this.uid = user.uid
					// this.phno = user.phoneNumber.slice(3)
					console.log("page Managers il user id", this.uid)
					// console.log("page Managers il user number", this.phno)
					db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							console.log(doc.id, " => ", doc.data());
							let user_details = doc.data()
							this.ownerid = user_details.OwnerUid
							this.uid = user_details.uid
							this.virtual_number = user_details.virtualNumber
							this.virtual_number_list.push(this.virtual_number)
							console.log(user_details.role)
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

					var storage = firebase.storage();
					var storageRef = storage.ref();
					var desertRef = storageRef.child("9731175691");
					desertRef.getDownloadURL().then((url)=>{
					this.showProgress = false
					this.successfully_uploaded = true
					this.showFileInput = false
          this.audioUrl =url;
          this.file = this.audioUrl
        })



				}
			})
		},

    data: () => ({
			uid : '',
			phno : '',
			name: '',
			virtual_number : '',
			virtual_number_list : [],
      role :'',
      detail: {},
			Udata : [],
			realdata : [],
			userUid : '',
			ownerid : '',
			radios1: null,
			radios2: null,
			selected : false,
			file: '',
			audioData: null,
      uploadValue: 0,
      audioUrl : null,
      successfully_uploaded : false,
      showProgress : false,
      showFileInput : true,
      progressValue : 0,
    }),

  methods:{
    getAudio(files) {
      console.log(files)
      this.uploadValue=0;
      this.audioUrl=null;
      this.audioData = files;
    },

    onUpload(){
			this.showProgress = true
      this.audioUrl=null
      var file_name = '9731175691'
      const storageRef=firebase.storage().ref(`${file_name}`).put(this.audioData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        this.progressValue = this.uploadValue.toFixed()+"%"
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
					this.showProgress = false
					this.successfully_uploaded = true
					this.showFileInput = false
          this.audioUrl =url;
          this.file = this.audioUrl
          console.log(this.audioUrl)
        });
      }
      );
    },

    deleteAudio(){
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var desertRef = storageRef.child("9731175691");
    console.log(desertRef)
    desertRef.delete().then(() => {
			this.successfully_uploaded = false
			this.showFileInput = true

}).catch((error) => {
  console.log(error)
});
    }

  }
}

</script>