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
                        Caller Tone
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
                       Play caller tune to customerswhile the call gets diverted to your agents. Select and audio file from the below list or add a new audio.
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        :disabled="dialog"
                        :loading="dialog"
                        @click="dialog = true"
                        class="ma-2"
                        color="red darken-1"
                        dark
                      >
                        + Upload Media
                      </v-btn>
  <v-file-input
    :rules="rules"
    accept=".mp3, .wav"
    placeholder="Choose file"
    prepend-icon="mdi-camera"
    label="Upload File"
  ></v-file-input>
                      <v-progress-linear
      color="red darken-1 "  buffer-value="0"
      height="35"
      value="20"
      striped
    ></v-progress-linear>
    <v-progress-linear
      color="red"
      buffer-value="0"
      value="20"
      stream
    ></v-progress-linear>
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
                            <v-card class="mb-0 mt-0" :elevation="0">
                              <div class="text-center">
                                <v-dialog
                                  v-model="dialog"
                                  hide-overlay
                                  persistent
                                  width="300"
                                >
                                  <v-card color="primary" dark>
                                    <v-card-text>
                                      Upload In progress
                                      <v-progress-linear
                                        indeterminate
                                        color="white"
                                        class="mb-0"
                                      ></v-progress-linear>
                                    </v-card-text>
                                  </v-card>
                                </v-dialog>
                              </div>

                              <v-row>
                                <v-col cols="12" sm="10">
                                  <h2 class="name_heading ml-5">
                                    Select Caller Tune
                                  </h2>
                                </v-col>
                              </v-row>
                               <v-radio-group v-model="radioGroup">
                              <v-card
                                color="transparent"
                                outlined
                                class="mt-0 pl-6"
                                max-width="1069"
                                v-for="greeting in Greetings"
                                :key="greeting.id"
                              >
                                <v-row align="center" justify="center">
                                  <v-col cols="12" sm="4">
                                    <v-radio :value="greeting.id">
                                      <span
                                        slot="label"
                                        class="black--text ml-3"
                                        >{{ greeting.title }}</span
                                      >
                                    </v-radio>
                                  </v-col>
                                  <v-col cols="12" sm="5">
                                    <audio controls>
                                      <source
                                        :src="greeting.Audio"
                                        type="audio/mpeg"
                                      />
                                      Your browser does not support the audio
                                      tag.
                                    </audio>
                                  </v-col>
                                  <v-col cols="12" sm="3" align="end">
                                    <v-menu offset-y>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-icon
                                          v-bind="attrs"
                                          v-on="on"
                                          color="black"
                                          >mdi-dots-vertical</v-icon
                                        >
                                      </template>
                                      <v-list>
                                        <v-list-item
                                          v-for="(m, index) in more"
                                          :key="index"
                                          active-class="pink--text"
                                        >
                                          <v-list-item-title
                                            :class="m.color"
                                            @click="dialog2 = true"
                                            >{{ m.text }}</v-list-item-title
                                          >
                                        </v-list-item>
                                      </v-list>
                                    </v-menu>
                                  </v-col>
                                </v-row>
                              </v-card>
                               </v-radio-group>
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

        <v-dialog   
        v-model="dialog2" 
        max-width="332px"
      >
        <v-card class="rounded-lg pt-7 pb-7">
          <v-card-title class="d-flex justify-center ">
           <h3 class="center">Rename Media</h3>
          
          </v-card-title>
          <v-card-text class="pt-0 ">
            <p align="center"  class=" pb-10">mcwaw.mp3</p>
          <v-text-field
            label="Media Title"
            outlined
          ></v-text-field>
          </v-card-text>
     

          <v-card-actions>
               <v-btn color="red"
                          text
                          class=" ma-2 text-capitalize   rounded-pill p-3 red_button_outline" min-width="140px"
                           @click="dialog2 = false"
                        
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          class="text-capitalize  ma-3 rounded-pill red_button"  min-width="140px"
                          color="white"  outlined 
                        >
                          Submit
                        </v-btn>
                       
                      </v-card-actions>
        </v-card>
      </v-dialog>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  components: {},
  created() {},
  data: () => ({
    dialog: false,
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
    Greetings: [
      {
        id: 1,
        title: "Caller Tone 1",
        Audio: "uri",
      },
      {
        id: 2,
        title: "Caller Tone 2",
        Audio: "uri",
      },
      {
        id: 3,
        title: "Caller Tone 3",
        Audio: "uri",
      },
    ],
    more: [
      {
        text: "Rename File",
        disabled: false,
        href: "",
        color: "black--text",
      },
       {
        text: "Delete File",
        disabled: false,
        href: "Dashboard",
        color: "red--text",
      },
    ],
    items: [
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
        text: "Caller Tune",
        disabled: true,
        to: { name: "Caller Tune" },
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
    goBack() {
      this.$router.push("/CallFlowSettings");
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

