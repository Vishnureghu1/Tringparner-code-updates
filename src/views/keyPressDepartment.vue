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
                                                <v-icon class="mr-2" color="black" @click="goBack(bussinessNumber)">
                                                    mdi-arrow-left</v-icon>
                                                {{ pageTitle }}
                                            </h2>
                                            <v-breadcrumbs divider=">" class="breadcrumbs" :items="items">
                                                <template v-slot:item="{ item }">
                                                    <router-link style="text-decoration: none" v-if="!item.disabled"
                                                        :to="item.route">
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
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0" align="center" justify="center">
                                        <v-col cols="12" sm="10">
                                            <h2 class="comment_heading ml-5">
                                                Configure {{ pageTitle }}.
                                            </h2>
                                        </v-col>
                                        <v-col cols="10" sm="2" >
<v-switch @click="disableEnable()"
      v-model="enableDisable"
      :label="` `"
    ></v-switch>
    <span v-if="enableDisable==true" class="center" >Enabled</span>
    <span v-else>Disabled</span>
                                            <!-- <v-btn @click="disableKey()" class="ma-2" color="primary" dark>
                                                Disable
                                            </v-btn>
                                            <v-btn @click="enableKey()" class="ma-2" color="success" dark>
                                                Enable
                                            </v-btn> -->

                                        </v-col>
                                    </v-row>
                                    <v-card color="transparent" outlined class="mt-5" max-width="1069">
                                        <v-layout>
                                            <v-flex xs12 sm12 md12>
                                                <v-row no-gutters>
                                                    <v-col cols="12">
                                                        <v-card class="mb-0 mt-0" :elevation="0">
                                                            <div class="text-center">
                                                                <v-dialog v-model="isProgressing" hide-overlay
                                                                    persistent width="300">
                                                                    <v-card color="primary" dark>
                                                                        <v-card-text>
                                                                            Upload In progress
                                                                            <v-progress-linear indeterminate
                                                                                color="white" class="mb-0">
                                                                            </v-progress-linear>
                                                                        </v-card-text>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </div>

                                                            <v-row>
                                                                <v-col cols="12" sm="10">
                                                                    <h2 class="name_heading ml-5">
                                                                        Key Press Department Selection
                                                                    </h2>


                                                                </v-col>
                                                            </v-row>



                                                            <v-col cols="12" class="ml-2">
                                                                <v-row>
                                                                    <v-col cols="8">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            <div v-if="isEditTitle==false ">

                                                                                <span v-if="departmentTitle">{{departmentTitle}}</span><span v-else>Department Title *</span>
                                                                            </div><div v-if="isEditTitle==true">    <v-text-field
      label="Department Title" class="pt-0 mt-0"
     :value="departmentTitle"
      single-line
      full-width
      hide-details
    ></v-text-field>
