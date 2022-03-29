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
                      <h2 class="page_title mt-6 pl-5">
                        <v-icon class="mr-2" color="black" @click="goBack()"
                          >mdi-arrow-left</v-icon
                        >
                        Buy New Users
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="9">
                      <h2 class="comment_heading ml-5">
                        Deactivate or modify source of your Business Number
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        :disabled="dialog"
                        :loading="dialog"
                        @click="dialog2 = true"
                        class="ma-0"
                        color="red darken-1"
                        dark
                      >
                        + Buy New Number
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-card :elevation="0" class="ml-5">
                              <v-col cols="12" sm="10" align="center">
                                <v-row>
                                  <v-col cols="12" sm="12">
                                    <v-row >

                                        <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
   

  

  <v-list >
                                      
                                        <v-list-item-group
                                          v-model="settings"
                                          multiple
                                        >
                                          <v-list>
      <v-list-item   justify="center" align="center"
        v-for="item in properties"
        :key="item"
      >
        <v-list-item-icon   class="p-0 m-0" >
          <v-icon 
           
            color="red"
          >
            mdi-check
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content align="left">
          <v-list-item-title v-text="item.headline"></v-list-item-title>
        </v-list-item-content>

      
      </v-list-item>
    </v-list>
                                        </v-list-item-group>
                                      </v-list>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
                                      
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-flex>
                    </v-layout>
                    <!-- STEPPER2 -->
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
          <h3 class="center">Add New User</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field label="Name" outlined></v-text-field>
          <v-select :items="types" label="Role" outlined></v-select>

          <v-text-field label="Mobile Number*" outlined></v-text-field>
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
  created() {},
  data: () => ({
    dialog2: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,

    valid: false,
    stepForm: [],
    types: [
      {
        text: "Agent",
      },
      {
        text: "Admin",
      },
    ],
       properties: [
      {
        headline: "Access to individual call Log",
      },
      {
        headline: "Notes/reminders",
      },
      {
        headline: "Missed Call Management",
      },
      {
        headline: "Call Management Dashnoard",
      },
    
    ],
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
        color: "Black",
      },
      {
        text: "Add-Ons",
        disabled: false,
        to: { name: "Addons" },
      },
      {
        text: "Buy New Users",
        disabled: true,
        to: { name: "CallPreference" },
      },
    ],
  }),

  methods: {
    CallFlowSettings() {
      this.$router.push("/CallFlowSettings");
    },
    stepComplete(step) {
      return this.curr > step;
    },
    stepStatus(step) {
      return this.curr > step ? "green" : "blue";
    },
    validate(n) {
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v) {
        this.steps[n].valid = true;
        // continue to next
        this.curr = n + 2;
      }
    },
    done() {
      this.curr = 5;
    },
  },
};
</script>

