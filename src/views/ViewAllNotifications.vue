<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-8">
                  <v-row class="center mt-6" align="center">
                    <v-col cols="8" sm="8" class="p-0">
                      <h2 class="page_title ml-5">Notifications</h2>
                    </v-col>
                    <v-col cols="4" sm="4" align="center" class="notif-mark" @click="read_notification()">
                      Mark all as read({{notificationunread.length}})
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5 pl-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-card elevation="0">
                              <v-tabs v-model="tabs" left class="pb-10">
                                <v-tab key="tab1"> Unread</v-tab>
                                <v-tab key="tab2"> Read </v-tab>
                              </v-tabs>

                              <v-tabs-items v-model="tabs">
                                
                                <v-tab-item>
                                    <v-card flat v-if="unreadmessage"> No notification found </v-card>
                                  <v-card
                                    v-for="details in notificationunread"
                                    :key="details.id"
                                    class="pb-0 pt-5"
                                    elevation="0"
                                  >
                                    <v-row>
                                      <v-col cols="12" @click="redirectpage(details.type)">
                                        <div class="notif-type">
                                          {{ details.type }}
                                        </div>
                                        <div class="notif-content">
                                          {{ details.content }}
                                        </div>
                                        <div class="notif-time mb-2">
                                          {{ details.time }}
                                        </div>
                                      </v-col>
                                    </v-row>

                                    <v-divider></v-divider>
                                  </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                  <v-card flat v-if="readmessage"> No notification found </v-card>
                                   <v-card
                                    v-for="details in notificationread"
                                    :key="details.id"
                                    class="pb-0 pt-5"
                                    elevation="0"
                                  >
                                    <v-row>
                                      <v-col cols="12" @click="redirectpage(details.type)">
                                        <div class="notif-type">
                                          {{ details.type }}
                                        </div>
                                        <div class="notif-content">
                                          {{ details.content }}
                                        </div>
                                        <div class="notif-time mb-2">
                                          {{ details.time }}
                                        </div>
                                      </v-col>
                                    </v-row>

                                    <v-divider></v-divider>
                                  </v-card>
                                </v-tab-item>
                              </v-tabs-items>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-flex>
                    </v-layout>
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
import { db } from "@/main.js";
import moment from "moment";
import axios from "axios";
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top

    let localStorageUserObj = localStorage.getItem("tpu");

    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      // console.log("parsedUser", parsedUser);
      this.user = parsedUser;
    }
        this.initial_data()
    // this.init();
    // this.getBasicInfo();
  },
  data: () => ({
    unreadmessage:true,
    readmessage:true,
    tabs: null,
    user: {},
    notificationread: [],
    uid:"",
    owneruid:"",
    AccountId:"",
    notificationunread:[],
    rerenderKey: 0,
    ownerInfo: [],
    primaryNumber: [],
    addonUsers: [],
    planUsers: [],
    addonNumbers: [],
    purchasedUserAddon: 0,
    planUnAssignedUsers: [],
    addonUnAssignedUsers: [],
    unreadids:[]
  }),

  methods: {
    redirectpage(page){
      if(page == "AddOn User" || page == "Addon User"){
           this.$router.push("/manageAddonUsers");
      }
     if(page == "AddOn Number"){
             this.$router.push("/manageAddonNumbers");
     }
      if(page == "Call Notification"){
             this.$router.push("/all_calls");
     }
     if(page == "Yesterday Activity Of All Agents"){
             this.$router.push("/report");
     }
       
    },
    goBack() {
      this.$router.push("/dashboard");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
    initial_data(){
      this.notificationread =[];
      this.notificationunread =[];
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    // console.log(owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    db.collection("NotificationCenter").where("Uid","==",this.uid).get().then(async(snap) =>{
      console.log(snap.docs[0])
			snap.docs.forEach((element)=> {
        if(element.data().IsRead == false){
				this.notificationunread.push({id:element.id,content:element.data().Message,type:element.data().Type,time:moment(new Date(element.data().FormDate)).format("D MMM Y hh:mm a")});
        this.unreadids.push(element.id)
        }else{
        this.notificationread.push({id:element.id,content:element.data().Message,type:element.data().Type,time:moment(new Date(element.data().FormDate)).format("D MMM Y hh:mm a")});
        }
			});
      this.unreadmessage = (this.notificationunread.length == 0) ? true:false;
      this.readmessage = (this.notificationread.length == 0) ? true:false;
      console.log(this.notificationunread)
		}).catch((err)=>{
			console.log(err.message)
		})
    },
     read_notification() {
      const token = localStorage.getItem("token");
      const details = {
        url: this.$cloudfareApi+"/notification/read",
        method: "POST",
        data: {
          owner_uid:this.owneruid,
          updated_by: this.uid,
          uid:this.uid,
          notification_id:this.unreadids,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };

      axios(details)
        .then(() => {
           this.initial_data()
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>