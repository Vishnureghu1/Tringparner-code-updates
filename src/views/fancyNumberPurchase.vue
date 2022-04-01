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
                        Fancy Number Purchase
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
                          <v-col cols="12">
                            <v-card :elevation="0" class="ml-5">
                              <v-col cols="12" sm="10" align="center">
                                <v-row>
                                  <v-col cols="12" sm="12">
                                    <v-row>
                                      <v-card
                                        :loading="loading"
                                        class="
                                          mx-auto
                                          my-12
                                          rounded-b-lg
                                          transition-fast-in-fast-out
                                        "
                                        min-width="520"
                                      >
                                        <v-row justify="center" class="d-block">
                                          <v-col cols="auto">
                                            <v-card
                                              width="100%"
                                              color="red darken-1 rounded-t-lg"
                                            >
                                              <v-row
                                                class="fill-height"
                                                align="center"
                                                justify="center"
                                                ><p
                                                  class="
                                                    membership_price
                                                    white--text
                                                    d-print-inline-flex
                                                    mb-5
                                                  "
                                                >
                                                  <span
                                                    class="nunito-font light2"
                                                    >₹</span
                                                  ><span
                                                    class="nunito-font light2"
                                                    >1000<span
                                                      class="
                                                        nunito-font
                                                        light2
                                                        f16
                                                      "
                                                      >.00</span
                                                    ></span
                                                  >
                                                  <span
                                                    class="
                                                      currency_symbol
                                                      light1
                                                    "
                                                    >per number</span
                                                  >
                                                </p>
                                              </v-row
                                              >
                                            </v-card>
                                          </v-col>
                                        </v-row>
                                        <v-card>
                                          <v-col class="text-left">
                                           
                                            <p class="f12 mb-1">
                                              Business Name: Test Business Name
                                            </p>
                                            <p class="f12 mb-1">
                                              Business Address: Name, Street,
                                              Pin: 136666
                                            </p>
                                            <p class="f12 mb-3">
                                              Business Email Address:
                                              test@test.com
                                            </p>
                                          
                                            <p>
                                              <span class="regular red--text pb-0"
                                                >Please contact our support team and select your fancy number before makinf the payment</span
                                              >
                                            </p>

                                            <v-simple-table dense>
                                              <template v-slot:default>
                                                <tbody class="ma-0 pa-0">
                                                  <tr
                                                    v-for="d in sublist"
                                                    :key="d.name"
                                                  >
                                                    <td
                                                      class="ma-0 pa-0"
                                                      :class="d.class"
                                                    >
                                                      {{ d.name }}
                                                    </td>
                                                    <td :class="d.class">
                                                     ₹ {{ d.amount }}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </template></v-simple-table
                                            >
                                          </v-col>
                                          <v-card-actions
                                            class="pt-0 center d-flex"
                                            align="center"
                                          >
                                            <v-btn
                                              text
                                              class="
                                                text-sentence
                                                ma-3
                                                rounded-pill
                                                red_button
                                                light3
                                                normal
                                              "
                                              min-width="140px"
                                              color="white"
                                              outlined
                                              @click="reveal = true"
                                            >
                                              Pay Now
                                            </v-btn>
                                            <v-btn
                                              color="red"
                                              text
                                              class="
                                                ma-2
                                                text-capitalize
                                                rounded-pill
                                                p-3
                                                red_button_outline
                                              "
                                              min-width="140px"
                                             @click="goBack()"
                                            >
                                              Cancel
                                            </v-btn>
                                          </v-card-actions>
                                        </v-card>
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
  </v-app>
</template>

<script>
export default {
  components: {},
  created() {},
  data: () => ({
    reveal: false,
    settings: false,
    loading: false,
    dialog2: false,
    dialog: false,
    isActive: true,
    e2: 1,
    usersCount: 1,

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

    sublist: [
      {
        name: "Charges",
        amount: 1000.00,
        class: "light5",
      },
      {
        name: "GST(18%)",
        amount: 262,
        class: "light5",
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
        text: "Fancy Number Purchase",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),

  methods: {
        goBack() {
      this.$router.push("/Addons");
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

