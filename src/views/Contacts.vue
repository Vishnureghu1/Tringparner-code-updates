<template>
  <v-app>
    <v-container fluid>
      
        
        <v-snackbar v-if="status==true" :timeout="timeout" v-model="success" :bottom="bottom" :right="right" color="green" text>
         {{message}}</v-snackbar>
       
        
          <v-snackbar  v-if="status==false" :timeout="timeout" v-model="fail" :bottom="bottom" :right="right" color="red" text>
            {{message}}</v-snackbar>
        

        

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
                   
                    <!-- <span class="pr-7">
                          <v-icon
                            class="mt-0 mb-5 mr-4"
                            color="black"
                            :disabled="dialog"
                            @click="threeDotAction('add_contact', '')"
                            :loading="dialog"
                            >mdi-plus</v-icon
                          >
                          </span> -->

                          
                      <v-menu v-model="filtermenu" :close-on-content-click="false" :nudge-width="200" offset-x>
                        <template v-slot:activator="{ on, attrs }">
                          <span class="pr-7">
                            <v-icon
                      class="mt-0 mb-5 mr-4"
                      color="black"
                      @click="hidden = !hidden"
                    >
                      mdi-magnify</v-icon
                    >
                            <v-badge v-if="showBadge == true" dot overlap>
                              <v-icon class="mt-0 mb-5 mr-0" color="black" v-bind="attrs" v-on="on">mdi-filter-variant
                              </v-icon>
                            </v-badge>
                            <span v-if="showBadge == false" overlap>
                              <v-icon class="mt-0 mb-5 mr-0" color="black" v-bind="attrs" v-on="on">mdi-plus
                              </v-icon>
                            </span>
                          </span>
                        </template>

                        <v-card min-width="378" class="fixed_filter">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-list>
                                <v-list-item>
                                  <v-list-item-content>
        <v-list-item-title :disabled="dialog"  class="row-pointer"
                                  @click="threeDotAction('add_contact', '')"
                                  :loading="dialog">Add My Contact
        </v-list-item-title>
          </v-list-item-content>                        
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>
        <v-list-item-title :disabled="dialog"  class="row-pointer"
                            @click="threeDotAction('add_org_contact', '')"
                            :loading="dialog">Add Organaization Contact
                            </v-list-item-title>
                            </v-list-item-content>
                                </v-list-item>
