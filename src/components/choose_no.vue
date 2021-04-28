<template>
	<div>
		<v-container>
			<v-layout row>
				<v-flex class="d-flex justify-end mb-6 pt-6">
					<v-card cols="8" width="100%" height="100%">
						<v-row no-gutters>
							<v-col cols="12">
								<div class="mt-3 ml-3">
									<v-app-bar color="white" flat>
										<img class="mt-2 ml-2" :src="require('../../public/images/tring-logo.png')" height="35"/>
										<v-spacer></v-spacer>
										<v-btn icon>
											<v-icon color='red' >mdi-chat-outline</v-icon>
										</v-btn>
										<label class='red--text'>support</label>
									</v-app-bar>
								</div>
								<div class="ml-4 mr-4">
									<h4 class="mt-6 ml-5 text-center">Choose your business number</h4>
									
									<p class="mt-6 ml-5 text-center">Time Remaining : {{ Math.floor(timerCount/60) }} mins {{ timerCount%60 }} sec</p>
									<v-progress-linear  color="deep-orange" height="14" :value= 'value' striped ></v-progress-linear>
								</div>
								<div class="ml-4 mr-4 mt-5">
									<v-btn v-for="item in items" :key="item.message" class="ml-1 mr-4 mb-8 red--text" outlined color='white' width="40%">{{item.message}}</v-btn>
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
	// import axios from  'axios'
	// import AxiosPlugin from 'vue-axios-cors'
		export default {
    data(){
      return{
				timerCount : 180,
				value : 100,
				items : [
								{message : '8891978085'},
								{message : '9400982686'},
								{message : '9876543210'},
								{message : '9446407265'},
								{message : '9400989194'},
								{message : '7560971343'},
								]
      }
    },
    watch: {
			timerCount: {
				handler(value) {
					// console.log(value)
					if (value > 0) {
						setTimeout(() => {
							this.value = this.value - 0.55
							this.timerCount--;
						}, 1000);
					}
					if (value == 179) {
						// const options = {
						// 	url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/list',
						// 	method: 'POST',

						// 	data: {
						// 		uid: 'kugCotqp0JbALG8Xx6BM6pr43R22',
						// 		phoneNumber: '8891978085'
						// 	},
						// 	// headers: {
						// 	// 	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6ODg5MTk3ODA4NSwiaWF0IjoxNjE5NTk2NDQyfQ.ivLx4XVN8wVcyA6_90rCyWU8LeN3XIsrr7oMleWSCqQ'
						// 	// },
						// }
						// console.log(options)
      //       this.$axios(options)
      //       // axios.post('https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/list',options)
						// 	.then((response) => {
						// 		console.log(response)
						// 	})
						// 	.catch((error) => {
						// 		console.error(error);
						// 	})
// 						const hea = {
// 'Content-Type': 'application/json',
// 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6ODg5MTk3ODA4NSwiaWF0IjoxNjE5NTk2NDQyfQ.ivLx4XVN8wVcyA6_90rCyWU8LeN3XIsrr7oMleWSCqQ'
// }
// const data = {"uid":"kugCotqp0JbALG8Xx6BM6pr43R22","phoneNumber": '8891978085'}
// axios.post("https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/list", data,{
// 	headers: {
// 		'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6ODg5MTk3ODA4NSwiaWF0IjoxNjE5NTk2NDQyfQ.ivLx4XVN8wVcyA6_90rCyWU8LeN3XIsrr7oMleWSCqQ'
// 	}}
// )
// .then((response) => {
// // dispatch({
// // type: FOUND_USER,
// // data: response.data[0]
// // })
// console.log(response)
// })
// .catch((error) => {
// // dispatch({
// // type: ERROR_FINDING_USER
// // })
// console.log(error)
// })

//************************************************

var axios = require('axios');
var data = JSON.stringify({"uid":"kugCotqp0JbALG8Xx6BM6pr43R22","phoneNumber":"8891978085"});

var config = {
  method: 'POST',
  url: 'https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/list',
  headers: { 
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6ODg5MTk3ODA4NSwiaWF0IjoxNjE5NTk2NDQyfQ.ivLx4XVN8wVcyA6_90rCyWU8LeN3XIsrr7oMleWSCqQ', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
					}
				},
				immediate: true
			}
    }
  }
</script>
