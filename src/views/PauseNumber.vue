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
											<v-col cols="12" sm="11">
												<span ><h2 class="page_title mt-6"> <v-icon  class="mr-2" color="black" @click="goBack()">mdi-arrow-left</v-icon> Pause Virtual Number</h2> </span>
												<v-breadcrumbs :items="items">
													<template v-slot:divider>
														<v-icon>mdi-chevron-right</v-icon>
													</template>
												</v-breadcrumbs>
											</v-col>
										</v-row>
										<h2 class="comment_heading ml-5">Temporarily pause receiving calls on this virtual number.</h2>	
										<v-row>
											<v-col cols="6" sm="10">
												<h2 class="name_heading mt-10 ml-5 mr-7" @click="switch1 = !switch1">Pause Virtual Number</h2>
											</v-col>
											<v-col cols="12" sm="2" align="end">
												<v-switch class="mt-9" v-model="switch1" flat color="#EE1C25"></v-switch>
											</v-col>
										</v-row>						
										<v-card v-if="switch1" color="transparent" outlined class="mt-5" max-width="965">
											<v-row>
												<v-col cols="6" sm="10">
													<h2 class="sub_heading ml-15 mr-7">Marked as Offline Till</h2>
													<h2 class="number_heading ml-15 mt-2 mr-7">10 Jan 2022 11:59pm</h2>
												</v-col>
												<v-col cols="12" sm="2" align="end">
													<v-icon v-bind="attrs" v-on="on" color="black" @click="popup()" >mdi-pencil</v-icon>
												</v-col>
											</v-row>
											<v-row>	
												<v-col cols="6" sm="8">
													<v-checkbox v-model="selected" class="name_heading ml-14" color="#EE1C25" label="Set Alternate Record" >
													</v-checkbox>
													<h2 class="comment_heading ml-16">Set a message for people who call your virtual number during the offline hours.</h2>
												</v-col>
												<v-col cols="6" sm="4" align="end">
													<v-btn color='#EE1C25' class="name_heading white--text text-capitalize">+ Upload Media</v-btn>
												</v-col>
											</v-row>
										<v-card v-if="selected" color="transparent" outlined class="mt-5 ml-14" max-width="965">	
											<v-radio-group v-model="radios" mandatory>
												<v-radio class="mt-5 mb-5" label="Audio 1" value="radio-1" color="red">
												</v-radio>
												<v-divider></v-divider>
												<v-radio class="mt-5 mb-5" label="Audio 2" value="radio-2" color="red">
												</v-radio>
												<v-divider></v-divider>
											</v-radio-group>
										</v-card>

										</v-card>
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
			window.scrollTo(0,0) //scroll to top
    },
    data: () => ({
      items: [
        {
          text: 'More',
          disabled: false,
          to: { name: 'BusinessNumber'},
        },
        {
          text: 'Business Numbers',
          disabled: false,
          to: { name: 'BusinessNumber'},
        },
        {
          text: 'Call Flow Settings',
          disabled: false,
          to: { name: 'CallFlowSettings'},
        },
        {
          text: 'Pause Number',
          disabled: true,
        },
      ],
      switch1: false,
      selected: false,
    }),

    methods:{
			goBack(){
				this.$router.push("/CallFlowSettings")
			}
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
	font-family: 'lato', Regular;
  font-size: 14px; 	
  color: #3B3B3B;
}
.comment_heading {
	font-family: 'lato', Regular;
  font-size: 12px;
  color: #808080;
}
.sub_heading {
	font-family: 'lato', Regular;
  font-size: 10px;
  color: #808080;
}
</style>