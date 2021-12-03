<template>
	<v-app >
		<div>
			<v-container  fluid>
				<v-layout >
					<v-flex xs12 sm12 md12>
							<v-row no-gutters>
								<v-col cols="12">
									<div class="ml-3">
										<v-row>
											<v-col cols="12" sm="10">
												<h2 class="mt-6 mb-5">Call Log</h2>
											</v-col>
											<v-col cols="12" sm="2" align="end">
												<span ><v-icon  class="mt-6 mb-5 mr-4 " color="black" >mdi-magnify</v-icon> <v-icon  class="mt-6 mb-5 mr-7" color="black" >mdi-menu</v-icon> </span>
											</v-col>
										</v-row>
											<v-expansion-panels accordion flat >
												<v-expansion-panel v-for="(item,i) in 5" :key="i">
													<v-expansion-panel-header expand-icon="">
														<div>
														<v-row>
															<v-col cols="12" sm="10">
																<h3  class="font-weight-light"> <v-icon  class="mr-3" color="green" >mdi-arrow-bottom-left</v-icon> +91 88919 78 085 </h3>
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
															<span class="ml-10 font-weight-thin">2 min ago, Shinu </span> 
											
														</div>
													</v-expansion-panel-header>
													<v-expansion-panel-content>
														<div >
														<v-row>
																<v-col cols="12" sm="6">
																	<div class="ml-10">
																		<h6  class="font-weight-thin"> Source </h6>
																		<h5 class="font-weight-light"> Facebook No: (+91 75609 71 343) </h5>
																		<br>
																		<h6  class="font-weight-thin"> Notes </h6>
																		<h5 class="font-weight-light"> This is a sample note <v-icon  class="ml-11" color="black" >mdi-pencil</v-icon></h5>
																		<br>
																		<h6  class="font-weight-thin"> Reminder </h6>
																		<h5 class="font-weight-light"> This is a sample Reminder <v-icon  class="ml-3" color="black" >mdi-pencil</v-icon></h5>
																	</div>
																</v-col>
																<v-col cols="12" sm="6">
																</v-col>
														</v-row>
														</div>

													</v-expansion-panel-content>
												</v-expansion-panel>
											</v-expansion-panels>
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

    data: () => ({
			items: [
        { title: 'Add Note' ,color: 'black--text'},
        { title: 'Add Reminder',color: 'black--text' },
        { title: 'Call This Number',color: 'black--text' },
        { title: 'Block This Number',color: 'red--text' },
      ],
    }),
		methods: {


  },
		created() {

		}
  }
</script>


<style scoped>
.test {
       border-color: grey !important;
       height: 100%;
}
.v-expansion-panel {
	border-bottom: 1px solid #ddd;
	border-bottom-spacing : 15px;
	: 100px;
}
.v-expansion-panel-header {
	line-height: 0.5 !important;
}
.application {
   font-family: adobe-clean, sans-serif !important;
 }
</style>