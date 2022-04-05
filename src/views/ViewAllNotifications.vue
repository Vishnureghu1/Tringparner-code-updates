<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-8">
                  <v-row class="center  mt-6" align="center">
                    <v-col cols="8" sm="8" class="p-0">
                      <h2 class="page_title  ml-5">
                       
                    Notifications
                      </h2>

              
                    </v-col>
                     <v-col cols="4" sm="4" align="center" class="notif-mark" >
                              Mark all as read(10)
                           
              
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
                                  <v-card  v-for="details in notificationCenterItems" :key="details.id" class="pb-0 pt-5" elevation="0">
                     
                      
                           
                              <v-row>
                                <v-col cols="12">
                                  <div class="notif-type" >{{ details.type }}</div>
                                  <div class="notif-content" >{{ details.content }}</div>
                                  <div class="notif-time mb-2" >{{ details.time }}</div>
                                </v-col>
                              </v-row>
          
                            <v-divider></v-divider>
                           
                         
                   

                                  </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                  <v-card flat>
                            No notification found
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


export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top

    let localStorageUserObj = localStorage.getItem("tpu");

    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      console.log("parsedUser", parsedUser);
      this.user = parsedUser;
    }

    // this.init();
    this.getBasicInfo();
  },
  data: () => ({
    tabs: null,
    user: {},
      notificationCenterItems:[
        {
          id:1,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:2,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:3,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:4,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:5,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:6,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:7,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:8,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:9,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
        {
          id:10,
          type: 'Call Notification',
          content: 'You have a Missed Call From +91 988809991',
          time:'Today, 12:01pm'
        },
      ],
    //forcefully render ui component
    rerenderKey: 0,
    ownerInfo: [],
    primaryNumber: [],
    addonUsers: [],
    planUsers: [],
    addonNumbers: [],
    purchasedUserAddon: 0,
    planUnAssignedUsers: [],
    addonUnAssignedUsers: [],
  }),

  methods: {
    goBack() {
      this.$router.push("/dashboard");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
  }
}
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>