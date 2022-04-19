<template>
  <v-app>
    <v-alert prominent color="red darken-1" type="error">
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
        <v-snackbar
          :timeout="timeout"
          v-model="notes_added"
          :bottom="bottom"
          :right="right"
          color="green"
          text
          >Notes added successfully!</v-snackbar
        ><v-snackbar
          :timeout="timeout"
          v-model="notes_removed"
          :bottom="bottom"
          :right="right"
          color="red"
          text
          >Notes removed successfully!</v-snackbar
        >

        <v-layout>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-3">
                  <v-row>
                    <v-col cols="12" sm="5">
                      <h2 class="mt-6 mb-5">Call Log</h2>

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
                                @click="resetValidation"
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

                  <!-- {{realdata}} -->

                  <div>
                  <v-expansion-panels accordion flat>
                    <v-expansion-panel
                      v-for="details in realdata"
                      :key="details.text"
                    >
                      <v-expansion-panel-header>
                        <div>
                          <v-row class="calls_list">
                            <v-col cols="12" sm="10">
                              <!-- {{details}} -->
                              <h3 class="font-weight-light">
                                <v-icon
                                  v-if="details.callstatus == 'Answered'"
                                  class="mr-3"
                                  color="green"
                                  >mdi-arrow-bottom-left</v-icon
                                >
                                <Icon
                                  v-else
                                  class="mr-3 icon_adjustment"
                                  color="red"
                                  icon="mdi:call-missed"
                                  width="24"
                                  height="24"
                                />+91 {{ details.callerNumber }}
                                <v-icon color="gray" class="mr-5"
                                  >mdi-shield-lock-outline</v-icon
                                >
                                <v-menu offset-y>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      v-bind="attrs"
                                      v-on="on"
                                      color="black"
                                      >mdi-dots-vertical</v-icon
                                    >
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
                                          blockCall(
                                            item.url,
                                            details.virtualnumber,
                                            details.uniqueid
                                          )
                                        "
                                        >{{ item.title }}</v-list-item-title
                                      >
                                    </v-list-item>
                                  </v-list>
                                </v-menu>
                              </h3>
                              <br />
                            </v-col>
                            <v-spacer></v-spacer>
                          </v-row>

                          <div class="ml-10 font-weight-thin date_time">
                            <span v-if="details.conversationduration != 0"
                              >{{ details.conversationduration }} Sec,
                            </span>
                            {{ details.dateTime }}, {{ details.name }}
                          </div>
                          <!-- {{detail}} -->
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
                                    class="black--text"
                                  ></v-text-field>
                                </div>

                                <br />

                                <div
                                  v-for="getNotes in details.Note"
                                  :key="getNotes.text"
                                >
                                  <v-text-field
                                    v-model="Reminder"
                                    clear-icon="mdi-close-circle"
                                    clearable
                                    label="Reminder"
                                    append-icon="mdi-pencil"
                                    type="text"
                                    @click="dialog = true"
                                  ></v-text-field>
                                </div>
                              </div>
                            </v-col>
                            <!-- {{details}} -->
                            <v-col
                              cols="12"
                              sm="6"
                              v-if="details.callstatus != 'Missed'"
                            >
                              <audio controls>
                                <source
                                  :src="details.recordingUrl"
                                  type="audio/mpeg"
                                />
                                Your browser does not support the audio tag.
                              </audio>
                            </v-col>
                          </v-row>
                        </div>
                      </v-expansion-panel-content>
                      
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <v-container v-if="loadingMore">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="text-subtitle-1 text-center"
          cols="12"
        >
         Loading ...
        </v-col>
        <v-col cols="12">
          <v-progress-linear
            color="red darken-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
                  </div>
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
                        class="red--text"
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
import axios from 'axios';

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
      { title: "Add Note", color: "black--text", url: "add_note" },
      { title: "Add Reminder", color: "black--text", url: "add_number" },
      // { title: 'Call This Number',color: 'black--text' , url: 'call_this_number'},
      { title: "Block This Number", color: "red--text", url: "block_number" },
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

    Users: ["All", "Sree", "Shinu", "Syam", "Divya", "Munasir"],
    selectedUser:"All",
    Numbers: ["All", "8657510921", "222222222", "22"],
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
    backuprealdata: [],
    click_details: {},
    clicked_array: [],
    selected: false,
    note: [],
    show_notes: false,
    show_remind: false,
    dialog: false,
    add_note: true,
    isUpdating: false,
    callback_uid: "",
    rules: [(v) => v.length <= 120 || "Max 120 characters"],
    password: "Password",
    show: false,
    marker: true,
    column: null,
    menu2: false,
    menu1: false,
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
      alert("ss");
      this.searchForm = true;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    handleScroll: function (e) {
      if (e.target.scrollHeight - 300 <= e.target.scrollTop) {
        alert("oi sou Eduardo Martins");
      }
    },
    blockCall(type) {
      // var token = localStorage.getItem('token');

      // console.log(type,number);
      // add_note
      // add_number
      // block_number
      if (type == "block_number") {
        var token = localStorage.getItem("token");
        var tpu = localStorage.getItem("tpu");
        var Id = JSON.parse(tpu);
        console.log(Id);
        const blockNumber = {
          url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/blockcall",
          method: "POST",
          data: {
            number: "8657510921",
            owner_uid: this.uid, //
            status: true,
            UpdatedBy: this.uid, // owner uid
            AccountId: Id.AccountId,
          },
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        };
        console.log(blockNumber);
        this.$axios(blockNumber)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("Error getting: ", error);
          });
      } else if (type == "add_note") {
        this.show_notes = true;
      } else {
        this.show_remind = true;
      }
    },
    sendMessage(unique_id, message) {
      var token = localStorage.getItem("token");

      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note",
        method: "POST",
        data: {
          uid: this.uid,
          // uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',
          unique_id: unique_id, //call id
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
          // console.log(response.data.status)
          if (response.data.status == true) {
            this.notes_added = true;
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    sendReminder(date, time) {
      var token = localStorage.getItem("token");
      var tpu = localStorage.getItem("tpu");
      var Id = JSON.parse(tpu);
      console.log(Id.AccountId);
      console.log(date);
      console.log(time);
      var myCurrentDate = new Date();
      var todayDateMillisecond = new Date(myCurrentDate).getTime();
      console.log(todayDateMillisecond);
      // var RemindmeAt = todayDateMillisecond + hours;
      var RemindmeAt = 1847244627217;
      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/reminder",
        method: "POST",
        data: {
          // owner_uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',

          call_id: "1646813903.152737", // uniqueid
          agent_uid: this.uid,
          owner_uid: this.uid, //logged in ownere
          reminder_at: RemindmeAt, // time in milliseconds
          name: "Akhil",
          type: "General", //custom or p // after 10 mins // after 10
          Number: "99521 83 859", //caller number
          Message: "test",
          AccountId: Id.AccountId,
          UpdatedBy: "", //logged in user id
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
      var token = localStorage.getItem("token");
      message = "";
      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/note",
        method: "POST",
        data: {
          uid: this.uid,
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
          if (response.data.status == true) {
            this.notes_removed = true;
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getCallsFilterPayload(filterCallsConditions) {

      console.log('this.selectedTimeOfCall', this.selectedTimeOfCall);
      if(this.selectedTimeOfCall !=='' && this.selectedTimeOfCall == 'Ascending') {
        Object.assign(filterCallsConditions.sort, { "dateTime": -1 });
      } else {
        Object.assign(filterCallsConditions.sort, { "dateTime": 1 });
      }

      console.log('this.selectedDurationOfCall', this.selectedDurationOfCall);
      if(this.selectedDurationOfCall !== 'Not Specified') {

        if(this.selectedDurationOfCall == "< 30 Seconds") {
          Object.assign(filterCallsConditions.conditions, { "conversationduration": {"$lt": 30} });
        } else if (this.selectedDurationOfCall == "30 Seconds - > 1 minute") {
          Object.assign(filterCallsConditions.conditions, { "conversationduration": {"$gt": 30, "$lt": 60} });
        } else if (this.selectedDurationOfCall == "1 minitue - > 2 minutes") {
          Object.assign(filterCallsConditions.conditions, { "conversationduration": {"$gt": 60, "$lt": 120} });
        } else if (this.selectedDurationOfCall == "> 2 minutes") {
          Object.assign(filterCallsConditions.conditions, { "conversationduration": {"$gt": 120} });
        }
      }

      console.log('this.selectedViewByType', this.selectedViewByType);
      if(this.selectedViewByType == "Notes") {
        Object.assign(filterCallsConditions.conditions, { "Notes": {"$exists": true} });
      }
      if(this.selectedViewByType == "Reminder") {
        Object.assign(filterCallsConditions.conditions, { "Reminder": {"$exists": true} });
      }
      console.log('this.selectedReminders', this.selectedReminders);
      if(this.selectedReminders !== "Not Specified") {
        Object.assign(filterCallsConditions.conditions, { "Reminder": {"$exists": true} });
      }
      console.log('this.selectedNotes', this.selectedNotes);
      if(this.selectedNotes !== "Not Specified") {
        Object.assign(filterCallsConditions.conditions, { "Notes": {"$exists": true} });
      }

      console.log('this.selectedNotes', this.selectedUser);
      if(this.selectedUser !== "All") {
        Object.assign(filterCallsConditions.conditions, { "connectedto": "+917994510065" });
      }
      console.log('this.selectedNotes', this.selectedNumber);
      if(this.selectedNumber !== "All") {
        Object.assign(filterCallsConditions.conditions, { "virtualnumber": "8657510921" });
      }

      return filterCallsConditions;
    },
    filterMongo() {

      console.log('Filtering Calls.....');
      var filterCallsPayload = {
        "page_number": this.page?parseInt(this.page):1,
        "results_per_page": parseInt(this.limit),
        "conditions": {
        },
        "sort":{}
      };

      let updatedFilterCallsPayload = this.getCallsFilterPayload(filterCallsPayload);
      console.log('updatedFilterCallsPayload', JSON.stringify(updatedFilterCallsPayload));

      var cfdata = {
        "headers": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
        "url": "http://35.244.46.144:5000/api/calllogs/paginate",
        "payload": updatedFilterCallsPayload
      };
      var raw = JSON.stringify(cfdata);

      const headers = {
        'Content-Type': 'application/json',
        'token': 'tpmongo'
      }
      axios.post("https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/admin/mongo", raw, {
        headers: headers
      })
      .then((response) => {
        console.log('DL response', response.data.data);
        let dataset = response.data.data.dataset;

        this.totalPage = response.data.data.totalPages;
        this.totalItems = response.data.data.totalItems;

        // let List = [];
        this.realdata = [];
        dataset.forEach((doc) => {
          // let callObj = {

          // };

          // call details
          let user_details = doc;
            this.calldetails = user_details;
            var timestamp = this.calldetails.dateTime;
            var date = new Date(timestamp);
            console.log("full time", date);
            console.log("Time: ", date.getTime());

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
            if (this.calldetails.Notes) {
              note = this.calldetails.Notes;
            } else {
              console.log("no note");
              note = [{ Note: "" }];
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
            console.log("snap calllog ", this.realdata);
          // call details
        })
      })
      .catch((error) => {
        console.log('DL error', error);
      })

    },
    getCallsSearchPayload(searchCallsConditions) {

      if(this.searchTerm && this.searchTerm!='') {
        Object.assign(searchCallsConditions.conditions, {"$or": [
        {
          "Notes": {"$elemMatch": {"Note": {"$regex": this.searchTerm,"$options":"i"}}}
        },
        {
          "callerNumber": {"$regex": this.searchTerm,"$options":"i"}
        },
        {
          "Reminder.Message" : {"$regex":this.searchTerm,"$options":"i"}
        }
        ] });
      }

      return searchCallsConditions;
    },
    searchMongo() {

      var searchCallsConditions = {
        "page_number": this.page?parseInt(this.page):1,
        "results_per_page": parseInt(this.limit),
        "conditions": {
        },
        "sort":{}
      };

      let updatedSearchCallsPayload = this.getCallsSearchPayload(searchCallsConditions);

      console.log('updatedSearchCallsPayload', updatedSearchCallsPayload);

      var cfdata = {
        "headers": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
        "url": "http://35.244.46.144:5000/api/calllogs/paginate",
        "payload": updatedSearchCallsPayload
      };
      var raw = JSON.stringify(cfdata);

      const headers = {
        'Content-Type': 'application/json',
        'token': 'tpmongo'
      }
      axios.post("https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/admin/mongo", raw, {
        headers: headers
      })
      .then((response) => {
        console.log('DL response', response.data.data);
        let dataset = response.data.data.dataset;

        this.totalPage = response.data.data.totalPages;
        this.totalItems = response.data.data.totalItems;

        // let List = [];
        this.realdata = [];
        dataset.forEach((doc) => {
          // let callObj = {

          // };

          // call details
          let user_details = doc;
            this.calldetails = user_details;
            var timestamp = this.calldetails.dateTime;
            var date = new Date(timestamp);
            console.log("full time", date);
            console.log("Time: ", date.getTime());

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
            if (this.calldetails.Notes) {
              note = this.calldetails.Notes;
            } else {
              console.log("no note");
              note = [{ Note: "" }];
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
            console.log("snap calllog ", this.realdata);
          // call details
        })
      })
      .catch((error) => {
        console.log('DL error', error);
      })
    },
    getNextCalls() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          console.log('getting Next Calls');
          console.log('this.lastrecord', this.lastrecord);
          // getting Next calls
          db.collection("callLogs")
            .where("owneruid", "==", this.uid)
            .orderBy("dateTime", "desc")
            .startAt(this.lastrecord)
            .limit(this.limit)
            .get()
            .then((querySnapshot) => {
            // .onSnapshot((querySnapshot) => {
              // this.realdata = [];
              if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                  this.lastrecord = doc;
                  console.log(doc.id, " => ", doc.data());
                  let user_details = doc.data();
                  this.calldetails = user_details;
                  var timestamp = this.calldetails.dateTime;
                  var date = new Date(timestamp);
                  console.log("full time", date);
                  console.log("Time: ", date.getTime());

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
                  if (this.calldetails.Notes) {
                    note = this.calldetails.Notes;
                  } else {
                    console.log("no note");
                    note = [{ Note: "" }];
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
                  console.log("next calllog ", this.realdata);
                });

                console.log('this.realdata', this.realdata.length);
                console.log('this.backuprealdata', this.backuprealdata.length);
              } else {
                //alert('no calls')
              }
            });
          // getting Next calls
        }
      }
    },
  },
  created() {
    // let localStorageUserObj = localStorage.getItem("tpu");

    // if (localStorageUserObj) {
    //   let parsedUser = JSON.parse(localStorageUserObj);
    //   this.userEmail = parsedUser.Email;

    //   this.userRole = parsedUser.role;
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       this.uid = user.uid;
    //       // console.log("User Id : " + this.uid);
    //       this.sendMessage(this.uid);

    //       // LcbxlNgkdCZRY8sfkBbmd7FYcXM2
    //       db.collection("callLogs")
    //         .where("owneruid", "==", this.uid)
    //         .orderBy("dateTime", "desc")
    //         // .startAt(0)
    //         .limit(this.limit)
    //         .onSnapshot((querySnapshot) => {
    //           this.realdata = [];
    //           if (!querySnapshot.empty) {
    //             querySnapshot.forEach(async (doc) => {
    //               // console.log(doc.id, " => ", doc.data());
    //               this.lastrecord = doc;
    //               let user_details = doc.data();
    //               this.calldetails = user_details;
    //               var timestamp = this.calldetails.dateTime;
    //               var date = new Date(timestamp);
    //               // console.log("full time", date);
    //               // console.log("Time: ", date.getTime());

    //               var myCurrentDate = new Date();
    //               var missedTresholdDate = new Date(myCurrentDate);
    //               missedTresholdDate.setDate(missedTresholdDate.getDate() - 2); //2 days before
    //               // console.log(missedTresholdDate);

    //               // console.log(timestamp); //missed call date
    //               // console.log(missedTresholdDate.getTime()); //addon date
    //               // console.log(myCurrentDate.getTime()); //today's date

    //               if (timestamp <= missedTresholdDate.getTime()) {
    //                 call_time = moment(date).format("D MMM Y hh:mm a");
    //               } else {
    //                 var call_time = moment(date).format("hh:mm a");
    //                 call_time = moment(date).fromNow();
    //               }

    //               var note = "";
    //               if (this.calldetails.Notes) {
    //                 note = this.calldetails.Notes;
    //               } else {
    //                 // console.log("no note");
    //                 note = [{ Note: "" }];
    //               }

    //               var calledNumber =
    //                 this.calldetails.callerNumber.slice(0, 5) +
    //                 " " +
    //                 this.calldetails.callerNumber.slice(5, 7) +
    //                 " " +
    //                 this.calldetails.callerNumber.slice(7, 11);
    //               var virtualnumber =
    //                 this.calldetails.virtualnumber.slice(0, 5) +
    //                 " " +
    //                 this.calldetails.virtualnumber.slice(5, 7) +
    //                 " " +
    //                 this.calldetails.virtualnumber.slice(7, 11);
    //               this.detail = Object.assign({}, this.detail, {
    //                 callstatus: this.calldetails.callstatus,
    //                 name: this.calldetails.name[0],
    //                 dateTime: call_time,
    //                 conversationduration: this.calldetails.conversationduration,
    //                 callerNumber: calledNumber,
    //                 uniqueid: this.calldetails.uniqueid,
    //                 Note: note,
    //                 source: this.calldetails.source,
    //                 virtualnumber: virtualnumber,
    //                 called_name: this.called_name,
    //                 recordingUrl: this.calldetails.recordingurl,
    //               });
    //               this.realdata.push(this.detail);
    //               this.backuprealdata.push(this.detail);
    //               // console.log("snap calllog ", this.realdata);
    //             });
    //           } else {
    //             //alert('no calls')
    //           }
    //         });
    //     }
    //   });
    // }
},
beforeMount() {

    let localStorageUserObj = localStorage.getItem("tpu");

    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      this.userEmail = parsedUser.Email;

      this.userRole = parsedUser.role;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
          // console.log("User Id : " + this.uid);
          this.sendMessage(this.uid);

          // LcbxlNgkdCZRY8sfkBbmd7FYcXM2
          db.collection("callLogs")
            .where("owneruid", "==", this.uid)
            .orderBy("dateTime", "desc")
            // .startAt(0)
            .limit(this.limit)
            .onSnapshot((querySnapshot) => {
              this.realdata = [];
              if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  this.lastrecord = doc;
                  let user_details = doc.data();
                  this.calldetails = user_details;
                  var timestamp = this.calldetails.dateTime;
                  var date = new Date(timestamp);
                  // console.log("full time", date);
                  // console.log("Time: ", date.getTime());

                  var myCurrentDate = new Date();
                  var missedTresholdDate = new Date(myCurrentDate);
                  missedTresholdDate.setDate(missedTresholdDate.getDate() - 2); //2 days before
                  // console.log(missedTresholdDate);

                  // console.log(timestamp); //missed call date
                  // console.log(missedTresholdDate.getTime()); //addon date
                  // console.log(myCurrentDate.getTime()); //today's date

                  if (timestamp <= missedTresholdDate.getTime()) {
                    call_time = moment(date).format("D MMM Y hh:mm a");
                  } else {
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();
                  }

                  var note = "";
                  if (this.calldetails.Notes) {
                    note = this.calldetails.Notes;
                  } else {
                    // console.log("no note");
                    note = [{ Note: "" }];
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
                  // console.log("snap calllog ", this.realdata);
                });
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
}

};
</script>


<style scoped>
.test {
  border-color: grey !important;
  height: 100%;
}
.v-expansion-panel {
  border-bottom: 1px solid #ddd;
}
.v-expansion-panel-header {
  line-height: 0.9 !important;
}
.v-btn--outlined {
  border: thin solid #ee1c25;
}
.application {
  font-family: adobe-clean, sans-serif !important;
}
</style>