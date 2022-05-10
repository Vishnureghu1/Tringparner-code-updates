<template>
  <v-app>
    <v-navigation-drawer
      v-if="
        ['login', 'Login'].indexOf(this.$route.name) != 0 &&
        ['ChooseNumbers', 'ChooseNumbers'].indexOf(this.$route.name) != 0 &&
        ['SelectPlan', 'SelectPlan'].indexOf(this.$route.name) != 0 &&
        ['Billing', 'Billing'].indexOf(this.$route.name) != 0 &&
        ['Review', 'Review'].indexOf(this.$route.name) != 0
      "
      v-model="drawer"
      clipped
      app
      class="white"
      width="280px"
      permanent
    >
      <!-- <v-list flat>
                <v-list-item active-class="primary--text">
                    <v-list-item-content>
                        <v-list-item-title class="grey--text" @click="dashboard()"> <v-icon  class="mr-3" color="grey">mdi-radar</v-icon> Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group no-action >

                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="grey--text"> 
                        <v-icon  class="mr-3" color="grey" >mdi-phone</v-icon> Call Logs
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item v-for="title in subMenu" :key="title.text" router :to="title.route" link>
                    <v-list-item-title class="grey--text" v-text="title.text"></v-list-item-title>
                  </v-list-item>
                </v-list-group> 


                <v-list-item  active-class="primary--text">
                    <v-list-item-content>
                        <v-list-item-title class="grey--text" @click="report()"> <v-icon  class="mr-3" color="grey" >mdi-chart-bar</v-icon> Reports </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                 <v-list-group no-action >

                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="grey--text"> <v-icon  class="mr-3" color="grey" >mdi-dots-horizontal</v-icon> More</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item v-for="title in more" :key="title.text" router :to="title.route" link>
                    <v-list-item-title class="grey--text" v-text="title.text"></v-list-item-title>
                  </v-list-item>
                </v-list-group> 

            </v-list> -->
      <!-- NEW LINKS -->
      <v-list flat>
        <!-- <v-list-item v-for="link in links[userRole]" :key="link.text" router :to="link.route" class="primary--text" active-class="border primary--text" style="color:green;">
                    <template v-if="userRole == link.role" color="green--text" >

                        <v-list-item-action>
                            <v-icon>{{link.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title >{{link.text}}</v-list-item-title>
                        </v-list-item-content>
   
                    </template>
                </v-list-item> -->

        <div v-for="(link, i) in links[userRole]" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            active-class="tpprimary--text medium"
            avatar
            class="grey--text ubuntu-font medium"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="menu-text" v-text="link.text" />
          </v-list-item>

          <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"
            class="grey--text ubuntu-font medium"
            active-class="grey--text ubuntu-font "
          >
            <template v-slot:activator>
              <v-list-item-title
                class="menu-text grey--text ubuntu-font"
                active-class="tpprimary--text ubuntu-font medium"
                >{{ link.text }}</v-list-item-title
              >
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              class="grey--text ubuntu-font"
              active-class="tpprimary--text ubuntu-font"
            >
              <v-list-item-title class="menu-text ml-2">{{
                sublink.text
              }}</v-list-item-title>
              <v-list-item-icon class="grey--text ubuntu-font">
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <!-- NEW LINKS -->
    </v-navigation-drawer>
    <v-app-bar :key="rerenderKey" class="white" app clipped-left>
      <v-app-bar color="white" flat>
        <img
          class="mt-2 ml-2"
          :src="require('../../public/tring-logo.png')"
          height="35"
        />
        <v-spacer></v-spacer>

        <div v-if="isLoggedIn">
          <!-- NOTIFICATION MENU -->
          <v-menu bottom width="378px" height="504px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon color="black">mdi-bell-outline</v-icon>
              </v-btn>
            </template>

            <v-card class="mx-auto" max-width="500">
              <v-card-title class="black--text white darken-4">
                Notification Center
                <v-spacer></v-spacer>
                <router-link :to="{ name: 'notifications' }">
                  <div align="center" class="notif-mark">View all</div>
                </router-link>
                <span fab small>
                  <v-icon>mdi-close</v-icon>
                </span>
              </v-card-title>
              <v-divider> </v-divider>
              <!-- <v-card-text class="pt-4 text-center">
                <v-row>
                  <v-col cols="12" align="center" class="notif-mark" @click="read_notification()">
                    Mark all as read({{notificationunread.length}})
                  </v-col>
                </v-row>
              </v-card-text> -->
              <!-- <div v-if="false"> -->
              <v-virtual-scroll
                :items="notificationunread"
                :item-height="90"
                height="300"
                width="500"
              >
                <template v-slot:default="{ item }">
                  <v-list-item>
                    <v-row>
                      <v-col cols="12">
                        <div class="notif-type">{{item.type}}</div>
                        <div class="notif-content">{{ item.content }}</div>
                        <div class="notif-time mb-2">{{item.time}}</div>
                      </v-col>
                    </v-row>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
              <!-- </div> -->
              <v-card-text class="pt-4 text-center">
                <v-row>
                  <v-col cols="12" align="center" class="notif-mark" @click="read_notification()">
                    Mark all as read({{notificationunread.length}})
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-menu>
          <!-- NOTIFICATION MENU -->
          <!-- DROP DOWM MENU FROM AVATAR   -->
          <v-menu bottom max-width="247px" min-height="218px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-avatar v-on="on" class="ml-5" size="40">
                <v-img src="/img1.png"></v-img>
              </v-avatar>
            </template>
            <v-card>
              <v-list-item-content class="align-left">
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="/img1.png" alt="Admin" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ userFirstName }}</v-list-item-title>
                    <v-list-item-subtitle
                      >+91 {{ userPhoneNumber }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-content>
                  <span class="avatar-menu-item">FAQ</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span class="avatar-menu-item">Contact Us</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span class="avatar-menu-item" @click="logout">Log Out</span>
                </v-list-item-content>
              </v-list-item-content>
            </v-card>
          </v-menu>
          <!-- DROP DOWM MENU FROM AVATAR   -->
        </div>
      </v-app-bar>
    </v-app-bar>

    <v-main>
      <v-row align="center">
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '@/main.js';
import firebase from "firebase";
import moment from "moment";
import axios from "axios";
export default {
  async created() {
    let localStorageUserObj = localStorage.getItem("tpu");
      this.notification_data();
    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      this.userEmail = parsedUser.Email;
      console.log("Navbar-user-FirstName", parsedUser.FirstName);
      console.log("Navbar-user-Email", parsedUser.Email);
      console.log(parsedUser);
      this.userRole = parsedUser.role;
      this.isLoggedIn = true;
      this.userFirstName = parsedUser.FirstName;
      this.userPhoneNumber = parsedUser.PhoneNumber;
      this.forceRerenderKey();
    }
  },
  data: () => ({
    unreadids:[],
    drawer: false,
    isLoggedIn: false,
    userRole: "",
    userFirstName: "",
    userPhoneNumber: "",
    rerenderKey: 0,
    group: null,
    role: "",
    notificationunread: [],
    links: {
      OWNER: [
        {
          to: "/dashboard",
          icon: "mdi-radar",
          text: "Dashboard",
        },
        {
          icon: "mdi-phone",
          text: "Call Logs",
          subLinks: [
            {
              text: "All Calls",
              to: "/all_calls",
              icon: "",
            },
            {
              text: "Missed Calls",
              to: "/missed_calls",
              icon: "",
            },
            {
              text: "Answered Calls",
              to: "/answered_call",
              icon: "",
            },
          ],
        },
        {
          to: "/report",
          icon: "mdi-chart-bar",
          text: "Report",
        },
        {
          icon: "mdi-dots-horizontal",
          text: "More",
          subLinks: [
            {
              icon: "",
              text: "Business Number",
              to: "/BusinessNumber",
            },
            {
              icon: "",
              text: "Manage Users",
              to: "/ManageUsers",
            },
            {
              icon: "",
              text: "Add-Ons",
              to: "/Addons",
            },
            {
              icon: "",
              text: "Billing Information",
              to: "/BillingInformation",
            },
            {
              icon: "",
              text: "Account Info",
              to: "/AccountInformation",
            },
            {
              icon: "",
              text: "FAQs",
              to: "/FAQs",
            },
            {
              icon: "",
              text: "Get Support",
              to: "/GetSupport",
            },
          ],
        },
      ],
      ADMIN: [
        {
          to: "/dashboard",
          icon: "mdi-radar",
          text: "Dashboard",
        },
        {
          icon: "mdi-phone",
          text: "Call Logs",
          subLinks: [
            {
              text: "All Calls",
              to: "/all_calls",
              icon: "",
            },
            {
              text: "Missed Calls",
              to: "/missed_calls",
              icon: "",
            },
            {
              text: "Answered Calls",
              to: "/answered_call",
              icon: "",
            },
          ],
        },
        {
          to: "/report",
          icon: "mdi-chart-bar",
          text: "Report",
        },
        {
          icon: "mdi-dots-horizontal",
          text: "More",
          subLinks: [
            {
              icon: "",
              text: "Business Number",
              to: "/BusinessNumber",
            },
            {
              icon: "",
              text: "Manage Users",
              to: "/ManageUsers",
            },
            {
              icon: "",
              text: "Add-Ons",
              to: "/Addons",
            },
            {
              icon: "",
              text: "Billing Information",
              to: "/BillingInformation",
            },
            {
              icon: "",
              text: "Account Info",
              to: "/AccountInformation",
            },
            {
              icon: "",
              text: "FAQs",
              to: "/FAQs",
            },
            {
              icon: "",
              text: "Get Support",
              to: "/GetSupport",
            },
          ],
        },
      ],
      AGENT: [
        {
          to: "/dashboard",
          icon: "mdi-radar",
          text: "Dashboard",
        },
        {
          icon: "mdi-phone",
          text: "Call Logs",
          subLinks: [
            {
              text: "All Calls",
              to: "/all_calls",
              icon: "",
            },
            {
              text: "Missed Calls",
              to: "/missed_calls",
              icon: "",
            },
            {
              text: "Answered Calls",
              to: "/answered_call",
              icon: "",
            },
          ],
        },
        {
          to: "/report",
          icon: "mdi-chart-bar",
          text: "Report",
        },
        {
          icon: "mdi-dots-horizontal",
          text: "More",
          subLinks: [
            {
              icon: "",
              text: "FAQs",
              to: "/FAQs",
            },
            {
              icon: "",
              text: "Get Support",
              to: "/GetSupport",
            },
          ],
        },
      ],
    },
  }),
  watch: {
    group() {
      this.drawer = false;
    },
    isLoggedIn() {
      console.log("forceRerenderKey watch");
      this.forceRerenderKey();
    },
  },
  methods: {
    forceRerenderKey: function () {
      this.rerenderKey += 1;
    },
    logout: function () {
      console.log("clicked logout");
      // firebase.auth()
      firebase.auth().signOut();
      localStorage.removeItem("tpu");
      this.rerenderKey += 1;
      this.$router.push("login").catch(() => {});
    },
    dashboard() {
      this.$router.push("/dashboard").catch(() => {});
    },
    report() {
      this.$router.push("/report").catch(() => {});
    },
     notification_data(){
      this.notificationread =[];
      this.notificationunread =[];
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    // console.log(owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    db.collection("NotificationCenter").where("Uid","==",this.uid).where("IsRead","==",false).get().then(async(snap) =>{
      // console.log(snap.docs[0])
			snap.docs.forEach((element)=> {
        console.log("1")
        if(element.data().IsRead == false){
        this.unreadids.push(element.id)
				this.notificationunread.push({id:element.id,content:element.data().Message,type:element.data().Type,time:moment(new Date(element.data().FormDate)).format("D MMM Y hh:mm a")});
        }
			});
		}).catch((err)=>{
			console.log(err.message)
		})
    },
     read_notification() {
      const token = localStorage.getItem("token");
      const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/notification/read",
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
           this.notification_data()
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
