<template>
  <v-app>
    <v-container fluid>
      <!-- <v-snackbar :timeout="timeout" v-model="contacts_added" :bottom="bottom" :right="right" color="green" text>
        Contacts
        added successfully!</v-snackbar>
      <v-snackbar :timeout="timeout" v-model="contacts_removed" :bottom="bottom" :right="right" color="red" text>
        Contact
        removed successfully!</v-snackbar> -->

      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12">
              <div class="ml-3">
                <v-row>
                  <v-col cols="12" sm="5">
                    <h2 class="mt-0 mb-5">Contacts</h2>
                  </v-col>
                  <v-col cols="12" sm="7" align="end" class="pt-6">
                    <v-text-field
                      v-show="!hidden"
                      absolute
                      transition="slide-y-reverse-transition"
                      append-icon="mdi-magnify"
                      class="searchForm"
                      label="Search"
                      style="right: 153px"
                      v-model="searchTerm"
                      @input="updateSearchTerm"
                      single-line
                    ></v-text-field>
                    <v-icon
                      class="mt-0 mb-5 mr-4"
                      color="black"
                      @click="hidden = !hidden"
                    >
                      mdi-magnify</v-icon
                    >
                    <v-menu
                      v-model="filtermenu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <span class="pr-7">
                          <v-icon
                            class="mt-0 mb-5 mr-4"
                            color="black"
                            :disabled="dialog"
                            @click="threeDotAction('add_contact', '')"
                            :loading="dialog"
                            >mdi-plus</v-icon
                          >
                          <v-badge v-if="showBadge == true" dot overlap>
                            <v-icon
                              class="mt-0 mb-5 mr-0"
                              color="black"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-filter-variant
                            </v-icon>
                          </v-badge>
                          <span v-if="showBadge == false" overlap>
                            <v-icon
                              class="mt-0 mb-5 mr-0"
                              color="black"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-filter-variant
                            </v-icon>
                          </span>
                        </span>
                      </template>
                    </v-menu>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>

          <v-card elevation="0">
            <v-tabs v-model="tab" centered outline>
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1"> My Contacts </v-tab>

              <v-tab href="#tab-2"> Organisation Contacts </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-2">
                <v-card flat elevation="0">
                  <div id="layoutCallLog">
                    <v-expansion-panels
                      accordion
                      flat
                      v-if="
                        organisationContacts && organisationContacts.length > 0
                      "
                    >
                      <v-expansion-panel
                        v-for="organisationContact in organisationContacts"
                        :key="organisationContact.Name"
                      >
                        <v-expansion-panel-header expand-icon="">
                          <v-row
                            class="d-flex align-center justify-center"
                            align-content="center"
                            justify="center"
                          >
                            <v-col cols="12" sm="10">
                              <h3 class="f16 nunito-font regular">
                                <div
                                  class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5 text-uppercase"
                                  style="width: 30px; text-align: center"
                                >
                                  <span
                                    v-html="organisationContact.ContactInitial"
                                  ></span>
                                </div>
                                <span
                                  v-html="organisationContact.ContactName"
                                ></span>
                              </h3>
                            </v-col>
                            <v-col cols="12" sm="2" align="right">
                              <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon v-bind="attrs" v-on="on" color="black"
                                    >mdi-dots-vertical
                                  </v-icon>
                                </template>

                                <v-list>
                                  <v-list-item
                                    v-for="(item, index) in items"
                                    :key="index"
                                    active-class="pink--text"
                                  >
                                    <v-list-item-title
                                      :class="item.color"
                                      @click="
                                        threeDotAction(
                                          item.url,
                                          organisationContact.ContactName,
                                          organisationContact.ContactNumber
                                        )
                                      "
                                    >
                                      {{ item.title }}
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <div class="row">
                            <div class="col-12 pl-15">
                              <h6 class="font-weight-thin">Caller Number</h6>

                              <h5 class="font-weight-light">
                                +91 {{ organisationContact.ContactNumber }}
                              </h5>
                            </div>
                          </div>
                        </v-expansion-panel-content>
                        <div class="row">
                          <div class="col-12 pl-80 pr-45">
                            <v-divider></v-divider>
                          </div>
                        </div>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-expansion-panels v-else class="mt-5">
                      <div v-if="organisationContact==0">
                        <v-alert dense outlined type="error">
                        <h4 class="f16">No result found!</h4>
                        
                      </v-alert>
                      </div>
                      <div v-else>

                      <v-alert dense outlined type="error">
                        <h4 class="f16">No contacts found!</h4>
                        <p class="mb-0 pb-0 black--text" color="black">
                          There are no saved contacts. Please
                          <a href="#">Sync your phone contacts </a>or
                          <a href="#"> add a new contact.</a>
                        </p>
                      </v-alert>
                      </div>

                    </v-expansion-panels>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item value="tab-1">
                <v-card flat elevation="0">
                  <div id="layoutCallLog">
                    <v-expansion-panels
                      accordion
                      flat
                      v-if="userContacts && userContacts.length > 0"
                    >
                      <v-expansion-panel
                        v-for="userContact in userContacts"
                        :key="userContact.Name"
                      >
                        <v-expansion-panel-header expand-icon="">
                          <v-row
                            class="d-flex align-center justify-center"
                            align-content="center"
                            justify="center"
                          >
                            <v-col cols="12" sm="10">
                              <h3 class="f16 nunito-font regular">
                                <div
                                  class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5 text-uppercase"
                                  style="width: 30px; text-align: center"
                                >
                                  <span
                                    v-html="userContact.ContactInitial"
                                  ></span>
                                </div>
                                <span v-html="userContact.ContactName"></span>
                              </h3>
                            </v-col>
                            <v-col cols="12" sm="2" align="right">
                              <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon v-bind="attrs" v-on="on" color="black"
                                    >mdi-dots-vertical
                                  </v-icon>
                                </template>

                                <v-list>
                                  <v-list-item
                                    v-for="(item, index) in items"
                                    :key="index"
                                    active-class="pink--text"
                                  >
                                    <v-list-item-title
                                      :class="item.color"
                                      @click="
                                        threeDotAction(
                                          item.url,
                                          userContact.ContactName,
                                          userContact.ContactNumber
                                        )
                                      "
                                    >
                                      {{ item.title }}
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <div class="row">
                            <div class="col-12 pl-15">
                              <h6 class="font-weight-thin">Caller Number</h6>

                              <h5 class="font-weight-light">
                                +91 {{ userContact.ContactNumber }}
                              </h5>
                            </div>
                          </div>
                        </v-expansion-panel-content>
                        <div class="row">
                          <div class="col-12 pl-80 pr-45">
                            <v-divider></v-divider>
                          </div>
                        </div>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-expansion-panels v-else class="mt-5">
                      <div v-if="userContact==0">
                        <v-alert dense outlined type="error">
                        <h4 class="f16">No result found!</h4>
                        
                      </v-alert>
                      </div>
                      <div v-else>

                      <v-alert dense outlined type="error">
                        <h4 class="f16">No contacts found!</h4>
                        <p class="mb-0 pb-0 black--text" color="black">
                          There are no saved contacts. Please
                          <a href="#">Sync your phone contacts </a>or
                          <a href="#"> add a new contact.</a>
                        </p>
                      </v-alert>
                      </div>

                    </v-expansion-panels>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">{{ contact_text }}</h3>
        </v-card-title>
        <v-card-text class="pt-0 pb-0 mb-0">
          <v-text-field label="Name" outlined v-model="name"></v-text-field>

          <v-text-field
            label="Mobile Number*"
            outlined
            v-model="number"
          ></v-text-field>
          <v-checkbox class="pb-0 mb-0" v-model="SyncOrganisation"   @change="checkboxUpdated" label="Add to Organaization contact" value="1"></v-checkbox>
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
            @click="saveNow()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persistent max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Are you Sure!</h3>
        </v-card-title>
        <v-card-body>
          <h4 class="mb-3 mt-3 text-center">
            Do you want to delete this contact?
          </h4>
        </v-card-body>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="proceed(0)"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="proceed(1)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
