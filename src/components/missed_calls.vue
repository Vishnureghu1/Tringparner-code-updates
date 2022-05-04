<template>
  <v-app>
        <v-alert prominent color="primary" type="error">
      <v-row align="center">
        <v-col class="grow">
          <h2 class="f16 regular">Email Verification</h2>
          <span class="f14 light3"
            >Please verify your email address by clicking on the link we have
            shared with you on email.</span
          >
        </v-col>
        <v-col class="shrink">
          <v-btn @click="changeEmailPopup = true">Resend Email</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <div>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-3">
                  <v-row>
  <v-col cols="12" sm="5">
                      <h2 class="mt-6 mb-5">Missed Calls</h2>

                      <v-progress-linear
                        :active="isUpdating"
                        :indeterminate="isUpdating"
                        absolute
                        bottom
                        color="deep-purple accent-4"
                      ></v-progress-linear>
                    </v-col>
                    <v-col cols="12" sm="7" align="end">
                      <v-text-field
                        v-show="!hidden"
                        absolute
                        transition="slide-y-reverse-transition"
                        append-icon="mdi-magnify"
                        class="searchForm"
                        label="Search"
                        v-model="searchTerm"
                        @input="updateSearchTerm"
                        single-line
                      ></v-text-field>

                      <v-menu
                        v-model="filtermenu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <span
                            ><v-icon
                              class="mt-6 mb-5 mr-4"
                              color="black"
                              @click="hidden = !hidden"
                              >mdi-magnify</v-icon
                            >
                            <v-icon
                              class="mt-6 mb-5 mr-7"
                              color="black"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-filter-variant</v-icon
                            >
                          </span>
                        </template>

                        <v-card min-width="378">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card-title class="black--text white darken-1">
                              Filter Content
                              <v-spacer></v-spacer>

                              <div
                                align="center"
                                class="notif-mark"
                                @click="resetFilterParams"
                              >
                                Reset
                              </div>

                              <span fab small @click="filtermenu = false">
                                <v-icon>mdi-close</v-icon>
                              </span>
                            </v-card-title>
                            <v-card height="400px" class="scroll">
                              <v-list>
                                <v-list-item>
                                  <h4 class="mb-0">Sort By</h4>
                                </v-list-item>

                                <v-list-item>
                                  <v-select
                                    v-model="selectedTimeOfCall"
                                    :items="timeofCall"
                                    label="Time of Call"
                                    outlined
                                    @change="handleTimeOfCallChange"
                                  ></v-select>
                                </v-list-item>
                                <v-list-item>
                                  <v-select
                                    v-model="selectedDurationOfCall"
                                    :items="DurationOfCall"
                                    label="Duration Of Call"
                                    @change="handleDurationOfCallChange"
                                    outlined
                                  ></v-select>
                                </v-list-item>

                                <v-divider></v-divider>

                                <v-list-item>
                                  <h4 class="mb-0">View By</h4>
                                </v-list-item>

                                <v-list-item>
                                  <v-select
                                    v-model="selectedViewByType"
                                    :items="ViewByType"
                                    label="View By Type"
                                    @change="handleViewByTypeChange"
                                    outlined
                                  ></v-select>
                                </v-list-item>

                                <v-list-item>
                                  <h4 class="mb-0">Filter Calls With</h4>
                                </v-list-item>

                                <v-list-item>
                                  <v-select
                                    v-model="selectedReminders"
                                    :items="Reminders"
                                    label="Reminders"
                                    @change="handleRemindersChange"
                                    outlined
                                  ></v-select>
                                </v-list-item>
                                <v-list-item>
                                  <v-select
                                    v-model="selectedNotes"
                                    :items="Notes"
                                    label="Notes"
                                    @change="handleNotesChange"
                                    outlined
                                  ></v-select>
                                </v-list-item>

                                <v-divider></v-divider>

                                <v-list-item>
                                  <h4 class="mb-0">Call Answered By</h4>
                                </v-list-item>

                                <v-list-item>
                                  <v-select
                                    v-model="selectedUser"
                                    :items="Users"
                                    label="Users"
                                    @change="handleUsersChange"
                                    outlined
                                  ></v-select>
                                </v-list-item>

                                <v-divider></v-divider>

                                <v-list-item>
                                  <h4 class="mb-0">Business Number</h4>
                                </v-list-item>

                                <v-list-item>
                                  <v-select
                                    v-model="selectedNumber"
                                    :items="Numbers"
                                    label="Number"
                                    @change="handleNumbersChange"
                                    outlined
                                  ></v-select>
                                </v-list-item>
                              </v-list>
                            </v-card>
                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn
                                color="white"
                                width="100%"
                                text
                                :disabled="!valid"
                                class="mr-0 flex red_button"
                                :loading="isUpdating"
                                depressed
                                @click="handleApplyFilter"
                              >
                                Apply Filter
                              </v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-menu>
                      
                    </v-col>
                  </v-row>
                  <v-expansion-panels accordion flat>
                    <v-expansion-panel
                      v-for="details in realdata"
                      :key="details.text"
                      v-model="openedPanel"
                    >
                      <v-expansion-panel-header>
                        <div>
                          <v-row class="calls_list">
                            <v-col cols="12" sm="10">
                              <h3 class="font-weight-light">
                                <Icon
                                  class="mr-3 icon_adjustment"
                                  :inline="true"
                                  color="red"
                                  icon="mdi:call-missed"
                                  width="24"
                                  height="24"
                                />
                                +91 {{ details.callerNumber }}
                              </h3>
                              <br />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="2" align="end">
                              <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon v-bind="attrs" v-on="on" color="black"
                                    >mdi-dots-vertical</v-icon
                                  >
                                </template>
                                <v-list>
                                  <v-list-item
                                    v-for="(item, index) in items"
                                    :key="index"
                                  >
                                    <v-list-item-title
                                      :class="item.color"
                                      @click="blockCall(e)"
                                      >{{ item.title }}
                                    </v-list-item-title>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-col>
                          </v-row>
                          <div class="ml-10 font-weight-thin date_time">
                            {{ details.dateTime }}
                          </div>
                          <div
                            class="ml-10 mt-3 font-weight-thin"
                            v-for="getNotes in details.Note"
                            :key="getNotes.text"
                          >
                            <div>
                              <span
                                v-if="getNotes.Note != ''"
                                class="mdi mdi-note grey--text"
                              >
                              </span>
                              {{ getNotes.Note }}
                            </div>
                          </div>
                        </div>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <div class="ml-10">
                                <h6 class="font-weight-thin">Source</h6>
                                <h5 class="font-weight-light">
                                  {{ details.source }} No: (+91
                                  {{ details.virtualnumber }})
                                </h5>
                                <br />

                                <div
                                  v-for="getNotes in details.Note"
                                  :key="getNotes.text"
                                >
                                  <v-text-field
                                    v-model="getNotes.Note"
                                    :append-outer-icon="
                                      getNotes.Note ? 'mdi-send' : ''
                                    "
                                    clear-icon="mdi-close-circle"
                                    clearable
                                    label="Notes"
                                    :rules="rules"
                                    counter
                                    maxlength="120"
                                    type="text"
                                    @click:append-outer="
                                      sendMessage(
                                        details.uniqueid,
                                        getNotes.Note
                                      )
                                    "
                                    @click:clear="
                                      clearMessage(
                                        details.uniqueid,
                                        getNotes.Note
                                      )
                                    "
                                  ></v-text-field>
                                </div>
                                <br />
                                <div
                                  v-for="getNotes in details.Note"
                                  :key="getNotes.text"
                                >
                                  <v-text-field
                                    v-model="Reminder"
                                    :append-outer-icon="
                                      getNotes.Note ? 'mdi-send' : ''
                                    "
                                    clear-icon="mdi-close-circle"
                                    clearable
                                    label="Reminder"
                                    @click="dialog = true"
                                  ></v-text-field>
                                </div>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-col>
            </v-row>
            <v-dialog v-model="dialog" max-width="400px" persistent>
              <v-card max-height>
                <v-card-title class="text-h5"> Reminder </v-card-title>

                <v-card-text>
                  <v-text-field
                    label="Remind About"
                    v-model="reminderMessage"
                    outlined
                  ></v-text-field>
                  <v-radio-group v-model="radio" column>
                    <v-radio
                      label="10 minutes"
                      value="radio-1"
                      color="red"
                    ></v-radio>
                    <v-radio
                      label="30 minutes"
                      value="radio-2"
                      color="red"
                    ></v-radio>
                    <v-radio
                      label="1 hour"
                      value="radio-3"
                      color="red"
                    ></v-radio>
                    <v-radio
                      label="Custom"
                      value="radio-4"
                      color="red"
                    ></v-radio>
                  </v-radio-group>
                  <div v-if="radio == 'radio-4'">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Select Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu1 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu1.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="Select Time"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        color="red"
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <v-btn
                        rounded
                        width="100%"
                        color="white"
                        dark
                        class="primary--text"
                        @click="dialog = false"
                      >
                        Cancel
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        width="100%"
                        rounded
                        color="red"
                        dark
                        @click="sendReminder(date, time)"
                      >
                        Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
      <v-dialog v-model="changeEmailPopup" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Verify your email address</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field label="Email Address*" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="SendVerification()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="enterOtpModel" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Enter the OTP</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-form @submit.prevent="" ref="form" v-model="valid" lazy-validation>
            <v-text-field label="Enter OTP" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="verifyOTP()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="sendInviteLoader" hide-overlay persistent width="300">
      <v-card color="red" dark>
        <v-card-text>
          Sending OTP to your email id
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
import firebase from "firebase";
import { db } from "@/main.js";
import moment from "moment";
import { Icon } from "@iconify/vue2";
import axios from "axios";
export default {
  components: {
    Icon,
  },
  data: () => ({
  valid: true,
    searchForm: false,
    benched: 0,
    hidden: true,
    sendInviteLoader: false,
    changeEmailPopup: false,
    enterOtpModel: false,
    loadingMore:false,
    items: [
      { title: "Add Note", color: "black--text" },
      { title: "Add Reminder", color: "black--text" },
      // { title: 'Call This Number',color: 'black--text' },
      { title: "Block This Number", color: "primary--text" },
    ],
  timeofCall: ["Ascending", "Descending"],
    selectedTimeOfCall: "Ascending",
    DurationOfCall: [
      "Not Specified",
      "< 30 Seconds",
      "30 Seconds - > 1 minute",
      "1 minitue - > 2 minutes",
      "> 2 minutes",
    ],
    selectedDurationOfCall: '',
    ViewByType: ["Calls", "Notes", "Reminder"],
    selectedViewByType: 'Calls',
    Reminders: ["Not Specified", "Yes"],
    selectedReminders: "Not Specified",
    Notes: ["Not Specified", "Yes"],
    selectedNotes: "Not Specified",

    Users: ["All"],
    usersObj: {"All":""},
    selectedUser:"All",
    Numbers: ["All"],
    selectedNumber: "All",
    fav: true,
    filtermenu: false,
    message: false,
    hints: true,
    uid: "",
    phno: "",
    called_name: "",
    role: "",
    detail: {},
    calldetails: [],
    realdata: [],
    backuprealdata: [],//for Mongo
    click_details: {},
    clicked_array: [],
    selected: false,
    note: [],
    show_notes: false,
    dialog: false,
    add_note: true,
  isUpdating: false,
    callback_uid: "",
    rules: [(v) => v.length <= 120 || "Max 120 characters"],
    password: "Password",
    show: false,
    marker: true,
    openedPanel: null,
    radio: "radio-1",
    Reminder: "",
    reminderMessage: "",
    date: "",
    time: "",
  notes_added: false,
    notes_removed: false,
    timeout: 2500,
    bottom: true,
    right: false,
    pageNumber:10,
    limit:20,
    lastrecord:null,
    searchTerm: "",
    totalPage: 0, 
    totalItems: 0,
    page:1,
    userRole: '',
  
  }),
    watch: {
    sendInviteLoader(val) {
      if (val) {
        setTimeout(
          () => ((this.sendInviteLoader = false), (this.enterOtpModel = true)),
          3000
        );
      }
    },
  },
  methods: {
    handleTimeOfCallChange(opn) {
      this.selectedPaymentOption = opn;
      console.log(this.selectedTimeOfCall);
    },
    handleDurationOfCallChange(opn) {
      this.selectedDurationOfCall = opn;
      console.log(this.selectedDurationOfCall);
    },
    handleViewByTypeChange(opn) {
      this.selectedViewByType = opn;
      console.log(this.selectedViewByType);
    },
    handleRemindersChange(opn) {
      this.selectedReminders = opn;
      console.log(this.selectedReminders);
    },
    handleNotesChange(opn) {
      this.selectedNotes = opn;
      console.log(this.selectedNotes);
    },
    handleUsersChange(opn) {
      this.selectedUser = opn;
      console.log(this.selectedUser);
    },
    handleNumbersChange(opn) {
      this.selectedNumber = opn;
      console.log(this.selectedNumber);
    },
    handleApplyFilter() {
      // this.isUpdating = true;
      this.filterMongo();

    },
    updateSearchTerm() {
      console.log(this.searchTerm);
      console.log('this.searchTerm.length',this.searchTerm.length);
      if(this.searchTerm !== '') {
        this.searchMongo();
      } else {
        console.log('searchTerm is empty');
        this.realdata = this.backuprealdata;
      }
      
    },
    searchAction() {
      this.hidden = !this.hidden;
    },
    SendVerification() {
      this.changeEmailPopup = false;
      this.sendInviteLoader = true;
      // this.enterOtpModel = false
    },
    close() {
      this.changeEmailPopup = false;
      this.enterOtpModel = false;
    },
    openSearchBar() {
      this.searchForm = true;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  resetFilterParams() {
      this.$refs.form.resetValidation();
      this.selectedTimeOfCall = "Ascending";
      this.selectedDurationOfCall = "";
      this.selectedViewByType = "Calls";
      this.selectedReminders = "Not Specified";
      this.selectedNotes = "Not Specified";
      this.selectedUser = "All";
      this.selectedNumber = "All";
      this.filterMongo();
    },
    blockCall(e) {
      console.log("Section: " + e);
    },

    closeAllPanels() {
      this.openedPanel = null;
    },
    openPanel(index) {
      this.openedPanel = index;
    },
    sendMessage(unique_id, message) {
      var token = localStorage.getItem("token");
      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note",
        method: "POST",
        data: {
          uid: this.ownerUid,
          unique_id: unique_id,
          note: message,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(user_data);
      this.$axios(user_data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    sendReminder(date, time, unique_id, message) {
      var token = localStorage.getItem("token");
      console.log(date);
      console.log(time);

      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/reminder",
        method: "POST",
        data: {
          // owner_uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',
          owner_uid: this.ownerUid,
          call_id: unique_id,
          message: message,
          updated_by: "",
          Accountid: "",
          agent_uid: "",
          name: "",
          reminder_at: "",
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(user_data);
      this.$axios(user_data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    clearMessage(unique_id, message) {
      message = "";
      var token = localStorage.getItem("token");
      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note",
        method: "POST",
        data: {
          uid: this.ownerUid,
          unique_id: unique_id,
          note: message,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(user_data);
      this.$axios(user_data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getCallsFilterPayload(filterCallsConditions) {
      console.log("this.selectedTimeOfCall", this.selectedTimeOfCall);
      if (
        this.selectedTimeOfCall !== "" &&
        this.selectedTimeOfCall == "Ascending"
      ) {
        Object.assign(filterCallsConditions.sort, { dateTime: -1 });
      } else {
        Object.assign(filterCallsConditions.sort, { dateTime: 1 });
      }

      console.log("this.selectedDurationOfCall", this.selectedDurationOfCall);
      if (this.selectedDurationOfCall !== "Not Specified") {
        if (this.selectedDurationOfCall == "< 30 Seconds") {
          Object.assign(filterCallsConditions.conditions, {
            conversationduration: { $lt: 30 },
          });
        } else if (this.selectedDurationOfCall == "30 Seconds - > 1 minute") {
          Object.assign(filterCallsConditions.conditions, {
            conversationduration: { $gt: 30, $lt: 60 },
          });
        } else if (this.selectedDurationOfCall == "1 minitue - > 2 minutes") {
          Object.assign(filterCallsConditions.conditions, {
            conversationduration: { $gt: 60, $lt: 120 },
          });
        } else if (this.selectedDurationOfCall == "> 2 minutes") {
          Object.assign(filterCallsConditions.conditions, {
            conversationduration: { $gt: 120 },
          });
        }
      }

      console.log("this.selectedViewByType", this.selectedViewByType);
      if (this.selectedViewByType == "Notes") {
        Object.assign(filterCallsConditions.conditions, {
          Notes: { $exists: true },
        });
      }
      if (this.selectedViewByType == "Reminder") {
        Object.assign(filterCallsConditions.conditions, {
          Reminder: { $exists: true },
        });
      }
      console.log("this.selectedReminders", this.selectedReminders);
      if (this.selectedReminders !== "Not Specified") {
        Object.assign(filterCallsConditions.conditions, {
          Reminder: { $exists: true },
        });
      }
      console.log("this.selectedNotes", this.selectedNotes);
      if (this.selectedNotes !== "Not Specified") {
        Object.assign(filterCallsConditions.conditions, {
          Notes: { $exists: true },
        });
      }

      console.log("this.selectedUser", this.selectedUser);
      if (this.selectedUser !== "All") {
        let connectedTo = this.usersObj[this.selectedUser];
        Object.assign(filterCallsConditions.conditions, {
          connectedto: connectedTo,
        });
      }
      console.log("this.selectedNumber", this.selectedNumber);
      if (this.selectedNumber !== "All") {
        Object.assign(filterCallsConditions.conditions, {
          virtualnumber: "8657510921",
        });
      }

      if(this.userRole == 'AGENT') {
        Object.assign(filterCallsConditions.conditions, {
          userid: { "$in" : [this.uid]},
        });
      }

      return filterCallsConditions;
    },
    filterMongo() {
      console.log("Filtering Calls.....");
       var filterCallsPayload = {
        page_number: this.page ? parseInt(this.page) : 1,
        results_per_page: parseInt(this.limit),
        conditions: {
          owneruid: this.ownerUid,
          callstatus: "Missed"
        },
        sort: {},
      };

      let updatedFilterCallsPayload =
        this.getCallsFilterPayload(filterCallsPayload);
      console.log(
        "updatedFilterCallsPayload",
        JSON.stringify(updatedFilterCallsPayload)
      );

      var cfdata = {
        headers:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
        url: "http://35.244.46.144:5000/api/calllogs/paginate",
        payload: updatedFilterCallsPayload,
      };
      var raw = JSON.stringify(cfdata);

      const headers = {
        "Content-Type": "application/json",
        token: "tpmongo",
      };
      axios
        .post(
          "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/admin/mongo",
          raw,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log("DL response", response.data.data);
          let dataset = response.data.data.dataset;

          this.totalPage = response.data.data.totalPages;
          this.totalItems = response.data.data.totalItems;

          // let List = [];
          this.realdata = [];
          dataset.forEach((doc) => {
            let user_details = doc;
                  this.calldetails = user_details;
                  var timestamp = this.calldetails.dateTime;
                  var date = new Date(timestamp);
                  console.log("full time", date);
                  // var call_time = moment(date).format('hh:mm a')
                  // call_time = moment(date).fromNow();
                  // console.log("converted time",call_time)

                  var myCurrentDate = new Date();
                  var missedTresholdDate = new Date(myCurrentDate);
                  missedTresholdDate.setDate(missedTresholdDate.getDate() - 2); //2 days before
                  console.log(missedTresholdDate);

                  console.log(timestamp); //missed call date
                  console.log(missedTresholdDate.getTime()); //addon date
                  console.log(myCurrentDate.getTime()); //today's date

                  if (timestamp <= missedTresholdDate.getTime()) {
                    call_time = moment(date).format("D MMM Y hh:mm a");
                  } else {
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();
                  }

                  var note = "";
                  var uid = "";
                  var user_name = "";
                  var owneruid = "";
                  if (this.calldetails.Notes) {
                    note = this.calldetails.Notes;
                  } else {
                    console.log("no note");
                    note = [{ Note: "" }];
                  }
                  if (this.calldetails.ClickCount) {
                    uid = this.calldetails.ClickCount.Uid;
                    user_name = this.calldetails.name;
                    owneruid = this.calldetails.owneruid;
                    // console.log('user id ', this.click_details.user_name)
                    if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Missed"
                    ) {
                      this.called_name = "You";
                    } else if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Answered"
                    ) {
                      this.called_name = user_name;
                    }
                  } else {
                    console.log("no callback");

                    uid = "";
                    user_name = "";
                    owneruid = "";
                    this.called_name = "";
                  }
                  var calledNumber =
                    this.calldetails.callerNumber.slice(0, 5) +
                    " " +
                    this.calldetails.callerNumber.slice(5, 7) +
                    " " +
                    this.calldetails.callerNumber.slice(7, 11);
                  var virtualnumber =
                    this.calldetails.virtualnumber.slice(0, 5) +
                    " " +
                    this.calldetails.virtualnumber.slice(5, 7) +
                    " " +
                    this.calldetails.virtualnumber.slice(7, 11);
                  this.detail = Object.assign({}, this.detail, {
                    callstatus: this.calldetails.callstatus,
                    name: this.calldetails.name[0],
                    dateTime: call_time,
                    conversationduration: this.calldetails.conversationduration,
                    callerNumber: calledNumber,
                    uniqueid: this.calldetails.uniqueid,
                    Note: note,
                    source: this.calldetails.source,
                    virtualnumber: virtualnumber,
                    called_name: this.called_name,
                    recordingUrl: this.calldetails.recordingurl,
                  });
                  this.realdata.push(this.detail);
                this.backuprealdata.push(this.detail);
                console.log("filterMongo calllog ", this.realdata);
          });
        })
        .catch((error) => {
          console.log("DL error", error);
        });
    },
    getCallsSearchPayload(searchCallsConditions) {
      if (this.searchTerm && this.searchTerm != "") {
        Object.assign(searchCallsConditions.conditions, {
          $or: [
            {
              Notes: {
                $elemMatch: {
                  Note: { $regex: this.searchTerm, $options: "i" },
                },
              },
            },
            {
              callerNumber: { $regex: this.searchTerm, $options: "i" },
            },
            {
              "Reminder.Message": { $regex: this.searchTerm, $options: "i" },
            },
          ],
        });
      }
      if(this.userRole == 'AGENT') {
        Object.assign(searchCallsConditions.conditions, {
          userid: { "$in" : [this.uid]},
        });
      }

      return searchCallsConditions;
    },
    searchMongo() {
       var searchCallsConditions = {
        page_number: this.page ? parseInt(this.page) : 1,
        results_per_page: parseInt(this.limit),
        conditions: {
          owneruid: this.ownerUid,
          callstatus: "Missed"
        },
        sort: {},
      };

      let updatedSearchCallsPayload = this.getCallsSearchPayload(
        searchCallsConditions
      );

      console.log("updatedSearchCallsPayload", updatedSearchCallsPayload);

      var cfdata = {
        headers:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
        url: "http://35.244.46.144:5000/api/calllogs/paginate",
        payload: updatedSearchCallsPayload,
      };
      var raw = JSON.stringify(cfdata);

      const headers = {
        "Content-Type": "application/json",
        token: "tpmongo",
      };
      axios
        .post(
          "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/admin/mongo",
          raw,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log("DL response", response.data.data);
          let dataset = response.data.data.dataset;

          this.totalPage = response.data.data.totalPages;
          this.totalItems = response.data.data.totalItems;

          // let List = [];
          this.realdata = [];
          dataset.forEach((doc) => {
            let user_details = doc;
                  this.calldetails = user_details;
                  var timestamp = this.calldetails.dateTime;
                  var date = new Date(timestamp);
                  console.log("full time", date);
                  // var call_time = moment(date).format('hh:mm a')
                  // call_time = moment(date).fromNow();
                  // console.log("converted time",call_time)

                  var myCurrentDate = new Date();
                  var missedTresholdDate = new Date(myCurrentDate);
                  missedTresholdDate.setDate(missedTresholdDate.getDate() - 2); //2 days before
                  console.log(missedTresholdDate);

                  console.log(timestamp); //missed call date
                  console.log(missedTresholdDate.getTime()); //addon date
                  console.log(myCurrentDate.getTime()); //today's date

                  if (timestamp <= missedTresholdDate.getTime()) {
                    call_time = moment(date).format("D MMM Y hh:mm a");
                  } else {
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();
                  }

                  var note = "";
                  var uid = "";
                  var user_name = "";
                  var owneruid = "";
                  if (this.calldetails.Notes) {
                    note = this.calldetails.Notes;
                  } else {
                    console.log("no note");
                    note = [{ Note: "" }];
                  }
                  if (this.calldetails.ClickCount) {
                    uid = this.calldetails.ClickCount.Uid;
                    user_name = this.calldetails.name;
                    owneruid = this.calldetails.owneruid;
                    // console.log('user id ', this.click_details.user_name)
                    if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Missed"
                    ) {
                      this.called_name = "You";
                    } else if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Answered"
                    ) {
                      this.called_name = user_name;
                    }
                  } else {
                    console.log("no callback");

                    uid = "";
                    user_name = "";
                    owneruid = "";
                    this.called_name = "";
                  }
                  var calledNumber =
                    this.calldetails.callerNumber.slice(0, 5) +
                    " " +
                    this.calldetails.callerNumber.slice(5, 7) +
                    " " +
                    this.calldetails.callerNumber.slice(7, 11);
                  var virtualnumber =
                    this.calldetails.virtualnumber.slice(0, 5) +
                    " " +
                    this.calldetails.virtualnumber.slice(5, 7) +
                    " " +
                    this.calldetails.virtualnumber.slice(7, 11);
                  this.detail = Object.assign({}, this.detail, {
                    callstatus: this.calldetails.callstatus,
                    name: this.calldetails.name[0],
                    dateTime: call_time,
                    conversationduration: this.calldetails.conversationduration,
                    callerNumber: calledNumber,
                    uniqueid: this.calldetails.uniqueid,
                    Note: note,
                    source: this.calldetails.source,
                    virtualnumber: virtualnumber,
                    called_name: this.called_name,
                    recordingUrl: this.calldetails.recordingurl,
                  });
                  this.realdata.push(this.detail);
                  this.backuprealdata.push(this.detail);
                  console.log("searchMongo calllog ", this.realdata);
          });
        })
        .catch((error) => {
          console.log("DL error", error);
        });
    },
    getNextCalls() {
      window.onscroll = () => {

      let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          console.log("getting Next Calls");
          console.log("this.lastrecord", this.lastrecord);

          // getting Next calls
          this.page++;
          console.log("Filtering Calls.....");
          var filterCallsPayload = {
            page_number: this.page ? parseInt(this.page) : 1,
            results_per_page: parseInt(this.limit),
            conditions: {
              owneruid: this.ownerUid,
              callstatus: "Missed"
            },
            sort: {},
          };

          let updatedFilterCallsPayload =
            this.getCallsFilterPayload(filterCallsPayload);
          console.log(
            "updatedFilterCallsPayload",
            JSON.stringify(updatedFilterCallsPayload)
          );

          var cfdata = {
            headers:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
            url: "http://35.244.46.144:5000/api/calllogs/paginate",
            payload: updatedFilterCallsPayload,
          };
          var raw = JSON.stringify(cfdata);

          const headers = {
            "Content-Type": "application/json",
            token: "tpmongo",
          };
          axios
            .post(
              "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/admin/mongo",
              raw,
              {
                headers: headers,
              }
            )
            .then((response) => {
              console.log("DL response", response.data.data);
              let dataset = response.data.data.dataset;

              this.totalPage = response.data.data.totalPages;
              this.totalItems = response.data.data.totalItems;

              // let List = [];
              // this.realdata = [];
              dataset.forEach((doc) => {
                // let callObj = {

                // };

                // call details
                let user_details = doc;
                  this.calldetails = user_details;
                  var timestamp = this.calldetails.dateTime;
                  var date = new Date(timestamp);
                  console.log("full time", date);
                  // var call_time = moment(date).format('hh:mm a')
                  // call_time = moment(date).fromNow();
                  // console.log("converted time",call_time)

                  var myCurrentDate = new Date();
                  var missedTresholdDate = new Date(myCurrentDate);
                  missedTresholdDate.setDate(missedTresholdDate.getDate() - 2); //2 days before
                  console.log(missedTresholdDate);

                  console.log(timestamp); //missed call date
                  console.log(missedTresholdDate.getTime()); //addon date
                  console.log(myCurrentDate.getTime()); //today's date

                  if (timestamp <= missedTresholdDate.getTime()) {
                    call_time = moment(date).format("D MMM Y hh:mm a");
                  } else {
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();
                  }

                  var note = "";
                  var uid = "";
                  var user_name = "";
                  var owneruid = "";
                  if (this.calldetails.Notes) {
                    note = this.calldetails.Notes;
                  } else {
                    console.log("no note");
                    note = [{ Note: "" }];
                  }
                  if (this.calldetails.ClickCount) {
                    uid = this.calldetails.ClickCount.Uid;
                    user_name = this.calldetails.name;
                    owneruid = this.calldetails.owneruid;
                    // console.log('user id ', this.click_details.user_name)
                    if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Missed"
                    ) {
                      this.called_name = "You";
                    } else if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Answered"
                    ) {
                      this.called_name = user_name;
                    }
                  } else {
                    console.log("no callback");

                    uid = "";
                    user_name = "";
                    owneruid = "";
                    this.called_name = "";
                  }
                  var calledNumber =
                    this.calldetails.callerNumber.slice(0, 5) +
                    " " +
                    this.calldetails.callerNumber.slice(5, 7) +
                    " " +
                    this.calldetails.callerNumber.slice(7, 11);
                  var virtualnumber =
                    this.calldetails.virtualnumber.slice(0, 5) +
                    " " +
                    this.calldetails.virtualnumber.slice(5, 7) +
                    " " +
                    this.calldetails.virtualnumber.slice(7, 11);
                  this.detail = Object.assign({}, this.detail, {
                    callstatus: this.calldetails.callstatus,
                    name: this.calldetails.name[0],
                    dateTime: call_time,
                    conversationduration: this.calldetails.conversationduration,
                    callerNumber: calledNumber,
                    uniqueid: this.calldetails.uniqueid,
                    Note: note,
                    source: this.calldetails.source,
                    virtualnumber: virtualnumber,
                    called_name: this.called_name,
                    recordingUrl: this.calldetails.recordingurl,
                  });
                  this.realdata.push(this.detail);
                this.backuprealdata.push(this.detail);
                console.log("getNextCalls calllog ", this.realdata);
                // call details
              });
            })
            .catch((error) => {
              console.log("DL error", error);
            });
        }
      };
    }
  },
  created() {},
  beforeMount() {
    let localStorageUserObj = localStorage.getItem("tpu");

    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      this.ownerUid = parsedUser.role == "OWNER" ? parsedUser.uid : parsedUser.OwnerUid;
      this.userEmail = parsedUser.Email;

      this.userRole = parsedUser.role;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
          console.log("User Id : " + this.ownerUid);

          db.collection("users")
            .where("OwnerUid", "==", this.ownerUid)
            .orderBy("cDate", "asc")
            .get()
            .then((querySnapshot) => {
              Object.assign(this.usersObj, {
                [parsedUser.FirstName
                  ? parsedUser.FirstName
                  : parsedUser.role]: `+91${parsedUser.PhoneNumber}`,
              });
              this.Users.push(
                parsedUser.FirstName ? parsedUser.FirstName : parsedUser.role
              );
              console.log("this.usersObj", this.usersObj);
              this.Numbers = parsedUser.virtualNumber;
              this.Numbers.concat(parsedUser.virtualNumber);

              querySnapshot.forEach((doc) => {
                let user_details = doc.data();

                Object.assign(this.usersObj, {
                  [user_details.Name]: `+91${user_details.PhoneNumber}`,
                });
                this.Users.push(user_details.Name);
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });

          db.collection("callLogs")
            .where("owneruid", "==", this.ownerUid)
            .where("callstatus", "==", "Missed")
            .orderBy("dateTime", "desc")
            .onSnapshot((querySnapshot) => {

              this.realdata = [];
              this.backuprealdata = [];
              if (!querySnapshot.empty) {
                // querySnapshot.forEach(async (doc) => {


                  // API CALL CONFIG
                  // Getting Calls from Mongo on onSnapshot
                var filterCallsPayload = {
                  page_number: 1,
                  results_per_page: parseInt(this.limit),
                  conditions: {
                    owneruid: this.ownerUid,
                    callstatus: "Missed"
                  },
                  sort: {},
                };

                let updatedFilterCallsPayload =
                  this.getCallsFilterPayload(filterCallsPayload);
                console.log(
                  "updatedFilterCallsPayload",
                  JSON.stringify(updatedFilterCallsPayload)
                );

                var cfdata = {
                  headers:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
                  url: "http://35.244.46.144:5000/api/calllogs/paginate",
                  payload: updatedFilterCallsPayload,
                };
                var raw = JSON.stringify(cfdata);

                const headers = {
                  "Content-Type": "application/json",
                  token: "tpmongo",
                };
                axios
                  .post(
                    "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/admin/mongo",
                    raw,
                    {
                      headers: headers,
                    }
                  )
                  .then((response) => {
                    console.log("DL response", response.data.data);
                    let dataset = response.data.data.dataset;

                    this.totalPage = response.data.data.totalPages;
                    this.totalItems = response.data.data.totalItems;

                    // let List = [];
                    this.realdata = [];
                    this.backuprealdata = [];
                    dataset.forEach((doc) => {



                  //ORIG DATA ITERATOR
                  // console.log(doc.id, " => ", doc.data());
                  // let user_details = doc.data();
                  let user_details = doc;
                  this.calldetails = user_details;
                  var timestamp = this.calldetails.dateTime;
                  var date = new Date(timestamp);
                  console.log("full time", date);
                  // var call_time = moment(date).format('hh:mm a')
                  // call_time = moment(date).fromNow();
                  // console.log("converted time",call_time)

                  var myCurrentDate = new Date();
                  var missedTresholdDate = new Date(myCurrentDate);
                  missedTresholdDate.setDate(missedTresholdDate.getDate() - 2); //2 days before
                  console.log(missedTresholdDate);

                  console.log(timestamp); //missed call date
                  console.log(missedTresholdDate.getTime()); //addon date
                  console.log(myCurrentDate.getTime()); //today's date

                  if (timestamp <= missedTresholdDate.getTime()) {
                    call_time = moment(date).format("D MMM Y hh:mm a");
                  } else {
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();
                  }

                  var note = "";
                  var uid = "";
                  var user_name = "";
                  var owneruid = "";
                  if (this.calldetails.Notes) {
                    note = this.calldetails.Notes;
                  } else {
                    console.log("no note");
                    note = [{ Note: "" }];
                  }
                  if (this.calldetails.ClickCount) {
                    uid = this.calldetails.ClickCount.Uid;
                    user_name = this.calldetails.name;
                    owneruid = this.calldetails.owneruid;
                    // console.log('user id ', this.click_details.user_name)
                    if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Missed"
                    ) {
                      this.called_name = "You";
                    } else if (
                      uid == owneruid &&
                      this.calldetails.callstatus == "Answered"
                    ) {
                      this.called_name = user_name;
                    }
                  } else {
                    console.log("no callback");

                    uid = "";
                    user_name = "";
                    owneruid = "";
                    this.called_name = "";
                  }
                  var calledNumber =
                    this.calldetails.callerNumber.slice(0, 5) +
                    " " +
                    this.calldetails.callerNumber.slice(5, 7) +
                    " " +
                    this.calldetails.callerNumber.slice(7, 11);
                  var virtualnumber =
                    this.calldetails.virtualnumber.slice(0, 5) +
                    " " +
                    this.calldetails.virtualnumber.slice(5, 7) +
                    " " +
                    this.calldetails.virtualnumber.slice(7, 11);
                  this.detail = Object.assign({}, this.detail, {
                    callstatus: this.calldetails.callstatus,
                    name: this.calldetails.name[0],
                    dateTime: call_time,
                    conversationduration: this.calldetails.conversationduration,
                    callerNumber: calledNumber,
                    uniqueid: this.calldetails.uniqueid,
                    Note: note,
                    source: this.calldetails.source,
                    virtualnumber: virtualnumber,
                    called_name: this.called_name,
                    recordingUrl: this.calldetails.recordingurl,
                  });
                  this.realdata.push(this.detail);
                  this.backuprealdata.push(this.detail);
                  console.log("snap calllog ", this.realdata);
                  })
                })
                .catch((error) => {
                  console.log("DL error", error);
                });
                  // API CALL CONFIG
                // });
              } else {
                //alert('no calls')
              }
            });
        }
      });
    }
  },
  mounted() {
    this.getNextCalls();
  },
};
</script>


<style scoped>
.test {
  border-color: grey !important;
  height: 100%;
}
.v-expansion-panel {
  border-bottom: 1px solid #ddd;
  border-bottom-spacing: 15px;
}
.v-expansion-panel-header {
  line-height: 0.5 !important;
}
.application {
  font-family: adobe-clean, sans-serif !important;
}
</style>