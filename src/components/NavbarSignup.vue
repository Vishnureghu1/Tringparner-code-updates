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

      <v-list flat>


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

       
          <!-- <v-btn v-on="on" icon>
                
                  <v-icon color="black"  @click="logout">mdi-logout</v-icon>
               
                
              </v-btn> -->
          
      
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
import { db } from "@/main.js";
import firebase from "firebase";
import moment from "moment";
import axios from "axios";
export default {
  async created() {

    this.notification_data();
    this.forceRerenderKey();
  },
  data: () => ({
        world: 'world',
      get token() {
            let localStorageUserObj = localStorage.getItem("tpu");
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
    }
         return localStorage.getItem('tpu') || 0;
      },
      set token(value) {
         localStorage.setItem('tpu', value);
      },
    unreadids: [],
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
    forceRerenderKey: function () {
      this.rerenderKey += 1;
    },
    logout: function () {
      console.log("clicked logout");
      // firebase.auth()
      firebase.auth().signOut();
   
      localStorage.removeItem("tpu");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("planId");
      localStorage.removeItem("PlanId");
      localStorage.removeItem("ActiveTab");
      localStorage.removeItem("IVRPlanradio");
      localStorage.removeItem("nonIVRPlanradio");

      this.rerenderKey += 1;
      this.$router.push("login").catch(() => {});
    },
    dashboard() {
      this.$router.push("/dashboard").catch(() => {});
    },
    report() {
      this.$router.push("/report").catch(() => {});
    },
    notification_data() {
      this.notificationread = [];
      this.notificationunread = [];
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
      const owneruid =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.uid
          : localStorageUserObj.OwnerUid;
      this.AccountId =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.AccountId
          : localStorageUserObj.OwnerAccountId;
      // console.log(owneruid)
      this.owneruid = owneruid;
      this.uid = localStorageUserObj.uid;
      db.collection("NotificationCenter")
        .where("Uid", "==", this.uid)
        .where("IsRead", "==", false)
        .get()
        .then(async (snap) => {
          // console.log(snap.docs[0])
          snap.docs.forEach((element) => {
            console.log("1");
            if (element.data().IsRead == false) {
              this.unreadids.push(element.id);
              this.notificationunread.push({
                id: element.id,
                content: element.data().Message,
                type: element.data().Type,
                time: moment(new Date(element.data().FormDate)).format(
                  "D MMM Y hh:mm a"
                ),
              });
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    read_notification() {
      const token = localStorage.getItem("token");
      const details = {
        url: this.$cloudfareApi+"/notification/read",
        method: "POST",
        data: {
          owner_uid: this.owneruid,
          updated_by: this.uid,
          uid: this.uid,
          notification_id: this.unreadids,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };

      axios(details)
        .then(() => {
          this.notification_data();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
