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
												<v-breadcrumbs class="breadcrumbs" :items="items">
													<template class="breadcrumbs" v-slot:divider >
														<v-icon>mdi-chevron-right</v-icon>
													</template>
												</v-breadcrumbs>
											</v-col>
										</v-row>
										<div class="comment_heading mt-6 ml-5">Configure your business number according to your needs</div>		
										<v-card color="transparent" outlined class="mt-5" max-width="1069" v-for="(item,i) in 2" :key="i">
											<v-row>
												<v-col cols="12" sm='6'>
													<div class="name_heading mt-1 ml-5">Name {{i+1}} </div>
													<div class="number_heading mt-2 ml-5">+91 8891978085 </div>
												</v-col>
												<v-col cols="12" sm='6' align="end">
													<v-icon v-bind="attrs" v-on="on" color="black" >mdi-dots-vertical</v-icon>
												</v-col>
												<v-col cols="12" sm='6'>
													<div class="link_style mt-1 ml-5">Manage Agents </div>
												</v-col>
												<v-col cols="12" sm='6' align="end">
													<v-icon v-bind="attrs" v-on="on" color="#EE1C25" >mdi-arrow-right</v-icon>
												</v-col>											
												<v-col cols="12" sm='6'>
													<div class="link_style mt-1 ml-5 mb-5" @click="CallFlowSettings()">Call Flow Settings </div>
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
          href: 'Dashbaord',
          color: 'Black'
        },
        {
        text: 'Business Numbers',
          disabled: false,
          to: { name: 'BusinessNumber'},
		color: 'red',
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

<style type="text/css">
.page-title {
	text-align: left;
	/*font: normal normal bold 23px/28px Lato;*/
	/*font-weight: bold;*/
	font-size: 23px;
	line-height: 28px;
  letter-spacing: 0px;
  color: #3B3B3B;
	opacity: 1;
}
.breadcrumbs {
	/*font: normal normal bold 10px/12px Lato;*/
	/*font-weight: bold;*/
	font-size: 10px;
	line-height: 12px;
	text-align: left;
	letter-spacing: 0px;
	color: #3B3B3B;
	opacity: 1;
}

.heading {
	/*font-family: 'lato', Bold;*/
  font-size: 16px 
}
.name_heading {
	/*font-family: 'lato', Regular;*/
  font-size: 16px 	
}
.number_heading {
	/*font-family: 'Nunito', bold;*/
	font-weight: bold;
  font-size: 16px; 	
  color: #3B3B3B;
}
.comment_heading {
	/*font-family: 'lato', Regular;*/
  font-size: 12px;
  color: #808080;
}
.link_style{
	/*font-family: 'lato', Regular;*/
  font-size: 16px;	
	color: #EE1C25;
}
.nunito-title {
	text-align: left;
	/*font: normal normal bold 16px/22px Nunito;*/
	/*font-weight: bold;*/
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0px;
	color: #3B3B3B;
	opacity: 1;
}

</style>