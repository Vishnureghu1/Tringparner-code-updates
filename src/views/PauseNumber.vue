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
                        Pause Virtual Numeber
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <h2 class="comment_heading ml-5">
                    Temporarily pause receiving calls on this virtual number.
                  </h2>
                  <v-row>
                    <v-col cols="6" sm="10">
                      <h2
                        class="name_heading mt-10 ml-5 mr-7"
                        @click="switch1 = !switch1"
                      >
                        Pause Virtual Number
                      </h2>
                    </v-col>
                    <v-col cols="12" sm="2" align="end">
                      <v-switch
                        class="mt-9"
                        v-model="switch1"
                        flat
                        color="#EE1C25"
                      ></v-switch>
                    </v-col>
                  </v-row>
                  <v-card
                    v-if="switch1"
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="965"
                  >
                    <v-row>
                      <v-col cols="6" sm="10">
                        <h2 class="sub_heading ml-15 mr-7">
                          Marked as Offline Till
                        </h2>
                        <h2 class="number_heading ml-15 mt-2 mr-7">
                          10 Jan 2022 11:59pm
                        </h2>
                      </v-col>
                      <v-col cols="12" sm="2" align="end">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          color="black"
                          @click="popup()"
                          >mdi-pencil</v-icon
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" sm="8">
                        <v-checkbox
                          v-model="selected"
                          class="name_heading ml-14"
                          color="#EE1C25"
                          label="Play Audio Message"
                        >
                        </v-checkbox>
                        <h2 class="comment_heading ml-16">
                         <p>Play an audio message to customers who call your Business number while the number is Temporarily paused.</p>
                        </h2>
                      </v-col>
                      <v-col cols="6" sm="4" align="end">
                        <v-btn
                          color="#EE1C25"
                          class="name_heading white--text text-capitalize"
                          >+ Upload Media</v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-card
                      v-if="selected"
                      color="transparent"
                      outlined
                      class="mt-5 ml-14"
                      max-width="965"
                    >
                      <v-radio-group v-model="radios" mandatory>
                        <v-radio
                          class="mt-5 mb-5"
                          label="Audio 1"
                          value="radio-1"
                          color="red"
                        >
                        </v-radio>
                        <v-divider></v-divider>
                        <v-radio
                          class="mt-5 mb-5"
                          label="Audio 2"
                          value="radio-2"
                          color="red"
                        >
                        </v-radio>
                        <v-divider></v-divider>
                      </v-radio-group>
                    </v-card>
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
          
          <h3 class="center">Pause Virtual Number</h3>
        </v-card-title>
        <v-card-text class="pt-5">
        
          <v-select label="Pause Till" outlined  :items="pauseTill">

          </v-select>

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
  created() {
    window.scrollTo(0, 0); //scroll to top
  },
  data: () => ({
    dialog2: false,
      pauseTill: ['Today', 'Tommrrow', 'Day after tommrrow'],
    items: [
      {
        text: "More",
        disabled: false,
        to: { name: "BusinessNumber" },
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
        text: "Pause Number",
        disabled: true,
      },
    ],
    switch1: false,
    selected: false,
  }),

  methods: {
    goBack() {
      this.$router.push("/CallFlowSettings");
    },
        popup() {
      
        this.dialog2 = true;
   
      
    },
  },
};
</script>

<style scoped>
.page_title {
  font-family: "Lato", Bold;
  font-size: 23px;
}
.heading {
  font-family: "lato", Bold;
  font-size: 16px;
}
.name_heading {
  font-family: "lato", Regular;
  font-size: 16px;
}
.number_heading {
  font-family: "lato", Regular;
  font-size: 14px;
  color: #3b3b3b;
}
.comment_heading {
  font-family: "lato", Regular;
  font-size: 12px;
  color: #808080;
}
.sub_heading {
  font-family: "lato", Regular;
  font-size: 10px;
  color: #808080;
}
</style>