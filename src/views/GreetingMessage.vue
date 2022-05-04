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
                        <v-icon
                          class="mr-2"
                          color="black"
                          @click="goBack(bussinessNumber)"
                          >mdi-arrow-left</v-icon
                        >
                        Greeting Message
                      </h2>
                      <v-breadcrumbs divider=">" class="breadcrumbs" :items="items">
                        <template v-slot:item="{ item }">
                          <router-link
                            style="text-decoration: none"
                            v-if="!item.disabled"
                            :to="item.route"
                          >
                            <v-breadcrumbs-item :disabled="item.disabled">
                              {{ item.text }}
                            </v-breadcrumbs-item>
                          </router-link>

                          <!-- <router-link style="text-decoration: none;" v-if="item.disabled" :to="item.route"> -->
                          <v-breadcrumbs-item
                            v-if="item.disabled"
                            :disabled="item.disabled"
                          >
                            {{ item.text }}
                          </v-breadcrumbs-item>
                          <!-- </router-link> -->
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
                        color="primary"
                        dark
                      >
                        + Upload Media
                      </v-btn>
                      <v-file-input
                        :rules="rules"
                        accept=".mp3, .wav"
                        placeholder="Choose file"
                        prepend-icon="mdi-music"
                        label="Upload File"
                        show-size
                        ref="myfile"
                        v-model="file"
                      ></v-file-input>
                      <v-progress-linear
                        color="primary "
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
                                  v-model="isProgressing"
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
                              <v-radio-group
                                v-model="radioGroup"
                                :mandatory="false"
                                v-on:change="
                                  $emit('greeting_message_changed', $event)
                                "
                              >
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
                                      <v-radio :value="greeting.AudioAccountId">
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
                                              @click="
                                                threeDotAction(m, greeting.id)
                                              "
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

        <!-- RENAME MEDIA SECTION -->
        <v-dialog v-model="renameDialog" max-width="332px">
          <v-card v-model="renameDialog" class="rounded-lg pt-7 pb-7">
            <v-card-title class="d-flex justify-center">
              <h3 class="center">Rename Media</h3>
            </v-card-title>
            <v-card-text class="pt-0">
              <p align="center" class="pb-10">{{ popupAudioName }}</p>
              <v-text-field
                v-model="newPopupAudioName"
                label="Media Title"
                :rules="audioNameRules"
                outlined
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="red"
                text
                class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
                min-width="140px"
                @click="renameDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                class="text-capitalize ma-3 rounded-pill red_button"
                min-width="140px"
                color="white"
                outlined
                @click="renameAudio(popupAudioId)"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- RENAME MEDIA SECTION -->

        <!-- DELETE MEDIA SECTION -->
        <v-dialog v-model="deleteDialog" max-width="332px">
          <v-card v-model="deleteDialog" class="rounded-lg pt-7 pb-7">
            <v-card-title class="d-flex justify-center">
              <h3 class="center">Delete Media</h3>
            </v-card-title>
            <v-card-text class="pt-0">
              <p align="center" class="pb-10">{{ popupAudioName }}</p>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="red"
                text
                class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
                min-width="140px"
                @click="deleteDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                class="text-capitalize ma-3 rounded-pill red_button"
                min-width="140px"
                color="white"
                outlined
                @click="deleteAudio(popupAudioId)"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- DELETE MEDIA SECTION -->
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
import firebase from "firebase";
export default {
  components: {},
  created() {
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.ownerUid =
      localStorageUserObj.role == "OWNER"
        ? localStorageUserObj.uid
        : localStorageUserObj.OwnerUid;
     this.AccountId=  (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    this.bussinessNumber = this.$route.query.bn;
    this.setBreadcrumbs(this.bussinessNumber);
    this.$on("greeting_message_changed", function (id) {
      console.log(
        `Event from parent component emitted ${this.bussinessNumber}`,
        id
      );
      const options = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/callDistribution/prompt",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          owner_uid: this.ownerUid,
          updated_by: this.ownerUid,
          virtual_number: this.bussinessNumber,
          prompt_type: "WelcomeMessage",
          prompt: id,
          AccountId: this.AccountId,
        },
      };
      console.log(options);
      this.$axios(options)
        .then((response) => {
          console.log(response.data);
          // this.newPopupAudioName = '';
          // this.greetingMessageAddedSnapshot();
          this.$root.vtoast.show({
            message: "Audio Updated Successfully!",
            color: "#07C421",
            timer: 2000,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
    this.getAllUserGreetingMessages(); //get all user audios
    db.collection("uservirtualNumber")
      .where("Uid", "==", this.ownerUid)
      .where("VirtualNumber", "==", parseInt(this.bussinessNumber))
      .get()
      .then(async (snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((element) => {
            console.log("element.data()", element.data());
            this.radioGroup = element.data().WelcomeMessage;
          });
        } else {
          console.log("uservirtualNumber empty");
        }
      });
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

    ],
    valid: false,
    stepForm: [],
    Greetings: [],
    more: [
      {
        text: "Rename File",
        disabled: false,
        href: "",
        color: "black--text",
        actionSlug: "RENAME_FILE",
      },
      {
        text: "Delete File",
        disabled: false,
        href: "Dashboard",
        color: "primary--text",
        actionSlug: "DELETE_FILE",
      },
    ],
    items: [],
    uploadedValue: 0, //uploaded content %
    file: null, //uploaded file ref
    radioGroup: "", //radiogroup def state
    rules: [
      (value) =>
        !value ||
        value.size < 5000000 ||
        "Audio size should be less than 5 MB!", //upload file rules
    ],
    isProgressing: false, //upload progressbar
    isActiveUploadBtn: false, //upload button default state
    ownerUid: "", //OWNER UID
    AccountId: "",
    uploadCount: 0, //number of uploaded files
    deleteDialog: false,
    renameDialog: false,
    popupAudioName: "",
    popupAudioId: "",
    newPopupAudioName: "",
    audioNameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 3 || "Name must be greate than 3 characters",
    ],
    bussinessNumber: "",
  }),
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 4000);
    },
  },
  methods: {
    setBreadcrumbs(bussinessNumber) {
      this.items = [
        {
          text: "Business Numbers",
          disabled: false,
          to: { name: "BusinessNumber" },
          href: `BusinessNumber?bn=`,
          route: { name: "BusinessNumber", query: {} },
        },
        {
          text: "Call Flow Settings",
          disabled: false,
          to: { name: "CallFlowSettings", query: { ...{ bn: 1111111 } } },
          href: `CallFlowSettings?bn=`,
          route: { name: "CallFlowSettings", query: { bn: [bussinessNumber] } },
        },
        {
          text: "Greeting Message",
          disabled: true,
          to: { name: "GreetingMessage" },
          href: `GreetingMessage`,
          route: { name: "GreetingMessage", query: { bn: [bussinessNumber] } },
        },
      ];
    },
    goBack(bussinessNumber) {
      // this.$router.push("/CallFlowSettings?bn=" + bussinessNumber);
      // alert(bussinessNumber);
      let newQuery = { bn: bussinessNumber };
      this.$router.push({ path: "/CallFlowSettings", query: { ...newQuery } });
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
        .then(async (snapshot) => {
          if (!snapshot.empty) {
            snapshot.docs.forEach((element) => {
              this.Greetings.push({
                id: element.id,
                title: element.data().DisplayName,
                Audio: element.data().AudioUrl,
                AudioAccountId: element.data().AudioAccountId,
                DisplayName: element.data().DisplayName,
                RefName: element.data().RefName,
                Uid: element.data().Uid,
              });
              this.uploadCount++;
            });
          } else {
            console.log("snapshot empty");
          }
        });
    },
    uploadGreetingMessage() {
      if (this.file) {
        this.dialog = true;
        this.isProgressing = true;
        console.log("about to upload file");
        console.log(this.file);
        this.onUpload(this.file.name, this.file);
      } else {
        console.log("Select a file");
        this.$root.vtoast.show({
          message: "Please select a file for upload!",
          color: "red",
          timer: 2000,
        });
        console.log("ownerUid", this.ownerUid);
      }
    },
    onUpload(filename, file) {
      const storageRef = firebase
        .storage()
        .ref(
          `${this.ownerUid}-${this.uploadCount + 1}-${filename.split(".")[0]}`
        )
        .put(file);
      // const storageRef = firebase.storage().ref('File-name').put('xyz');
      storageRef.on(
        "state_changed",
        (snapshot) => {
          this.uploadedValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadedValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            console.log("uploaded file URL", url);
            this.isProgressing = false;
            this.file = null;
            this.$root.vtoast.show({
              message: "File upload successful!",
              color: "green",
              timer: 2000,
            });
            //snapshot listening for updates
            this.greetingMessageModifiedSnapshot();
            //snapshot listening for updates
          });
        }
      );
    },
    threeDotAction(m, greetingsId) {
      console.log("m.actionSlug", m.actionSlug);
      console.log("greetingsId", greetingsId);
      var audioObj = this.Greetings.filter(function (elem) {
        if (elem.id === greetingsId) return elem;
      });
      console.log(JSON.stringify(audioObj[0]));
      this.popupAudioId = audioObj[0].id;
      this.popupAudioName = audioObj[0].title;
      if (m.actionSlug == "RENAME_FILE") {
        console.log("trigger Rename");
        this.renameDialog = true;
      }
      if (m.actionSlug == "DELETE_FILE") {
        console.log("trigger Delete file");
        this.deleteDialog = true;
      }
      this.dialog2 = true;
    },
    async renameAudio(popupAudioId) {
      var audioObj = this.Greetings.filter(function (elem) {
        if (elem.id === popupAudioId) return elem;
      });
      console.log("audioObj", JSON.stringify(audioObj[0]));
      console.log("Greetings", this.Greetings);
      let audio = audioObj[0];
      console.log("audio", audio);
      console.log(`renaming audio ${popupAudioId}`);
      console.log(`renaming new Popup Audio Name ${this.newPopupAudioName}`);
      console.log(`renaming new Popup AudioAccountId ${audio.AudioAccountId}`);
      if (this.newPopupAudioName !== "") {
        this.renameDialog = false;
        // DisplayName

        // URL: https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/audio
        // METHOD: PUT
        // PAYLOAD: {updated_by:"" ,uid:"" ,AccountId:"",AudioAccountId:"",DisplayName:""}
        const options = {
          url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/audio",
          method: "PUT",
          data: {
            updated_by: this.ownerUid,
            uid: this.ownerUid,
            AccountId: this.AccountId,
            AudioAccountId: audio.AudioAccountId,
            DisplayName: this.newPopupAudioName,
          },
        };
        console.log(options);
        this.$axios(options)
          .then((response) => {
            console.log(response.data);
            this.newPopupAudioName = "";
            this.greetingMessageAddedSnapshot();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteAudio(popupAudioId) {
      var audioObj = this.Greetings.filter(function (elem) {
        if (elem.id === popupAudioId) return elem;
      });
      console.log("audioObj", JSON.stringify(audioObj[0]));
      console.log("Greetings", this.Greetings);
      let audio = audioObj[0];
      console.log("audio", audio);

      console.log(`deleting audio ${popupAudioId}`);
      this.deleteDialog = false;
      // URL: https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/audio
      // METHOD: DELETE
      // PAYLOAD: {updated_by:"" ,uid:"" ,AccountId:"",AudioAccountId:""}
      const options = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/audio",
        method: "DELETE",
        data: {
          updated_by: this.ownerUid,
          uid: this.ownerUid,
          AccountId: this.AccountId,
          AudioAccountId: audio.AudioAccountId,
        },
      };
      console.log(options);
      this.$axios(options)
        .then((response) => {
          console.log(response.data);
          this.newPopupAudioName = "";
          this.greetingMessageAddedSnapshot();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    greetingMessageModifiedSnapshot() {
      console.log("CALLING modified SNAPSHOT-------------------->");
      db.collection("UserAudio")
        .where("Uid", "==", this.ownerUid)
        // .orderBy("CreatedAt", "asc")
        // .get()
        // .then(async(snapshot) => {
        .onSnapshot(async (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            console.log("change", change.type);
            if (change.type == "modified") {
              console.log("New Audio: ", change.doc.data());
              this.Greetings.push({
                id: change.doc.id,
                title: change.doc.data().DisplayName,
                Audio: change.doc.data().AudioUrl,
                AudioAccountId: change.doc.data().AudioAccountId,
                DisplayName: change.doc.data().DisplayName,
                RefName: change.doc.data().RefName,
                Uid: change.doc.data().Uid,
              });
              this.uploadCount++;
            }
          });
        });
    },
    greetingMessageAddedSnapshot() {
      console.log("CALLING added SNAPSHOT-------------------->");
      this.Greetings = [];
      db.collection("UserAudio")
        .where("Uid", "==", this.ownerUid)
        .orderBy("CreatedAt", "asc")
        // .get()
        // .then(async(snapshot) => {
        .onSnapshot(async (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            console.log("change", change.type);
            if (change.type == "added") {
              console.log("New Audio: ", change.doc.data());
              this.Greetings.push({
                id: change.doc.id,
                title: change.doc.data().DisplayName,
                Audio: change.doc.data().AudioUrl,
                AudioAccountId: change.doc.data().AudioAccountId,
                DisplayName: change.doc.data().DisplayName,
                RefName: change.doc.data().RefName,
                Uid: change.doc.data().Uid,
              });
              this.uploadCount++;
            }
          });
        });
    },
  },
};
</script>
