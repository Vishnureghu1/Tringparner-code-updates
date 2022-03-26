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
                        Manage Call Agents
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
                        <h4 class="ml-5">Business Number 8657510921</h4>
                      <h2 class="comment_heading ml-5">
                        Select which all Users (Call Agents) are linked to this
                        number. Distributions will happen amongst them.
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
                        + Add new Agent
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
                                  <v-col cols="12" sm="12" align="center">
                                    <v-row justify="space-between">
                                      <v-col cols="6" sm="6" align="left">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="agent_name">Shinu</div>
                                          <div class="agent_role">Agent</div>
                                          <div class="agent_number">
                                            +91 989999 9900
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="2" align="end">
                                        <v-switch
                                          justify-right
                                          v-model="isActive"
                                          color="red"
                                          value="isActive"
                                        ></v-switch>
                                      </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" sm="12" align="center">
                                    <v-row justify="space-between">
                                      <v-col cols="6" sm="6" align="left">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="agent_name">Shinu</div>
                                          <div class="agent_role">Agent</div>
                                          <div class="agent_number">
                                            +91 989999 9900
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="2" align="end">
                                        <v-switch
                                          justify-right
                                          v-model="isActive"
                                          color="red"
                                          value="isActive"
                                        ></v-switch>
                                      </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12" sm="12" align="center">
                                    <v-row justify="space-between">
                                      <v-col cols="6" sm="6" align="left">
                                        <v-card
                                          outlined
                                          color="transparent"
                                          class="mb-3"
                                        >
                                          <div class="agent_name">Shinu</div>
                                          <div class="agent_role">Agent</div>
                                          <div class="agent_number">
                                            +91 989999 9900
                                          </div>
                                        </v-card>
                                      </v-col>
                                      <v-col cols="6" sm="2" align="end">
                                        <v-switch
                                          justify-right
                                          v-model="isActive"
                                          color="red"
                                          value="isActive"
                                        ></v-switch>
                                      </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
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
                 <v-select
          :items="types"
          label="Role"
          outlined
        ></v-select>
           
           
            <v-text-field label="Mobile Numebr*" outlined></v-text-field>
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
    curr: 1,
    lastStep: 4,
    steps: [
      { name: "Manage User", rules: [(v) => !!v || "Required."], valid: true },
      {
        name: "Call Routing Setting",
        rules: [(v) => !!v || "Required."],
        valid: true,
      },
      // {name: "Step 3", rules: [v => (v && v.length >= 4) || "Enter at least 4 characters."], valid: true},
      // {name: "Complete"},
    ],
    valid: false,
    stepForm: [],
types:[
    {

        text: "Agent",
    },
     {

        text: "Admin",
    }
],
    items: [
     {
        text: "More",
        disabled: false,
        href: "Dashboard",
        color: "Black",
      },
      {
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
      },
     
      {
        text: "Call Preference",
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

