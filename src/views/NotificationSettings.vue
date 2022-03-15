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
                        Notification Settings
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>

                  <v-layout>
                    <v-flex xs12 sm12 md12>
                      <v-col cols="12" sm="12">
                        <v-card :elevation="0" class="mb-0">
                          <v-col cols="12" sm="10">
                           <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-0 mr-7">
                                  Answered Calls
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                  Notify user(s) when call is answered
                                </h2>
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
                            <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                 Missed Calls
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                   Notify user(s) when a call got missed
                                </h2>
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
                         <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                Todays's Summary
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                    Notify user(s) when daily summary report
                                        is ready
                                </h2>
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
                   <v-row justify="space-between">
                              <v-col cols="6">
                                <h2 class="name_heading mt-4 mr-7">
                                Payment
                                </h2>
                                <h2 class="comment_heading mt-1 mb-5 mr-7">
                                    Notify when payment is due
                                </h2>
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
                        </v-card>
                      </v-col>
                    </v-flex>
                  </v-layout>
                </div>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  components: {},
  created() {},
  data: () => ({
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
        text: "CallFlow Settings",
        disabled: false,
        to: { name: "CallFlowSettings" },
      },

      {
        text: "Notification Settings",
        disabled: false,
        to: { name: "Notification Settings" },
      },
    ],
  }),

  methods: {
    goBack() {
      this.$router.push("/CallFlowSettings");
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

