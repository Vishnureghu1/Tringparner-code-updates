<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-8">
                  <v-row>
                    <v-col cols="12" sm="10">
                      <h2 class="page_title mt-6 ml-5">
                        <v-icon class="mr-2" color="black" @click="goBack()"
                          >mdi-arrow-left</v-icon
                        >
                        Pause Virtual Numeber
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <h2 class="comment_heading ml-5">
                    Temporarily pause receiving calls on this virtual number.
                  </h2>
                  <v-row>
                    <v-col cols="6" sm="10">
                      <h2
                        class="name_heading mt-10 ml-5 mr-7"
                        @click="switch1 = !switch1"
                      >
                        Pause Virtual Number
                      </h2>
                    </v-col>
                    <v-col cols="12" sm="2" align="end">
                      <v-switch
                        class="mt-9"
                        v-model="switch1"
                        flat
                        color="#EE1C25"
                        @click="submit(switch1,'toggle')"
                      ></v-switch>
                    </v-col>
                  </v-row>
                  <v-card
                    v-if="switch1"
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="965"
                  >
                    <v-row>
                      <v-col cols="6" sm="10">
                        <h2 class="sub_heading ml-15 mr-7">
                          Marked as Offline Till
                        </h2>
                        <h2 class="number_heading ml-15 mt-2 mr-7">
                            {{pauseupto}}
                        </h2>
                      </v-col>
                      <v-col cols="12" sm="2" align="end">
                        <v-icon
            
                          v-on="on"
                          color="black"
                          @click="popup()"
                          >mdi-pencil</v-icon
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="8">
                        <v-checkbox
                          v-model="selected"
                          class="name_heading ml-14"
                          color="#EE1C25"
                          label="Play Audio Message"
                          @click="submit(selected)"
                        >
                        </v-checkbox>
                        <h2 class="comment_heading ml-16">
                         <p>Play an audio message to customers who call your Business number while the number is Temporarily paused.</p>
                        </h2>
                      </v-col>
                      <v-col cols="6" sm="4" align="end">
                        <v-btn
                          color="#EE1C25"
                          class="name_heading white--text text-capitalize"
                          >+ Upload Media</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-card
                      v-if="selected"
                      color="transparent"
                      outlined
                      class="mt-5 ml-14"
                      max-width="965"
                    >
                      <v-radio-group v-model="radios" mandatory>
                        <v-radio
                          class="mt-5 mb-5"
                          label="Audio 1"
                          value="radio-1"
                          color="red"
                        >
                        </v-radio>
                        <v-divider></v-divider>
                        <v-radio
                          class="mt-5 mb-5"
                          label="Audio 2"
                          value="radio-2"
                          color="red"
                        >
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
        <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          
          <h3 class="center">Pause Virtual Number</h3>
        </v-card-title>
        <v-card-text class="pt-5">
             <!-- v-model =pauseTill -->
          <v-select v-model ="select" label="Pause Till" outlined  :items="pauseTill" item-text="date" item-value="time">
       
          </v-select>

        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="dialog2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="submit(true,'dropdown')"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
// import dateFormat from "dateformat";
import moment from "moment";
import axios from "axios";
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
     db.collection("uservirtualNumber").where("Uid","==",owneruid).where("VirtualNumber","==",parseInt(Object.keys(this.$route.query)[0])).get().then(async(snap) =>{
      // console.log(snap.docs[0].data().VirtualNumber)
      this.switch1 = snap.docs[0].data().IsPaused
      // console.log(moment().add(1, 'day').format('YYYY-MM-DD'))
      // this.pauseupto = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
      this.pauseupto = snap.docs[0].data().IsPaused?new Date(snap.docs[0].data().PauseUpto).toISOString() : new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime() - 1000*60).toISOString();
			// console.log("test.........",this.response);
      // this.agents.forEach((element,index) =>{
      //    const value = participants.find(({Number}) =>Number === element.PhoneNumber)
      //    if(value){
      //       // console.log("valuew",value,index)
      //       this.agents[index] = Object.assign(element,{active:true});
      //    }else{
      //      this.agents[index] = Object.assign(element,{active:false});
      //    }
      // })
      // snap.docs.forEach((element)=> {
			// 	// console.log(element.data())
      //    this.callRouting=element.data().NewActiveCaller,
      //    this.repeatCallerSettings=element.data().StickyAgent
      //    this.StickyAgentType = element.data().Stickiness
			// });
      // console.log(this.agents,"ddd")
      // console.log(this.users)
      // this.agents.forEach((element))
      // form
    //  const h ="9526287163";
  
      // ""
      // this.form[] ==
      // const vn = snap.docs[0].data();
			// vn.Participants.forEach((element)=> {
			// 	console.log(element.data())
      //   element.
      //   element.data().pa
			// this.users.push({Name:element.data().Name,role:element.data().role,PhoneNumber:element.data().PhoneNumber});
			// });
		}).catch((err)=>{
			console.log(err.message)
		})
   
  },
  data: () => ({
    pauseupto:"ndbjsh",
    select:"",
    uid:"",
    owneruid:"",
    AccountId:"",
    dialog2: false,
    pauseTill: [
      {date:"Today",time:(new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60)},
                {date:"Tomorrow",time:(new Date(new Date(moment().add(2, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60)},
    {date:"Day after Tommrrow",time:(new Date(new Date(moment().add(3, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60)}],
    items: [
      {
        text: "More",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "Call Flow Settings",
        disabled: false,
        to: { name: "CallFlowSettings" },
      },
      {
        text: "Pause Number",
        disabled: true,
      },
    ],
    switch1: false,
    selected: false,
  }),

  methods: {
    goBack() {
      const getNumber =  Object.keys(this.$route.query)[0]
      this.$router.push("/CallFlowSettings?"+getNumber);
    },
    submit(status,button){
      // dateFormat(today, "yyyy-mm-dd");
       const pausevalue = (button == "toggle") ?(new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60): this.select;
      //  console.log(button,pausevalue)
      this.pauseupto = new Date(pausevalue).toISOString()
      //  console.log("ddddddd",this.select,status,new Date(dateFormat(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}),"yyyy-mm-dd")).getTime());
      const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/callDistribution/pausenumber',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:Object.keys(this.$route.query)[0],
            AccountId:this.AccountId,
            IsPaused:status,
            PauseUpto:pausevalue
						},
					}
          // const d ={
					// 	owner_uid:this.owneruid,
          //   updated_by:this.uid,
          //   virtual_number:Object.keys(this.$route.query)[0],
          //   AccountId:this.AccountId,
          //   IsPaused:status,
          //   PauseUpto:pausevalue
					// 	};			 	// console.log(details)
					axios(details)
						.then((response) => {
						console.log(response)
              this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
    },
        popup() {
      
        this.dialog2 = true;
   
      
    },
  },
};
</script>

<style scoped>
.page_title {
  font-family: "Lato", Bold;
  font-size: 23px;
}
.heading {
  font-family: "lato", Bold;
  font-size: 16px;
}
.name_heading {
  font-family: "lato", Regular;
  font-size: 16px;
}
.number_heading {
  font-family: "lato", Regular;
  font-size: 14px;
  color: #3b3b3b;
}
.comment_heading {
  font-family: "lato", Regular;
  font-size: 12px;
  color: #808080;
}
.sub_heading {
  font-family: "lato", Regular;
  font-size: 10px;
  color: #808080;
}
</style>