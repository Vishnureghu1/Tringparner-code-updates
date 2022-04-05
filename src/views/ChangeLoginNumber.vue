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
                        Change Login Number
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
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
                          <v-col cols="12" sm="12">
                            <v-card class="mb-0 mt-0" :elevation="0">
                              <div class="comment_heading mt-6 ml-5">
                                Current Login Number
                              </div>

                              <v-card class="mb-0 mt-0 pl-5" :elevation="0">
                                <p>+91 7306109553</p>
                                <v-checkbox
                                  v-model="ex4"
                                  label="I agree that I will not be able to access Tring Partner from my current login number after changing it."
                                  color="red"
                                  value="agreeNumebrChange"
                                  change-number
                                ></v-checkbox>
                              </v-card>
                              <v-card-actions>
                                <v-btn
                                  class="text-capitalize ma-3 rounded-pill"
                                  min-width="140px"
                                  :class="{ selected: isDisabled }"
                                  :disabled="!isDisabled"
                                  color="red"
                                  dark
                                  rounded-pill
                                >
                                  Change login Number
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-flex>
                    </v-layout>
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
    ex4: false,
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
        text: "Account Information",
        disabled: false,
        to: { name: "AccountInformation" },
      },
      {
        text: "Bussiness Information",
        disabled: true,
        to: { name: "CallFlowSettings" },
      },
    ],
  }),
  computed: {
    isDisabled: function () {
      return this.ex4;
    },
  },
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

