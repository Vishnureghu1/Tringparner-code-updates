<template>
  <v-app>
    <div v-if="hidealert">
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
            <v-btn @click="changeEmailPopup1()">Resend Email</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </div>
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

        <v-snackbar
          :timeout="timeout"
          v-model="reminder_added"
          :bottom="bottom"
          :right="right"
          color="green"
          text
          >Reminder added successfully!</v-snackbar
        >

        <v-snackbar
          :timeout="timeout"
          v-model="blocked_number"
          :bottom="bottom"
          :right="right"
          color="red"
          text
          >Number blocked successfully!</v-snackbar
        >

        <v-snackbar
          :timeout="timeout"
          v-model="unblocked_number"
          :bottom="bottom"
          :right="right"
          color="green"
          text
          >Number unblocked successfully!</v-snackbar
        >
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
                    <v-col cols="12" sm="7" align="end" class="pt-6">
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
                          <span class="pr-7">
                            <v-icon
                              class="mt-0 mb-5 mr-4"
                              color="black"
                              @click="hidden = !hidden"
                              >mdi-magnify</v-icon
                            >
                            <v-badge v-if="showBadge == true" dot overlap>
                              <v-icon
                                class="mt-0 mb-5 mr-0"
                                color="black"
                                v-bind="attrs"
                                v-on="on"
                                >mdi-filter-variant</v-icon
                              ></v-badge
                            >
                            <span v-if="showBadge == false" overlap>
                              <v-icon
                                class="mt-0 mb-5 mr-0"
                                color="black"
                                v-bind="attrs"
                                v-on="on"
                                >mdi-filter-variant</v-icon
                              ></span
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
                  <div>
                    <v-expansion-panels
                      accordion
                      flat
                      v-if="realdata.length != ''"
                    >
                      <v-expansion-panel
                        v-for="details in realdata"
                        :key="details.text"
                      >
                        <v-expansion-panel-header>
                          <div>
                            <v-row class="calls_list">
                              <v-col cols="12" sm="10">
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
                                  <v-icon
                                    color="gray"
                                    class="mr-5"
                                    v-if="details.isBlocked == true"
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
                                      <div
                                        v-for="getNotes in details.Note"
                                        :key="getNotes.text"
                                      ></div>
                                      <v-list-item
                                        v-for="(item, index) in items"
                                        :key="index"
                                        active-class="pink--text"
                                      >
                                        <div
                                          v-for="getNotes in details.Note"
                                          :key="getNotes.text"
                                        >
                                          <v-list-item-title
                                            :class="item.color"
                                            @click="
                                              threeDotAction(
                                                item.url,
                                                details.virtualnumber,
                                                details.uniqueid,
                                                getNotes.Note
                                              )
                                            "
                                          >
                                            <span
                                              v-if="
                                                getNotes.Note != '' &&
                                                item.url == 'add_note'
                                              "
                                              >Edit Note</span
                                            >
                                            <span v-else>{{ item.title }}</span>
                                          </v-list-item-title>
                                        </div>
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
                                >{{ formatTime(details.conversationduration) }},
                              </span>
                              {{ details.dateTime
                              }}<span
                                v-if="
                                  details.name &&
                                  details.callstatus == 'Answered'
                                "
                                >, {{ details.name }}</span
                              >
                            </div>
                            <!-- {{detail}} -->
                            <div
                              class="ml-10 mt-3 font-weight-thin hideOnExpand"
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
                            <!-- {{details.reminder}} -->
                            <div
                              v-if="
                                details.reminderPayload != '' &&
                                details.reminder
                              "
                              class="ml-10 mt-3 font-weight-thin hideOnExpand"
                            >
                              <div>
                                <span class="mdi mdi-alarm grey--text"> </span>
                                <!-- Sample reminder here -->
                                <!-- {{ details.reminderPayload.Message }},  -->
                                {{ details.reminderTime }}
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
                                  <div
                                    v-for="getNotes in details.Note"
                                    :key="getNotes.text"
                                  >
                                    <span v-if="getNotes.Note != ''">
                                      <span class="mdi mdi-note grey--text">
                                      </span>
                                      {{ getNotes.Note }}
                                      <span
                                        class="mdi mdi-pencil grey--text"
                                        @click="
                                          threeDotAction(
                                            'add_note',
                                            'virtualNumber',
                                            details.uniqueid,
                                            getNotes.Note
                                          )
                                        "
                                      >
                                      </span>
                                    </span>
                                  </div>

                                  <!-- Copied from collapsed reminder section -->
                                  <div
                                    class="mt-3 font-weight-thin hideOnExpand"
                                  >
                                    <div>
                                      <span
                                        v-for="getNotes in details.Note"
                                        :key="getNotes.text"
                                      >
                                        <span v-if="getNotes.Note == ''">
                                          <v-btn
                                            color="red"
                                            text
                                            class="
                                              ma-2
                                              ml-0
                                              mr-2
                                              text-capitalize
                                              rounded-pill
                                              p-3
                                              red_button_outline
                                            "
                                            min-width="140px"
                                            @click="
                                              threeDotAction(
                                                'add_note',
                                                'virtualNumber',
                                                details.uniqueid,
                                                ''
                                              )
                                            "
                                          >
                                            Add Notes
                                          </v-btn>
                                        </span>
                                      </span>
                                      <span
                                        v-if="
                                          details.reminderTime != '' &&
                                          details.reminder
                                        "
                                        class="mdi mdi-alarm grey--text"
                                      >
                                        {{ details.reminderPayload.Message }},
                                        {{ details.reminderTime }}
                                      </span>
                                      <span
                                        v-if="
                                          details.reminder &&
                                          details.reminderTime != ''
                                        "
                                        class="mdi mdi-pencil grey--text"
                                        @click="
                                          threeDotAction(
                                            'add_reminder',
                                            'virtualNumber',
                                            details.uniqueid,
                                            '',
                                            details.reminderPayload.Message,
                                            details.reminderPayload.Type
                                          )
                                        "
                                      >
                                        <!-- </v-btn> -->
                                      </span>
                                      <span v-else
                                        ><v-btn
                                          color="red"
                                          text
                                          class="
                                            ma-2
                                            ml-0
                                            mr-2
                                            text-capitalize
                                            rounded-pill
                                            p-3
                                            red_button_outline
                                          "
                                          min-width="140px"
                                          @click="
                                            threeDotAction(
                                              'add_reminder',
                                              'virtualNumber',
                                              details.uniqueid,
                                              ''
                                            )
                                          "
                                        >
                                          Add Reminder
                                        </v-btn>
                                      </span>
                                    </div>
                                    <!-- </div> -->
                                    <!-- Copied from collapsed reminder section -->
                                  </div>
                                </div>
                              </v-col>

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
                    <v-expansion-panels v-if="realdata.length == ''"
                      >No Calls Found!</v-expansion-panels
                    >
                    <v-container v-if="loadingMore">
                      <v-row
                        class="fill-height"
                        align-content="center"
                        justify="center"
                      >
                        <v-col class="text-subtitle-1 text-center" cols="12">
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
                   <v-card-title class="mb-5">
                  <span class="text-h5">Reminder </span> <v-spacer></v-spacer>
                  <span
                    class="red--text light4 f14 cursor"
                    @click="deleteReminder()"
                    >Remove</span
                  ></v-card-title
                >
                <v-card-text>
                  <v-text-field
                    label="Remind About"
                    v-model="reminderMessage"
                    outlined
                  ></v-text-field>
                  <v-radio-group v-model="radio" column>
                    <v-radio
                      label="10 minutes"
                      value="10"
                      color="red"
                    ></v-radio>
                    <v-radio
                      label="30 minutes"
                      value="30"
                      color="red"
                    ></v-radio>
                    <v-radio label="1 hour" value="60" color="red"></v-radio>
                    <v-radio
                      label="Custom"
                      value="custom"
                      color="red"
                    ></v-radio>
                  </v-radio-group>
                  <div v-if="radio == 'custom'">
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
                        @click="sendReminder(radio, date, time)"
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
          <v-text-field
            label="Email Address*"
            v-model="current_email"
            outlined
          ></v-text-field>
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
          <!-- <v-form @submit.prevent="" ref="form" v-model="valid" lazy-validation> -->
          <v-text-field
            label="Enter OTP"
            v-model="otp"
            value=""
            required
          ></v-text-field>
          <!-- </v-form> -->
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

    <!-- RENAME addNotesDialog SECTION -->
    <v-dialog v-model="addNotesDialog" max-width="332px">
      <v-card v-model="addNotesDialog" class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">{{ notes_text }}</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field
            v-model="notes_data"
            clear-icon="mdi-close-circle"
            clearable
            label="Notes"
            :rules="rules"
            counter
            maxlength="120"
            type="text"
            @click:clear="clearMessage(uniqueId, notes_data)"
            class="black--text"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="addNotesDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="addNote(uniqueId, notes_data)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- RENAME addNotesDialog SECTION -->

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
    showBadge: false,
    hidealert: "",
    otp: "",
    addNotesDialog: false,
    notes_data: "",
    virtualNumber: null,
    uniqueId: null,
    reminder_added: false,
    blocked_number: false,
    unblocked_number: false,
    notes_text: "Add Notes",
    current_email: "",
    valid: true,
    searchForm: false,
    benched: 0,
    hidden: true,
    sendInviteLoader: false,
    changeEmailPopup: false,
    enterOtpModel: false,
    loadingMore: false,
    items: [
      { title: "Add Note", color: "black--text", url: "add_note" },
      { title: "Add Reminder", color: "black--text", url: "add_reminder" },
      {
        title: "Block This Number",
        color: "primary--text",
        url: "block_number",
      },
    ],
    timeofCall: ["Ascending", "Descending"],
    selectedTimeOfCall: "Descending",
    DurationOfCall: [
      "Not Specified",
      "< 30 Seconds",
      "30 Seconds - > 1 minute",
      "1 minitue - > 2 minutes",
      "> 2 minutes",
    ],
    selectedDurationOfCall: "",
    ViewByType: ["Calls", "Notes", "Reminder"],
    selectedViewByType: "Calls",
    Reminders: ["Not Specified", "Yes"],
    selectedReminders: "Not Specified",
    Notes: ["Not Specified", "Yes"],
    selectedNotes: "Not Specified",

    Users: ["All"],
    usersObj: { All: "" },
    selectedUser: "All",
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
    radio: "10",
    Reminder: "",
    reminderMessage: "",
    date: "",
    time: "",
    notes_added: false,
    notes_removed: false,
    timeout: 2500,
    bottom: true,
    right: false,
    pageNumber: 10,
    limit: 20,
    lastrecord: null,
    searchTerm: "",
    totalPage: 0,
    totalItems: 0,
    page: 1,
    name: "",
    userRole: "",
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
    formatTime(seconds) {
      return [
        parseInt(seconds / 60 / 60),
        parseInt((seconds / 60) % 60),
        parseInt(seconds % 60),
      ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    },
    changeEmailPopup1() {
      console.log("g");
      this.changeEmailPopup = true;
    },

    threeDotAction(action, virtualNumber, uniqueId, notes_text) {
      if (action == "add_note") {
        console.log("Add Note");
        this.notes_data = notes_text;
        this.uniqueId = uniqueId;
        this.dialog = false;
        this.addNotesDialog = true;
        if (notes_text == "") {
          this.notes_text = "Add Notes";
        } else {
          this.uniqueId = uniqueId;
          this.notes_text = "Edit Notes";
        }
      }
      if (action == "add_reminder") {
        console.log("Add Reminder");
        console.log(uniqueId);
        this.uniqueId = uniqueId;
        this.addNotesDialog = false;
        this.dialog = true;
      }
      if (action == "block_number") {
        console.log("Block Numebr");
        var token = localStorage.getItem("token");
        var tpu = localStorage.getItem("tpu");
        var Id = JSON.parse(tpu);
        console.log(Id);
        const blockNumber = {
          url: this.$cloudfareApi + "/blockcall",
          method: "POST",
          data: {
            number: this.virtualNumber,
            owner_uid: this.ownerUid, //
            status: true,
            UpdatedBy: this.ownerUid, // owner uid
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
            this.blocked_number = true;
            this.dialog = false;
            console.log(response);
          })
          .catch((error) => {
            console.log("Error getting: ", error);
          });
      }
    },

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
      this.showBadge = true;
    },
    updateSearchTerm() {
      console.log(this.searchTerm);
      console.log("this.searchTerm.length", this.searchTerm.length);
      if (this.searchTerm !== "") {
        this.searchMongo();
      } else {
        console.log("searchTerm is empty");
        this.realdata = this.backuprealdata;
      }
    },
    searchAction() {
      this.hidden = !this.hidden;
    },
    SendVerification() {
      this.changeEmailPopup = false;
      this.sendInviteLoader = true;
      const details = {
        url: this.$cloudfareApi + "/email/otp",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          email: this.current_email,
          uid: this.uid,
          updated_by: this.uid,
        },
      };
      axios(details).then(async (response) => {
        if (response.data.status == false) {
          console.log(response.data.status);
          this.$root.vtoast.show({
            message: response.data.message,
            color: "red",
            timer: 2000,
          });
          //  this.emailStatus()
        } else {
          console.log(response.data.status);
          this.sendInviteLoader = true;
          this.changeEmailPopup = false;
          this.enterOtpModel = true;
        }
        //  this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000});
      });
      // this.enterOtpModel = false
    },

    verifyOTP() {
      const details = {
        url: this.$cloudfareApi + "/email/verification",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          email: this.current_email,
          uid: this.uid,
          otp: parseInt(this.otp),
          updated_by: this.uid,
        },
      };
      axios(details).then(async (response) => {
        if (response.data.status == false) {
          console.log(response.data.status);
          this.$root.vtoast.show({
            message: response.data.message,
            color: "red",
            timer: 2000,
          });
        } else {
          console.log(response.data.status);
          (this.dialog2 = false), (this.enterOtpModel = false);
          (this.otp = ""), (this.hidealert = false);
          // this.current_number = this.new_number,
          this.$root.vtoast.show({
            message: response.data.message,
            color: "green",
            timer: 2000,
          });
        }
        //  this.$root.vtoast.show({message: 'updated successfully', color: 'green', timer: 5000});
      });
    },
    close() {
      this.changeEmailPopup = false;
      this.enterOtpModel = false;
      this.otp = "";
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
      this.selectedTimeOfCall = "Descending";
      this.selectedDurationOfCall = "";
      this.selectedViewByType = "Calls";
      this.selectedReminders = "Not Specified";
      this.selectedNotes = "Not Specified";
      this.selectedUser = "All";
      this.selectedNumber = "All";
      this.filterMongo();
      this.showBadge = false;
    },
    handleScroll: function (e) {
      if (e.target.scrollHeight - 300 <= e.target.scrollTop) {
        alert("oi sou Eduardo Martins");
      }
    },

    addNote(unique_id, message) {
      var token = localStorage.getItem("token");
      const user_data = {
        url: this.$cloudfareApi + "/note",
        method: "POST",
        data: {
          uid: this.uid,
          updated_by: this.uid,
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
          if (response.data.status == true) {
            this.notes_added = true;
            this.addNotesDialog = false;
            this.uniqueId = "";
            // setTimeout(this.getNextCalls(), 3000);
            // this.getNextCalls();
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    sendReminder(radio, date, time) {
      // console.log(moment(new Date()).format("YYYY-MM-DD hh:mm"))
      var token = localStorage.getItem("token");
      let tpu = localStorage.getItem("tpu");
      let Id = JSON.parse(tpu);
      let ReminderAt = "";
      if (radio == "10" || radio == "30" || radio == "60") {
        ReminderAt = new Date(
          moment(
            new Date(new Date().getTime() + (parseInt(radio) + 1) * 60000)
          ).format("YYYY-MM-DD hh:mm")
        ).getTime();
      }
      if (radio == "custom") {
        ReminderAt = new Date(date + " " + time).getTime();
      }

      const user_data = {
        url: this.$cloudfareApi + "/reminder",
        method: "POST",
        data: {
          // owner_uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',
          call_id: this.uniqueId, // uniqueid
          agent_uid: this.uid,
          owner_uid: this.ownerUid, //logged in ownere
          reminder_at: ReminderAt, // time in milliseconds
          name: this.name,
          type: radio, //custom or p // after 10 mins // after 10
          number: this.number, //caller number
          message: this.reminderMessage,
          accountId: Id.AccountId,
          updatedBy: this.uid, //logged in user id
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(user_data);
      this.$axios(user_data)
        .then((response) => {
          if (response.data.status == true) {
            this.reminder_added = true;
            this.dialog = false;
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    deleteReminder() {
      var token = localStorage.getItem("token");
      let tpu = localStorage.getItem("tpu");
      let Id = JSON.parse(tpu);
      const user_data = {
        url: this.$cloudfareApi + "/reminder",
        method: "DELETE",
        data: {
          // owner_uid: 'rp7aem0HEVWyYeLZQ4ytSNyjyG02',
          call_id: this.uniqueId, // uniqueid
          agent_uid: this.uid,
          owner_uid: this.ownerUid, //logged in ownere
          accountId: Id.AccountId,
          updatedBy: this.uid, //logged in user id
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };
      console.log(user_data);
      axios(user_data)
        .then((response) => {
          if (response.data.status == true) {
            // this.reminder_added = true;
            this.testreminder = "";
            this.dialog = false;
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    clearMessage(unique_id, message) {
      var token = localStorage.getItem("token");
      message = "";
      const user_data = {
        url: this.$cloudfareApi + "/note",
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
      axios(user_data)
        .then((response) => {
          console.log(response);
          if (response.data.status == true) {
            this.notes_removed = true;
            //  setTimeout(this.getNextCalls(), 3000);
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    getCallsFilterPayload(filterCallsConditions) {
      console.log("this.selectedTimeOfCall", this.selectedTimeOfCall);
      if (
        this.selectedTimeOfCall !== "" &&
        this.selectedTimeOfCall == "Descending"
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
      if (this.userRole == "AGENT") {
        Object.assign(filterCallsConditions.conditions, {
          userid: { $in: [this.uid] },
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
          callstatus: "Missed",
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
        headers: this.$headerKeyMongo,
        url: this.$mongoApi + "/api/calllogs/paginate",
        payload: updatedFilterCallsPayload,
      };
      var raw = JSON.stringify(cfdata);

      const headers = {
        "Content-Type": "application/json",
        token: "tpmongo",
      };
      axios
        .post(this.$cloudfareApi + "/admin/mongo", raw, {
          headers: headers,
        })
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
              if (uid == owneruid && this.calldetails.callstatus == "Missed") {
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

      if (this.userRole == "AGENT") {
        Object.assign(searchCallsConditions.conditions, {
          userid: { $in: [this.uid] },
        });
      }

      return searchCallsConditions;
    },
    emailStatus() {
      db.collection("users")
        .where("uid", "==", this.uid)
        .get()
        .then(async (snap) => {
          this.current_email = snap.docs[0].data().Email;
          this.hidealert =
            snap.docs[0].data().role == "OWNER" &&
            snap.docs[0].data().IsEmailVerified == false
              ? true
              : false;
          // this.hidealert =
          //   snap.docs[0].data().IsEmailVerified == true ? false : true;
          this.name =
            snap.docs[0].data().role == "OWNER"
              ? snap.docs[0].data().FirstName
              : snap.docs[0].data().Name;
          this.number = snap.docs[0].data().PhoneNumber;
          console.log("test", this.hidealert);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    searchMongo() {
      var searchCallsConditions = {
        page_number: this.page ? parseInt(this.page) : 1,
        results_per_page: parseInt(this.limit),
        conditions: {
          owneruid: this.ownerUid,
          callstatus: "Missed",
        },
        sort: {},
      };

      let updatedSearchCallsPayload = this.getCallsSearchPayload(
        searchCallsConditions
      );

      console.log("updatedSearchCallsPayload", updatedSearchCallsPayload);

      var cfdata = {
        headers: this.$headerKeyMongo,
        url: this.$mongoApi + "/api/calllogs/paginate",
        payload: updatedSearchCallsPayload,
      };
      var raw = JSON.stringify(cfdata);

      const headers = {
        "Content-Type": "application/json",
        token: "tpmongo",
      };
      axios
        .post(this.$cloudfareApi + "/admin/mongo", raw, {
          headers: headers,
        })
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
              if (uid == owneruid && this.calldetails.callstatus == "Missed") {
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
              callstatus: "Missed",
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
            headers: this.$headerKeyMongo,
            url: this.$mongoApi + "/api/calllogs/paginate",
            payload: updatedFilterCallsPayload,
          };
          var raw = JSON.stringify(cfdata);

          const headers = {
            "Content-Type": "application/json",
            token: "tpmongo",
          };
          axios
            .post(this.$cloudfareApi + "/admin/mongo", raw, {
              headers: headers,
            })
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
    },
  },
  beforeMount() {
    let localStorageUserObj = localStorage.getItem("tpu");

    if (localStorageUserObj) {
      let parsedUser = JSON.parse(localStorageUserObj);
      this.ownerUid =
        parsedUser.role == "OWNER" ? parsedUser.uid : parsedUser.OwnerUid;
      this.userEmail = parsedUser.Email;

      this.userRole = parsedUser.role;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
          this.emailStatus();
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
                    callstatus: "Missed",
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
                  headers: this.$headerKeyMongo,
                  url: this.$mongoApi + "/api/calllogs/paginate",
                  payload: updatedFilterCallsPayload,
                };
                var raw = JSON.stringify(cfdata);

                const headers = {
                  "Content-Type": "application/json",
                  token: "tpmongo",
                };
                axios
                  .post(this.$cloudfareApi + "/admin/mongo", raw, {
                    headers: headers,
                  })
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
                      missedTresholdDate.setDate(
                        missedTresholdDate.getDate() - 2
                      ); //2 days before
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
                        conversationduration:
                          this.calldetails.conversationduration,
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
                    });
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