</div>
                                                                        </h2>
                                                                        
                                                                    </v-col>
                                                                    <v-col cols="4" align="end">
                                                                        <!-- <router-link :to="{ name: 'CallRouting' }"> -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25" @click="toggleEditTitle">
                                                                                mdi-pencil</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                                   <v-row>
                                                                    <v-col cols="6">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            Select Agents
                                                                        </h2>
                                                                        <h2 class="comment_heading mt-1 mb-5 mr-7">
                                                                            Manage how you will get notifications for
                                                                            each type of event on your Virtual Number
                                                                        </h2>
                                                                    </v-col>
                                                                    <v-col cols="6" align="end">
                                                                        <!-- <router-link :to="{ name: 'CallRouting' }"> -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25" @click="callRouting()">
                                                                                mdi-arrow-right</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                                <v-row>
                                                                    <v-col cols="6">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            Call Routing Settings
                                                                        </h2>
                                                                        <h2 class="comment_heading mt-1 mb-5 mr-7">
                                                                            Configure how incoming calls are redirected
                                                                            between your agents.
                                                                        </h2>
                                                                    </v-col>
                                                                    <v-col cols="6" align="end">
                                                                        <!-- <router-link :to="{ name: 'CallRouting' }"> -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25" @click="callRouting()">
                                                                                mdi-arrow-right</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                                <v-row>
                                                                    <v-col cols="6">
                                                                        <h2 class="name_heading mt-4 mr-7">
                                                                            Missed Call Distribution
                                                                        </h2>
                                                                        <h2 class="comment_heading mt-1 mb-5 mr-7">
                                                                            Configure how missed calls are managed
                                                                            between
                                                                            your agents.
                                                                        </h2>
                                                                    </v-col>
                                                                    <v-col cols="6" align="end">
                                                                        <!-- <router-link
                                  :to="{ name: 'MissedCallDistribution' }"
                                > -->
                                                                        <span>
                                                                            <v-icon class="mt-6 mb-5 mr-7"
                                                                                color="#EE1C25"
                                                                                @click="missedcallRouting()">
                                                                                mdi-arrow-right</v-icon>
                                                                        </span>
                                                                        <!-- </router-link> -->
                                                                    </v-col>
                                                                </v-row>
                                                                <v-divider></v-divider>
                                                            </v-col>


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
                            <v-text-field v-model="newPopupAudioName" label="Media Title" :rules="audioNameRules"
                                outlined></v-text-field>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="red" text class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
                                min-width="140px" @click="renameDialog = false">
                                Cancel
                            </v-btn>
                            <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px"
                                color="white" outlined @click="renameAudio(popupAudioId)">
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
                            <v-btn color="red" text class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
                                min-width="140px" @click="deleteDialog = false">
                                Cancel
                            </v-btn>
                            <v-btn text class="text-capitalize ma-3 rounded-pill red_button" min-width="140px"
                                color="white" outlined @click="deleteAudio(popupAudioId)">
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
import axios from "axios";
// import firebase from "firebase";
export default {
    components: {},
    created() {
        let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
        this.ownerUid =
            localStorageUserObj.role == "OWNER"
                ? localStorageUserObj.uid
                : localStorageUserObj.OwnerUid;
        this.AccountId =
            localStorageUserObj.role == "OWNER"
                ? localStorageUserObj.AccountId
                : localStorageUserObj.OwnerAccountId;
        this.bussinessNumber = this.$route.query.bn;
        this.key = this.$route.query.key;
        this.uid= localStorageUserObj.uid;
        if (this.key == 'intro') {
            this.pageTitle = 'Introduction and Departments Audio';
        } else if (this.key == 'nokeypress') {
            this.pageTitle = 'No Keypress Audio';

        } else if (this.key == 'wrongkeypress') {
            this.pageTitle = 'Wrong Keypress Audio';

        } else {
            this.pageTitle = 'Keypress ' + this.key;

        }

        this.setBreadcrumbs(this.bussinessNumber);
        this.$on("greeting_message_changed", function (id) {
            console.log(
                `Event from parent component emitted ${this.bussinessNumber}`,
                id
            );

            this.dialog = true;
            this.isProgressing = true;

            const options = {
                url: this.$cloudfareApi + "/callDistribution/prompt",
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
            axios(options)
                .then((response) => {
                    console.log(response.data);
                    // this.newPopupAudioName = '';
                    // this.greetingMessageAddedSnapshot();
                    this.$root.vtoast.show({
                        message: "Audio Updated Successfully!",
                        color: "#07C421",
                        timer: 2000,
                    });
                    this.dialog = false;
                    this.isProgressing = false;
                })
                .catch((error) => {
                    console.error(error);
                });
        });
        // this.getAllUserGreetingMessages(); //get all user audios
        db.collection("uservirtualNumber")
            .where("Uid", "==", this.ownerUid)
            .where("VirtualNumber", "==", parseInt(this.bussinessNumber))
            .get()
            .then(async (snapshot) => {
                if (!snapshot.empty) {
                    snapshot.docs.forEach((element) => {
                        console.log("element.data()", element.data());
                        this.departmentTitle = element.data().Ivr[this.key.toString()].Source,
                        this.enableDisable = element.data().Ivr[this.key.toString()].IsActive,
                        this.radioGroup = element.data().WelcomeMessage;
                    });
                } else {
                    console.log("uservirtualNumber empty");
                }
            });
    },
    data: () => ({
        key:"",
        departmentTitle:"",
        dialog: false,
        dialog2: false,
        isActive: true,
        pageTitle: '',
        e2: 1,
        uid:"",
        repeatCallerSettings: false,
        curr: 1,
        lastStep: 4,
        enableDisable:false,
        dptTitle:false,
        dptHead:true,
        isEditTitle:false,
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
        toggleEditTitle(){
               this.isEditTitle = !this.isEditTitle;

        },
        disableEnable(){
        //   console.log("enableDisable",this.enableDisable)
              const details = {
						url: this.$cloudfareApi + '/callDistribution/ivr/status',
						method: 'POST',
            headers:{"token":localStorage.getItem("token")},
					data: {
                    owner_uid: this.ownerUid,
                    updated_by: this.uid,
                    virtual_number: this.bussinessNumber,
                    AccountId: this.AccountId,
                    IsIvr: this.enableDisable,
                    key:this.key
                },
					}      
					axios(details)
						.then((response) => {
                            console.log(response)
                     this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 2000});
						})
						.catch((error) => {
							console.error(error);
						})
        },
    //       callRouting() {
    //   // const getNumber =  Object.keys(this.$route.query)[0]
    //   this.$router.push("/CallPreference?bn=" + this.bussinessNumber);
    // },

    // IVRandcallRouting() {
    //   this.$router.push("/IVRandCallRouting?bn=" + this.bussinessNumber);
    // },
    // MissedCallRouting() {
    //   // const getNumber =  Object.keys(this.$route.query)[0]
    //   this.$router.push("/MissedCallDistribution?bn=" + this.bussinessNumber);
    // },
        triggerUnselectAudio(greetingAudioAccountId) {
            console.log("triggerUnselectAudio", greetingAudioAccountId);
            this.dialog = true;
            this.isProgressing = true;
            // RESET AUDIO
            const options = {
                url: this.$cloudfareApi + "/callDistribution/prompt",
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
                    prompt: "",
                    AccountId: this.AccountId,
                },
            };
            console.log(options);
            axios(options)
                .then((response) => {
                    console.log(response.data);
                    // this.newPopupAudioName = '';
                    // this.greetingMessageAddedSnapshot();
                    this.$root.vtoast.show({
                        message: "Audio Updated Successfully!",
                        color: "#07C421",
                        timer: 2000,
                    });
                    this.radioGroup = "";
                    this.dialog = false;
                    this.isProgressing = false;
                })
                .catch((error) => {
                    console.error(error);
                });
            // RESET AUDIO
        },
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
                    text: "Call and IVR Configuration",
                    disabled: false,
                    to: { name: "CallandIVRConfig", query: { ...{ bn: 1111111 } } },
                    href: `CallandIVRConfig?bn=`,
                    route: { name: "CallandIVRConfig", query: { bn: [bussinessNumber] } },
                },
                {
                    text: "IVR and Call Routing",
                    disabled: false,
                    to: { name: "IVRandCallRouting", query: { ...{ bn: 1111111 } } },
                    href: `IVRandCallRouting?bn=`,
                    route: {
                        name: "IVRandCallRouting",
                        query: { bn: [bussinessNumber] },
                    },
                },
                {
                    text: this.pageTitle,
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

        callRouting(){
         this.$router.push("/IvrCallPreference?key=" + this.key + "&bn=" + this.bussinessNumber);
        },
         missedcallRouting(){
         this.$router.push("/IvrMissedCallDistribution?key=" + this.key + "&bn=" + this.bussinessNumber);
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
                    url: this.$cloudfareApi + "/audio",
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
                url: this.$cloudfareApi + "/audio",
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
