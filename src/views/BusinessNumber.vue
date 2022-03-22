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
                        Business Numbers
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <div class="comment_heading mt-6 ml-5">
                    Configure your business number according to your needs
                  </div>
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1064"
                    v-for="(item, i) in 2"
                    :key="i"
                  >
                    <v-row>
                      <v-col cols="12" sm="6">
                        <div class="name_heading mt-1 ml-5">
                          Name {{ i + 1 }}
                          <v-icon
                            v-if="i == 0"
                            class="mr-2 row-pointer"
                            color="black"
                            >mdi-crown</v-icon
                          >
                        </div>
                        <div class="number_heading mt-2 ml-5">
                          +91 8891978085
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="black"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="(item, index) in options"
                              :key="index"
                              active-class="pink--text"
                            >
                              <v-list-item-title
                                :class="item.color"
                                @click="dialog2 = true"
                                >{{ item.title }}</v-list-item-title
                              >
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div
                          class="link_style mt-1 ml-5"
                          @click="ManageAgents()"
                        >
                          Manage Agents
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          color="#EE1C25"
                          @click="ManageAgents()"
                          >mdi-arrow-right</v-icon
                        >
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div
                          class="link_style mt-1 ml-5 mb-5"
                          @click="CallFlowSettings()"
                        >
                          Call Flow Settings
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          color="#EE1C25"
                          @click="CallFlowSettings()"
                          >mdi-arrow-right</v-icon
                        >
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
          <h3 class="center">Change Title</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <p align="center" class="pb-10">Name 1</p>
          <v-text-field label="New Source Title" outlined></v-text-field>
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
    options: [{ title: "Change Title", color: "black--text", url: "add_note" }],
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
        color: "red",
      },
    ],
  }),

  methods: {
    goBack() {
      this.$router.push("/Dashboard");
    },
    CallFlowSettings() {
      this.$router.push("/CallFlowSettings");
    },
    ManageAgents() {
      this.$router.push("/ManageAgents");
    },
  },
};
</script>