import axios from "axios";
export default {
  components: {},
  data: () => ({
    number: "",
    name: "",
    dialog: false,
    dialog2: false,
    dialogDelete: false,
    showBadge: false,
    removeReminder: false,
    searchForm: false,
    benched: 0,
    hidden: true,
    filtermenu: false,
    sendInviteLoader: false,
    changeEmailPopup: false,
    enterOtpModel: false,
    loadingMore: false,
    searchTerm: "",
    contact_text: "",
    tab: null,
    searchObject: "",
    userContacts: false,
    organisationContacts: false,
    syncOrganisation:false,
    // contactName:"",
    // contactNumber:"",
    items: [
      { title: "Edit Contact", color: "black--text", url: "edit_contact" },
      { title: "Delete Contact", color: "red--text", url: "delete_contact" },
    ],
  }),

  mounted() {
    this.syncContents();
  },
  methods: {
    async syncContents() {
      let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
      const owneruid =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.uid
          : localStorageUserObj.OwnerUid;
      this.AccountId =
        localStorageUserObj.role == "OWNER"
          ? localStorageUserObj.AccountId
          : localStorageUserObj.OwnerAccountId;
      // console.log(owneruid)
      this.owneruid = owneruid;
      this.uid = localStorageUserObj.uid;
      await db
        .collection("UserContacts")
        .where("Uid", "==", owneruid)
        .get()
        .then(async (querySnapshot) => {
          console.log(querySnapshot);
          this.userContacts = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              let contact = doc.data();
              this.contact = contact;
              // console.log(contact)
              this.userContactsObject = Object.assign(
                {},
                this.userContactsObject,
                {
                  ContactName: contact.Name,
                  ContactInitial: contact.Name.charAt(0),
                  ContactNumber: contact.Number,
                }
              );
              this.userContacts.push(this.userContactsObject);
            });
            const LocalContacts = JSON.stringify(this.userContacts);

            console.log(LocalContacts);
            localStorage.setItem("ContactLocal", LocalContacts);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

      db.collection("OrganisationContacts")
        .where("OrganisationUid", "==", owneruid)
        .get()
        .then(async (querySnapshot) => {
          console.log(querySnapshot);
          this.organisationContacts = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              let contact = doc.data();
              this.contact = contact;
              // console.log(contact)
              this.organisationContactsObject = Object.assign(
                {},
                this.organisationContactsObject,
                {
                  ContactName: contact.Name,
                  ContactInitial: contact.Name.charAt(0),
                  ContactNumber: contact.Number,
                }
              );
              this.organisationContacts.push(this.organisationContactsObject);

              // var docs =  querySnapshot.docs.map(JSON.decode(JSON.encode(doc.data())));
            });
            const LocalContactsOrganizationJson = JSON.stringify(
              this.organisationContacts
            );

            console.log(LocalContactsOrganizationJson);
            localStorage.setItem(
              "organizationContactLocal",
              LocalContactsOrganizationJson
            );

            // window.localStorage.setItem("organizationContactLocal", JSON.stringify(LocalContactsOrganizationJson));
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    checkboxUpdated(newValue) {
      console.log(newValue);
      this.syncOrganisation = newValue==null?false:true;
    },
    searchAction() {
      this.hidden = !this.hidden;

    },
    proceed(e) {
      if (e == 1) {
        console.log("proceed");

        const details = {
          url: this.$cloudfareApi + "/contact/user",
          method: "Delete",
          headers: { token: localStorage.getItem("token") },
          data: {
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Number: this.number,
          },
        };

        // const details = {
        //   url: this.$cloudfareApi + "/contact/organisation",
        //   method: "Delete",
        //   headers: { token: localStorage.getItem("token") },
        //   data: {
        //     OwnerUid: this.owneruid,
        //     Uid: this.uid,
        //     UpdatedBy: this.uid,
        //     Number: this.number,
        //   },
        // };
        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.contacts_removed = true;
            this.dialog2 = false;
            this.dialogDelete = false;
            this.syncContents();
          }
        });
      } else {
        console.log("cancel");
        this.dialogDelete = false;
      }
    },

    updateSearchTerm() {
if(this.searchTerm){

      console.log(this.searchTerm);
      var searchObject = [];
      var searchObjectUser = [];
      var json = JSON.parse(localStorage.getItem("organizationContactLocal"));
      const searchTerm = this.searchTerm.toLowerCase();

      // Finding search object
      searchObject = json.filter(
        (Contact) =>
          Contact.ContactName.toLowerCase().indexOf(searchTerm) !== -1
      );
      let strData = JSON.stringify(searchObject);
      var OrganizationContactsData = strData.replace(
        new RegExp(this.searchTerm, "gi"),
        (match) => {
          return "<mark>" + match + "</mark>";
        }
      );
      // console.log(dd);
      this.organisationContacts.length = 0;
      this.organisationContacts = JSON.parse(OrganizationContactsData);
      // Search data contacts =====================================================
      console.log(this.searchTerm);
      var jsonContacts = JSON.parse(localStorage.getItem("ContactLocal"));

      // Finding search object
      searchObjectUser = jsonContacts.filter(
        (Contact) =>
          Contact.ContactName.toLowerCase().indexOf(searchTerm) !== -1
      );
      console.log(searchObjectUser.length);
      if ( searchObjectUser.length == 0) {
        this.userContact=0;
        this.organisationContacts=0;
      }else{
        // this.syncContents();

        this.userContacts = [];
        this.organisationContacts = [];
      }

      let strDataUser = JSON.stringify(searchObjectUser);
      var UserContactsData = strDataUser.replace(
        new RegExp(this.searchTerm, "gi"),
        (match) => {
          return "<mark>" + match + "</mark>";
        }
      );
      // console.log(dd);
      this.userContacts.length = 0;
      this.userContacts = JSON.parse(UserContactsData);
}else{
      this.syncContents();
  
}
    },
    threeDotAction(url, contactName, contactNumber) {
      if (url == "edit_contact") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.name = contactName;
        this.number = contactNumber;
        this.contact_text = "Edit Contact";
      }
      if (url == "add_contact") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.name = contactName;
        this.number = contactNumber;
        this.contact_text = "Add a New Contact";
      }
      if (url == "delete_contact") {
        this.dialog = false;
        this.dialog2 = false;
        this.name = contactName;
        this.number = contactNumber;
        this.dialogDelete = true;
      }
    },

    saveNow() {
      if (this.syncOrganisation == false) {
        const details = {
          url: this.$cloudfareApi + "/contact/user",
          method: "POST",
          headers: { token: localStorage.getItem("token") },
          data: {
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Name: this.name,
            Number: this.number,
            SyncOrganisation: this.syncOrganisation,
          },
        };
        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.contacts_added = true;
            this.dialog2 = false;
            this.syncContents();
          }
        });
      } else {
        const details = {
          url: this.$cloudfareApi + "/contact/organisation",
          method: "POST",
          headers: { token: localStorage.getItem("token") },
          data: {
            OrganisationUid: this.owneruid,
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Name: this.name,
            Number: this.number,
            SyncOrganisation: this.syncOrganisation,
          },
        };
        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.contacts_added = true;
            this.dialog2 = false;
            this.syncContents();
          }
        });
      }
    },
  },
};
</script>
