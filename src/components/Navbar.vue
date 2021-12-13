<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" clipped app class="white"  width="280px" permanent>
            <v-list flat>
                <v-list-item active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="grey--text"> <v-icon  class="mr-3" color="grey" >mdi-radar</v-icon> Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group no-action >

                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title class="grey--text"> <v-icon  class="mr-3" color="grey" >mdi-phone</v-icon> Call Logs</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item v-for="title in subMenu" :key="title.text" router :to="title.route" link>
                    <v-list-item-title class="grey--text" v-text="title.text"></v-list-item-title>
                  </v-list-item>
                </v-list-group> 


                <v-list-item  active-class="red--text">
                    <v-list-item-content>
                        <v-list-item-title class="grey--text"> <v-icon  class="mr-3" color="grey" >mdi-chart-bar</v-icon> Reports </v-list-item-title>
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



            </v-list>
        </v-navigation-drawer>
        <v-app-bar  class="white" app clipped-left>
                  <v-app-bar color="white" flat>
                    <img class="mt-2 ml-2" :src="require('../../public/tring-logo.png')" height="35"/>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon color="black" >mdi-bell-outline</v-icon>
                    </v-btn>
                    <v-avatar class="ml-5" size="40">
                        <v-img src="/img1.png"></v-img>
                    </v-avatar>
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
  export default {
      created() {

    },
    data: () => ({
      drawer: false,
      group: null,
      role : '',
      subMenu: [
      { icon: 'dashboard', text: 'All Calls', route: '/all_calls' },
      { icon: 'dashboard', text: 'Missed Calls', route: '/missed_calls' },
      { icon: 'dashboard', text: 'Answered Calls', route: '/answered_call' },

    ],
    more: [
      { icon: 'dashboard', text: 'Business Number', route: '/active_call' },
      { icon: 'dashboard', text: 'Manage Users', route: '/missed_call' },
      { icon: 'dashboard', text: 'Add-Ons', route: '/greeting' },
      { icon: 'dashboard', text: 'Billing Information', route: '/greeting' },
      { icon: 'dashboard', text: 'Account Info', route: '/greeting' },
      { icon: 'dashboard', text: 'FAQs', route: '/greeting' },
      { icon: 'dashboard', text: 'Get Support', route: '/greeting' },

    ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
      methods:{
    }
  }
  </script>