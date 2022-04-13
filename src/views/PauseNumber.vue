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
                        <v-icon class="mr-2" color="black" @click="goBack(bussinessNumber)"
                          >mdi-arrow-left</v-icon
                        >
                        Pause Virtual Numeber
                      </h2>

                      <!-- BREADCRUMBS SECTION -->
                      <v-breadcrumbs divider=">" class="breadcrumbs" :items="items">

                        <template v-slot:item="{ item }">
                          <router-link style="text-decoration: none;" v-if="!item.disabled" :to="item.route">
                            <v-breadcrumbs-item :disabled="item.disabled">
                              {{ item.text }}
                            </v-breadcrumbs-item>
                          </router-link>

                          <!-- <router-link style="text-decoration: none;" v-if="item.disabled" :to="item.route"> -->
                            <v-breadcrumbs-item v-if="item.disabled" :disabled="item.disabled">
                              {{ item.text }}
                            </v-breadcrumbs-item>
                          <!-- </router-link> -->

                        </template>

                      </v-breadcrumbs>
                      <!-- BREADCRUMBS SECTION -->
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
                        @click="submit(switch1,'toggle')"
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
                            {{pauseupto}}
                        </h2>
                      </v-col>
                      <v-col cols="12" sm="2" align="end">
                        <v-icon
            
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
                          @click="submit(selected)"
                        >
                        </v-checkbox>
                        <h2 class="comment_heading ml-16">
                         <p>Play an audio message to customers who call your Business number while the number is Temporarily paused.</p>
                        </h2>
                      </v-col>
                      <v-col cols="6" sm="4" align="end">
                        <v-btn
                          color="#EE1C25"
                          class="name_heading white--text text-capitalize mb-5"
                          @click="uploadGreetingMessage()"
                          >+ Upload Media</v-btn>

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
                      v-if="selected"
                      color="transparent"
                      outlined
                      class="mt-5 ml-14"
                      max-width="965"
                    >
                

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
                                  class="mt-5 mb-5"
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
                                  <v-divider></v-divider>
                                </v-card>
                              </v-radio-group>
                    </v-card>
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
        <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          
          <h3 class="center">Pause Virtual Number</h3>
        </v-card-title>
        <v-card-text class="pt-5">
             <!-- v-model =pauseTill -->
          <v-select v-model ="select" label="Pause Till" outlined  :items="pauseTill" item-text="date" item-value="time">
       
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
            @click="submit(true,'dropdown')"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
// import dateFormat from "dateformat";
import moment from "moment";
import axios from "axios";
import firebase from "firebase";
export default {
  components: {},
  created() {

        let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.ownerUid =
      localStorageUserObj.role == "OWNER"
        ? localStorageUserObj.uid
        : localStorageUserObj.OwnerUid;
    this.AccountId = localStorageUserObj.AccountId;
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
          prompt_type: "PausePrompt",
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
    // db.collection("uservirtualNumber")
    //   .where("Uid", "==", this.ownerUid)
    //   .where("VirtualNumber", "==", parseInt(this.bussinessNumber))
    //   .get()
    //   .then(async (snapshot) => {
    //     if (!snapshot.empty) {
    //       snapshot.docs.forEach((element) => {
    //         console.log("element.data()", element.data());
    //         this.radioGroup = element.data().PausePrompt;
    //       });
    //     } else {
    //       console.log("uservirtualNumber empty");
    //     }
    //   });
    this.setSelectedAudio();
    window.scrollTo(0, 0); //scroll to top

    this.bussinessNumber = this.$route.query.bn;
    this.setBreadcrumbs(this.bussinessNumber);


		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
     db.collection("uservirtualNumber").where("Uid","==",owneruid).where("VirtualNumber","==",parseInt(this.bussinessNumber)).get().then(async(snap) =>{
      // console.log(snap.docs[0].data().VirtualNumber)
      this.switch1 = snap.docs[0].data().IsPaused

      this.pauseupto = snap.docs[0].data().IsPaused?new Date(snap.docs[0].data().PauseUpto).toISOString() : new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime() - 1000*60).toISOString();

		}).catch((err)=>{
			console.log(err.message)
		})
   
  },
  data: () => ({
    dialog: false,
    dialog2: false,
    isActive: true,
    Greetings:[],
    pauseupto:"ndbjsh",
    select:"",
    uid:"",
    owneruid:"",

   
    pauseTill: [
      {date:"Today",time:(new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60)},
                {date:"Tomorrow",time:(new Date(new Date(moment().add(2, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60)},
    {date:"Day after Tommrrow",time:(new Date(new Date(moment().add(3, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60)}],
    switch1: false,
    selected: false,
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
        color: "red--text",
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

  methods: {
    setBreadcrumbs(bussinessNumber) {
      this.items = [
        {
          text: "More",
          disabled: false,
          route: { name: 'BusinessNumber', query: { }  }
        },
        {
          text: "Business Numbers",
          disabled: false,
          route: { name: 'BusinessNumber', query: { }  }
        },
        {
          text: "Call Flow Settings",
          disabled: false,
          route: { name: 'CallFlowSettings', query: { bn: [bussinessNumber]}  }
        },
        {
          text: "Pause Number",
          disabled: true,
          route: { name: 'PauseNumber', query: { bn: [bussinessNumber]}  }
        },
      ]
    },
    goBack(bussinessNumber) {
    
      let newQuery = {bn: bussinessNumber};
      this.$router.push({ path: '/CallFlowSettings', query: { ...newQuery } });
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
            this.setSelectedAudio();
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
          this.setSelectedAudio();
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
    setSelectedAudio() {
      db.collection("uservirtualNumber")
      .where("Uid", "==", this.ownerUid)
      .where("VirtualNumber", "==", parseInt(this.bussinessNumber))
      .get()
      .then(async (snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((element) => {
            console.log("element.data()", element.data());
            this.radioGroup = element.data().PausePrompt;
          });
        } else {
          console.log("uservirtualNumber empty");
        }
      });
    },
    submit(status,button){
      console.log('status', status);
      console.log('button', button);
      this.selected = status;

      // dateFormat(today, "yyyy-mm-dd");
       const pausevalue = (button == "toggle") ?(new Date(new Date(moment().add(1, 'day').format('YYYY-MM-DD')).getTime()) - 1000*60): this.select;
      //  console.log(button,pausevalue)
      this.pauseupto = new Date(pausevalue).toISOString()
      //  console.log("ddddddd",this.select,status,new Date(dateFormat(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}),"yyyy-mm-dd")).getTime());
      const details = {
						url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/callDistribution/pausenumber',
            // url:"http://localhost:3000/jp",
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
						data: {
						owner_uid:this.owneruid,
            updated_by:this.uid,
            virtual_number:this.bussinessNumber,
            AccountId:this.AccountId,
            IsPaused:status,
            PauseUpto:pausevalue
						},
					}
          
					axios(details)
						.then((response) => {
						console.log(response)
              this.dialog2 = false
						})
						.catch((error) => {
							console.error(error);
						})
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