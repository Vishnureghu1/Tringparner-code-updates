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
<!-- {{userRole}} -->
        <div v-if="isLoggedIn">
          <v-btn v-on="on" icon v-if=" userRole =='' ">
                
                  <v-icon color="black"  @click="logout">mdi-logout</v-icon>
               
                
              </v-btn>
          <!-- NOTIFICATION MENU -->
          <v-menu bottom width="378px" height="504px" rounded offset-y v-if=" userRole !=''">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-badge color="red" content="0" overlap  v-if="notificationunread.length==0">
                  <v-icon color="black">mdi-bell-outline</v-icon>
                </v-badge>
                <v-badge color="red" :content="notificationunread.length"  overlap v-if="notificationunread.length!=0">
                  <v-icon color="black">mdi-bell-outline</v-icon>
                </v-badge>
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
              <v-container
                fill-height
                fluid
                v-if="notificationunread.length == 0"
              >
                <v-row
                  align="center"
                  justify="center"
                  style="padding-top: 50%; position: absolute; left: 35%"
                >
                  <p class="red--text">No notification found!</p>
                </v-row>
              </v-container>
              <v-virtual-scroll
                :items="notificationunread"
                :item-height="90"
                height="300"
                width="500"
              >
                <template v-slot:default="{ item }">
                  <v-list-item>
                    <v-row>
                      <v-col cols="12" @click="redirectpage(item.type)">
                        <div class="notif-type">{{ item.type }}</div>
                        <div class="notif-content">{{ item.content }}</div>
                        <div class="notif-time mb-2">{{ item.time }}</div>
                      </v-col>
                    </v-row>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
              <!-- </div> -->
              <v-card-text
                class="pt-4 text-center"
                v-if="notificationunread.length != 0"
              >
                <v-row>
                  <v-col
                    cols="12"
                    align="center"
                    class="notif-mark"
                    @click="read_notification()"
                  >
                    Mark all as read({{ notificationunread.length }})
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-menu>
          <!-- NOTIFICATION MENU -->
          <!-- DROP DOWM MENU FROM AVATAR   -->
          <v-menu bottom max-width="247px" min-height="218px" rounded offset-y  v-if=" userRole !=''">
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
                    <v-list-item-title>{{ userFirstName }} </v-list-item-title>
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
import { db } from "@/main.js";
import firebase from "firebase";
import moment from "moment";
import axios from "axios";
export default {
  async created() {
    // this.notification_data();
    this.noti()
    this.forceRerenderKey();
    
  },
  mounted(){
      // this.noti()
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
      this.Stage = parsedUser.Stage;
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
    Stage:"",
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
          to: "/contacts",
          icon: "mdi-account-box-outline",
          text: "Contacts",
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
      localStorage.removeItem("nonIVRPlanradio");
      localStorage.removeItem("IVRPlanradio");
      


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
    noti(){
       firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //  console.log("1234vel",user.uid)
        db.collection("NotificationCenter")
        .where("Uid", "==", user.uid)
        // .where("IsRead", "==", false)
        .onSnapshot((snapshot) => {
          // this.unreadids = [];
          // this.notificationunread =[];
          // console.log("123vel",snapshot.docChanges().length)
              snapshot.docChanges().forEach((change) => {
                if(change.doc.data().IsRead == false){
                  this.unreadids.push(change.doc.id);
                this.notificationunread.push({
                id: change.doc.id,
                content: change.doc.data().Message,
                type: change.doc.data().Type,
                time: moment(new Date(change.doc.data().FormDate)).format(
                  "D MMM Y hh:mm a"
                ),
              });
                }
                if(change.doc.data().IsRead == true){
                  // console.log(change.doc.id)
                    this.unreadids.pop();
                }
              })
        }).catch(err =>(console.log(err)));
        }else{
          this.$router.push("login").catch(() => {});
        }
       })
    }
  },
};
</script>
