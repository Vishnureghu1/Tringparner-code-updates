<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="800"
    width="850"
  >
    <v-app-bar
      color="deep-purple"
      dark
      clipped
      
      width="850"
      align-center
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      permanent
      clipped-left
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="calllogs()">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
        methods:{
      calllogs(){


        
//        xev -event keyboard
// xmodmap -e 'keycode 82='
      },
    }

  }
</script>