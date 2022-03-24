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
												<h2 class="page_title mt-6 ml-5"> <v-icon  class="mr-2" color="black" @click="goBack()">mdi-arrow-left</v-icon>  Business Numbers</h2>
												
												<v-breadcrumbs class="breadcrumbs" :items="items">
													<template class="breadcrumbs" v-slot:divider >
														<v-icon>mdi-chevron-right</v-icon>
													</template>
												</v-breadcrumbs>
											</v-col>
										</v-row>
										<div class="comment_heading mt-6 ml-5">Configure your business number according to your needs</div>		
										<v-card color="transparent" outlined class="mt-5" max-width="1069" v-for="item in virtualnumber" :key="item">
											<v-row>
												<v-col cols="12" sm='6'>
													<div class="name_heading mt-1 ml-5">{{item.Source}} </div>
													<div class="number_heading mt-2 ml-5">{{item.VirtualNumber}}</div>
												</v-col>
												<v-col cols="12" sm='6' align="end">
													
													<v-menu offset-y>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      v-bind="attrs"
                                      v-on="on"
                                      color="black"
                                      >mdi-dots-vertical</v-icon
                                    >
                                  </template>
                                  <v-list>
                                    <v-list-item
                                      v-for="(item, index) in options"
                                      :key="index"
                                      active-class="pink--text"
                                    >
                                      <v-list-item-title
                                        :class="item.color"
                                        @click="blockCall()"
                                        >{{ item.title }}</v-list-item-title
                                      >
                                    </v-list-item>
                                  </v-list>
                                </v-menu>
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
													<v-icon v-bind="attrs" v-on="on" color="#EE1C25" @click="CallFlowSettings(item.VirtualNumber)" >mdi-arrow-right</v-icon>
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
// import firebase from "firebase";
import { db } from "@/main.js";
  export default {

		components: {
		},
		
    data: () => ({
	options: [
      { title: "Edit Title", color: "black--text", url: "add_note" },
     
    ],
	virtualnumber:[],
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
    created() {
        let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
		// console.log("vetri",owneruid)

        db.collection("uservirtualNumber").where("Uid","==",owneruid).get().then(async(snap) =>{
			// console.log("test.........",snap.docs.data());
			snap.docs.forEach((element)=> {
				// console.log(element.data())
				this.virtualnumber.push(element.data());
			});
		}).catch((err)=>{
			console.log(err.message)
		})
    },
    methods:{
		// console.log(this.uid)
			goBack(){
				this.$router.push("/Dashboard")
			},
			CallFlowSettings(vn){
				this.$router.push("/CallFlowSettings?"+vn)
			}

    },
	
  }
  </script>

