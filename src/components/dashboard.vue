<template>
  <nav>
    <v-card class="mx-auto overflow-hidden" width="800" height="800">
      <v-app-bar color="light blue" dark prominent height="75">
        <v-app-bar-nav-icon
          class="mt-2 hidden-md-and-up"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="mt-3 ml-2">Tringpartner</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="mt-3">mdi-chat-outline</v-icon>
        </v-btn>
        <label class="white--text mt-3">support</label>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        left
        :permanent="$vuetify.breakpoint.mdAndUp"
      >
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item
              v-for="link in links"
              :key="link.text"
              router
              :to="link.route"
            >
              <v-list-item-title> {{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view></router-view>
    </v-card>
  </nav>
</template>


<script>
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  data: () => ({
    drawer: false,
    group: null,
    links: [
      { icon: "dashboard", text: "Call Logs", route: "/call_logs" },
      { icon: "folder", text: "Analytics", route: "/analytics" },
      { icon: "person", text: "Manage User", route: "/manageUser" },
      { icon: "dashboard", text: "Greeting Message", route: "/greeting" },
      { icon: "dashboard", text: "Whatsapp", route: "/whatsapp" },
      { icon: "dashboard", text: "Billing", route: "/billing_details" },
      { icon: "dashboard", text: "Export", route: "/export" },
    ],
  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("logged user details", user);
        this.uid = user.uid;
        this.phno = user.phoneNumber.slice(3);
        console.log("page pricing il user id", this.uid);
        console.log("page pricing il user number", this.phno);
        db.collection("users")
          .where("uid", "==", this.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              // let user_details = doc.data()
              // console.log(user_details.role)
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    });
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

