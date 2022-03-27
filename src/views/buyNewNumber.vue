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
                        Buy New Business Number
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
                      Choose any new Virtual Numebr or tap refresh to get new list of numbers
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        
                      
                        @click="dialog2 = true"
                        class="ma-0"
                        color="red darken-1"
                        dark
                      >
                        + Refresh List (0 Sec)
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
                             <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      >
        <template v-for="(item, index) in Numbers">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon class="pb-3"
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-check-circle-outline
                </v-icon>

                <v-icon class="pb-3"
                  v-else
                  color="red darken-3"
                >
                  mdi-check-decagram
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

   
        </template>
      </v-list-item-group>
    </v-list>
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

    <v-dialog v-model="removeNumber" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Remove User</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <p align="center" class="pb-0 mb-0">
            Are you sure want to remove this user Sree [9526287163] ?
          </p>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="removeNumber = false"
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
            Remove
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
    dialog: false,
    removeNumber: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,

    options: [
      { title: "Edit", color: "black--text", url: "Edit" },
      { title: "Send Invite", color: "black--text", url: "sendInvite" },
      { title: "Remove Slot", color: "red--text", url: "removeSlot" },
    ],
    valid: false,
    stepForm: [],
    selected: [2],
      Numbers: [
        {

          headline: '+91 919526281234',
 
        },
        {
  
          headline: '+91 919526287163',

        },
        {

          headline: '+91 919526287163',

        },
        {
  
          headline: '+91 919526287163',
        },
        {
        
          headline: '+91 123459789012',
      
        },
      ],
    types: [
      {
        text: "Agent",
      },
      {
        text: "Admin",
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
        text: "Buy New Business Number",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 4000);
    },
  },
  methods: {
    showPopup(type) {
      if (type == "Edit") {
        this.dialog2 = true;
      }
      if (type == "removeSlot") {
        this.removeNumber = true;
      }
    },
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

