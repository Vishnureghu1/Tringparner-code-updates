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
												<h2 class="page_title mt-6 ml-5">Business Numbers</h2>
												<v-breadcrumbs :items="items">
													<template v-slot:divider>
														<v-icon>mdi-chevron-right</v-icon>
													</template>
												</v-breadcrumbs>
											</v-col>
										</v-row>
										<h2 class="comment_heading mt-6 ml-5">Configure your business number according to your needs</h2>		
										<v-card color="transparent" outlined class="mt-5" max-width="1069" v-for="(item,i) in 2" :key="i">
											<v-row>
												<v-col cols="12" sm='6'>
													<h2 class="name_heading mt-1 ml-5">Name {{i+1}} </h2>
													<h2 class="number_heading mt-2 ml-5">+91 8891978085 </h2>
												</v-col>
												<v-col cols="12" sm='6' align="end">
													<v-icon v-bind="attrs" v-on="on" color="black" >mdi-dots-vertical</v-icon>
												</v-col>
												<v-col cols="12" sm='6'>
													<h2 class="link_style mt-1 ml-5">Manage Agents </h2>
												</v-col>
												<v-col cols="12" sm='6' align="end">
													<v-icon v-bind="attrs" v-on="on" color="#EE1C25" >mdi-arrow-right</v-icon>
												</v-col>											
												<v-col cols="12" sm='6'>
													<h2 class="link_style mt-1 ml-5 mb-5" @click="CallFlowSettings()">Call Flow Settings </h2>
												</v-col>
												<v-col cols="12" sm='6' align="end">
													<v-icon v-bind="attrs" v-on="on" color="#EE1C25" @click="CallFlowSettings()" >mdi-arrow-right</v-icon>
												</v-col>
											</v-row>
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
          to: { name: 'BusinessNumber'},
        },
      ],
    }),

    methods:{
			CallFlowSettings(){
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
	font-family: 'Nunito', bold;
  font-size: 16px; 	
  color: #3B3B3B;
}
.comment_heading {
	font-family: 'lato', Regular;
  font-size: 12px;
  color: #808080;
}
.link_style{
	font-family: 'lato', Regular;
  font-size: 16px;	
	color: #EE1C25;
}

</style>