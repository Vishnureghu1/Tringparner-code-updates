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
												<h2 class="page_title mt-6 mb-5">Dashboard</h2>
											</v-col>
											<v-col cols="12" sm="2" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="black" >mdi-menu</v-icon> </span>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="6">
												<h4 class="heading mt-4 mb-5"> 
													<Icon class="mr-3" :inline="true" color="red" icon="mdi:call-missed" width="24" height="24">	</Icon>
														Today's Missed Calls
												</h4>
												<v-expansion-panels accordion flat  v-model="missedCallPanel" multiple>
													<v-expansion-panel v-for="(item,i) in 2" :key="i" >
														<v-expansion-panel-header >
															<div>
																<v-row no-gutters>
																	<v-col cols="2" flex >
																		<h4 class="name_heading font-weight-light mt-2"> Shinu (2)</h4>
																		<br>
																	</v-col>
																	<v-spacer></v-spacer>
																	<v-col cols="10" flex>
																		<v-divider class="mt-4"></v-divider>
																	</v-col>
																</v-row>
															</div>
														</v-expansion-panel-header>
																<v-expansion-panel-content v-for="(item,i) in 2" :key="i">
																	<v-row>
																		<v-col cols="12" sm="10">
																			<h3  class="number_heading font-weight-light">+91 88919 78 085</h3>
																			<h6 class="comment_heading font-weight-light">00.10 , 3 mins ago, Shinu</h6> 
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
																</v-expansion-panel-content>
													</v-expansion-panel>
												</v-expansion-panels>
											</v-col>
											<v-col cols="6" align="center">
												<h4 class="heading"><v-icon class="mt-4 mb-5 mr-3" color="black">mdi-alarm</v-icon> Upcoming Reminders </h4>
												<v-row>
													<v-col cols="12" align="center">
														<div v-for="(item,i) in 2" :key="i" class="mb-3 mt-5">
															<h4 class="number_heading font-weight-light mr-15">+91 88919 78 085</h4>
															<div class="mr-16">
																<h5 class="comment_heading font-weight-light mr-16 mt-1" >04:15 pm</h5>
															</div>
														</div>
													</v-col>
												</v-row>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="6">
												<h4 class="heading  mb-5"> <v-icon color="black" class="mr-3">mdi-call-split</v-icon> Team Skipped Calls</h4>
												<v-expansion-panels accordion flat v-model="skippedCallPanel" multiple>
													<v-expansion-panel v-for="(item,i) in 2" :key="i">
														<v-expansion-panel-header >
															<div>
																<v-row no-gutters>
																	<v-col cols="2" flex >
																		<h4  class="name_heading font-weight-light mt-2"> Shinu (2)</h4>
																		<br>
																	</v-col>
																	<v-spacer></v-spacer>
																	<v-col cols="10" flex>
																		<v-divider class="mt-4"></v-divider>
																	</v-col>
																</v-row>
															</div>
														</v-expansion-panel-header>
														<v-expansion-panel-content v-for="(item,i) in 2" :key="i">
															<v-row>
																<v-col cols="12" sm="10">
																	<h3  class="number_heading font-weight-light">+91 88919 78 085</h3>
																	<h6 class="comment_heading font-weight-light">00.10 , 3 mins ago, Shinu</h6>
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
														</v-expansion-panel-content>
													</v-expansion-panel>
												</v-expansion-panels>
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
	import { Icon } from '@iconify/vue2';
	export default {

		components: {
			Icon,
		},
		async created() {

			let localStorageUserObj = localStorage.getItem('tpu');

			if (localStorageUserObj) {
				let parsedUser = JSON.parse(localStorageUserObj);
				this.userEmail = parsedUser.Email;
				console.log('Dashboard-user-FirstName', parsedUser.FirstName);
				console.log('Dashboard-user-Email', parsedUser.Email);
				console.log(parsedUser);
				this.userRole = parsedUser.role;
			}

		},
		data: () => ({
			missedCallPanel: [0, 1],
			skippedCallPanel: [0, 1],
			userEmail: '',
			userRole: ''
		}),

		methods: {

		}
	}
  </script>

<style scoped>
.page_title {
	/*font-family: 'Lato', Bold;*/
  font-size: 23px 
}
.heading {
	/*font-family: 'lato', Bold;*/
  font-size: 16px 
}
.name_heading {
	/*font-family: 'Nunito', bold;*/
  font-size: 14px 	
}
.number_heading {
	/*font-family: 'Nunito', bold;*/
  font-size: 16px; 	
  color: #3B3B3B;
}
.comment_heading {
	/*font-family: 'Nunito', Light;*/
  font-size: 10px;
  color: #808080;
}

</style>