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
												<h2 class="page_title mt-6 ml-5">Advanced Options</h2>
												<v-breadcrumbs :items="items">
													<template v-slot:divider>
														<v-icon>mdi-chevron-right</v-icon>
													</template>
												</v-breadcrumbs>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading  mr-7  ">Notification Settings</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Manage how you get notifications for each type of vent on your Virtual Number</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7  ">Call Routing Settings</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Configure how incoming calls are redirected between your agents.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7  ">Missed Call Distribution</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Configure how missed calls are managed between your agents.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7  ">Block Numbers</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Block unwanted incoming and spam callers.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7  ">Greeting Message</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Welcome users with pre-recorded audio clips.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7  ">Caller Tune</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Configure to play pre-recorded audio clips while put on hold.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7 ">Set Working Hours</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7 ">Set a duration for which this number will be active.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>
										<v-row>
											<v-col cols="6">
												<h2 class="name_heading mt-4  mr-7 ">Pause Virtual Number</h2>
												<h2 class="comment_heading mt-1 mb-5 mr-7">Temporarily pause receiving calls on this virtual number.</h2>
											</v-col>
											<v-col cols="6" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-7" color="#EE1C25" >mdi-arrow-right</v-icon> </span>
											</v-col>
										</v-row>
										<v-divider></v-divider>									

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
  export default {

		components: {
		},
		created() {

    },
    data: () => ({
      items: [
        {
          text: 'More',
          disabled: false,
          href: 'breadcrumbs_dashboard',
          color: 'Black'
        },
        {
          text: 'Business Numbers',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
      ],
    }),

    methods:{

    }
  }
  </script>

<style scoped>
.page_title {
	font-family: 'Lato', Bold;
  font-size: 23px 
}
.heading {
	font-family: 'lato', Bold;
  font-size: 16px 
}
.name_heading {
	font-family: 'lato', Regular;
  font-size: 16px 	
}
.number_heading {
	font-family: 'Nunito', bold;
  font-size: 16px; 	
  color: #3B3B3B;
}
.comment_heading {
	font-family: 'lato', Regular;
  font-size: 12px;
  color: #808080;
}

</style>