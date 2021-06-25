<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" clipped app class="white"  width="300px">
            <v-list flat>
                <v-list-item @click="calllogs()" active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="black--text"> Call Logs </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="this.role == 'OWNER' || this.role == 'ADMIN'" @click="analytics()" active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="black--text"> Analytics </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="this.role == 'OWNER'" @click="addons()" active-class="red--text">
                  <v-list-item-content>
                      <v-list-item-title class="black--text"> Addons </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="this.role == 'OWNER' || this.role == 'ADMIN'" @click="manageUsers()" active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="black--text"> Manage Users </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group no-action v-if="this.role == 'OWNER' || this.role == 'ADMIN'">

                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Call Distribution</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item v-for="title in subMenu" :key="title.text" router :to="title.route" link>
                    <v-list-item-title v-text="title.text"></v-list-item-title>
                  </v-list-item>
                </v-list-group> 


                <v-list-item v-if="this.role == 'OWNER' || this.role == 'ADMIN'" @click="block_calls()" active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="black--text"> Block Calls </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="this.role == 'OWNER'" @click="billing()" active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="black--text"> Billing </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="myinfo()" active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="black--text"> My Info </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>


            </v-list>
        </v-navigation-drawer>
        <v-app-bar  class="blue-grey darken-1" app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">

            </v-app-bar-nav-icon>
                  <v-app-bar color="blue-grey darken-1" flat>
                    <img class="mt-2 ml-2" :src="require('../../public/images/tring-logo-white.png')" height="35"/>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon color='white' >mdi-chat-outline</v-icon>
                    </v-btn>
                    <label class='white--text'>support</label>
                  </v-app-bar>
        </v-app-bar>
        <v-content>
            <v-row align="center">
              <v-col cols="12">
                <router-view></router-view>
              </v-col>
            </v-row>
        </v-content>
    </v-app>

</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js';
  export default {
      created() {
                firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("logged user details",user)
                this.uid = user.uid
                this.phno = user.phoneNumber.slice(3)
                console.log("page navbar il user id", this.uid)
                console.log("page navbar  il user number", this.phno)
                db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                  console.log(doc.id, " => ", doc.data());
                  let user_details = doc.data()
                  this.role = user_details.role
                  console.log(this.role)
                })
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
            }
          })
    },
    data: () => ({
      drawer: false,
      group: null,
      role : '',
      subMenu: [
      { icon: 'dashboard', text: 'Add Agent', route: '/add_agents' },
      { icon: 'dashboard', text: 'Active Calls', route: '/active_call' },
      { icon: 'dashboard', text: 'Missed Call', route: '/missed_call' },
      { icon: 'dashboard', text: 'Greeting Message', route: '/greeting' },

    ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
      methods:{
      calllogs(){
        this.$router.push("/calllogs")
      },
      addons(){
        this.$router.push("/addons")
      },
      manageUsers(){
        this.$router.push("/manageUsers")
      },
      block_calls(){
        this.$router.push("/block_calls")
      },
      billing(){
        this.$router.push("/billing_details")
      },
      myinfo(){
        this.$router.push("/myinfo")
      },
      greetingMessage(){
        this.$router.push("/greeting")
      },
      analytics(){
        this.$router.push("/analytics")
      },
    }
  }
  </script>