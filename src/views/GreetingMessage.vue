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
                        Greeting Message
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
                        Configure to play pre-recorded audio clips while put on
                        hold. Select any clip from below or add a new media.
                      </h2>
                    </v-col>
                    <v-col cols="10" sm="3">
                      <v-btn
                        :disabled="isActiveUploadBtn"
                        :loading="dialog"
                        @click="uploadGreetingMessage()"
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
                        show-size
                        ref="myfile" 
                        v-model="file"
                      ></v-file-input>
                      <v-progress-linear
                        color="red darken-1 "
                        buffer-value="0"
                        height="35"
                        :value="uploadedValue"
                        striped
                        v-show="isProgressing"
                      ></v-progress-linear>
                      <v-progress-linear
                        color="red"
                        buffer-value="0"
                        :value="uploadedValue"
                        stream
                        v-show="isProgressing"
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
                                    Select Greeting Message
                                  </h2>
                                </v-col>
                              </v-row>
                              <v-radio-group v-model="radioGroup" 
                              :mandatory="false" 
                              v-on:change="$emit('greeting_message_changed', $event)">
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

        <v-dialog v-model="dialog2" max-width="332px">
          <v-card class="rounded-lg pt-7 pb-7">
            <v-card-title class="d-flex justify-center">
              <h3 class="center">Rename Media</h3>
            </v-card-title>
            <v-card-text class="pt-0">
              <p align="center" class="pb-10">mcwaw.mp3</p>
              <v-text-field label="Media Title" outlined></v-text-field>
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
      </v-container>
    </div>
  </v-app>
</template>

<script>

import { db } from "@/main.js";
import firebase from 'firebase';

export default {
  components: {},
  created() {
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.ownerUid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;

    this.$on('greeting_message_changed', function(id){
      console.log('Event from parent component emitted', id)
    });

    this.getAllUserGreetingMessages(); //get all user audios
  },
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
        text: "Greeting Message",
        disabled: true,
        to: { name: "GreetingMessage" },
      },
    ],

    uploadedValue:0, //uploaded content %
    file:null, //uploaded file ref
    radioGroup: null, //radiogroup def state
    rules: [
      value => !value || value.size < 5000000 || 'Audio size should be less than 5 MB!', //upload file rules
    ],
    isProgressing: false, //upload progressbar
    isActiveUploadBtn: false, //upload button default state
    ownerUid: '', //OWNER UID
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
    getAllUserGreetingMessages() {

      // this.Greetings = [];

      db.collection("UserAudio")
      .where("Uid", "==", this.ownerUid)
      .orderBy("CreatedAt", "asc")
      .get()
      .then(async(snapshot) => {

        if (!snapshot.empty) {

          snapshot.docs.forEach((element)=> {
            this.Greetings.push({
              id: element.id,
              title: element.data().DisplayName,
              Audio: element.data().AudioUrl
            })
          })
        } else {
          console.log('snapshot empty');
        }

      })
    },
    uploadGreetingMessage() {
      
        if(this.file) {

          this.dialog = true;
          this.isProgressing = true;

          console.log('about to upload file');
          console.log(this.file);

          this.onUpload(this.file.name, this.file);
        } else {
          console.log('Select a file');
          this.$root.vtoast.show({message: 'Please select a file for upload!', color: 'red', timer: 2000})
          console.log('ownerUid', this.ownerUid);
        }
    },
    onUpload(filename, file) {

      const storageRef = firebase.storage().ref(`${this.ownerUid}-2-${filename.split('.')[0]}`).put(file);
      // const storageRef = firebase.storage().ref('File-name').put('xyz');

      storageRef.on('state_changed', snapshot => {
        this.uploadedValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error => {
        console.log(error.message);
      },
      () => {
        this.uploadedValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          console.log('uploaded file URL', url);
          this.isProgressing = false;
          this.file = null;
          this.$root.vtoast.show({message: 'File upload successful!', color: 'green', timer: 2000})
        })
      }

      );

    }
  },
};
</script>

