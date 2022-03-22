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
                        Prioritize Configuration
                      </h2>
                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <div class="comment_heading mt-6 ml-5">
                    Select how incoming calls are distributed among your users.
                    Distribution rules will be applied base on these settings
                  </div>
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                  >
                    <v-layout>
                      <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                          <v-col cols="12" sm="12" class="pl-5">
                            <v-card class="mb-0 mt-0" :elevation="0">
                              <div
                                class="drag-el"
                                v-for="item1 in items1"
                                :key="item1.title"
                                draggable
                                @dragstart="startDrag($event, item1)"
                              >
                                              <v-checkbox
              v-model="ex4"
              :label="item1.title"
              color="red darken-3"
              :value="item1.id"
              hide-details
            ></v-checkbox>
                              </div>
               
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
    items1: [
      {
        id: 1,
        title: "Sree",
        subtitle: "Admin: +919526287163",
      },
      {
        id: 2,
        title: "Akhil",
        subtitle: "Admin: +919526287163",
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
        disabled: false,
        to: { name: "MissedCallDistribution" },
      },
      {
        text: "Select Specific Agent(s)",
        disabled: true,
        to: { name: "selectSpecificAgent" },
      },
    ],
  }),

  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);
      item.list = list;
    },
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