</v-list>

                              </v-form>
                      </v-card>
                      </v-menu>


               
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>

          <v-card elevation="0">
            <v-tabs v-model="tab" centered outline >
              
              <v-tab href="#tab-1" name="my_contacts" @click="passTabName(1)"> My Contacts </v-tab>

              <v-tab href="#tab-2" name="org_contacts"  @click="passTabName(2)"> Organisation Contacts </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" >
              <v-tab-item value="tab-2" :transition="false">
                <v-card flat elevation="0">
                  <div id="layoutCallLog">
                    <v-expansion-panels
                      accordion
                      flat
                      v-if="
                        organisationContacts && organisationContacts.length > 0
                      "
                      v-model="orgExpand"
                      multiple
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
                                    v-for="(item, index) in items_organization"
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
                                <span v-html="contactNumberSpan(organisationContact.ContactNumber)" />
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
              <v-tab-item value="tab-1" :transition="false">
                <v-card flat elevation="0">
                  <!-- <div v-if="userContacts==false || userContacts==null">
                        
                        <v-alert dense outlined type="error">
                          <h4 class="f16">No contacts found!</h4>
                        <p class="mb-0 pb-0 black--text" color="black">
                          There are no saved contacts. Please
                          <a href="#">Sync your phone contacts </a>or
                          <a href="#"> add a new contact.</a>
                        </p>
                      </v-alert>
                    </div> -->
                  <div id="layoutCallLog">
                    <v-expansion-panels
                      accordion
                      flat
                      v-if="userContacts && userContacts.length > 0"
                      v-model="myExpand"
                      multiple
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
                                <span v-html="contactNumberSpan(userContact.ContactNumber)" />
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
                       
                      <div v-if="datafound == 'Loading...'">
                      <div class="center" align="center">{{ datafound }}</div>
                      <v-progress-linear v-if="datafound == 'Loading...'" color="#ee1c25 " indeterminate rounded
                        height="6"></v-progress-linear>
                    </div>

                    <div v-if="datafound == false">
                      <v-alert dense outlined type="error">
                        <h4 class="f16">No contacts found!</h4>
                        <p class="mb-0 pb-0 black--text" color="black">
                          There are no saved contacts. Please
                          <a href="#">Sync your phone contacts </a>or
                          <a href="#"> add a new contact.</a>
                        </p>
                      </v-alert></div>
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
<!-- {{contact_text}} -->
          <v-text-field  v-if="contact_text=='Add a New Contact'"
            label="Mobile Number*"
            outlined
            v-model="number"
          ></v-text-field>
          <v-text-field v-if="contact_text=='Edit Contact'"
            label="New Number*"
            outlined
            v-model="NewNumber"
          ></v-text-field>
          <v-hidden-field v-if="contact_text=='Edit Contact'" hidden
            label="Old Number"
            outlined disabled
            v-model="number"
          ></v-hidden-field>
          
          <div v-if="contact_text=='Add a New Contact' && url=='add_contact'">
              <v-checkbox class="pb-0 mb-0" v-model="SyncOrganisation"   @change="checkboxUpdated" label="Add to Organaization contact" value="1"></v-checkbox>
            </div>
            <div v-else>
              <div v-if="url=='edit_contact' ">
                
                <v-checkbox class="pb-0 mb-0"  v-model="SyncOrganisation"   @change="checkboxUpdated" label="Update to Organaization contact" value="1" ></v-checkbox>
            </div>
            </div>
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
          <v-btn  v-if="contact_text=='Add a New Contact'"
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="saveNow()"
          >
            Save
          </v-btn>
          <v-btn  v-else
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="editNow()"
          >
            Update
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
        <v-card-actions v-if="organizationContactDelete==true">
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
            @click="proceed(2)"
          >
            Yes
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="userContactDelete==true">
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
  name: 'StaticTabs',
  props: [ 'selected' ],

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
    datafound: 'Loading...',
    searchTerm: "",
    contact_text: "",
    tab: null,
    searchObject: [],
    searchObjectUser: [],
    userContacts: false,
    organisationContacts: false,
    syncOrganisation:false,
    userContactDelete:false,
    organizationContactDelete:false,
    status:false,
    message:'', 
    url:"",
    selectedTab:null,
    tabId:1,
    // contactName:"",z
    // contactNumber:"",
    items: [
      { title: "Edit Contact", color: "black--text", url: "edit_contact" },
      { title: "Delete Contact", color: "red--text", url: "delete_contact" },
    ],
    items_organization: [
      { title: "Edit Contact", color: "black--text", url: "edit_contact_organization" },
      { title: "Delete Contact", color: "red--text", url: "delete_organization_contact" },
    ],
    organisationContact:'',
    timeout:null,
    bottom:null,
    right:null,
    fail:null,
    userContact:null,
    orgExpand: [],
    myExpand: [],
  }),

  mounted() {
    this.syncContents();
    this.tab = this.selected
  },
  methods: {
    passTabName(s) {
           console.log(s);
           this.tabId= s;
        },
    contactNumberSpan(number) {
      return `+91 ${number}`;
    },
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
        .where("Uid", "==", this.uid)
        .where('Mode','in',['Updated','Created'] )
        .get()
        .then(async (querySnapshot) => {
          console.log(querySnapshot);
          this.userContacts = [];
          if (querySnapshot.empty) {
                  this.datafound = false
                }
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
        .where('Mode','in',['Updated','Created'] )
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

      if (e == 2) {
        console.log("proceed");

        const details = {
          url: this.$cloudfareApi + "/contact/organisation",
          method: "Delete",
          headers: { token: localStorage.getItem("token") },
          data: {
            OrganisationUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Number: this.number,
          },
        };


        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.status = responsevalue.data.status ;
            this.success =true;
            this.message = responsevalue.data.message;
            this.dialog2 = false;
            this.dialogDelete = false;
            this.syncContents();
            this.updateSearchTerm();
          }
        });
      }
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


        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.status = responsevalue.data.status ;
            this.message = responsevalue.data.message;
            this.success =true;
            
            this.dialog2 = false;
            this.dialogDelete = false;
            this.syncContents();
            this.updateSearchTerm();
          }else{
            this.fail =true;

            this.error_contacts = true;
            this.error_contacts = responsevalue.data.message;
          }
        });
      } else {
        console.log("cancel");
        this.dialogDelete = false;
      }
    },

    updateSearchTerm() {
if(this.searchTerm){
 
      var searchText = this.searchTerm;


      if(this.tabId==2){
      var jsonOrgContacts = JSON.parse(localStorage.getItem("organizationContactLocal"));
      // new logic
      var sortedOrgContacts =  jsonOrgContacts.sort(function(a, b) {
        return a.ContactName.localeCompare(b.ContactName);
      });
      var regexCondition = new RegExp(searchText.toLowerCase());
      var filteredOrgContacts = sortedOrgContacts.filter(function (con) {
        // console.log(con);
        return regexCondition.test(con.ContactName.toLowerCase()) || regexCondition.test(con.ContactNumber);
      });
      var highlightedOrgContacts = filteredOrgContacts.map(obj => ({...obj, ContactName: obj.ContactName.toLowerCase().replace(searchText.toLowerCase(), `<mark>${searchText}</mark>`), ContactNumber: obj.ContactNumber.toString().replace(searchText.toLowerCase(), `<mark>${searchText}</mark>`)}));

      // new logic

      var searchObjectOrganization = highlightedOrgContacts;
      if ( searchObjectOrganization.length == 0) {
        this.organisationContact=0;
      }else{
        this.organisationContacts = [];
      }
      var OrganizationContactsData = highlightedOrgContacts;
      this.organisationContacts.length = 0;
      this.organisationContacts = OrganizationContactsData;
      this.orgExpand = Array.from(Array(OrganizationContactsData.length+1).keys());
    }else{

      // Search data my contacts =====================================================
      
      var jsonMyContacts = JSON.parse(localStorage.getItem("ContactLocal"));
      // new logic
      var sortedMyContacts =  jsonMyContacts.sort(function(a, b) {
        return a.ContactName.localeCompare(b.ContactName);
      });
      var regexCondition = new RegExp(searchText.toLowerCase());

      var filteredMyContacts = sortedMyContacts.filter(function (con) {
        // console.log(con);

        return regexCondition.test(con.ContactName.toLowerCase()) || regexCondition.test(con.ContactNumber);
      });
      var highlightedMyContacts = filteredMyContacts.map(obj => ({...obj, ContactName: obj.ContactName.toLowerCase().replace(searchText.toLowerCase(), `<mark>${searchText}</mark>`), ContactNumber: obj.ContactNumber.toString().replace(searchText.toLowerCase(), `<mark>${searchText}</mark>`)}));

      // new logic

      var searchObjectUser = highlightedMyContacts;

      if ( searchObjectUser.length == 0) {
        this.userContact=0;
      }else{
        this.userContacts = [];
      }

      var UserContactsData = highlightedMyContacts;
      this.userContacts.length = 0;
      this.userContacts = UserContactsData;
      this.myExpand = Array.from(Array(UserContactsData.length+1).keys());
    }
      
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
        this.NewNumber = contactNumber;
        this.contact_text = "Edit Contact";
        this.url = "edit_contact";
      }
      if (url == "edit_contact_organization") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.name = contactName;
        this.number = contactNumber;
        this.NewNumber = contactNumber;
        this.contact_text = "Edit Contact";
        this.syncOrganisation =true;
        this.url ="edit_contact_organization";
      }
      
      
      if (url == "add_contact") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.name = contactName;
        this.number = contactNumber;
        this.NewNumber = contactNumber;
        this.contact_text = "Add a New Contact";
        this.url = "add_contact";
      }
      if (url == "add_org_contact") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.name = contactName;
        this.number = contactNumber;
        this.NewNumber = contactNumber;
        this.contact_text = "Add a New Contact";
        this.url = "add_org_contact";
      }
      if (url == "delete_contact") {
        this.dialog = false;
        this.dialog2 = false;
        this.name = contactName;
        this.number = contactNumber;
        this.dialogDelete = true;
        this.userContactDelete = true;
        this.organizationContactDelete = false;

      }
      if (url == "delete_organization_contact") {
        this.dialog = false;
        this.dialog2 = false;
        this.name = contactName;
        this.number = contactNumber;
        this.dialogDelete = true;
        this.organizationContactDelete = true;
        this.userContactDelete =false;

      }
    },

    saveNow() {
      console.log(this.syncOrganisation);
      if (this.syncOrganisation == false) {
        const details1 = {
          url: this.$cloudfareApi + "/contact/user",
          method: "POST",
          headers: { token: localStorage.getItem("token") },
          data: {
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Name: this.name,
            OldNumber: this.number,
            NewNumber: this.number,
            SyncOrganisation: this.syncOrganisation,
          },
        };
        axios(details1).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.success =true;

            this.status = responsevalue.data.status ;
            this.message = responsevalue.data.message;
            this.dialog2 = false;
            this.syncContents();
          }else{
            this.fail =true;

            this.error_contacts = true;
            this.error_contacts = responsevalue.data.message;
          }
        });
      } if (this.syncOrganisation == true) {

        // const detailsUser = {
        //   url: this.$cloudfareApi + "/contact/user",
        //   method: "POST",
        //   headers: { token: localStorage.getItem("token") },
        //   data: {
        //     OwnerUid: this.owneruid,
        //     Uid: this.uid,
        //     UpdatedBy: this.uid,
        //     Name: this.name,
        //     OldNumber: this.number,
        //     NewNumber: this.number,
        //     SyncOrganisation: this.syncOrganisation,
        //   },
        // };
        // axios(detailsUser).then(async (responsevalue) => {
        //   console.log(responsevalue);
        // });


        const details = {
          url: this.$cloudfareApi + "/contact/user",
          method: "POST",
          headers: { token: localStorage.getItem("token") },
          data: {
            OrganisationUid: this.owneruid,
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Name: this.name,
            OldNumber: this.number,
            NewNumber: this.number,
            SyncOrganisation: this.syncOrganisation,
          },
        };
        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.success =true;

            this.status = responsevalue.data.status ;
            this.message = responsevalue.data.message;
            this.dialog2 = false;
            this.syncContents();
          }else{
            this.fail =true;

            this.error_contacts = true;
            this.error_contacts = responsevalue.data.message;
          }
        });
      }
    },



    
    editNow() {
      console.log(this.syncOrganisation);
      if (this.syncOrganisation == false) {
        const details1 = {
          url: this.$cloudfareApi + "/contact/user",
          method: "POST",
          headers: { token: localStorage.getItem("token") },
          data: {
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Name: this.name,
            OldNumber: parseInt(this.number),
            NewNumber: parseInt(this.NewNumber),
            SyncOrganisation: this.syncOrganisation,

          },
        };
        axios(details1).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {  
            this.success =true;

            this.status = responsevalue.data.status ;
            this.message = responsevalue.data.message;
            this.dialog2 = false;
            this.syncContents();
          }else{
            this.fail =true;

            this.error_contacts = true;
            this.error_contacts = responsevalue.data.message;
          }
        });
      } if (this.syncOrganisation == true) {

        // const detailsUser = {
        //   url: this.$cloudfareApi + "/contact/organization",
        //   method: "POST",
        //   headers: { token: localStorage.getItem("token") },
        //   data: {
        //     OwnerUid: this.owneruid,
        //     Uid: this.uid,
        //     UpdatedBy: this.uid,
        //     Name: this.name,
        //     OldNumber: parseInt(this.number),
        //     NewNumber: parseInt(this.NewNumber),
        //     SyncOrganisation: true,
        //   },
        // };
        // axios(detailsUser).then(async (responsevalue) => {
        //   console.log(responsevalue);
        // });


        const details = {
          url: this.$cloudfareApi + "/contact/user",
          method: "POST",
          headers: { token: localStorage.getItem("token") },
          data: {
            OrganisationUid: this.owneruid,
            OwnerUid: this.owneruid,
            Uid: this.uid,
            UpdatedBy: this.uid,
            Name: this.name,
            OldNumber: parseInt(this.number),
            NewNumber: parseInt(this.number),
            SyncOrganisation: this.syncOrganisation,
          },
        };
        axios(details).then(async (responsevalue) => {
          console.log(responsevalue);

          if (responsevalue.data.status == true) {
            this.success =true;

            this.status = responsevalue.data.status ;
            this.message = responsevalue.data.message;
            this.dialog2 = false;
            this.syncContents();
          }else{
            this.fail =true;

          }
        });
      }
    },
  },
};
</script>
