<template>
	<v-app >
			<v-container  fluid>
				<v-layout >
					<v-flex xs12 sm12 md12>						
							<v-row no-gutters>
								<v-col cols="12" align="center" >
								<!-- <v-overlay :value="overlay">
									<v-progress-circular indeterminate color="red" size="40" :width="3"></v-progress-circular>
								</v-overlay> -->
                                </v-col>
                            </v-row>
					</v-flex>
				</v-layout>
			</v-container>
	</v-app>
</template>
         <script>

	export default {

		components: {
			
		},
			data: () => ({

			userEmail: '',
			userRole: '',
			agentName:'',


		}),
		
		async created() {
			
		},
        methods: {
        },
    }
	