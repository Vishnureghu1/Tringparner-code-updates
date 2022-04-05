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
                        Caller ID
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
                                You'll see one of these numbers as Caller Id whie receiving calls from Tring Partner Business Number. Please save this number to your contact book for easlily identifying calls from your Business Number
                              </div>
                              <v-row no-gutters>
                                <v-col cols="4" sm="4">
                                  <v-card class="mx-auto center ml-5">
                                    <v-card-text class="pb-5" align="center">
                                      <h2 class="light4 pb-5" align="center">
                                        02235195219
                                      </h2>
                                      <v-btn icon>
                                        <v-icon color="red"
                                          >mdi-content-copy</v-icon
                                        >
                                      </v-btn>
                                      <label class="red--text" @click="CopyData()"
                                        >Copy Numebr to Clipboard</label
                                      >
                                       <input type="hidden" id="hidden-data" value="02235195219">

   
                                      <br />

                                      <v-btn icon>
                                        <v-icon color="red"
                                          >mdi-account-plus</v-icon
                                        >
                                      </v-btn>
                                      <label class="red--text"
                                        >Add to Contacts</label
                                      >
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="4" sm="4">
                                  <v-card class="mx-auto center ml-5">
                                    <v-card-text class="pb-5" align="center">
                                      <h2 class="light4 pb-5" align="center">
                                        02235195219
                                      </h2>
                                      <v-btn icon>
                                        <v-icon color="red" 
                                          >mdi-content-copy</v-icon
                                        >
                                      </v-btn>
                                      <label class="red--text"  @click="CopyData()"
                                        >Copy Numebr to Clipboard</label
                                      >
                                      <br />

                                      <v-btn icon>
                                        <v-icon color="red"
                                          >mdi-account-plus</v-icon
                                        >
                                      </v-btn>
                                      <label class="red--text"
                                        >Add to Contacts</label
                                      >
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                                <v-col cols="4" sm="4">
                                  <v-card class="mx-auto center ml-5">
                                    <v-card-text class="pb-5" align="center">
                                      <h2 class="light4 pb-5" align="center">
                                        02235195219
                                      </h2>
                                      <v-btn icon>
                                        <v-icon color="red"
                                          >mdi-content-copy</v-icon
                                        >
                                      </v-btn>
                                      <label class="red--text"  @click="CopyData()"
                                        >Copy Numebr to Clipboard</label
                                      >
                                      <br />

                                      <v-btn icon>
                                        <v-icon color="red"
                                          >mdi-account-plus</v-icon
                                        >
                                      </v-btn>
                                      <label class="red--text"
                                        >Add to Contacts</label
                                      >
                                    </v-card-text>
                                  </v-card>
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
     <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="red"
        dark
      >
        <v-card-text>
         Number copied successfully!
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
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
    dialog:false,
    ex4: false,
    isActive: true,
    e2: 1,
    repeatCallerSettings: false,

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
        text: "Caller ID",
        disabled: true,
        to: { name: "" },
      },
    ],
  }),
  computed: {
    isDisabled: function () {
      return this.ex4;
    },
  },   watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 1500)
      },
    },
  methods: {
   
        CopyData () {
          let copyData = document.querySelector('#hidden-data')
          copyData.setAttribute('type', 'text')    
          copyData.select()

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            if(msg=='successful'){

                this.dialog=true
            }
            else{

                this.dialog=false
            }

          } catch (err) {
            alert('Oops, unable to copy');
          }

          /* unselect the range */
          copyData.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        },
    goBack() {
      this.$router.push("/AccountInformation");
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

