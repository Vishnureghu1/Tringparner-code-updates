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
                       Missed Call Distribution
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
 <div class="comment_heading mt-6 ml-5">Select how missed calls are distributed among
                            your users. Distribution rules will be applied base
                            on these settings</div>	
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12" class="pl-5">
                           
                            <v-card class="mb-0 mt-0" :elevation="0">
                             

                              <v-radio-group v-model="ex7">
                                <div class="subheading pt-0 pb-2">
                                  New Caller Routing
                                </div>
                                <v-radio
                                  value="1"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Assigned to All
                                    </div>
                                  </template>
                                </v-radio>

                                <v-radio
                                  value="2"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Assign in RoundRobin
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio
                                  value="3"
                                  color="red"
                                  class="mb-5 ml-5 pl-3"
                                >
                                  <template v-slot:label>
                                   <div class="black--text">
                                      Assign to Last Attempted Agent
                                    </div>
                                  </template>
                                </v-radio>

                                <v-radio
                                  value="4"
                                  color="red"
                                  class="mb-0 ml-5 pl-3"
                                >
                                  <template v-slot:label>
                                    <div class="black--text">
                                      Select Specific Agent(s)
                                       
                                    
                                    </div>
                                  </template>
                                </v-radio>
                              </v-radio-group>

                              <v-divider class="ml-15"></v-divider>
                              <v-row>
                                <v-col cols="10" sm="10">
                                  <div class="mt-5 mb-5 ml-15">
                                    <div class="subheading">
                                      Select Specific Agent(s)<br />
                                    </div>
                                    <p>
                                      <small class="grey--text light-3"
                                        >Missed calll will get assigned only to the specific agents selected here.</small
                                      >
                                    </p>
                                  </div>
                                </v-col>
                                <v-col cols="2" sm="2" align="end">
                                  <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#EE1C25"
                                    @click="SelectSpecificAgent()"
                                    class="pt-10"
                                    >mdi-arrow-right</v-icon
                                  >
                                </v-col>
                              </v-row>
                              <v-divider></v-divider>

                              <div class="membership_details">
                                <div class="subheading mt-5 mb-5">
                                  Repeated Caller Settings
                                </div>
                                <v-checkbox
                                  v-model="repeatCallerSettings"
                                  class="ml-10"
                                  color="red darken-3"
                                  ><template v-slot:label>
                                    <div class="gray--text">
                                      <div class="subheading">
                                        Sticky Agent<br />
                                      </div>
                                      <small
                                        >How incoming calls are distributed
                                        amongst your users. Distributions rules
                                        will happen based on these
                                        settings</small
                                      >
                                    </div>
                                  </template></v-checkbox
                                >

                                <div v-if="repeatCallerSettings">
                                  <v-divider class="ml-15"></v-divider>
                                  <div class="subheading mt-5 mb-5 ml-15">
                                    Sticky Agent Type
                                  </div>
                                  <v-radio-group v-model="ex7" column>
                                    <v-radio
                                      value="1"
                                      color="red"
                                      class="mb-5 ml-5 pl-15"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Flexible<br /><small
                                            class="grey--text light-3"
                                            >Your call will ring Simultaneously
                                            which in fact reduce the chance of
                                            missing calls.</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                    <v-radio
                                      value="2"
                                      color="red"
                                      class="mb-0 ml-5 pl-15"
                                    >
                                      <template v-slot:label>
                                        <div class="black--text">
                                          Strict<br /><small
                                            class="grey--text light-3"
                                            >Your call will ring Simultaneously
                                            which in fact reduce the chance of
                                            missing calls.</small
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                  </v-radio-group>
                                </div>
                              </div>
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
        text: "Call Flow Settings",
        disabled: false,
        to: { name: "CallFlowSettings" },
      },

      {
        text: "Missed Call Distribution",
        disabled: true,
        to: { name: "MissedCallDistribution" },
      },
    ],
  }),

  methods: {
    goBack() {
      this.$router.push("/CallFlowSettings");
    },
    SelectSpecificAgent() {
      this.$router.push("/SelectSpecificAgent");
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


