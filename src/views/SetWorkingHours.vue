<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-8">
         
                    <v-row>
                    <v-col cols="12" sm="10">
                      <h2 class="page_title mt-6 ml-5">
                        <v-icon class="mr-2" color="black" @click="goBack()"
                          >mdi-arrow-left</v-icon
                        >
                        Set Working Hours
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <h2 class="comment_heading ml-5">
                    Specify your business workinng hours here. Agents won't
                    receive call after working hours.
                  </h2>
                  <v-row>
                    <v-col cols="6" sm="9">
                      <h2
                        class="name_heading mt-10 ml-5 mr-7"
                        @click="switch1 = !switch1"
                      >
                        Enable Working Hours
                      </h2>
                    </v-col>
                    <v-col cols="12" sm="2" align="end" c>
                      <v-switch
                        class="mt-9 pl-7"
                        v-model="switch1"
                        flat
                        color="#EE1C25"
                      ></v-switch>
                    </v-col>
                  </v-row>
                  <v-card
                    v-if="switch1"
                    color="transparent"
                    outlined
                    class="mt-5 pr-0"
                    max-width="965"
                  >
                    <v-row>
                      <v-col cols="6" sm="10">
                        <h2 class="sub_heading ml-15 mr-7">Working Hours</h2>
                        <h2 class="number_heading ml-15 mt-2 mr-7">
                          10:00 AM - 05:00 PM
                        </h2>
                      </v-col>
                      <v-col cols="12" sm="2" align="end">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          color="black"
                          @click="popup()"
                          >mdi-pencil</v-icon
                        >
                      </v-col>
                    </v-row>
             
                    <v-row>
                      <v-col cols="6" sm="10">
                        <h2 class="name_heading ml-15 mr-7">
                          Play Offline Message
                        </h2>
                        <h2 class="comment_heading mt-1 ml-15 mr-7">
                          Play an audio message to customers who call your business number duiring offline hours.
                        </h2>
                      </v-col>
                      <v-col cols="12" sm="2" align="end">
                        <router-link :to="{ name: 'OfflineMesssage' }">
                          <span
                            ><v-icon class="mt-6 mb-5 mr-0" color="#EE1C25"
                              >mdi-arrow-right</v-icon
                            >
                          </span>
                        </router-link>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center pb-5">Set Working Hours</h3>
        </v-card-title>
        <v-card-text>
          <!-- start time here -->
          <v-menu
            ref="menu"
            v-model="startTime"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Start Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="startTime"
              v-model="time"
              full-width
              @click:minute="$refs.menu.save(time)"
            ></v-time-picker>
          </v-menu>

          <!-- end time -->

          <v-menu
            ref="menu2"
            v-model="endTime"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time2"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time2"
                label="End Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="endTime"
              v-model="time2"
              full-width
              @click:minute="$refs.menu2.save(time2)"
            ></v-time-picker>
          </v-menu>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="dialog2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  components: {},
  created() {
    window.scrollTo(0, 0); //scroll to top
  },
  data: () => ({
    time: null,
    menu2: false,

    endTime: false,
    startTime: false,
    dialog2: false,

    time2: null,
    items: [
      {
        text: "More",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
      {
        text: "Call Flow Settings",
        disabled: false,
        to: { name: "CallFlowSettings" },
      },
      {
        text: "Working Hours",
        disabled: true,
      },
    ],
    switch1: false,
    selected: false,
  }),

  methods: {
    goBack() {
      this.$router.push("/CallFlowSettings");
    },
    popup() {
      this.dialog2 = true;
    },
  },
};
</script>

<style scoped>
.page_title {
  font-family: "Lato", Bold;
  font-size: 23px;
}
.heading {
  font-family: "lato", Bold;
  font-size: 16px;
}
.name_heading {
  font-family: "lato", Regular;
  font-size: 16px;
}
.number_heading {
  font-family: "lato", Regular;
  font-size: 14px;
  color: #3b3b3b;
}
.comment_heading {
  font-family: "lato", Regular;
  font-size: 12px;
  color: #808080;
}
.sub_heading {
  font-family: "lato", Regular;
  font-size: 10px;
  color: #808080;
}
</style>