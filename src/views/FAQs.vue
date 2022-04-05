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
                       FAQs
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
                            <v-card class="mb-0 mt-0 pb-10" :elevation="0">
                              <div class="comment_heading mt-6 ml-5 mb-10">
                               Freequently Asked Questions
                              </div>
                              <v-row no-gutters>
                                <v-col cols="12" sm="12">
                                    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Question 1 ?
          <template v-slot:actions>
            <v-icon color="error">
              mdi-help
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          Question 2?
          <template v-slot:actions>
          <v-icon color="error">
              mdi-help
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          Question 3?
          <template v-slot:actions>
            <v-icon color="error">
              mdi-help
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
                                </v-col>
                                
                              </v-row>
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

    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
        color: "Black",
      },
      {
        text: "FAQs",
        disabled: true,
        to: { name: "AccountInformation" },
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
      this.$router.push("/AccountInformation");
    },


  },
};
</script>

