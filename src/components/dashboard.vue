<template>
  <v-card
    class="mx-auto overflow-hidden"
    width="800"
    height="800"

  >

    <v-app-bar
      color="light blue"
      dark
      prominent
      height="75"
    >
      <v-app-bar-nav-icon class="mt-2 hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="mt-3 ml-2">Tring Partner</v-toolbar-title>

      <v-spacer></v-spacer>

				<v-btn icon>
					<v-icon class="mt-3">mdi-chat-outline</v-icon>
				</v-btn>
				<label class='white--text mt-3'>support</label>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      :permanent="$vuetify.breakpoint.mdAndUp"

    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Call Logs</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Call Routing</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Greeting Message</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Whatsapp</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Billing</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Export</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card-text>
			hello
    </v-card-text>
  </v-card>
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
								console.log("page pricing il user id", this.uid)
								console.log("page pricing il user number", this.phno)
								db.collection('users').where("uid" , "==" , this.uid).get().then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
									console.log(doc.id, " => ", doc.data());
									// let user_details = doc.data()
									// console.log(user_details.role)
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
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
  </script>

